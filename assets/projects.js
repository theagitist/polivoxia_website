// Homepage card data. langs = languages the linked page is in (default ['en']); tl = language of the title when it isn't English (for screen readers). Same projects, copy and images as the live index.html.
const PROJECTS = [
  {t:'Telaris', tag:'Interactive', langs:['en','fr','es','pt'],  fav:true, href:'https://www.telaris.ca', img:'cards/telaris.webp',
   d:'A decolonial knowledge archive. Relational, P2P, non-hierarchical. Threaded by meaning.',
   alt:'Telaris homepage: the wordmark TELARIS over a dark starfield with a glowing constellation of linked nodes'},
  {t:'Journeyways', tag:'Game', langs:['en','es','fr'],  fav:true, href:'https://www.journeyways.ca', img:'cards/journeyways.webp',
   d:'A board game and a digital game about becoming. A UBC research project exploring identity through collaborative play.',
   alt:'Journeyways homepage: the title in yellow script beside a round labyrinth mark in a rainbow watercolour wash'},
  {t:'Pumice', tag:'App', href:'https://pumice.polivoxia.ca', img:'cards/pumice.webp',
   d:'Local-first PDF annotation for iPad. Apple Pencil markup written back into the file, no cloud.',
   alt:'The Pumice app icon, a stylized pumice stone on a charcoal background'},
  {t:'Tracet', tag:'App', fav:true, href:'https://tracet.polivoxia.ca', img:'cards/tracet.webp',
   d:'Private, local transcription for macOS. whisperX, speaker diarization, editable transcripts. No cloud, no telemetry.',
   alt:'Tracet homepage with a waveform icon and download buttons'},
  {t:'¿Quién se come a quién?', tl:'es', tag:'Game', langs:['es'],  href:'/quiensecomeaquien/', img:'cards/quiensecomeaquien.webp',
   d:'A print-and-play card game about the cannibal trope: who eats and who gets eaten depends on the scenario. With a sources booklet. Work in progress.',
   alt:'The game title beside three overlapping cards: a black scenario card, a cream character card and a red appetite card, between two rows of red teeth'},
  {t:'She Came Down from the Mountains', tag:'Zine', href:'/she_came_down_from_the_mountains/', img:'cards/she_came_down_cover.webp',
   d:'A fractured archive in two volumes. Five generations of women, from the stolen land of the Huetar to Turtle Island.',
   alt:'Zine cover: serif title over topographic bands in black, rust and slate blue'},
  {t:'The Somatic Ghost', tag:'Zine', fav:true, href:'/the_somatic_ghost/', img:'cards/somatic_ghost_cover.webp',
   d:'A counter-archive of the 28th cycle. From liquid fire to first light.',
   alt:'Zine cover: bold typewriter title over a dark scratched background'},
  {t:'The Ground Remains', tag:'Game', href:'/the_ground_remains/', img:'cards/the_ground_remains.webp',
   d:'A print-and-play game/zine inspired by <em>Indigenomicon</em> by Jodi A. Byrd.',
   alt:'The Ground Remains game board and map'},
  {t:'Stories in Whispers', tag:'Interactive', href:'/stories_in_whispers/', img:'cards/stories_in_whispers.webp',
   d:'Catch whispers. Create poetry. Share. Inspired by <em>Of Floating Isles</em> by Kawika Guillermo.',
   alt:'Stories in Whispers game interface where players catch whispers to build poems'},
  {t:'Transphobia in Costa Rica', tag:'Human Rights', fav:true, href:'/denounce/costarica/', img:'cards/costarica.webp',
   d:'An updated compilation of reports, stories and news.',
   alt:'Transphobia in Costa Rica documentation site in Costa Rican flag colours'},
  {t:'TransRants', tag:'Writing', href:'https://www.transrants.com', img:'cards/transrants.webp',
   d:'Rants. Poetry. Essays. Thoughts in motion.',
   alt:'TransRants writing blog homepage'},
  {t:'Sujeto del Inconsciente', tl:'es', tag:'Art', href:'/sujeto_del_inconsciente/', img:'cards/sujeto.webp',
   d:'A video dance ensemble with live visuals and dancers.',
   alt:'Performance still with live visuals and dancers'},
  {t:'Ounces: Stemmata', tag:'Music', href:'/ounces_stemmata/', img:'cards/ounces.webp',
   d:'Concert visuals: in-sync video across four screens for live shows.',
   alt:'Multi-screen concert visuals'},
  {t:'Programa Convivir', tl:'es', tag:'Documentary', href:'/programa_convivir/', img:'cards/programa_convivir.webp',
   d:'Three short documentaries about rural high school communities in Costa Rica.',
   alt:'Programa Convivir documentary series homepage'},
  {t:'Illustrations', tag:'Art', href:'/illustrations/', img:'cards/illustrations.webp',
   d:'A gallery of digital portraits, line studies and abstract pieces.',
   alt:'Four pop-art portraits in bold duotone colours'},
];

const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

// pinFavs=true: favourites first (in list order), the rest shuffled (options A-C).
// pinFavs=false: everything shuffled, but the first row (3 cards, the grid's widest) is never a favourite,
// since option D already shows the favourites in its hero.
function renderCards(el, tpl, pinFavs = true) {
  const favs = PROJECTS.filter(p => p.fav), others = shuffle(PROJECTS.filter(p => !p.fav));
  const order = pinFavs ? [...favs, ...others] : [...others.slice(0, 3), ...shuffle([...favs, ...others.slice(3)])];
  el.innerHTML = order.map((p, i) => {
    const ext = p.href.startsWith('http') ? ' target="_blank" rel="noopener"' : '';
    return tpl({...p, i, ext, src: '/img/' + p.img + '?v=2'});
  }).join('');
}
