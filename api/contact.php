<?php
// Contact form handler for polivoxia.ca. Adapted from www.journeyways.ca/api/contact.php.
// POST JSON {name,email,message,website(honeypot),turnstileToken,lang}.
// Validates, verifies Cloudflare Turnstile (if configured), rate-limits per IP,
// and sends via authenticated SMTP (ZeptoMail). Nothing is stored. No dependencies.
//
// Secrets live OUTSIDE the docroot in /etc/polivoxia/contact-config.php
// (theagitist:www-data 0640): PV_SMTP_HOST, PV_SMTP_PORT, PV_SMTP_USER, PV_SMTP_PASS,
// PV_SMTP_FROM, PV_CONTACT_EMAIL, PV_TURNSTILE_SECRET. Missing config -> 503.
//
// Client IP is REMOTE_ADDR only: nginx's cloudflare-realip snippet already sets it to
// the real visitor, and forwarded headers can be forged on direct-to-origin requests.

const PV_CONTACT_CONFIG = '/etc/polivoxia/contact-config.php';
const PV_RATE_MAX = 5;              // submissions
const PV_RATE_WINDOW = 3600;        // per hour, per IP
const PV_MSG_MAX = 3000;
const PV_EMAIL_RE = '/^[^\s@]+@[^\s@]+\.[^\s@]+$/';

// Visitor-facing errors in the page's language (en / fr / es / pt).
const PV_ERR = [
    'en' => ['method' => 'Method not allowed.', 'name' => 'Please add your name (up to 100 characters).', 'email' => 'Please add an email address I can reply to.', 'empty' => 'Please write a message.', 'long' => 'Your message is too long (up to 3000 characters).', 'unavailable' => 'The form is unavailable right now. Please try again later.', 'verify' => 'The spam check did not pass. Please reload the page and try again.', 'rate' => 'Too many messages from your connection. Please try again in an hour.', 'send' => 'The message could not be sent. Please try again later.'],
    'fr' => ['method' => 'Méthode non autorisée.', 'name' => 'Veuillez indiquer votre nom (100 caractères au maximum).', 'email' => 'Veuillez indiquer une adresse courriel à laquelle je peux répondre.', 'empty' => 'Veuillez écrire un message.', 'long' => 'Votre message est trop long (3000 caractères au maximum).', 'unavailable' => 'Le formulaire est indisponible pour le moment. Veuillez réessayer plus tard.', 'verify' => 'La vérification antispam a échoué. Rechargez la page et réessayez.', 'rate' => 'Trop de messages depuis votre connexion. Veuillez réessayer dans une heure.', 'send' => 'Le message n\'a pas pu être envoyé. Veuillez réessayer plus tard.'],
    'es' => ['method' => 'Método no permitido.', 'name' => 'Escribe tu nombre (hasta 100 caracteres).', 'email' => 'Escribe un correo al que pueda responderte.', 'empty' => 'Escribe un mensaje.', 'long' => 'Tu mensaje es demasiado largo (hasta 3000 caracteres).', 'unavailable' => 'El formulario no está disponible en este momento. Inténtalo más tarde.', 'verify' => 'La verificación antispam falló. Recarga la página e inténtalo de nuevo.', 'rate' => 'Demasiados mensajes desde tu conexión. Inténtalo de nuevo en una hora.', 'send' => 'No se pudo enviar el mensaje. Inténtalo más tarde.'],
    'pt' => ['method' => 'Método não permitido.', 'name' => 'Escreva seu nome (até 100 caracteres).', 'email' => 'Escreva um e-mail para o qual eu possa responder.', 'empty' => 'Escreva uma mensagem.', 'long' => 'Sua mensagem é longa demais (até 3000 caracteres).', 'unavailable' => 'O formulário está indisponível no momento. Tente novamente mais tarde.', 'verify' => 'A verificação antispam falhou. Recarregue a página e tente novamente.', 'rate' => 'Muitas mensagens a partir da sua conexão. Tente novamente em uma hora.', 'send' => 'Não foi possível enviar a mensagem. Tente novamente mais tarde.'],
];

// ---- pure helpers (exercised by the CLI self-test at the bottom) ----

