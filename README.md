# POLIVOXIA.CA

Portfolio site for Adri M. (theagitist): Art • Computers • Community — interactive art, writing, games, and creative projects.

Live: <https://polivoxia.ca>  
Site version: 1.0.1 (see `VERSION`).

## Structure

- **/** — Homepage: tagline “Art • Computers • Community”, social links (Instagram, GitHub, Medium, [itch.io](https://polivoxia.itch.io), ORCID), project cards (The Ground Remains, Stories in Whispers, Costa Rica, Journeyways, TransRants, Sujeto del Inconsciente, Ounces, Programa Convivir). Background: `img/polivoxia_logo.jpg` with gradient overlay (lighter at top, muted below). The Ground Remains card uses `the_ground_remains/img/map_bg.png`.
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

Static HTML/CSS/JS. Typekit (Adobe Fonts): bmx-radical, courier-std, Nunito (the_ground_remains). Cookie consent and Google Analytics (opt-in). Images: PNGs optimized with optipng, JPGs with jpegoptim. Images: PNGs optimized with optipng, JPGs with jpegoptim.

## License

Site content and design © Adri M. The Ground Remains: [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/).
