// Portfolio page translations (the projects themselves are not translated).
// English lives in the HTML; FR / ES / PT replace [data-i18n] text and [data-i18n-html] markup.
// Language: ?lang=xx, else the visitor's last choice, else the browser language, else English.
// ponytail: languages swap in the browser (?lang=xx, with hreflang alternates in the page head); static per-language pages would help no-JS visitors and search engines if that ever matters.
const LANGS = ['en', 'fr', 'es', 'pt'];
const GRSJ = '<a href="https://grsj.arts.ubc.ca/" target="_blank" rel="noopener" data-langs="en">Institute for Gender, Race, Sexuality and Social Justice</a>';
const JW = '<a href="https://www.journeyways.ca" target="_blank" rel="noopener" data-langs="en es fr">JOURNEYWAYS</a>';

const I18N = {
  en: {
    langNames: {en: 'English', fr: 'French', es: 'Spanish', pt: 'Portuguese'}, inLang: 'This page is in',
    sending: 'Sending…', sent: 'Thank you! Your message is on its way.',
    failed: 'Something went wrong. Please try again later.', offline: 'Could not reach the server. Please check your connection and try again.',
    fave: '★ fave', tags: {}, desc: {},
  },
  fr: {
    meta: 'Portfolio d\'Adri M. : œuvres interactives, jeux, zines et applis.',
    ui: {
      strip: 'Portfolio d\'espaces liminaux', tagline: 'Art · Informatique · Communauté', tabNews: 'Nouvelles', tabWork: 'Projets', sections: 'Sections',
      band: 'Art<b>✶</b>Informatique<b>✶</b>Communauté', work: 'Projets', workNote: 'Ce que j\'ai créé',
      aboutLabel: 'À propos', about: 'À propos', aboutNote: 'La personne derrière les projets', selfPortrait: 'Autoportrait',
      byline: 'Adri M. · iel / <em class="any">tous les pronoms</em>',
      bio1: 'Je crée des œuvres interactives, des jeux, des zines et des applis, là où se rencontrent l\'art, l\'informatique et la communauté.',
      bio2: `Je suis étudiant·e à la maîtrise à l'${GRSJ} (GRSJ) de UBC. Ma recherche porte sur ${JW}, un jeu de société et un jeu numérique utilisés comme instruments de recherche pour étudier comment les personnes s'auto-identifient dans un espace de jeu narratif, sûr et collaboratif.`,
      bio3: 'Le projet a reçu la Bourse d\'études supérieures du Canada au niveau de la maîtrise (BESC M) en avril 2026 et a été sélectionné pour la Critical Play Fellowship de UBC en septembre 2025.',
      contact: 'Contact', contactNote: 'Écrivez-moi au sujet d\'un projet, d\'une collaboration ou de toute autre chose. Votre message arrive directement dans ma boîte de réception ; ce site ne le conserve pas.',
      posH: 'Positionnalité',
      pos1: 'Je suis une personne réfugiée trans/non binaire, originaire du territoire du peuple huetar (le soi-disant Costa Rica), et je vis aujourd\'hui à Vancouver. Je traverse plusieurs frontières, géographiques, culturelles et de genre, et ces traversées façonnent la perspective transdisciplinaire et décoloniale que j\'apporte à mon travail.',
      pos2: 'Mon engagement pour la justice sociale est personnel. Il est centré sur les expériences vécues des communautés en quête d\'équité, en particulier les personnes migrantes forcées et les personnes de la diversité de genre, et il se vit en communauté : j\'ai participé à l\'organisation de la Vancouver Trans March et animé des groupes de soutien entre pairs pour les personnes trans, non binaires et de la diversité de genre. Par la recherche, le militantisme et le récit, je cherche à amplifier les voix souvent laissées aux marges et à imaginer des futurs fondés sur la joie, la dignité et le soin collectif.',
      name: 'Nom', email: 'Courriel', message: 'Message', send: 'Envoyer', footer: 'Art · Informatique · Communauté',
    },
    langNames: {en: 'anglais', fr: 'français', es: 'espagnol', pt: 'portugais'}, inLang: 'Cette page est en',
    sending: 'Envoi…', sent: 'Merci ! Votre message est en route.',
    failed: 'Une erreur s\'est produite. Veuillez réessayer plus tard.', offline: 'Impossible de joindre le serveur. Vérifiez votre connexion et réessayez.',
    fave: '★ favori',
    tags: {Interactive: 'Interactif', Game: 'Jeu', App: 'Appli', Zine: 'Zine', 'Human Rights': 'Droits humains', Writing: 'Écriture', Art: 'Art', Music: 'Musique', Documentary: 'Documentaire'},
    desc: {
      'Telaris': 'Une archive décoloniale du savoir. Relationnelle, P2P, non hiérarchique. Tissée par le sens.',
      'Journeyways': 'Un jeu de société et un jeu numérique sur le devenir. Un projet de recherche de UBC qui explore l\'identité par le jeu collaboratif.',
      'Pumice': 'Annotation de PDF en local sur iPad. Les annotations à l\'Apple Pencil sont enregistrées dans le fichier, sans nuage.',
      'Tracet': 'Transcription privée et locale pour macOS. whisperX, identification des locuteurs, transcriptions modifiables. Sans nuage, sans télémétrie.',
      '¿Quién se come a quién?': 'Un jeu de cartes à imprimer sur le trope cannibale : qui mange et qui est mangé dépend du scénario. Avec un cahier de sources. En cours.',
      'She Came Down from the Mountains': 'Une archive fracturée en deux volumes. Cinq générations de femmes, des terres volées des Huetar jusqu\'à l\'Île de la Tortue.',
      'The Somatic Ghost': 'Une contre-archive du 28e cycle. Du feu liquide à la première lumière.',
      'The Ground Remains': 'Un jeu/zine à imprimer, inspiré d\'<em>Indigenomicon</em> de Jodi A. Byrd.',
      'Stories in Whispers': 'Attrapez des murmures. Créez de la poésie. Partagez. Inspiré d\'<em>Of Floating Isles</em> de Kawika Guillermo.',
      'Transphobia in Costa Rica': 'Une compilation à jour de rapports, de témoignages et d\'actualités.',
      'TransRants': 'Coups de gueule. Poésie. Essais. Pensées en mouvement.',
      'Sujeto del Inconsciente': 'Un ensemble de vidéodanse avec visuels et danse en direct.',
      'Ounces: Stemmata': 'Visuels de concert : vidéo synchronisée sur quatre écrans pour les spectacles.',
      'Programa Convivir': 'Trois courts documentaires sur des communautés d\'écoles secondaires rurales au Costa Rica.',
      'Illustrations': 'Une galerie de portraits numériques, d\'études au trait et d\'œuvres abstraites.',
    },
  },
  es: {
    meta: 'Portafolio de Adri M.: obras interactivas, juegos, zines y apps.',
    ui: {
      strip: 'Portafolio de espacios liminales', tagline: 'Arte · Computación · Comunidad', tabNews: 'Noticias', tabWork: 'Proyectos', sections: 'Secciones',
      band: 'Arte<b>✶</b>Computación<b>✶</b>Comunidad', work: 'Proyectos', workNote: 'Lo que he creado',
      aboutLabel: 'Sobre mí', about: 'Sobre mí', aboutNote: 'La persona detrás de los proyectos', selfPortrait: 'Autorretrato',
      byline: 'Adri M. · elle / <em class="any">cualquier pronombre</em>',
      bio1: 'Creo obras interactivas, juegos, zines y apps, donde se encuentran el arte, la computación y la comunidad.',
      bio2: `Soy estudiante de maestría en el ${GRSJ} (GRSJ) de UBC. Mi investigación se centra en ${JW}, un juego de mesa y un juego digital que uso como instrumentos de investigación para estudiar cómo las personas se autoidentifican en un espacio de juego narrativo, seguro y colaborativo.`,
      bio3: 'El proyecto recibió la Canada Graduate Research Scholarship: Master\'s (CGS-M) en abril de 2026 y fue seleccionado para la Critical Play Fellowship de UBC en septiembre de 2025.',
      contact: 'Contacto', contactNote: 'Escríbeme sobre un proyecto, una colaboración o cualquier otra cosa. Tu mensaje llega directamente a mi correo; este sitio no lo guarda.',
      posH: 'Posicionalidad',
      pos1: 'Soy una persona refugiada trans/no binaria, de la tierra del pueblo huetar (la llamada Costa Rica), y hoy vivo en Vancouver. Atravieso múltiples fronteras, geográficas, culturales y de género, y ese tránsito moldea la perspectiva transdisciplinaria y decolonial que traigo a mi trabajo.',
      pos2: 'Mi compromiso con la justicia social es personal. Se centra en las experiencias vividas de las comunidades que buscan equidad, en particular las personas migrantes forzadas y las personas de género diverso, y se sostiene en comunidad: he sido parte de la organización de la Vancouver Trans March y he facilitado grupos de apoyo entre pares para personas trans, no binarias y de género diverso. A través de la investigación, el activismo y la narración, busco amplificar las voces que suelen quedar en los márgenes e imaginar futuros basados en la alegría, la dignidad y el cuidado colectivo.',
      name: 'Nombre', email: 'Correo electrónico', message: 'Mensaje', send: 'Enviar mensaje', footer: 'Arte · Computación · Comunidad',
    },
    langNames: {en: 'inglés', fr: 'francés', es: 'español', pt: 'portugués'}, inLang: 'Esta página está en',
    sending: 'Enviando…', sent: '¡Gracias! Tu mensaje va en camino.',
    failed: 'Algo salió mal. Inténtalo de nuevo más tarde.', offline: 'No se pudo conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.',
    fave: '★ favorito',
    tags: {Interactive: 'Interactivo', Game: 'Juego', App: 'App', Zine: 'Zine', 'Human Rights': 'Derechos humanos', Writing: 'Escritura', Art: 'Arte', Music: 'Música', Documentary: 'Documental'},
    desc: {
      'Telaris': 'Un archivo decolonial de saberes. Relacional, P2P, no jerárquico. Tejido por el sentido.',
      'Journeyways': 'Un juego de mesa y un juego digital sobre el devenir. Un proyecto de investigación de UBC que explora la identidad a través del juego colaborativo.',
      'Pumice': 'Anotación de PDF local en iPad. Las marcas del Apple Pencil se guardan en el propio archivo, sin nube.',
      'Tracet': 'Transcripción privada y local para macOS. whisperX, identificación de hablantes, transcripciones editables. Sin nube, sin telemetría.',
      '¿Quién se come a quién?': 'Un juego de cartas para imprimir sobre el tropo caníbal: quién come y quién es comido depende del escenario. Con un cuaderno de fuentes. Trabajo en curso.',
      'She Came Down from the Mountains': 'Un archivo fracturado en dos volúmenes. Cinco generaciones de mujeres, desde la tierra robada de los huetares hasta Isla Tortuga.',
      'The Somatic Ghost': 'Un contraarchivo del ciclo 28. Del fuego líquido a la primera luz.',
      'The Ground Remains': 'Un juego/zine para imprimir y jugar, inspirado en <em>Indigenomicon</em> de Jodi A. Byrd.',
      'Stories in Whispers': 'Atrapa susurros. Crea poesía. Comparte. Inspirado en <em>Of Floating Isles</em> de Kawika Guillermo.',
      'Transphobia in Costa Rica': 'Una recopilación actualizada de informes, historias y noticias.',
      'TransRants': 'Diatribas. Poesía. Ensayos. Pensamientos en movimiento.',
      'Sujeto del Inconsciente': 'Un ensamble de videodanza con visuales y danza en vivo.',
      'Ounces: Stemmata': 'Visuales para conciertos: video sincronizado en cuatro pantallas para presentaciones en vivo.',
      'Programa Convivir': 'Tres cortometrajes documentales sobre comunidades de colegios rurales en Costa Rica.',
      'Illustrations': 'Una galería de retratos digitales, estudios de línea y piezas abstractas.',
    },
  },
  pt: {
    meta: 'Portfólio de Adri M.: obras interativas, jogos, zines e apps.',
    ui: {
      strip: 'Portfólio de espaços liminares', tagline: 'Arte · Computação · Comunidade', tabNews: 'Notícias', tabWork: 'Projetos', sections: 'Seções',
      band: 'Arte<b>✶</b>Computação<b>✶</b>Comunidade', work: 'Projetos', workNote: 'O que eu criei',
      aboutLabel: 'Sobre mim', about: 'Sobre mim', aboutNote: 'A pessoa por trás dos projetos', selfPortrait: 'Autorretrato',
      byline: 'Adri M. · elu / <em class="any">qualquer pronome</em>',
      bio1: 'Crio obras interativas, jogos, zines e apps, onde se encontram a arte, a computação e a comunidade.',
      bio2: `Sou estudante de mestrado no ${GRSJ} (GRSJ) da UBC. Minha pesquisa se concentra em ${JW}, um jogo de tabuleiro e um jogo digital usados como instrumentos de pesquisa para estudar como as pessoas se autoidentificam em um espaço de jogo narrativo, seguro e colaborativo.`,
      bio3: 'O projeto recebeu a Canada Graduate Research Scholarship: Master\'s (CGS-M) em abril de 2026 e foi selecionado para a Critical Play Fellowship da UBC em setembro de 2025.',
      contact: 'Contato', contactNote: 'Escreva para mim sobre um projeto, uma colaboração ou qualquer outra coisa. Sua mensagem vai direto para a minha caixa de entrada; este site não a guarda.',
      posH: 'Posicionalidade',
      pos1: 'Sou uma pessoa refugiada trans/não binária, da terra do povo huetar (a chamada Costa Rica), e hoje vivo em Vancouver. Atravesso múltiplas fronteiras, geográficas, culturais e de gênero, e essa travessia molda a perspectiva transdisciplinar e decolonial que trago para o meu trabalho.',
      pos2: 'Meu compromisso com a justiça social é pessoal. Ele se centra nas experiências vividas de comunidades que buscam equidade, em especial pessoas migrantes forçadas e pessoas de gênero diverso, e se sustenta em comunidade: participei da organização da Vancouver Trans March e facilitei grupos de apoio entre pares para pessoas trans, não binárias e de gênero diverso. Por meio da pesquisa, do ativismo e da narrativa, busco amplificar vozes que costumam ficar nas margens e imaginar futuros baseados na alegria, na dignidade e no cuidado coletivo.',
      name: 'Nome', email: 'E-mail', message: 'Mensagem', send: 'Enviar mensagem', footer: 'Arte · Computação · Comunidade',
    },
    langNames: {en: 'inglês', fr: 'francês', es: 'espanhol', pt: 'português'}, inLang: 'Esta página está em',
    sending: 'Enviando…', sent: 'Agradeço! Sua mensagem está a caminho.',
    failed: 'Algo deu errado. Tente novamente mais tarde.', offline: 'Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.',
    fave: '★ favorito',
    tags: {Interactive: 'Interativo', Game: 'Jogo', App: 'App', Zine: 'Zine', 'Human Rights': 'Direitos humanos', Writing: 'Escrita', Art: 'Arte', Music: 'Música', Documentary: 'Documentário'},
    desc: {
      'Telaris': 'Um arquivo decolonial de saberes. Relacional, P2P, não hierárquico. Tecido pelo sentido.',
      'Journeyways': 'Um jogo de tabuleiro e um jogo digital sobre o devir. Um projeto de pesquisa da UBC que explora a identidade por meio do jogo colaborativo.',
      'Pumice': 'Anotação de PDF local no iPad. As marcações do Apple Pencil são gravadas no próprio arquivo, sem nuvem.',
      'Tracet': 'Transcrição privada e local para macOS. whisperX, identificação de falantes, transcrições editáveis. Sem nuvem, sem telemetria.',
      '¿Quién se come a quién?': 'Um jogo de cartas para imprimir sobre o tropo canibal: quem come e quem é comido depende do cenário. Com um caderno de fontes. Em andamento.',
      'She Came Down from the Mountains': 'Um arquivo fraturado em dois volumes. Cinco gerações de mulheres, da terra roubada dos Huetar até a Ilha da Tartaruga.',
      'The Somatic Ghost': 'Um contra-arquivo do 28º ciclo. Do fogo líquido à primeira luz.',
      'The Ground Remains': 'Um jogo/zine para imprimir e jogar, inspirado em <em>Indigenomicon</em>, de Jodi A. Byrd.',
      'Stories in Whispers': 'Pegue sussurros. Crie poesia. Compartilhe. Inspirado em <em>Of Floating Isles</em>, de Kawika Guillermo.',
      'Transphobia in Costa Rica': 'Uma compilação atualizada de relatórios, histórias e notícias.',
      'TransRants': 'Desabafos. Poesia. Ensaios. Pensamentos em movimento.',
      'Sujeto del Inconsciente': 'Um conjunto de videodança com visuais e dança ao vivo.',
      'Ounces: Stemmata': 'Visuais para shows: vídeo sincronizado em quatro telas para apresentações ao vivo.',
      'Programa Convivir': 'Três curtas documentais sobre comunidades de escolas de ensino médio rurais na Costa Rica.',
      'Illustrations': 'Uma galeria de retratos digitais, estudos de linha e peças abstratas.',
    },
  },
};