function pv_valid_email(string $e): bool {
    return $e !== '' && strlen($e) <= 200 && preg_match(PV_EMAIL_RE, $e) === 1;
}
// Strip CR/LF so input can never inject extra SMTP/mail headers.
function pv_header_safe(string $s): string {
    return trim(str_replace(["\r", "\n"], ' ', $s));
}
// File-based fixed-window limiter. Returns true if this hit is allowed.
function pv_rate_ok(string $ip, string $dir, int $now): bool {
    if (!is_dir($dir)) @mkdir($dir, 0700, true);
    $fh = @fopen($dir . '/' . sha1($ip) . '.json', 'c+');
    if (!$fh) return true; // fail open: never block a real person on an FS hiccup
    flock($fh, LOCK_EX);
    $data = json_decode(stream_get_contents($fh) ?: '', true);
    if (!is_array($data) || ($data['resetAt'] ?? 0) <= $now) {
        $data = ['count' => 0, 'resetAt' => $now + PV_RATE_WINDOW];
    }
    $data['count']++;
    $ok = $data['count'] <= PV_RATE_MAX;
    ftruncate($fh, 0); rewind($fh); fwrite($fh, json_encode($data));
    flock($fh, LOCK_UN); fclose($fh);
    return $ok;
}

// ---- request handling (skipped under CLI self-test) ----

if (php_sapi_name() !== 'cli') {
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    $body = json_decode(file_get_contents('php://input', false, null, 0, 16384) ?: '', true);
    if (!is_array($body)) $body = [];
    $E = PV_ERR[is_string($body['lang'] ?? null) && isset(PV_ERR[$body['lang']]) ? $body['lang'] : 'en'];
    $fail = function (int $code, string $key) use ($E) {
        http_response_code($code);
        echo json_encode(['error' => $E[$key]]);
        exit;
    };

    if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') $fail(405, 'method');

    // Honeypot: pretend success so bots learn nothing.
    if (trim((string)($body['website'] ?? '')) !== '') { echo json_encode(['ok' => true]); exit; }

    $name    = pv_header_safe((string)($body['name'] ?? ''));
    $email   = pv_header_safe((string)($body['email'] ?? ''));
    $message = trim((string)($body['message'] ?? ''));

    if ($name === '' || mb_strlen($name) > 100) $fail(400, 'name');
    if (!pv_valid_email($email))                 $fail(400, 'email');
    if ($message === '')                         $fail(400, 'empty');
    if (mb_strlen($message) > PV_MSG_MAX)        $fail(400, 'long');

    if (!is_file(PV_CONTACT_CONFIG)) $fail(503, 'unavailable');
    require PV_CONTACT_CONFIG;
    if (!defined('PV_SMTP_HOST') || !defined('PV_SMTP_USER') || !defined('PV_SMTP_PASS')) {
        $fail(503, 'unavailable');
    }

    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';

    if (defined('PV_TURNSTILE_SECRET') && PV_TURNSTILE_SECRET !== '') {
        if (!pv_turnstile_ok((string)($body['turnstileToken'] ?? ''), $ip)) {
            $fail(400, 'verify');
        }
    }

    if (!pv_rate_ok($ip, sys_get_temp_dir() . '/pv-contact-rate', time())) {
        header('Retry-After: 3600');
        $fail(429, 'rate');
    }

    $to   = defined('PV_CONTACT_EMAIL') && PV_CONTACT_EMAIL ? PV_CONTACT_EMAIL : PV_SMTP_FROM;
    $text = "New message from the polivoxia.ca contact form\n\n"
        . "Name: $name\nEmail: $email\n\nMessage:\n$message\n";

    $ok = pv_smtp_send([
        'host' => PV_SMTP_HOST, 'port' => defined('PV_SMTP_PORT') ? (int)PV_SMTP_PORT : 465,
        'user' => PV_SMTP_USER, 'pass' => PV_SMTP_PASS,
        'from' => PV_SMTP_FROM, 'to' => $to, 'replyto' => $email,
        'subject' => 'polivoxia.ca contact: ' . $name, 'text' => $text,
    ]);

    if ($ok) echo json_encode(['ok' => true]);
    else     $fail(502, 'send');
    exit;
}

// ---- Turnstile + SMTP (defined below the request block; hoisted at parse time) ----

function pv_turnstile_ok(string $token, string $ip): bool {
    if ($token === '') return false;
    $ctx = stream_context_create(['http' => [
        'method' => 'POST',
        'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
        'content' => http_build_query(['secret' => PV_TURNSTILE_SECRET, 'response' => $token, 'remoteip' => $ip]),
        'timeout' => 8,
    ]]);
    $data = json_decode(@file_get_contents('https://challenges.cloudflare.com/turnstile/v0/siteverify', false, $ctx) ?: '', true);
    return is_array($data) && ($data['success'] ?? false) === true;
}

