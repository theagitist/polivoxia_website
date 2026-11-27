# POLIVOXIA.CA

Portfolio site for Adri M. (theagitist): Art • Computers • Community — interactive art, writing, games, and creative projects.

Live: <https://polivoxia.ca>  
Site version: 2.1.0 (see `VERSION`).

## Structure

- **/**: Homepage (redesigned 2026-11-25, v2.0.0). Riso/comic/cut-up look: off-register POLI/VOXIA hero linking home, the favourite projects pasted around a self-portrait as riso prints, then a sticky tab bar (News, Work, About me; Work by default; `#news`, `#about`, `#contact` open a tab). Work = project "clippings" from `assets/projects.js` (shuffled; the first row never holds a favourite). News = the 18 newest items of `assets/news.json` plus every highlight. About me = bio and positionality, two self-portraits linking to `/illustrations/`, and the contact form. In English, French, Spanish and Portuguese (`?lang=xx`, else the visitor's last choice or browser language): strings live in `assets/i18n.js`, and links to pages that are not in the current language get a language tag. Projects carry `langs` and, for Spanish titles, `tl`.
- **/she_came_down_from_the_mountains/** — A fractured archive in two volumes by Adri M., for GRSJ 515 (Winter 2026). Traces five generations of women from the stolen Huetar land of Itskazú and Acserrí to Turtle Island. Vol. 1, *The Witness*, holds the voices, faces, and names in a tripartite *polyvoxia* (Voice of the Land, Voice of the Colonial, Voice of the Witness). Vol. 2, *The Critique*, is the theoretical anchor. Fonts: Fraunces, Atkinson Hyperlegible, Courier Prime. Read Online: both volumes in the [Folio](https://github.com/theagitist/folio) reader (`read/vol1/`, `read/vol2/`). Downloads: full PDF and 2-up saddle-stitched booklet PDF for each volume. Imposed with [Plica](https://github.com/theagitist/plica). License: CC BY-ND 4.0.
- **/the_somatic_ghost/** — Zine by Adri M. mapping a 14-day FOLFOXIRI chemotherapy cycle as a counter-archive. Fonts: Special Elite, Courier Prime. Read Online: Folio reader (`read/`). Downloads: full zine PDF and 2-up booklet PDF. License: CC BY-ND 4.0.
- **/the_ground_remains/** — Print-and-play game/zine inspired by *Indigenomicon* by Jodi A. Byrd. Tabs: Statement, Rules, Board (colonial grid PNG), Downloads. Tab state preserved on refresh (sessionStorage). Header and footer share the same background (`map_bg.png`). Downloads: full zine PDF, colonial grid PDF, itch.io library link ([polivoxia.itch.io/the-ground-remains](https://polivoxia.itch.io/the-ground-remains)). SEO: Open Graph and Twitter cards use `map_bg.png`; og:site_name, og:locale, image dimensions, and twitter:image:alt set.
- **/sujeto_del_inconsciente/** — Video dance ensemble by Adri M.: projected imagery paired with dancers, drawn from the subconscious, dreams, and personal emotion. Five embedded Vimeo pieces (2×2 grid + one full-width). Fonts: Rubik Glitch, Special Elite, Courier Prime. Tone: dark subconscious grunge. Migrated from theagitist.com (Adobe Portfolio) on 2026-04-18.
- **/ounces_stemmata/** — Concert visuals by Adri M. for the metal band *Ounces*, produced for their album *Stemmata*: in-sync video across four screens while the band performs live. Four embedded Vimeo pieces (2×2 grid). Fonts: Rock Salt, Special Elite, Courier Prime. Tone: metal concert grunge. Migrated from theagitist.com (Adobe Portfolio) on 2026-04-18.
- **/programa_convivir/** — Three short documentaries by Adri M. on *Programa Convivir*, a Costa Rican government initiative that sought to build stronger communities in rural high schools. Three embedded YouTube pieces (2-column row + one full-width). Fonts: Nunito, Atkinson Hyperlegible. Tone: warm rural documentary. Migrated from theagitist.com (Adobe Portfolio) on 2026-04-18.
- **/illustrations/** — Gallery of digital illustrations by Adri M.: watermarked (`polivoxia.ca`) pop-art portraits, line studies and abstract pieces, in a masonry grid (CSS grid with 6px rows; a few lines of JS set each item's row span from its height, plain grid without JS; not CSS columns, which Chromium mis-draws with tilted items) and a vanilla-JS lightbox (arrows/Esc, focus kept inside, no library). Since 2026-11-25 it uses the v2 look: it loads `/assets/site.css` (board, top strip, riso title, buttons, footer) plus its own `styles.css` (taped paper clippings, tilt on the inner `.paper`). Image slugs and captions are anonymised (`portrait-N`, `abstract-N`, `sketch-1`). Also includes four Journeyways game pieces (`journeyways-1..4`, sourced from play.journeyways.ca, un-watermarked) tagged "Journeyways" and linking to the cards/tiles component pages. Fonts: the homepage set (`/assets/fonts/`). Homepage card thumbnail `img/illustrations.jpg` is a 2×2 montage (not a live screenshot).
- **/folio/** — Vendored copy of [Folio](https://github.com/theagitist/folio) (`folio.js`, `folio.css`, MIT), the online zine reader: each zine shows its cover, which opens the reader in a full-window dialog. Pages are WebP renders of each zine PDF made with Folio's `folio-render <pdf> <outdir>`; re-run it whenever a zine PDF changes, and bump the `?v=` on the page if the files are replaced in place. To update the reader, copy the files from a new Folio tag and **always bump the `?v=` query**: Cloudflare caches JS/CSS at the edge and the current token cannot purge it.
- **/costarica/** — Redirect to costarica.polivoxia.com
- **/downloads/** — Main downloads index
- **/api/contact.php**: the contact form endpoint, the site's only server-side code (see "Contact form" below).
- **/news/**: every item in `assets/news.json`, grouped by year, in the visitor's language. To post news, add one object at the top of `news.json`: `{"date": "YYYY-MM" or "YYYY", "project", "kind": release|award|lecture|event|start, "href": {lang: url}, "title": {en, fr, es, pt}, "text": {...}, "highlight": true (optional)}`; missing languages fall back to English. Bump `?v=` on `news.json` in `assets/i18n.js`.
- **/assets/**: the homepage and news page's own files: `site.css`, `i18n.js`, `projects.js`, `news.json`, `fonts/` (Big Shoulders, Bricolage Grotesque, Work Sans, Red Hat Mono subsets) and `img/` (hero and About images, `og.jpg` share image). Cloudflare caches these and the current token cannot purge, so **bump the `?v=` query** on any file you change (in `index.html`, `news/index.html` and, for `news.json`, `i18n.js`).
- **/sitemap.xml**: home, news, illustrations, manifiesto_canibal, she_came_down_from_the_mountains, the_somatic_ghost, the_ground_remains, stories_in_whispers, denounce/costarica, sujeto_del_inconsciente, ounces_stemmata, programa_convivir, downloads (`dtree/` is password-protected and left out). `robots.txt` also lists the Costa Rica archive's own sitemap.