// News labels, translated image descriptions, and the news page. Merged into I18N below.
const MORE = {
  en: {
    kinds: {release: 'Release', award: 'Award', lecture: 'Lecture', event: 'Event', start: 'Milestone'},
    alt: {},
  },
  fr: {
    kinds: {release: 'Lancement', award: 'Prix', lecture: 'Conférence', event: 'Événement', start: 'Jalon'},
    ui: {skip: 'Aller au contenu', homeLabel: 'Polivoxia, accueil', news: 'Dernières nouvelles', newsAll: 'Toutes les nouvelles', newsTitle: 'Nouvelles',
      newsIntro: 'Lancements, prix et événements de mes projets, du plus récent au plus ancien.', back: 'Retour à l\'accueil', gallery: 'Galerie d\'illustrations',
      altMe: 'Autoportrait au pochoir d\'Adri M.', altAbstract: 'Autoportrait abstrait d\'Adri M. : des vrilles indigo foncé et bleu cobalt qui s\'enroulent sur un fond bleu glacier pâle.',
      altPortrait: 'Autoportrait illustré d\'Adri M. façon pochoir, sur des bandes diagonales pastel jaune, blanche, lavande et anthracite, les couleurs du drapeau de la fierté non binaire.'},
    alt: {
      'Telaris': 'Page d\'accueil de Telaris : le logotype TELARIS sur un ciel étoilé sombre, avec une constellation lumineuse de nœuds reliés',
      'Journeyways': 'Page d\'accueil de Journeyways : le titre en lettres cursives jaunes à côté d\'un labyrinthe circulaire sur un lavis d\'aquarelle arc-en-ciel',
      'Pumice': 'L\'icône de l\'appli Pumice, une pierre ponce stylisée sur fond anthracite',
      'Tracet': 'Page d\'accueil de Tracet avec une icône de forme d\'onde et des boutons de téléchargement',
      '¿Quién se come a quién?': 'Le titre du jeu à côté de trois cartes superposées : une carte de scénario noire, une carte de personnage crème et une carte d\'appétit rouge, entre deux rangées de dents rouges',
      'She Came Down from the Mountains': 'Couverture du zine : titre à empattements sur des bandes topographiques noires, rouille et bleu ardoise',
      'The Somatic Ghost': 'Couverture du zine : titre gras en machine à écrire sur un fond sombre et rayé',
      'The Ground Remains': 'Le plateau et la carte du jeu The Ground Remains',
      'Stories in Whispers': 'Interface du jeu Stories in Whispers, où l\'on attrape des murmures pour composer des poèmes',
      'Transphobia in Costa Rica': 'Site de documentation Transphobia in Costa Rica aux couleurs du drapeau costaricien',
      'TransRants': 'Page d\'accueil du blogue d\'écriture TransRants',
      'Sujeto del Inconsciente': 'Image d\'une représentation avec visuels en direct et danse',
      'Ounces: Stemmata': 'Visuels de concert sur plusieurs écrans',
      'Programa Convivir': 'Page d\'accueil de la série documentaire Programa Convivir',
      'Illustrations': 'Quatre portraits pop art en bichromie vive',
    },
  },
  es: {
    kinds: {release: 'Lanzamiento', award: 'Premio', lecture: 'Charla', event: 'Evento', start: 'Hito'},
    ui: {skip: 'Saltar al contenido', homeLabel: 'Polivoxia, inicio', news: 'Últimas noticias', newsAll: 'Todas las noticias', newsTitle: 'Noticias',
      newsIntro: 'Lanzamientos, premios y eventos de mis proyectos, del más reciente al más antiguo.', back: 'Volver al inicio', gallery: 'Galería de ilustraciones',
      altMe: 'Autorretrato en esténcil de Adri M.', altAbstract: 'Autorretrato abstracto de Adri M.: zarcillos índigo oscuro y azul cobalto que se enroscan sobre un fondo azul hielo pálido.',
      altPortrait: 'Autorretrato ilustrado de Adri M. en estilo esténcil, sobre franjas diagonales pastel amarilla, blanca, lavanda y gris carbón, los colores de la bandera del orgullo no binario.'},
    alt: {
      'Telaris': 'Página de inicio de Telaris: el logotipo TELARIS sobre un cielo estrellado oscuro con una constelación luminosa de nodos enlazados',
      'Journeyways': 'Página de inicio de Journeyways: el título en letra cursiva amarilla junto a un laberinto circular sobre una aguada de acuarela arcoíris',
      'Pumice': 'El ícono de la app Pumice, una piedra pómez estilizada sobre fondo gris carbón',
      'Tracet': 'Página de inicio de Tracet con un ícono de forma de onda y botones de descarga',
      '¿Quién se come a quién?': 'El título del juego junto a tres cartas superpuestas: un escenario negro, un personaje color hueso y un apetito rojo, entre dos hileras de dientes rojos',
      'She Came Down from the Mountains': 'Portada del zine: título con serifas sobre franjas topográficas en negro, óxido y azul pizarra',
      'The Somatic Ghost': 'Portada del zine: título en negrita de máquina de escribir sobre un fondo oscuro y rayado',
      'The Ground Remains': 'El tablero y el mapa del juego The Ground Remains',
      'Stories in Whispers': 'Interfaz del juego Stories in Whispers, donde se atrapan susurros para armar poemas',
      'Transphobia in Costa Rica': 'Sitio de documentación Transphobia in Costa Rica con los colores de la bandera costarricense',
      'TransRants': 'Página de inicio del blog de escritura TransRants',
      'Sujeto del Inconsciente': 'Fotograma de una función con visuales en vivo y danza',
      'Ounces: Stemmata': 'Visuales de concierto en varias pantallas',
      'Programa Convivir': 'Página de inicio de la serie documental Programa Convivir',
      'Illustrations': 'Cuatro retratos pop art en bitono de colores intensos',
    },
  },
  pt: {
    kinds: {release: 'Lançamento', award: 'Prêmio', lecture: 'Palestra', event: 'Evento', start: 'Marco'},
    ui: {skip: 'Pular para o conteúdo', homeLabel: 'Polivoxia, início', news: 'Últimas notícias', newsAll: 'Todas as notícias', newsTitle: 'Notícias',
      newsIntro: 'Lançamentos, prêmios e eventos dos meus projetos, do mais recente ao mais antigo.', back: 'Voltar ao início', gallery: 'Galeria de ilustrações',
      altMe: 'Autorretrato em estêncil de Adri M.', altAbstract: 'Autorretrato abstrato de Adri M.: gavinhas em índigo escuro e azul-cobalto que se enrolam sobre um fundo azul-gelo claro.',
      altPortrait: 'Autorretrato ilustrado de Adri M. em estilo estêncil, sobre faixas diagonais em tons pastel de amarelo, branco, lavanda e grafite, as cores da bandeira do orgulho não binário.'},
    alt: {
      'Telaris': 'Página inicial de Telaris: o logotipo TELARIS sobre um céu estrelado escuro, com uma constelação luminosa de nós interligados',
      'Journeyways': 'Página inicial de Journeyways: o título em letra cursiva amarela ao lado de um labirinto circular sobre uma aguada de aquarela arco-íris',
      'Pumice': 'O ícone do app Pumice, uma pedra-pomes estilizada sobre fundo grafite',
      'Tracet': 'Página inicial do Tracet com um ícone de forma de onda e botões de download',
      '¿Quién se come a quién?': 'O título do jogo ao lado de três cartas sobrepostas: um cenário preto, um personagem cor de osso e um apetite vermelho, entre duas fileiras de dentes vermelhos',
      'She Came Down from the Mountains': 'Capa do zine: título com serifa sobre faixas topográficas em preto, ferrugem e azul-ardósia',
      'The Somatic Ghost': 'Capa do zine: título em negrito de máquina de escrever sobre um fundo escuro e riscado',
      'The Ground Remains': 'O tabuleiro e o mapa do jogo The Ground Remains',
      'Stories in Whispers': 'Interface do jogo Stories in Whispers, onde se pegam sussurros para montar poemas',
      'Transphobia in Costa Rica': 'Site de documentação Transphobia in Costa Rica nas cores da bandeira da Costa Rica',
      'TransRants': 'Página inicial do blog de escrita TransRants',
      'Sujeto del Inconsciente': 'Imagem de uma apresentação com visuais ao vivo e dança',
      'Ounces: Stemmata': 'Visuais de show em várias telas',
      'Programa Convivir': 'Página inicial da série documental Programa Convivir',
      'Illustrations': 'Quatro retratos pop art em duotone de cores fortes',
    },
  },
};
const HIGHLIGHT = {en: 'Highlight', fr: 'À la une', es: 'Destacado', pt: 'Destaque'};
for (const l of LANGS) { const m = MORE[l]; I18N[l].kinds = m.kinds; I18N[l].alt = m.alt; I18N[l].highlight = HIGHLIGHT[l]; if (m.ui) Object.assign(I18N[l].ui, m.ui); }