// Minimal authenticated SMTPS sender (implicit TLS, AUTH LOGIN, one recipient,
// multipart/alternative text+HTML). Returns true on a 250 after end-of-data.
function pv_smtp_send(array $m): bool {
    $secure = $m['port'] === 465 ? 'ssl://' : '';
    $fp = @stream_socket_client($secure . $m['host'] . ':' . $m['port'], $e, $s, 15);
    if (!$fp) return false;
    stream_set_timeout($fp, 15);
    $read = function () use ($fp) {
        $data = '';
        while (($line = fgets($fp, 515)) !== false) {
            $data .= $line;
            if (strlen($line) >= 4 && $line[3] === ' ') break; // last line of reply
        }
        return $data;
    };
    $cmd = function (string $c, string $expect) use ($fp, $read): bool {
        if ($c !== '') fwrite($fp, $c . "\r\n");
        return str_starts_with(ltrim($read()), $expect);
    };
    $ok = $cmd('', '220')
        && $cmd('EHLO polivoxia.ca', '250')
        && $cmd('AUTH LOGIN', '334')
        && $cmd(base64_encode($m['user']), '334')
        && $cmd(base64_encode($m['pass']), '235')
        && $cmd('MAIL FROM:<' . pv_header_safe($m['from']) . '>', '250')
        && $cmd('RCPT TO:<' . pv_header_safe($m['to']) . '>', '250')
        && $cmd('DATA', '354');
    if (!$ok) { fclose($fp); return false; }

    $boundary = 'pv' . bin2hex(random_bytes(8));
    $headers =
        'From: polivoxia.ca <' . pv_header_safe($m['from']) . ">\r\n" .
        'To: <' . pv_header_safe($m['to']) . ">\r\n" .
        'Reply-To: <' . pv_header_safe($m['replyto']) . ">\r\n" .
        'Subject: =?UTF-8?B?' . base64_encode(pv_header_safe($m['subject'])) . "?=\r\n" .
        'Date: ' . date('r') . "\r\n" .
        "MIME-Version: 1.0\r\n" .
        'Content-Type: multipart/alternative; boundary="' . $boundary . "\"\r\n";
    $html = '<p>' . nl2br(htmlspecialchars($m['text'], ENT_QUOTES, 'UTF-8')) . '</p>';
    $mime =
        "--$boundary\r\nContent-Type: text/plain; charset=UTF-8\r\n\r\n" . $m['text'] . "\r\n" .
        "--$boundary\r\nContent-Type: text/html; charset=UTF-8\r\n\r\n" . $html . "\r\n" .
        "--$boundary--\r\n";
    // Normalise bare LF to CRLF, then dot-stuff lines starting with '.' (RFC 5321).
    $data = preg_replace('/^\./m', '..', preg_replace("/\r?\n/", "\r\n", $headers . "\r\n" . $mime));
    fwrite($fp, $data . "\r\n.\r\n");
    $sent = str_starts_with(ltrim($read()), '250');
    $cmd('QUIT', '221');
    fclose($fp);
    return $sent;
}

// ---- CLI self-test: `php -d zend.assertions=1 api/contact.php` ----

if (php_sapi_name() === 'cli') {
    if ((int)ini_get('zend.assertions') !== 1) { fwrite(STDERR, "Run with: php -d zend.assertions=1 api/contact.php\n"); exit(1); }
    ini_set('assert.exception', '1');
    assert(pv_valid_email('a@b.co') === true);
    assert(pv_valid_email('nope') === false);
    assert(pv_valid_email('a@b') === false);
    assert(pv_valid_email(str_repeat('x', 200) . '@b.co') === false);
    $safe = pv_header_safe("hi\r\nBcc: x@y.z");
    assert(strpbrk($safe, "\r\n") === false && str_contains($safe, 'Bcc'));
    $dir = sys_get_temp_dir() . '/pv-contact-selftest-' . getmypid();
    $now = 1000000;
    for ($i = 1; $i <= PV_RATE_MAX; $i++) assert(pv_rate_ok('1.2.3.4', $dir, $now) === true);
    assert(pv_rate_ok('1.2.3.4', $dir, $now) === false);                      // 6th blocked
    assert(pv_rate_ok('1.2.3.4', $dir, $now + PV_RATE_WINDOW + 1) === true);  // window reset
    assert(pv_rate_ok('9.9.9.9', $dir, $now) === true);                      // other IP independent
    foreach (PV_ERR as $l => $msgs) { assert(array_keys($msgs) === array_keys(PV_ERR['en']), "$l error keys"); foreach ($msgs as $k => $v) assert(str_contains($v, ' '), "$l.$k is a real sentence"); }
    array_map('unlink', glob("$dir/*.json")); @rmdir($dir);
    fwrite(STDOUT, "contact.php self-test OK\n");
}