## The Ground Remains assets

- `the_ground_remains/downloads/the_ground_remains_v1.0.1.pdf` — Full zine/game
- `the_ground_remains/downloads/colonial_grid_v1.0.0.pdf` — Game board only (PDF)
- `the_ground_remains/img/colonial_grid.png` — Board image (BOARD tab)
- `the_ground_remains/img/map_bg.png` — Header and footer background; homepage card and og/twitter share image

## Tech

Static HTML/CSS/JS, plus one PHP endpoint (`api/contact.php`). Self-hosted fonts: the homepage uses Big Shoulders Display, Bricolage Grotesque, Work Sans and Red Hat Mono (`assets/fonts/`); the minisites use (subsetted `.woff2` with `.ttf` fallback, `fonts/`): Special Elite, Nunito, Fraunces, Atkinson Hyperlegible, Courier Prime, Lato, Rock Salt, Rubik Glitch. Images: PNGs optimized with optipng, JPGs with jpegoptim.

## Server config

Deployed via nginx. Server-level config is split into **global drop-ins** (`/etc/nginx/conf.d/*.conf`, auto-loaded into every `http`/`server`) and **reusable snippets** (`/etc/nginx/snippets/*.conf`, `include`d per site).

**Global (`conf.d/`)** — no opt-out, applies to every site on the VPS:

- `brotli.conf` — brotli compression (see below)
- `gzip.conf` — gzip types + vary header (extends the base `gzip on;` from `nginx.conf`)
- `server-tokens.conf` — `server_tokens off;` to hide the nginx version banner

**Snippets (`snippets/`)** — opt-in per site via `include snippets/NAME.conf;`:

- `security-hardening.conf` — dotfile/`.md` hides, with `/.well-known/acme-challenge/` carveout for Let's Encrypt. Also silences the access/not-found logs for blocked paths.
- `security-headers.conf` — HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.
- `static-cache.conf` — `expires 1y` for fonts/css/js, `30d` for images/pdf.

**Example `polivoxia.ca.conf` (443 block) body after SSL directives:**

```nginx
include snippets/security-hardening.conf;
include snippets/security-headers.conf;
include snippets/static-cache.conf;
```