function pickLang() {
  const q = new URLSearchParams(location.search).get('lang');
  if (LANGS.includes(q)) { try { localStorage.setItem('pv-lang', q); } catch {} return q; }
  try { const s = localStorage.getItem('pv-lang'); if (LANGS.includes(s)) return s; } catch {}
  for (const l of navigator.languages || [navigator.language || 'en']) { const b = l.slice(0, 2).toLowerCase(); if (LANGS.includes(b)) return b; }
  return 'en';
}
const LANG = pickLang();
const T = I18N[LANG];

// "EN · ES" tag for a link whose page isn't available in the current language; '' when it is.
function langTag(langs) {
  langs = langs || ['en'];
  if (langs.includes(LANG)) return '';
  const names = langs.map(l => T.langNames[l]).join(', ');
  return `<span class="lang-tag" title="${T.inLang} ${names}"><span aria-hidden="true">${langs.map(l => l.toUpperCase()).join(' · ')}</span><span class="sr-only"> (${T.inLang} ${names})</span></span>`;
}

// Translate the static page, the project data, and the language switcher.
function applyI18n() {
  document.documentElement.lang = LANG;
  if (T.ui) {
    document.querySelectorAll('[data-i18n]').forEach(el => { const v = T.ui[el.dataset.i18n]; if (v) el.textContent = v; });
    document.querySelectorAll('[data-i18n-html]').forEach(el => { const v = T.ui[el.dataset.i18nHtml]; if (v) el.innerHTML = v; });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => { const v = T.ui[el.dataset.i18nAria]; if (v) el.setAttribute('aria-label', v); });
    document.querySelectorAll('[data-i18n-alt]').forEach(el => { const v = T.ui[el.dataset.i18nAlt]; if (v) el.alt = v; });
    document.querySelector('meta[name="description"]')?.setAttribute('content', T.meta);
  }
  if (typeof PROJECTS !== 'undefined') PROJECTS.forEach(p => { p.d = T.desc[p.t] || p.d; p.tag = T.tags[p.tag] || p.tag; p.alt = T.alt[p.t] || p.alt; });
  // links with a page in the current language: data-href-es / -fr / -pt
  document.querySelectorAll('a').forEach(a => { const h = a.dataset['href' + LANG[0].toUpperCase() + LANG[1]]; if (h) a.href = h; });
  document.querySelectorAll('a[data-langs]').forEach(a => a.insertAdjacentHTML('beforeend', langTag(a.dataset.langs.split(' '))));
  document.querySelectorAll('.lang-switch a').forEach(a => { if (a.hreflang === LANG) a.setAttribute('aria-current', 'true'); });
}

