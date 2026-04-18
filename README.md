# POLIVOXIA.CA

Portfolio site for Adri M. (theagitist): Art • Computers • Community — interactive art, writing, games, and creative projects.

Live: <https://polivoxia.ca>  
Site version: 1.0.1 (see `VERSION`).

## Structure

- **/** — Homepage: tagline “Art • Computers • Community”, social links (Instagram, GitHub, Medium, [itch.io](https://polivoxia.itch.io), ORCID), project cards (She Came Down from the Mountains, The Somatic Ghost, The Ground Remains, Stories in Whispers, Costa Rica, Journeyways, TransRants, Sujeto del Inconsciente, Ounces, Programa Convivir). Background: `img/polivoxia_logo.jpg` with gradient overlay (lighter at top, muted below). The Ground Remains card uses `the_ground_remains/img/map_bg.png`.
- **/she_came_down_from_the_mountains/** — A fractured archive in two volumes by Adri M., for GRSJ 515 (Winter 2026). Traces five generations of women from the stolen Huetar land of Itskazú and Acserrí to Turtle Island. Vol. 1, *The Witness*, holds the voices, faces, and names in a tripartite *polyvoxia* (Voice of the Land, Voice of the Colonial, Voice of the Witness). Vol. 2, *The Critique*, is the theoretical anchor. Fonts: Fraunces, Atkinson Hyperlegible, Courier Prime. Downloads: full PDF and 2-up saddle-stitched booklet PDF for each volume. Imposed with [Plica](https://github.com/theagitist/plica). License: CC BY-ND 4.0.
- **/the_somatic_ghost/** — Zine by Adri M. mapping a 14-day FOLFOXIRI chemotherapy cycle as a counter-archive. Fonts: Special Elite, Courier Prime. Downloads: full zine PDF and 2-up booklet PDF. License: CC BY-ND 4.0.
- **/the_ground_remains/** — Print-and-play game/zine inspired by *Indigenomicon* by Jodi A. Byrd. Tabs: Statement, Rules, Board (colonial grid PNG), Downloads. Tab state preserved on refresh (sessionStorage). Header and footer share the same background (`map_bg.png`). Downloads: full zine PDF, colonial grid PDF, itch.io library link ([polivoxia.itch.io/the-ground-remains](https://polivoxia.itch.io/the-ground-remains)). SEO: Open Graph and Twitter cards use `map_bg.png`; og:site_name, og:locale, image dimensions, and twitter:image:alt set.
- **/costarica/** — Redirect to costarica.polivoxia.com
- **/downloads/** — Main downloads index
- **/sitemap.xml** — Sitemap (home, stories_in_whispers, downloads, the_ground_remains)

## The Ground Remains assets

- `the_ground_remains/downloads/the_ground_remains_v1.0.1.pdf` — Full zine/game
- `the_ground_remains/downloads/colonial_grid_v1.0.0.pdf` — Game board only (PDF)
- `the_ground_remains/img/colonial_grid.png` — Board image (BOARD tab)
- `the_ground_remains/img/map_bg.png` — Header and footer background; homepage card and og/twitter share image

## Tech

Static HTML/CSS/JS. Self-hosted fonts (subsetted `.woff2` with `.ttf` fallback): Special Elite, Nunito, Fraunces, Atkinson Hyperlegible, Courier Prime, Lato, Rock Salt, Rubik Glitch. Cookie consent and Google Analytics (opt-in). Images: PNGs optimized with optipng, JPGs with jpegoptim.

## Server config

Deployed via nginx. The site config (`/etc/nginx/sites-available/polivoxia.ca.conf`) blocks paths that shouldn't be web-accessible. Add these inside each `server { }` block:

```nginx
# Dotfiles/dotdirs (.git, .gitignore, .claude, .env, .DS_Store, ...)
location ~ /\. {
    deny all;
    return 404;
}

# Markdown docs (CLAUDE.md, README.md)
location ~ \.md$ {
    return 404;
}
```

Verify after editing: `sudo nginx -t && sudo systemctl reload nginx`.

## License

Site content and design © Adri M. The Ground Remains: [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/).