When propagating snippets to other sites, check for collisions — `ssl-params.conf` already defines HSTS and X-Frame-Options; including `security-headers.conf` on top would duplicate those headers.

**Gzip compression** (global) lives at `/etc/nginx/conf.d/gzip.conf`. The base `gzip on;` is in `nginx.conf`; the drop-in adds types, vary header, and comp level 6 to mirror brotli.

**Rate limiting** (global zones, opt-in per site) lives at `/etc/nginx/conf.d/rate-limits.conf`:

```nginx
limit_req_zone $binary_remote_addr zone=general:10m rate=30r/s;
limit_req_zone $binary_remote_addr zone=strict:10m rate=5r/s;
limit_conn_zone $binary_remote_addr zone=conn_per_ip:10m;
limit_req_status 429;
limit_conn_status 429;
```

Apply per-site: `limit_req zone=general burst=60 nodelay;` in the server block. For WebSocket-heavy sites (e.g. `play.journeyways.ca`): also `limit_conn conn_per_ip 20;`.

**CSP (Content-Security-Policy)** is **site-specific** (every site has different allowed origins) so it's set per-server-block, not globally. Recommended rollout: deploy as `Content-Security-Policy-Report-Only` first, watch for violations in the browser console for a week of real traffic, refine, then switch to enforcing `Content-Security-Policy`.

**Brotli compression** (global, applies to every site on the VPS) lives at `/etc/nginx/conf.d/brotli.conf`:

```nginx
brotli on;
brotli_static on;
brotli_comp_level 6;
brotli_min_length 256;
brotli_types
    text/plain text/css text/xml text/javascript
    application/javascript application/json
    application/xml application/xml+rss application/atom+xml application/rss+xml
    application/wasm font/ttf font/otf image/svg+xml;
```

Requires `libnginx-mod-http-brotli-filter` and `libnginx-mod-http-brotli-static`. `font/woff2` is intentionally excluded since `.woff2` is already brotli-compressed internally.

Verify after editing: `sudo nginx -t && sudo systemctl reload nginx`.

## Images

- **Homepage cards** load `img/cards/<slug>.webp`: 800px wide, WebP quality 80, cropped to the 4:3 the card shows when the source is taller (`magick SRC -resize '800x600^' -gravity center -extent 800x600` then `cwebp -q 80 -m 6`). The originals (`img/*.jpg`, minisite covers) stay as sources and for the old Open Graph uses. `assets/projects.js` appends `?v=2` to every card URL; bump it when a card image is replaced (Cloudflare caches images for 30 days).
- **Illustrations**: the grid loads `illustrations/img/thumb/<name>.webp` (800px wide, WebP 80), the lightbox the full-size `img/<name>.webp`; the watermarked `.jpg` originals stay as the source and the fallback.
- **Before committing** any JPG or PNG: `jpegoptim --strip-all --all-progressive` and `optipng -o5 -strip all` (lossless).
- After replacing any image in place: `sudo systemctl reload nginx` before the first request (open_file_cache), then bump its `?v=`.

## Contact form

`api/contact.php` is the only server-side code on the site: it takes a JSON POST from the homepage contact form and emails it through ZeptoMail (adapted from `www.journeyways.ca/api/contact.php`). Nothing is stored.

- **Secrets** live outside the docroot in `/etc/polivoxia/contact-config.php` (`theagitist:www-data 0640`): `PV_SMTP_*`, `PV_CONTACT_EMAIL`, `PV_TURNSTILE_SECRET`. The sender is `no-reply@journeyways.ca` until polivoxia.ca is verified in ZeptoMail (SPF/DKIM records in Cloudflare).
- **Abuse protection:** hidden honeypot field (bots get a fake success), 5 messages per hour per IP, length limits, CR/LF stripped from name/email (no header injection), optional Cloudflare Turnstile (off while `PV_TURNSTILE_SECRET` is empty). The client IP is `REMOTE_ADDR` only, which `snippets/cloudflare-realip.conf` sets to the real visitor; forwarded headers are ignored because they can be forged.
- **Self-test:** `php -d zend.assertions=1 api/contact.php` (CLI; the server's php.ini turns assertions off) checks validation, header stripping and the rate limiter without sending anything.
- **Turning on Turnstile:** add `polivoxia.ca` to a Turnstile widget, put its secret in `PV_TURNSTILE_SECRET`, and add the widget (`<div class="cf-turnstile" data-sitekey="...">` plus Cloudflare's `api.js`) inside the form. The page already sends the `cf-turnstile-response` token.

## License

Site content and design © Adri M. The Ground Remains: [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/).