// News: [{date:'2026-11', project, kind, href:{lang:url}, title:{lang}, text:{lang}}], newest first.
// Text falls back to English; the link goes to the current language's page when the project has one, else gets a language tag.
async function loadNews() {
  try { const r = await fetch('/assets/news.json?v=3'); return r.ok ? await r.json() : []; } catch { return []; }
}
function newsDate(ym) {
  if (!ym.includes('-')) return ym; // year-only items
  const [y, m] = ym.split('-').map(Number);
  return new Intl.DateTimeFormat(LANG, {month: 'short', year: 'numeric', timeZone: 'UTC'}).format(Date.UTC(y, m - 1, 1));
}
function newsLink(e) {
  const href = e.href[LANG] || e.href.en || Object.values(e.href)[0];
  if (!href) return null; // items without a page
  const ext = href.startsWith('http') ? ' target="_blank" rel="noopener"' : '';
  return {href, ext, tag: e.href[LANG] ? '' : langTag(Object.keys(e.href))};
}
const pick = (o) => o[LANG] || o.en;

// The homepage list: the newest `n` items, but highlighted items are always included (they replace the oldest ordinary ones); date order is kept.
function newsForHome(items, n) {
  const keep = new Set(items.filter(e => e.highlight));
  for (const e of items) { if (keep.size >= n) break; keep.add(e); }
  return items.filter(e => keep.has(e));
}
const hlBadge = e => e.highlight ? `<span class="hl-badge"><span aria-hidden="true">★ </span>${T.highlight}</span>` : '';
