# POLIVOXIA.CA

Portfolio site for Adri M. (theagitist): Art • Computers • Community — interactive art, writing, games, and creative projects.

Live: <https://polivoxia.ca>  
Site version: 1.0.1 (see `VERSION`).

## Structure

- **/** — Homepage: tagline “Art • Computers • Community”, social links (Instagram, GitHub, [itch.io](https://polivoxia.itch.io), ORCID), project cards (She Came Down from the Mountains, The Somatic Ghost, The Ground Remains, Stories in Whispers, Costa Rica, Journeyways, TransRants, Sujeto del Inconsciente, Ounces, Programa Convivir). Background: `img/polivoxia_logo.jpg` with gradient overlay (lighter at top, muted below). The Ground Remains card uses `the_ground_remains/img/map_bg.png`.
- **/she_came_down_from_the_mountains/** — A fractured archive in two volumes by Adri M., for GRSJ 515 (Winter 2026). Traces five generations of women from the stolen Huetar land of Itskazú and Acserrí to Turtle Island. Vol. 1, *The Witness*, holds the voices, faces, and names in a tripartite *polyvoxia* (Voice of the Land, Voice of the Colonial, Voice of the Witness). Vol. 2, *The Critique*, is the theoretical anchor. Fonts: Fraunces, Atkinson Hyperlegible, Courier Prime. Downloads: full PDF and 2-up saddle-stitched booklet PDF for each volume. Imposed with [Plica](https://github.com/theagitist/plica). License: CC BY-ND 4.0.
- **/the_somatic_ghost/** — Zine by Adri M. mapping a 14-day FOLFOXIRI chemotherapy cycle as a counter-archive. Fonts: Special Elite, Courier Prime. Downloads: full zine PDF and 2-up booklet PDF. License: CC BY-ND 4.0.
- **/the_ground_remains/** — Print-and-play game/zine inspired by *Indigenomicon* by Jodi A. Byrd. Tabs: Statement, Rules, Board (colonial grid PNG), Downloads. Tab state preserved on refresh (sessionStorage). Header and footer share the same background (`map_bg.png`). Downloads: full zine PDF, colonial grid PDF, itch.io library link ([polivoxia.itch.io/the-ground-remains](https://polivoxia.itch.io/the-ground-remains)). SEO: Open Graph and Twitter cards use `map_bg.png`; og:site_name, og:locale, image dimensions, and twitter:image:alt set.
- **/sujeto_del_inconsciente/** — Video dance ensemble by Adri M.: projected imagery paired with dancers, drawn from the subconscious, dreams, and personal emotion. Five embedded Vimeo pieces (2×2 grid + one full-width). Fonts: Rubik Glitch, Special Elite, Courier Prime. Tone: dark subconscious grunge. Migrated from theagitist.com (Adobe Portfolio) on 2026-04-18.
- **/ounces_stemmata/** — Concert visuals by Adri M. for the metal band *Ounces*, produced for their album *Stemmata*: in-sync video across four screens while the band performs live. Four embedded Vimeo pieces (2×2 grid). Fonts: Rock Salt, Special Elite, Courier Prime. Tone: metal concert grunge. Migrated from theagitist.com (Adobe Portfolio) on 2026-04-18.
- **/programa_convivir/** — Three short documentaries by Adri M. on *Programa Convivir*, a Costa Rican government initiative that sought to build stronger communities in rural high schools. Three embedded YouTube pieces (2-column row + one full-width). Fonts: Nunito, Atkinson Hyperlegible. Tone: warm rural documentary. Migrated from theagitist.com (Adobe Portfolio) on 2026-04-18.
- **/costarica/** — Redirect to costarica.polivoxia.com
- **/downloads/** — Main downloads index
- **/sitemap.xml** — Sitemap (home, she_came_down_from_the_mountains, the_somatic_ghost, the_ground_remains, stories_in_whispers, sujeto_del_inconsciente, ounces_stemmata, programa_convivir, downloads)

## The Ground Remains assets

- `the_ground_remains/downloads/the_ground_remains_v1.0.1.pdf` — Full zine/game
- `the_ground_remains/downloads/colonial_grid_v1.0.0.pdf` — Game board only (PDF)
- `the_ground_remains/img/colonial_grid.png` — Board image (BOARD tab)
- `the_ground_remains/img/map_bg.png` — Header and footer background; homepage card and og/twitter share image

## Tech

Static HTML/CSS/JS. Self-hosted fonts (subsetted `.woff2` with `.ttf` fallback): Special Elite, Nunito, Fraunces, Atkinson Hyperlegible, Courier Prime, Lato, Rock Salt, Rubik Glitch. Cookie consent and Google Analytics (opt-in). Images: PNGs optimized with optipng, JPGs with jpegoptim.

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

## License

Site content and design © Adri M. The Ground Remains: [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/).
