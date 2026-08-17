import { SubjectMeta, Lesson, Exercise, Quiz, BacPaper, MenArticle, SubjectId, Level, Series, OnlineCourse, TeacherProfile } from '../types';

export const SUBJECTS: SubjectMeta[] = [
  {
    id: 'maths',
    nameMg: 'Siansa Ara-pamaritana (Mathématiques)',
    nameFr: 'Mathématiques',
    icon: 'Calculator',
    color: 'bg-blue-600 text-white',
    coefficientDefault: 5
  },
  {
    id: 'physique',
    nameMg: 'L fizika sy Simia (Physique-Chimie)',
    nameFr: 'Physique-Chimie',
    icon: 'Atom',
    color: 'bg-indigo-600 text-white',
    coefficientDefault: 4
  },
  {
    id: 'svt',
    nameMg: 'Siansa momba ny Aina sy ny Tany (SVT)',
    nameFr: 'Sciences de la Vie et de la Terre',
    icon: 'Dna',
    color: 'bg-emerald-600 text-white',
    coefficientDefault: 4
  },
  {
    id: 'malagasy',
    nameMg: 'Teny sy Haitsoratra Malagasy',
    nameFr: 'Langue & Littérature Malgache',
    icon: 'BookOpen',
    color: 'bg-amber-600 text-white',
    coefficientDefault: 3
  },
  {
    id: 'francais',
    nameMg: 'Teny Frantsay (Français)',
    nameFr: 'Français',
    icon: 'Languages',
    color: 'bg-rose-600 text-white',
    coefficientDefault: 3
  },
  {
    id: 'philo',
    nameMg: 'Filozofia (Philosophie)',
    nameFr: 'Philosophie',
    icon: 'Brain',
    color: 'bg-purple-600 text-white',
    coefficientDefault: 4
  },
  {
    id: 'histogeo',
    nameMg: 'Tantara sy Jeografia (Histoire-Géo)',
    nameFr: 'Histoire-Géographie',
    icon: 'Globe',
    color: 'bg-orange-600 text-white',
    coefficientDefault: 3
  },
  {
    id: 'anglais',
    nameMg: 'Teny Anglezo (Anglais)',
    nameFr: 'Anglais',
    icon: 'Globe2',
    color: 'bg-teal-600 text-white',
    coefficientDefault: 2
  },
  {
    id: 'ses',
    nameMg: 'Siansa Ara-toekarena sy Ara-tsosialy (SES)',
    nameFr: 'Sciences Économiques et Sociales',
    icon: 'TrendingUp',
    color: 'bg-cyan-600 text-white',
    coefficientDefault: 6
  },
  {
    id: 'eps',
    nameMg: 'Fanabeazana Ara-batana sy Fanatanjahantena (EPS)',
    nameFr: 'Éducation Physique et Sportive',
    icon: 'Activity',
    color: 'bg-lime-600 text-white',
    coefficientDefault: 2
  }
];

// Official Coefficient Matrix for Terminale (L, OSE, S) supplied as product configuration (Total = 32 for each)
export const TERMINALE_SERIES_COEFFICIENTS: Record<'L' | 'OSE' | 'S', Record<SubjectId, number>> = {
  L: {
    malagasy: 6,
    francais: 5,
    anglais: 5,
    philo: 5,
    histogeo: 4,
    ses: 2,
    eps: 2,
    maths: 1,
    physique: 1,
    svt: 1
  },
  OSE: {
    ses: 6,
    histogeo: 6,
    maths: 5,
    malagasy: 3,
    francais: 3,
    philo: 3,
    anglais: 2,
    eps: 2,
    physique: 1,
    svt: 1
  },
  S: {
    maths: 6,
    physique: 6,
    svt: 6,
    malagasy: 3,
    francais: 2,
    anglais: 2,
    histogeo: 2,
    philo: 2,
    eps: 2,
    ses: 1
  }
};

// Helper to get coefficient for a subject in a given level and series
export function getSubjectCoefficient(subjectId: SubjectId, level: Level, series: Series): number {
  if (level === 'Terminale') {
    if (series === 'L' || series === 'OSE' || series === 'S') {
      return TERMINALE_SERIES_COEFFICIENTS[series][subjectId] ?? 1;
    }
  }
  const subject = SUBJECTS.find(s => s.id === subjectId);
  return subject ? subject.coefficientDefault : 1;
}

// Subjects list for BEPC (3ème)
export const BEPC_SUBJECT_IDS: SubjectId[] = [
  'malagasy',
  'francais',
  'anglais',
  'histogeo',
  'maths',
  'physique',
  'svt',
  'eps'
];

export const INITIAL_LESSONS: Lesson[] = [
  {
    id: 'les-math-1',
    level: 'Terminale',
    seriesList: ['C', 'D', 'S'],
    subjectId: 'maths',
    chapterId: 'chap-fonctions',
    chapterTitle: 'Toko 1: Ny Fiana-kery (Étude de Fonctions et Dérivées)',
    chapterTitleFr: 'Chapitre 1: Étude de Fonctions & Dérivées',
    title: 'Ny Dérivée sy ny fampiasana azy (La Dérivée et ses Applications)',
    titleFr: 'La Dérivée et ses Applications',
    estimatedMinutes: 45,
    content: {
      introduction: 'Ny dérivée dia fitaovana matematika lehibe enti-mandrefy ny fiovan\'ny fiana-kery f(x) eo amin\'ny teboka iray x₀. Ampiasaina amin\'ny fizika sy ekonomia ary siansa maro izy.',
      objectives: [
        'Mahalala ny raikipohy fototry ny dérivée.',
        'Mahafehy ny fikajiana ny dérivée amin\'ny fampitomboana (u×v) sy fizarana (u/v).',
        'Mahafantatra ny fipetraky ny fiana-kery miakatra na midina araka ny famantarana ny f\'(x).'
      ],
      definitions: [
        {
          term: 'Dérivée en un point x₀',
          explanation: 'f\'(x₀) = lim (x→x₀) [f(x) - f(x₀)] / (x - x₀). Raha misy io fetra io ary isa voafetra, dia antsoina hoe dérivale eo amin\'ny x₀ ny f.'
        },
        {
          term: 'Tangente au graphe',
          explanation: 'Ny fampitoviana ny fizotran\'ny tanjanta eo amin\'ny A(x₀, f(x₀)) dia: y = f\'(x₀)(x - x₀) + f(x₀).'
        }
      ],
      formulas: [
        { name: 'Power rule (xⁿ)', formula: '(xⁿ)\' = n · xⁿ⁻¹', explanation: 'Raha n ∈ ℝ*' },
        { name: 'Product rule (u × v)', formula: '(u · v)\' = u\'v + uv\'', explanation: 'Dérivée d\'un produit de deux fonctions.' },
        { name: 'Quotient rule (u / v)', formula: '(u / v)\' = (u\'v - uv\') / v²', explanation: 'Raha v(x) ≠ 0.' },
        { name: 'Composite rule f(g(x))', formula: '(g(u))\' = u\' · g\'(u)', explanation: 'Dérivée d\'une fonction composée.' }
      ],
      examples: [
        {
          title: 'Ohatra 1: f(x) = 3x³ - 5x² + 2x - 7',
          description: 'f\'(x) = 3(3x²) - 5(2x) + 2(1) - 0 = 9x² - 10x + 2.'
        },
        {
          title: 'Ohatra 2: Tangente pour g(x) = x² en x₀ = 2',
          description: 'g(2) = 4, g\'(x) = 2x, ka g\'(2) = 4. Ny tanjanta dia y = 4(x - 2) + 4 = 4x - 4.'
        }
      ],
      mainText: `Amin'ny kilasy Terminale S/C/D, ny fifehezana ny dérivée dia fototra amin'ny fandalinana ny tableau de variations sy ny curve C_f.
Raha f'(x) > 0 eo amin'ny intervaI I, dia miakatra (strictement croissante) ny f eo amin'ny I.
Raha f'(x) < 0 eo amin'ny intervaI I, dia midina (strictement décroissante) ny f eo amin'ny I.
Raha f'(x) = 0 eo amin'ny x₀, dia mety ho extrema local (maximum na minimum) izany.`,
      summary: 'Fehiny: Fikajiana f\'(x) -> Fandinihana ny famantarana (+ na -) -> Tableau de variations -> Sarin-davitra C_f.'
    }
  },
  {
    id: 'les-math-2',
    level: 'Terminale',
    seriesList: ['A', 'L', 'OSE'],
    subjectId: 'maths',
    chapterId: 'chap-stats',
    chapterTitle: 'Toko 2: Antontan-isa sy Statitika (Statistiques & Probabilités)',
    chapterTitleFr: 'Chapitre 2: Statistiques et Probabilités',
    title: 'Kajy ny Probabilité sy hazo mety hitranga (Probabilités simples et conditionnelles)',
    titleFr: 'Probabilités et Arbre de Choix',
    estimatedMinutes: 35,
    content: {
      introduction: 'Ny Probabilité dia sampam-pahaizana matematika mandrefy ny fahafahana hitrangan\'ny zavatra iray (événement).',
      objectives: [
        'Kajy ny P(A) = (Nomery ny tranga mahomby) / (Nomery ny tranga rehetra possible).',
        'Mampiasa ny hazo (Arbre pondéré).',
        'Kajy ny Probabilité conditionnelle P_B(A).'
      ],
      definitions: [
        {
          term: 'Univers (Ω)',
          explanation: 'Ny fitambaran\'ny tranga rehetra mety hitranga amin\'ny traikefa iray.'
        },
        {
          term: 'Événement contraire Ā',
          explanation: 'P(Ā) = 1 - P(A).'
        }
      ],
      formulas: [
        { name: 'Probabilité equiprobable', formula: 'P(A) = Card(A) / Card(Ω)' },
        { name: 'Union d\'événements', formula: 'P(A ∪ B) = P(A) + P(B) - P(A ∩ B)' }
      ],
      examples: [
        {
          title: 'Ohatra: Tora-dasy mandeha amin\'ny x-1 hatramin\'ny 6',
          description: 'Probabilité hahazoana isa mpana (2, 4, 6): P(A) = 3/6 = 1/2.'
        }
      ],
      mainText: 'Raha mahazo probabilité ambonin\'ny 1 ianao na ambanin\'ny 0 dia misy diso ny kajy nataonao!',
      summary: '0 ≤ P(A) ≤ 1 foana ny valiny.'
    }
  },
  {
    id: 'les-phys-1',
    level: 'Terminale',
    seriesList: ['C', 'D', 'S'],
    subjectId: 'physique',
    chapterId: 'chap-meca',
    chapterTitle: 'Toko 1: Mekanika sy Hery (Mécanique de Newton)',
    chapterTitleFr: 'Chapitre 1: Lois de Newton & Mouvement',
    title: 'Ny Lalàna faharoan\'i Newton sy ny fizotry ny Vatana (Deuxième loi de Newton)',
    titleFr: 'Deuxième Loi de Newton & Applications',
    estimatedMinutes: 50,
    content: {
      introduction: 'Ny lalàna faharoan\'i Newton dia milaza fa ny fitambaran\'ny hery mampihatra amin\'ny vatana iray dia mitovy amin\'ny lanja ampitomboina amin\'ny acceleration (∑ F = m · a).',
      objectives: [
        'Mamintina ny hery mihatra amina vatana (Poids, Réaction, Frottement).',
        'Mampiasa ny rafitra Repère de projection.',
        'Mametraka ny équations différentielles du mouvement.'
      ],
      definitions: [
        { term: 'Vecteur Accélération a⃗', explanation: 'a⃗ = d v⃗ / dt = d² r⃗ / dt².' },
        { term: 'Force de Pesanteur P⃗', explanation: 'P⃗ = m · g⃗ (zotran-damba mankany ambany).' }
      ],
      formulas: [
        { name: '2è Loi de Newton', formula: '∑ F⃗_ext = m · a⃗' }
      ],
      examples: [
        {
          title: 'Chute libre sans frottement',
          description: 'a = g. Ny hafainganam-pandeha dia v(t) = g·t + v₀.'
        }
      ],
      mainText: 'Mila mifidy Repère mazava foana alohan\'ny hanaovana projection amin\'ny axes Ox sy Oy.',
      summary: '∑ F⃗ = m a⃗ dia ny andry lehiben\'ny Mekanika ao amin\'ny BAC Malagasy.'
    }
  },
  {
    id: 'les-svt-1',
    level: 'Terminale',
    seriesList: ['D', 'S'],
    subjectId: 'svt',
    chapterId: 'chap-genetique',
    chapterTitle: 'Toko 1: Jenetika sy ny ADN (Génétique Humaine et Hérédité)',
    chapterTitleFr: 'Chapitre 1: Génétique Humaine',
    title: 'Ny ADN sy ny Synthèse des Protéines (L\'ADN et la Traduction)',
    titleFr: 'ADN, Transcriptions et Protéines',
    estimatedMinutes: 40,
    content: {
      introduction: 'Ny ADN no mitahiry ny fampahalalana jenetika rehetra amin\'ny zavamananaina. Amin\'ny alalan\'ny ARNm no ampitana izany ho lasa protide.',
      objectives: [
        'Mahalala ny firafitry ny ADN (A, T, C, G).',
        'Mifindra amin\'ny ADN mankany amin\'ny ARNm sy ny Acides Aminés.',
        'Mahafehy ny code génétique.'
      ],
      definitions: [
        { term: 'Codon', explanation: 'Maitso-tsoratra 3 amin\'ny ARNm mamaritra acid aminé iray.' },
        { term: 'Transcription', explanation: 'Mifidy ny brin transcrit an\'ny ADN mba hahazoana ARNm ao anaty noyau.' }
      ],
      formulas: [
        { name: 'Appariement des bases', formula: 'ADN: A-T, C-G | ARNm: A-U, C-G' }
      ],
      examples: [
        {
          title: 'ADN Brin transcrit: TAC - GGC - ATT',
          description: 'ARNm: AUG - CCG - UAA. Protéine: Méthionine - Proline - STOP.'
        }
      ],
      mainText: 'SDF ao amin\'ny SVT Terminale D ny famahana olana momba ny génétique médicale sy arborescence généalogique.',
      summary: 'ADN -> ARNm (Transcription) -> Protéine (Traduction).'
    }
  },
  {
    id: 'les-malagasy-1',
    level: 'Terminale',
    seriesList: ['A', 'C', 'D', 'L', 'S', 'OSE'],
    subjectId: 'malagasy',
    chapterId: 'chap-kabary',
    chapterTitle: 'Toko 1: Ny Kabary sy ny Soatoavina Malagasy',
    chapterTitleFr: 'Chapitre 1: Le Kabary traditionnel',
    title: 'Ny Firafitry ny Kabary Malagasy am-panambadiana',
    titleFr: 'Structure du Kabary Malgache',
    estimatedMinutes: 30,
    content: {
      introduction: 'Ny Kabary dia haikanto am-bava Malagasy ampiasaina amin\'ny fomba amam-panao maro toy ny vodiondry, ala-sady, ary famadihana.',
      objectives: [
        'Mahafantatra ny dingana lehibe amin\'ny kabary.',
        'Mahafehy ny fialan-tsiny sy ny fisaorana amin\'ny tompon-draharaha.',
        'Mahalala ny ohabolana mifanaraka amin\'ny fotoana.'
      ],
      definitions: [
        { term: 'Afindrafindra', explanation: 'Ny fahaiza-mandahatra teny am-pahatsorana sy am-panajana.' },
        { term: 'Mbamin\'ny Fialan-tsiny', explanation: 'Dingana tsy maintsy atao alohan\'ny hidirana amin\'ny votoatiny.' }
      ],
      examples: [
        {
          title: 'Ohabolana fialan-tsiny',
          description: '"Manao kankana latsaka an-dranombary, ka ny kely indray no manakorontana ny be."'
        }
      ],
      mainText: 'Ny teny Malagasy ao amin\'ny BAC dia mitaky fikajiana fahaiza-mampiasa rafitry ny teny sy fifehezana ny haitsoratra ary ny soatoavina.',
      summary: 'Fidirana -> Fialan-tsiny -> Votoatiny -> Fehiny sy Tahiry.'
    }
  },
  {
    id: 'les-histogeo-ose-h1',
    level: 'Terminale',
    seriesList: ['OSE', 'A', 'Toutes'],
    subjectId: 'histogeo',
    chapterId: 'chap-hist-rel-int',
    chapterTitle: 'Toko 1 (Histoire): Ny Mifandraika amin\'ny Firenena sy ny Ady Mangatsiaka (1945-1991)',
    chapterTitleFr: 'Chapitre 1: Les Relations Internationales de 1945 à nos jours',
    title: 'La Guerre Froide, la Bipolarisation et la Fin du Bloc Soviétique (1947-1991)',
    titleFr: 'La Guerre Froide et la Bipolarisation du Monde',
    estimatedMinutes: 50,
    content: {
      introduction: 'Après le bilan désastreux de la Seconde Guerre Mondiale (plus de 60 millions de morts, destruction de l\'Europe et utilisation de la bombe atomique à Hiroshima et Nagasaki), le monde entre dans une période d\'affrontement idéologique, géopolitique et économique sans conflit armé direct entre les deux superpuissances : les États-Unis (bloc occidental) et l\'URSS (bloc soviétique). C\'est la Guerre Froide (1947-1991).',
      objectives: [
        'Comprendre les origines de la bipolarisation du monde post-1945.',
        'Analyser les étapes majeures de la Guerre Froide (Crises de Berlin, Guerre de Corée, Crise de Cuba, Détente).',
        'Expliquer les causes de l\'effondrement du bloc soviétique et la fin de la bipolarité en 1991.'
      ],
      definitions: [
        { term: 'Guerre Froide', explanation: 'Conflit idéologique, politique et stratégique opposant le bloc capitaliste (USA) au bloc communiste (URSS) de 1947 à 1991, sans affrontement militaire direct direct entre eux.' },
        { term: 'Bipolarisation', explanation: 'Organisation du monde autour de deux grands pôles d\'influence antagonistes entraînant une division planétaire.' },
        { term: 'Plan Marshall (1947)', explanation: 'Programme d\'aide financière américain destiné à la reconstruction de l\'Europe occidentale pour freiner l\'expansion du communisme (Doctrine Truman).' },
        { term: 'Détente', explanation: 'Période d\'apaisement relatif des tensions entre les USA et l\'URSS entre 1962 (post-crise de Cuba) et 1979 (invasion soviétique de l\'Afghanistan).' }
      ],
      examples: [
        {
          title: 'Le Blocus de Berlin (1948-1949) et la Crise de Cuba (1962)',
          description: 'Berlin est devenue le symbole de la division européenne (RFA vs RDA, puis construction du Mur de Berlin en 1961). La crise des missiles de Cuba en octobre 1962 a failli entraîner une guerre nucléaire mondiale.'
        }
      ],
      mainText: 'I. L\'AFFRONTEMENT DES DEUX BLOCS (1947-1953)\nEn 1947, la doctrine Truman (containment) et la doctrine Jdanov officialisent la rupture. L\'Europe se divise : l\'OTAN (1949) côté occidental, le Pacte de Varsovie (1955) côté soviétique.\n\nII. DE LA COEXISTENCE PACIFIQUE À LA DÉTENTE (1953-1979)\nAprès la mort de Staline (1953), Nikita Khrouchtchev prône la Coexistence pacifique. Malgré la crise des missiles de Cuba (1962) et la Guerre du Vietnam, les accords SALT (1972) et la conférence d\'Helsinki (1975) cherchent à limiter les armements nucléaires.\n\nIII. L\'EFFONDREMENT DU BLOC SOVIÉTIQUE (1985-1991)\nL\'URSS s\'épuise économiquement dans la course aux armements. Mikhaïl Gorbatchev lance la Perestroïka (reconstruction économique) et la Glasnost (transparence politique). La chute du Mur de Berlin (9 novembre 1989) et la dissolution officielle de l\'URSS le 25 décembre 1991 mettent fin à la Guerre Froide.',
      summary: 'La Guerre Froide a structuré les relations internationales pendant plus de 40 ans à travers une rivalité globale USA/URSS. Son dénouement en 1991 laisse la place à un monde multipolaire et recomposé.',
      formulas: [
        { name: 'Dates-clés', formula: '1947 (Doctrines) -> 1962 (Crise de Cuba) -> 1989 (Mur de Berlin) -> 1991 (Fin de l\'URSS)' }
      ]
    }
  },
  {
    id: 'les-histogeo-ose-h2',
    level: 'Terminale',
    seriesList: ['OSE', 'A', 'Toutes'],
    subjectId: 'histogeo',
    chapterId: 'chap-hist-decolonisation-mada',
    chapterTitle: 'Toko 2 (Histoire): Ny Libération sy ny Independence an\'i Madagasikara',
    chapterTitleFr: 'Chapitre 2: La Décolonisation et l\'Indépendance de Madagascar',
    title: 'Le Mouvement de 1947, le Processus de Décolonisation et la Proclamation de l\'Indépendance (1947-1960)',
    titleFr: 'Du Mouvement de 1947 à l\'Indépendance de Madagascar (1960)',
    estimatedMinutes: 50,
    content: {
      introduction: 'La Seconde Guerre Mondiale affaiblit considérablement les puissances coloniales européennes. Sous la pression des revendications nationalistes et de la Charte de l\'ONU affirmant le droit des peuples à disposer d\'eux-mêmes, le mouvement de décolonisation s\'amplifie en Asie et en Afrique. À Madagascar, le soulèvement patriotique du 29 mars 1947 marque une étape sanglante et décisive conduisant progressivement à l\'indépendance recouvrée en 1960.',
      objectives: [
        'Identifier les facteurs internes et externes favorisant la décolonisation à Madagascar.',
        'Analyser le déroulement et l\'impact du mouvement d\'insurrection du 29 mars 1947 (MDRM vs PADESM).',
        'Tracer les étapes politiques vers l\'indépendance (Loi-Cadre Defferre 1956, République Malgache 1958, Indépendance 26 juin 1960).'
      ],
      definitions: [
        { term: 'MDRM (Mouvement Démocratique de la Rénovation Malgache)', explanation: 'Parti politique fondé en 1946 par Joseph Ravoahangy, Raseta et Jacques Rabemananjara, luttant pacifiquement pour l\'indépendance de Madagascar.' },
        { term: 'Insurrection du 29 Mars 1947', explanation: 'Soulèvement armé patriotique contre le régime colonial français à Madagascar, particulièrement violent sur la côte Est et la falaise orientale.' },
        { term: 'Loi-Cadre Defferre (1956)', explanation: 'Loi française accordant une autonomie interne progressive aux territoires d\'Outre-Mer et instituant le suffrage universel.' },
        { term: 'Convention Franco-Malgache du 26 Juin 1960', explanation: 'Accord transférant officiellement les compétences souveraines de la France à la République Malgache dirigée par Philibert Tsiranana.' }
      ],
      examples: [
        {
          title: 'Les leaders nationalistes et le 29 Mars 1947',
          description: 'Joseph Ravoahangy-Andrianavalona, Joseph Raseta et Jacques Rabemananjara prônaient l\'indépendance par les urnes. Malgré la condamnation des trois députés par les autorités coloniales après le soulèvement, le symbole du 29 mars demeure l\'acte fondateur du nationalisme malgache moderne.'
        }
      ],
      mainText: 'I. LES ORIGINES ET L\'INSURRECTION DU 29 MARS 1947\nAprès 1945, le mécontentement face au travail forcé (Prestations), à la réquisition du riz et à la discrimination coloniale grandit. Le 29 mars 1947, des attaques éclatent à Moramanga, Manakara et Fenerive-Est. La répression coloniale française est brutale et fait plusieurs dizaines de milliers de victimes malgaches.\n\nII. LA VOIE DE L\'AUTONOMIE ET LE STIPULE DE LA LOI-CADRE (1956-1958)\nEn 1956, la Loi-Cadre institue des conseils de gouvernement locaux. Le 14 octobre 1958, la République Malgache est proclamée au sein de la Communauté française, marquant l\'accès à l\'autonomie interne.\n\nIII. LA PROCLAMATION DE L\'INDÉPENDANCE DU 26 JUIN 1960\nAprès renégociation des accords de coopération avec le Général de Gaulle, l\'indépendance totale de la République Malgache est proclamée au stade de Mahamasina le 26 juin 1960 par le Président Philibert Tsiranana.',
      summary: 'Du sang versé le 29 mars 1947 jusqu\'à la proclamation solennelle du 26 juin 1960 à Mahamasina, la lutte pour l\'indépendance de Madagascar s\'inscrit pleinement dans le grand mouvement de décolonisation mondiale du XXe siècle.',
      formulas: [
        { name: 'Repères majeurs', formula: '1946 (Création MDRM) -> 29 Mars 1947 (Insurrection) -> 14 Octobre 1958 (République) -> 26 Juin 1960 (Indépendance)' }
      ]
    }
  },
  {
    id: 'les-histogeo-ose-h3',
    level: 'Terminale',
    seriesList: ['OSE', 'A', 'Toutes'],
    subjectId: 'histogeo',
    chapterId: 'chap-hist-evol-politique-mada',
    chapterTitle: 'Toko 3 (Histoire): Ny Repoblika nifandimby teto Madagasikara (1960 hatramin\'izao)',
    chapterTitleFr: 'Chapitre 3: Évolution Politique, Économique et Sociale de Madagascar depuis 1960',
    title: 'De la Première République aux Défis Démocratiques et Économiques Contemporains (1960 à nos jours)',
    titleFr: 'Les Républiques de Madagascar et leurs Évolutions (1960 - Présent)',
    estimatedMinutes: 50,
    content: {
      introduction: 'Depuis le recouvrement de son indépendance en 1960, Madagascar a connu quatre régimes républicains successifs, marqués par des choix idéologiques contrastés (socialisme d\'État, libéralisme économique) et des tournants socio-politiques majeurs en 1972, 1991, 2002 et 2009. Comprendre ces évolutions est fondamental pour analyser la trajectoire développementale actuelle de la Grande Île.',
      objectives: [
        'Caractériser les différentes Républiques malgaches (Ière, IIème, IIIème et IVème République).',
        'Analyser la crise de mai 1972 et le passage au socialisme sous Didier Ratsiraka (1975-1991).',
        'Évaluer les choix économiques successifs (coopération économique, ajustement structurel, libéralisme) et leurs impacts sociaux.'
      ],
      definitions: [
        { term: 'Ière République (1960-1972)', explanation: 'Régime présidé par Philibert Tsiranana (PSD), caractérisé par des liens étroits d\'amitié et de coopération avec la France.' },
        { term: 'Mai 1972 (Rotaka)', explanation: 'Mouvement de contestation estudiantine et populaire dénonçant le néo-colonialisme et exigeant la malgachisation de l\'enseignement.' },
        { term: 'IIème République (RDM 1975-1991)', explanation: 'République Démocratique de Madagascar dirigée par Didier Ratsiraka, guidée par la Charte de la Révolution Socialiste (Boky Mena) et la nationalisation de l\'économie.' },
        { term: 'Bokimena (Livre Rouge)', explanation: 'Document idéologique rédigé par Didier Ratsiraka en 1975 définissant les grands axes du socialisme malgache.' },
        { term: 'Plan d\'Ajustement Structurel (PAS)', explanation: 'Programmes imposés par le FMI et la Banque Mondiale dans les années 1980/1990 imposant la désengagement de l\'État et le libéralisme économique.' }
      ],
      examples: [
        {
          title: 'Malgachisation de l\'enseignement et nationalisations',
          description: 'En 1972, les étudiants et enseignants ont exigé l\'adaptation des programmes scolaires aux réalités malgaches. À partir de 1975, l\'État a nationalisé les banques, compagnies pétrolières et grands édifices de production.'
        }
      ],
      mainText: 'I. LA PREMIÈRE RÉPUBLIQUE ET LA CRISE DE 1972\nLa Ière République (Philibert Tsiranana) favorise la stabilité mais suscite le mécontentement de la jeunesse et de l\'intelligentsia. La révolte paysanne dans le Sud (KIM 1971) et les manifestations étudiantes de Mai 1972 provoquent la démission de Tsiranana et l\'intérim du Général Gabriel Ramanantsoa.\n\nII. LA DEUXIÈME RÉPUBLIQUE ET LE SOCIALISME MALAIS (1975-1991)\nInstaurée par le Capitaine de Frégate Didier Ratsiraka, la RDM adopte le socialisme. L\'économie étatisée souffre du choc pétrolier et du manque de liquidités, conduisant au recours au FMI et au ralentissement économique.\n\nIII. DU DÉGEL DÉMOCRATIQUE DE 1991 À LA QUATRIÈME RÉPUBLIQUE\nEn 1991, les manifestations des Forces Vives Rasalama imposent la convention de Panorama. Albert Zafy inaugure la IIIème République (1993). Les alternances suivantes (Marc Ravalomanana, Andry Rajoelina) remettent l\'accent sur les infrastructures, l\'attractivité des investissements et les défis de la bonne gouvernance.',
      summary: 'L\'histoire politique malgache contemporaine montre la quête permanente d\'un modèle d\'organisation socio-économique garantissant à la fois la souveraineté, la stabilité démocratique et le développement durable.',
      formulas: [
        { name: 'Frise chronologique', formula: '1960-1972 (Ière Rép.) -> 1975-1991 (IIème Rép. Socialiste) -> 1993-2010 (IIIème Rép.) -> Depuis 2010 (IVème Rép.)' }
      ]
    }
  },
  {
    id: 'les-histogeo-ose-g1',
    level: 'Terminale',
    seriesList: ['OSE', 'A', 'Toutes'],
    subjectId: 'histogeo',
    chapterId: 'chap-geo-demo-mondiale',
    chapterTitle: 'Toko 1 (Géographie): Ny Mponina sy ny Toekarena Maneran-tany',
    chapterTitleFr: 'Chapitre 1: Démographie Globale, Mondialisation et Puissances Économiques',
    title: 'Les Dynamiques Démographiques Mondiales et la Hiérarchie Économique Globale',
    titleFr: 'Démographie Globale et Mondialisation Économique',
    estimatedMinutes: 50,
    content: {
      introduction: 'Le monde contemporain franchit le cap des 8 milliards d\'habitants, marqué par de profonds déséquilibres démographiques entre les pays avancés au vieillissement accentué et les pays en développement à forte croissance démographique. Parallèlement, la mondialisation des échanges interconnecte les économies sous la domination des grandes puissances et des firmes multinationales.',
      objectives: [
        'Analyser le modèle de la transition démographique et interpréter les indicateurs démographiques mondiaux.',
        'Comprendre l\'organisation de l\'économie mondiale (Triade, pays émergents, BRICS, Pays Moins Avancés).',
        'Saisir la place des flux migratoires, commerciaux et financiers dans l\'espace mondialisé.'
      ],
      definitions: [
        { term: 'Transition Démographique', explanation: 'Modèle historique décrivant le passage d\'un régime démographique traditionnel (forte natalité, forte mortalité) à un régime démographique moderne (faible natalité, faible mortalité).' },
        { term: 'Mondialisation', explanation: 'Processus d\'intensification et de fluidification des échanges de marchandises, services, capitaux, informations et personnes à l\'échelle de la planète.' },
        { term: 'BRICS+', explanation: 'Groupe de grands pays émergents (Brésil, Russie, Inde, Chine, Afrique du Sud) exerçant un poids économique et géopolitique croissant face aux pays développés du G7.' },
        { term: 'PMA (Pays Moins Avancés)', explanation: 'Catégorie de pays identifiés par l\'ONU caractérisés par un faible revenu par habitant, un retard dans le développement humain et une grande vulnérabilité économique (dont Madagascar fait partie).' }
      ],
      examples: [
        {
          title: 'Pyramide des âges comparée : Japon vs Madagascar',
          description: 'Le Japon présente une pyramide des âges en toupie (vieillissement rapide, indice de fécondité < 1.3). Madagascar présente une pyramide en accent circonflexe à base très large (plus de 60% de la population a moins de 25 ans).'
        }
      ],
      mainText: 'I. LES DYNAMIQUES DÉMOGRAPHIQUES MONDIALES\nLa population mondiale croît principalement en Afrique subsaharienne et en Asie du Sud. Les pays développés connaissent un déclin démographique pallié en partie par l\'immigration.\n\nII. LA HIÉRARCHIE ÉCONOMIQUE MONDIALE ET LA MONDIALISATION\nL\'économie mondiale est structurée autour des centres décisionnels majeurs (États-Unis, Union Européenne, Chine, Japon). Les pays émergents s\'affirment comme ateliers du monde et moteurs de la croissance industrielle.\n\nIII. LES ENJEUX POUR LES PAYS EN DÉVELOPPEMENT\nPour les PMA comme Madagascar, le dividende démographique constitue une opportunité majeure si la formation, l\'emploi et les investissements productifs sont au rendez-vous.',
      summary: 'La maîtrise de la croissance démographique et la valorisation du capital humain sont au cœur des stratégies d\'insertion réussie des nations dans l\'économie mondiale contemporaine.',
      formulas: [
        { name: 'Taux d\'accroissement naturel (TAN)', formula: 'TAN (%) = Taux de Natalité (‰) - Taux de Mortalité (‰)' }
      ]
    }
  },
  {
    id: 'les-histogeo-ose-g2',
    level: 'Terminale',
    seriesList: ['OSE', 'A', 'Toutes'],
    subjectId: 'histogeo',
    chapterId: 'chap-geo-eco-madagascar',
    chapterTitle: 'Toko 2 (Géographie): Ny Sehatra Ara-toekarena ao Madagasikara',
    chapterTitleFr: 'Chapitre 2: La Géographie Économique et Sectorielle de Madagascar',
    title: 'Secteurs Primaire, Secondaire, Tertiaire et Intégration Régionale de Madagascar',
    titleFr: 'Analyse des Secteurs Économiques de Madagascar',
    estimatedMinutes: 50,
    content: {
      introduction: 'L\'économie de Madagascar repose traditionnellement sur l\'agriculture, l\'élevage et la pêche (secteur primaire), employant près de 75% de la population active. Cependant, le secteur minier et le textile industriel (secteur secondaire) ainsi que les services, le tourisme et le numérique (secteur tertiaire) constituent les leviers d\'émergence et d\'intégration dans les organisations régionales (SADC, COMESA, COI).',
      objectives: [
        'Diagnostiquer les forces et faiblesses du secteur primaire malgache (riziculture, cultures de rente).',
        'Évaluer le potentiel minier et industriel du secteur secondaire (Ambatovy, QMM, zones franches).',
        'Analyser le rôle du secteur tertiaire, du tourisme et de l\'intégration régionale dans le développement.'
      ],
      definitions: [
        { term: 'Agriculture Itinérante sur Brûlis (Tavy)', explanation: 'Pratique agricole traditionnelle consistant à défricher et brûler la forêt pour cultiver du riz pluvial, entraînant érosion et déforestation.' },
        { term: 'Cultures de Rente', explanation: 'Productions agricoles destinées principalement à l\'exportation (vanille, girofle, café, cacao, litchi).' },
        { term: 'Zone Franche Industrielle (ZFI)', explanation: 'Espace bénéficiant de régimes fiscaux et douaniers avantageux pour attirer les investissements directs étrangers (IDE) dans le secteur textile et l\'exportation.' },
        { term: 'Intégration Régionale (SADC, COMESA, COI)', explanation: 'Appartenance à des blocs économiques régionaux facilitant le commerce transfrontalier et les partenariats stratégiques.' }
      ],
      examples: [
        {
          title: 'La vanille de Madagascar et la filière minérale QMM / Ambatovy',
          description: 'Madagascar est le premier exportateur mondial de vanille naturelle (Sava). Les projets miniers de cobalt/nickel à Ambatovy (Moramanga/Toamasina) et d\'ilspace à QMM (Fort-Dauphin) représentent les plus grands investissements privés de l\'histoire du pays.'
        }
      ],
      mainText: 'I. LE SECTEUR PRIMAIRE : ENTRE TRADITION ET DÉFIS ALIMENTAIRES\nL\'agriculture malgache est dominée par la riziculture (staple food). La faible mécanisation, le manque d\'engrais et les aléas climatiques (cyclones, sécheresses dans le Sud) provoquent une vulnérabilité alimentaire, compensée par les cultures de rente (vanille, girofle).\n\nII. LE SECTEUR SECONDAIRE : POTENTIEL MINIER ET INDUSTRIALISATION\nOutre l\'agroalimentaire et l\'industrie textile (zone franche), Madagascar détient d\'immenses ressources minières (nickel, cobalt, ilménite, graphite, pierres précieuses) dont la transformation locale demeure un enjeu clé.\n\nIII. LE SECTEUR TERTIAIRE ET L\'OUVERTURE INTERNATIONALE\nLe tourisme éco-responsable (biodiversité unique), les services de télécommunication/BPO et le commerce extérieur dynamisent les grandes villes. L\'intégration au COMESA, à la SADC et à la Commission de l\'Océan Indien (COI) offre de grands marchés régionaux.',
      summary: 'La modernisation de l\'agriculture, la transformation industrielle des ressources minérales et la valorisation du potentiel touristique constituent le triptyque de la croissance économique de Madagascar.',
      formulas: [
        { name: 'Balance Commerciale', formula: 'Solde Commercial = Valeur des Exportations - Valeur des Importations' }
      ]
    }
  },
  {
    id: 'les-histogeo-ose-g3',
    level: 'Terminale',
    seriesList: ['OSE', 'A', 'Toutes'],
    subjectId: 'histogeo',
    chapterId: 'chap-geo-amenagement-mada',
    chapterTitle: 'Toko 3 (Géographie): Ny Mponina sy ny Fampandrosoana ny Tany eto Madagasikara',
    chapterTitleFr: 'Chapitre 3: Population, Aménagement du Territoire et Développement Durable à Madagascar',
    title: 'Atouts du Milieu Naturel, Pression Démographique et Défis d\'Aménagement du Territoire',
    titleFr: 'Aménagement du Territoire et Environnement à Madagascar',
    estimatedMinutes: 50,
    content: {
      introduction: 'Doté d\'une biodiversité exceptionnelle (plus de 80% d\'espèces endémiques) et de paysages variés (Hauts-Plateaux, côtes orientales humides, Sud semi-aride), Madagascar fait face à une croissance démographique rapide (près de 3% par an), une urbanisation non maîtrisée et des menaces environnementales sévères (déforestation, érosion/lavaka). L\'aménagement du territoire cherche à réduire les déséquilibres régionaux.',
      objectives: [
        'Identifier les atouts et contraintes du milieu naturel malgache.',
        'Comprendre la répartition spatiale de la population et les dynamiques d\'exode rural vers Antananarivo et les grands centres urbains.',
        'Proposer des solutions durables pour la préservation environnementale et la décentralisation efficace.'
      ],
      definitions: [
        { term: 'Lavaka', explanation: 'Forme spectaculaire d\'érosion en cratère creusée par les pluies torrentielles sur les saprolites fragilisées des Hautes Terres malgaches.' },
        { term: 'Endémisme', explanation: 'Caractère d\'une espèce animale ou végétale présente exclusivement dans une zone géographique déterminée (ex : lemuriens, baobabs, catharantus roseus).' },
        { term: 'Exode Rural', explanation: 'Migration définitive des populations des campagnes vers les villes à la recherche d\'emplois et de services sociaux.' },
        { term: 'Décentralisation', explanation: 'Transfert de compétences et de ressources financières de l\'État central vers les collectivités territoriales décentralisées (Régions, Communes).' }
      ],
      examples: [
        {
          title: 'Macro-céphalie d\'Antananarivo et péril de la déforestation',
          description: 'La capitale Antananarivo concentre plus de 3 millions d\'habitants, créant des défis majeurs d\'assainissement, de transport et de logement. Parallèlement, Madagascar a perdu plus de 70% de sa couverture forestière originelle en un siècle.'
        }
      ],
      mainText: 'I. LES ATOUTS ET VULNÉRABILITÉS DU MILIEU NATUREL\nMadagascar possède un sous-sol riche et un potentiel hydraulique considérable. Cependant, la position dans l\'Océan Indien l\'expose chaque année à des cyclones destructeurs et à la sécheresse extrême (Kere) dans le Sud.\n\nII. RÉPARTITION DE LA POPULATION ET MIGRATIONS INTERNES\nLa population est inégalement répartie : très dense sur les Hauts-Plateaux centraux et la côte Est, faible dans l\'Ouest et le Sud. L\'exode rural hypertrophie les métropoles urbaines.\n\nIII. AMÉNAGEMENT DU TERRITOIRE ET DÉVELOPPEMENT DURABLE\nPour assurer un développement équilibré, la politique de décentralisation renforce les 24 Régions de Madagascar, promeut les aires protégées (MNP) et développe les infrastructures de transport reliant les provinces aux grands ports (Toamasina, Mahajanga, Antsiranana, Toliara).',
      summary: 'Concilier la protection de la biodiversité unique de l\'Île Rouge avec le besoin urgent d\'infrastructures et de sécurité alimentaire est le défi central du développement durable à Madagascar.',
      formulas: [
        { name: 'Densité de population', formula: 'Densité (hab/km²) = Population totale / Superficie totale (587 041 km²)' }
      ]
    }
  },
  {
    id: 'les-ses-1',
    level: 'Terminale',
    seriesList: ['OSE', 'Toutes'],
    subjectId: 'ses',
    chapterId: 'chap-ses-1',
    chapterTitle: 'Toko 1: Ny fitombon-karena, ny fiovaovan\'ny toekarena sy ny krizy',
    chapterTitleFr: 'Chapitre 1 : Croissance économique, fluctuations et crises',
    title: 'Ny Loharanon\'ny Fitombon-karena sy ny Fari-piainana',
    titleFr: 'Les sources de la croissance économique et la soutenabilité du développement',
    estimatedMinutes: 60,
    content: {
      introduction: 'La croissance économique désigne l\'augmentation durable et cumulative de la production de biens et services dans une économie sur une longue période, mesurée par le Produit Intérieur Brut (PIB). Pour Madagascar et les pays en développement, comprendre les moteurs du progrès technique, l\'accumulation du capital humain et les limites écologiques de la croissance est un enjeu vital de politique publique.',
      objectives: [
        'Définir et calculer le PIB, le taux de croissance et la Productivité Globale des Facteurs (PGF).',
        'Distinguer la croissance extensive (accumulation des facteurs travail et capital) de la croissance intensive (progrès technique et innovation).',
        'Analyser le rôle des institutions (droits de propriété, stabilité politique) et du capital humain.',
        'Évaluer les limites écologiques de la croissance et les principes du développement durable.'
      ],
      definitions: [
        { term: 'PIB (Produit Intérieur Brut)', explanation: 'Valeur monétaire totale de tous les biens et services finaux produits sur le territoire économique national au cours d\'une période donnée (PIB = Somme des Valeurs Ajoutées + Impôts sur produits - Subventions).' },
        { term: 'Croissance Extensive', explanation: 'Augmentation de la production résultant uniquement de l\'accroissement de la quantité des facteurs de production utilisés (plus de travailleurs, plus de machines).' },
        { term: 'Croissance Intensive', explanation: 'Augmentation de la production due à une meilleure efficacité ou combinaison des facteurs, mesurée par la hausse de la Productivité Globale des Facteurs (PGF).' },
        { term: 'Progrès Technique Endogène', explanation: 'Théorie selon laquelle le progrès technique ne tombe pas du ciel mais découle d\'investissements délibérés en recherche-développement (Romer), capital humain (Lucas) et infrastructures publiques (Barro).' },
        { term: 'Développement Durable', explanation: 'Développement qui répond aux besoins du présent sans compromettre la capacité des générations futures à répondre aux leurs (Rapport Brundtland 1987).' }
      ],
      formulas: [
        { name: 'Taux de Croissance du PIB', formula: 'Taux (%) = [(PIB_t - PIB_{t-1}) / PIB_{t-1}] × 100', explanation: 'Mesure la variation relative de la richesse nationale en volume (corrigée de l\'inflation).' },
        { name: 'Valeur Ajoutée (VA)', formula: 'VA = Chiffre d\'Affaires (Production) - Consommations Intermédiaires (CI)', explanation: 'Richesse réellement créée par l\'unité de production.' },
        { name: 'Productivité du Travail', formula: 'Productivité par tête = Quantité produite / Nombre de travailleurs', explanation: 'Rendement moyen d\'un travailleur.' }
      ],
      examples: [
        {
          title: 'Défis de productivité et secteur informel à Madagascar',
          description: 'À Madagascar, près de 85% de la population active travaille dans le secteur informel ou l\'agriculture de subsistance avec un faible ratio capital/travail, ce qui limite les gains de productivité malgré une population jeune et croissante.'
        }
      ],
      mainText: 'I. LES FACTEURS DE LA PRODUCTION ET LES SOURCES DE LA CROISSANCE\n1. Le facteur Travail et le Capital physique : la fonction de production Cobb-Douglas illustre comment la combinaison du volume de travail (L) et du stock de machines (K) génère la production (Y).\n2. Le progrès technique comme moteur principal : selon Joseph Schumpeter, l\'innovation et le processus de « destruction créatrice » dynamisent l\'économie en rendant obsolètes les technologies dépassées.\n\nII. LES THÉORIES DE LA CROISSANCE ENDOGÈNE ET LE RÔLE DES INSTITUTIONS\n1. Les quatre formes de capitaux : Capital physique (équipements), Capital technologique (R&D), Capital humain (éducation, santé), et Capital public (routes, télécoms, énergie).\n2. Les institutions inclusives : Douglas North démontre que la garantie des droits de propriété, l\'État de droit et la lutte contre la corruption sont des prérequis indispensables pour inciter à l\'investissement privé à long terme.\n\nIII. LES FLUCTUATIONS ÉCONOMIQUES ET LES LIMITES DU MODÈLE\n1. Les phases du cycle économique : Expansion, Crise (point de retournement), Récession / Dépression, Reprise.\n2. Limites écologiques : Épuisement des ressources naturelles non renouvelables, externalités négatives (pollutions, réchauffement climatique) rendant indispensable la transition vers l\'économie verte.',
      summary: 'La croissance économique durable repose sur la synergie entre accumulation du capital humain, investissement dans les infrastructures, institutions stables et respect des équilibres environnementaux.'
    }
  },
  {
    id: 'les-ses-2',
    level: 'Terminale',
    seriesList: ['OSE', 'Toutes'],
    subjectId: 'ses',
    chapterId: 'chap-ses-2',
    chapterTitle: 'Toko 2: Ny famatsiam-bola ny toekarena, ny vola sy ny tsenam-bola',
    chapterTitleFr: 'Chapitre 2 : Financement de l\'économie, monnaie et marchés financiers',
    title: 'Ny Rafitra Ara-bola sy ny Famoronam-bola',
    titleFr: 'La monnaie, le crédit bancaire et le financement de l\'activité économique',
    estimatedMinutes: 55,
    content: {
      introduction: 'Le financement de l\'économie désigne l\'ensemble des mécanismes par lesquels les agents à besoin de financement (entreprises qui investissent, État en déficit) obtiennent des fonds auprès des agents à capacité de financement (ménages épargnants). La monnaie, instrument d\'échange et réserve de valeur, est créée principalement par le crédit bancaire sous le contrôle de la Banque Centrale.',
      objectives: [
        'Comprendre les fonctions de la monnaie et les agrégats monétaires (M1, M2, M3).',
        'Expliquer le mécanisme de la création monétaire par les banques commerciales (« les crédits font les dépôts »).',
        'Distinguer le financement direct (marché des capitaux) du financement indirect ou intermédié (crédit bancaire).',
        'Analyser le rôle de la Banque Centrale de Madagascar (BFM), la politique monétaire et la microfinance.'
      ],
      definitions: [
        { term: 'Monnaie', explanation: 'Actif liquide accepté de manière universelle au sein d\'une communauté de paiement comme unité de compte, intermédiaire des échanges et réserve de valeur.' },
        { term: 'Création Monétaire', explanation: 'Processus par lequel les banques de second rang créent de la monnaie scripturale lors de l\'octroi d\'un crédit à un agent non financier (« Les crédits font les dépôts »).' },
        { term: 'Financement Direct', explanation: 'Modalité de financement où les agents à besoin de capitaux émettent directement des titres (actions, obligations) sur le marché financier à destination des épargnants.' },
        { term: 'Financement Intermédié', explanation: 'Financement passant par un intermédiaire financier (banque) qui collecte des dépôts et octroie des prêts en transformant les échéances.' },
        { term: 'Taux Directeur', explanation: 'Taux d\'intérêt fixé par la Banque Centrale auquel les banques commerciales se refinancent en monnaie centrale.' }
      ],
      formulas: [
        { name: 'Capacité / Besoin de Financement', formula: 'Épargne Brute + Transferts en capital - FBCF (Investissement)', explanation: 'Si > 0 : Capacité de financement ; Si < 0 : Besoin de financement.' },
        { name: 'Taux d\'Intérêt Réel', formula: 'Taux Réel ≈ Taux Nominal - Taux d\'Inflation (Équation de Fisher)', explanation: 'Rendement effectif de l\'épargne ou coût réel de l\'emprunt corrigé de la hausse des prix.' }
      ],
      examples: [
        {
          title: 'Rôle crucial de la Microfinance à Madagascar',
          description: 'Avec un taux de bancarisation traditionnel inférieur à 10%, les Institutions de Microfinance (IMF comme OTIV, CECAM, Microcred) permettent aux petits agriculteurs et micro-entrepreneurs d\'accéder à l\'inclusion financière.'
        }
      ],
      mainText: 'I. LES FORMES DE LA MONNAIE ET LA CRÉATION MONÉTAIRE\n1. Les fonctions économiques : Unité de compte (mesure des prix), Intermédiaire des échanges (évite le troc), Réserve de valeur (transfert de pouvoir d\'achat dans le temps).\n2. Les banques commerciales créatrices de monnaie : Lors d\'un crédit, la banque crédite le compte de l\'emprunteur par une simple écriture comptable sans disposer préalablement de cette épargne (ex nihilo). La monnaie est détruite lors du remboursement du principal.\n\nII. LE CONTRÔLE DE LA CRÉATION MONÉTAIRE ET LA BANQUE CENTRALE\n1. La Banky Foiben\'i Madagasikara (BFM) veille à la stabilité des prix (lutte contre l\'inflation) et à la valeur extérieure de la monnaie nationale (Ariary).\n2. Les instruments de la politique monétaire : Variation du taux directeur, réserves obligatoires et opérations d\'open market.\n\nIII. LES CIRCUITS DE FINANCEMENT DE L\'ÉCONOMIE\n1. Économie d\'endettement vs économie de marchés financiers : À Madagascar, le système financier reste dominé par le crédit bancaire et la microfinance en raison de l\'absence d\'une bourse de valeurs mobilières développée.\n2. Le risque d\'éviction : Quand l\'État absorbe l\'épargne bancaire disponible par des Bons du Trésor Fihary, cela peut réduire les crédits disponibles pour les entreprises privées.',
      summary: 'La monnaie et le crédit sont les leviers de l\'investissement productif, régulés par la Banque Centrale pour prévenir l\'inflation et dynamiser la croissance.'
    }
  },
  {
    id: 'les-ses-3',
    level: 'Terminale',
    seriesList: ['OSE', 'Toutes'],
    subjectId: 'ses',
    chapterId: 'chap-ses-3',
    chapterTitle: 'Toko 3: Ny fanatontoloana, ny varotra iraisam-pirenena sy ny paikadin\'ny fampandrosoana',
    chapterTitleFr: 'Chapitre 3 : Mondialisation, commerce international et stratégies de développement',
    title: 'Ny Varotra Iraisam-pirenena sy ny Toerana ijoroan\'i Madagasikara',
    titleFr: 'Commerce international, mondialisation de la production et stratégies pour les pays en développement',
    estimatedMinutes: 60,
    content: {
      introduction: 'La mondialisation économique se caractérise par l\'intensification des échanges de biens, services, capitaux et technologies à l\'échelle planétaire. Face aux théories du libre-échange et aux risques du protectionnisme, les pays en développement comme Madagascar doivent élaborer des stratégies d\'insertion commerciale valorisant leurs avantages comparatifs et leur industrialisation.',
      objectives: [
        'Comprendre les théories traditionnelles (Smith, Ricardo, HOS) et modernes du commerce international.',
        'Distinguer le libre-échange, le protectionnisme éducateur (List) et les accords régionaux.',
        'Analyser la fragmentation de la chaîne de valeur mondiale et le rôle des Firmes Multinationales (FMN).',
        'Étudier l\'insertion de Madagascar dans les accords régionaux (SADC, COMESA, COI, ZLECAF, AGOA).'
      ],
      definitions: [
        { term: 'Avantage Comparatif', explanation: 'Théorie de David Ricardo selon laquelle chaque pays a intérêt à se spécialiser dans la production où son avantage relatif est le plus grand, ou son désavantage le plus faible.' },
        { term: 'Théorème HOS (Heckscher-Ohlin-Samuelson)', explanation: 'Un pays tend à exporter les biens qui utilisent de façon intensive le facteur de production dont il est abondamment doté (travail ou capital).' },
        { term: 'Protectionnisme Éducateur', explanation: 'Doctrine de Friedrich List préconisant une protection temporaire et ciblée des industries naissantes (« infant industries ») pour leur permettre d\'atteindre la compétitivité internationale.' },
        { term: 'Chaîne de Valeur Mondiale', explanation: 'Décomposition du processus de production d\'un bien en multiples étapes géographiquement dispersées dans les pays offrant les meilleurs coûts et compétences.' },
        { term: 'Termes de l\'Échange', explanation: 'Rapport entre l\'indice des prix des exportations et l\'indice des prix des importations (Indice P_export / Indice P_import × 100).' }
      ],
      formulas: [
        { name: 'Solde Commercial', formula: 'Solde Commercial = Valeur des Exportations (X) - Valeur des Importations (M)', explanation: 'Si X > M : Excédent commercial ; Si X < M : Déficit commercial.' },
        { name: 'Taux de Couverture', formula: 'Taux de Couverture (%) = (Exportations / Importations) × 100', explanation: 'Capacité des exportations à payer les importations.' }
      ],
      examples: [
        {
          title: 'Zones Franches Textiles et AGOA à Madagascar',
          description: 'L\'adhésion à l\'AGOA (African Growth and Opportunity Act) a permis à Madagascar de développer une industrie textile compétitive en zone franche, exportant des vêtements confectionnés vers le marché américain sans droits de douane.'
        }
      ],
      mainText: 'I. LES THÉORIES DU COMMERCE INTERNATIONAL\n1. Avantages absolus (Adam Smith) et comparatifs (David Ricardo) : La spécialisation internationale maximise la production globale et le bien-être des consommateurs.\n2. Le modèle HOS et la dotation factorielle : Les pays émergents riches en main-d\'œuvre abondante se spécialisent dans les produits manufacturés légers, tandis que les pays développés exportent des technologies et des services à haute valeur ajoutée.\n\nII. DÉBATS : LIBRE-ÉCHANGE VS PROTECTIONNISME\n1. Les gains du libre-échange : Baisse des prix pour les ménages, accès à un marché élargi, économies d\'échelle et diffusion technologique.\n2. Les arguments en faveur du protectionnisme : Préservation des emplois locaux, sauvegarde des secteurs stratégiques (souveraineté alimentaire en riz) et protection des industries naissantes (List).\n\nIII. STRATÉGIES DE DÉVELOPPEMENT POUR MADAGASCAR\n1. Les stratégies historiques : Industrialisation par substitution aux importations (ISI) vs promotion des exportations.\n2. L\'intégration régionale et la ZLECAF : Madagascar participe activement aux blocs régionaux (COMESA, SADC, Commission de l\'Océan Indien) pour diversifier ses partenaires commerciaux au-delà de l\'Union Européenne et de la Chine.',
      summary: 'Une insertion internationale réussie exige la montée en gamme technologique, la transformation locale des matières premières (vanille, nickel, agriculture) et le renforcement des chaînes logistiques régionales.'
    }
  }
];

export const INITIAL_EXERCISES: Exercise[] = [
  {
    id: 'ex-hg-ose-1',
    lessonId: 'les-histogeo-ose-h1',
    subjectId: 'histogeo',
    level: 'Terminale',
    seriesList: ['OSE', 'A', 'Toutes'],
    title: 'Analyse de Document : La Crise des Missiles de Cuba (1962)',
    question: 'En octobre 1962, la découverte de rampes de lancement de missiles soviétiques à Cuba déclenche une crise majeure entre Washington et Moscou. 1) Expliquez pourquoi cette crise est considérée comme le paroxysme de la Guerre Froide. 2) Comment a-t-elle débouché sur la période de la Détente ?',
    type: 'open',
    correctAnswer: 'Analyse détaillée : 1) Paroxysme car les deux superpuissances dotées de la bombe atomique se sont affrontées directement par l\'intermédiaire d\'un blocus maritime américain autour de Cuba. 2) Prise de conscience du péril nucléaire amenant la création du téléphone rouge (1963) et les traités d\'armement (SALT 1972).',
    stepByStepCorrection: [
      '1) Identifier les acteurs : John F. Kennedy (USA) et Nikita Khrouchtchev (URSS).',
      '2) Expliquer l\'enjeu nucléaire : Cuba située à seulement 150 km des côtes américaines.',
      '3) Démontrer le dénouement : Remplacement des missiles soviétiques à Cuba contre l\'engagement américain de ne pas envahir Cuba et le retrait discret des missiles américains de Turquie.',
      '4) Conclusion : Établissement de la télécommunication directe (Téléphone rouge) initiant la période de la Détente.'
    ],
    explanation: 'La crise de Cuba démontre la logique de la "destruction mutuelle assurée" (MAD) qui a paradoxalement empêché la troisième guerre mondiale.',
    difficulty: 'hard'
  },
  {
    id: 'ex-hg-ose-2',
    lessonId: 'les-histogeo-ose-h2',
    subjectId: 'histogeo',
    level: 'Terminale',
    seriesList: ['OSE', 'A', 'Toutes'],
    title: 'Analyse Historique : L\'Insurrection du 29 Mars 1947 à Madagascar',
    question: 'Quelles étaient les principales causes de l\'insurrection du 29 mars 1947 à Madagascar, et quelles furent ses conséquences politiques à court et long terme ?',
    type: 'open',
    correctAnswer: 'Causes : abus du régime colonial (travail forcé, prestations, réquisition du riz), aspiration à la liberté post-1945. Conséquences : répression sanglante, dissolution du MDRM, mais prise de conscience nationale rendant inéluctable l\'indépendance de 1960.',
    stepByStepCorrection: [
      '1) Poser le contexte d\'après-guerre (1945-1947).',
      '2) Distinguer la lutte politique légale du MDRM (députés Ravoahangy, Raseta) et les actions secrètes des sociétés secrètes (Jiny, PANAMA).',
      '3) Analyser les retombées : procès des parlementaires, mais accélération du processus vers la Loi-Cadre (1956) et l\'indépendance (1960).'
    ],
    explanation: 'Le 29 Mars 1947 est célébré comme la journée des Martyrs de la Patrie à Madagascar.',
    difficulty: 'medium'
  },
  {
    id: 'ex-hg-ose-3',
    lessonId: 'les-histogeo-ose-g2',
    subjectId: 'histogeo',
    level: 'Terminale',
    seriesList: ['OSE', 'A', 'Toutes'],
    title: 'Sujet Type BAC : Les atouts et contraintes du secteur agricole malgache',
    question: 'Présentez sous forme synthétique deux atouts majeurs et deux contraintes structurelles du secteur agricole à Madagascar.',
    type: 'open',
    correctAnswer: 'Atouts : vastes terres cultivables, biodiversité/cultures de rente uniques (vanille, girofle). Contraintes : aléas climatiques (cyclones, sécheresse), faible mécanisation et isolement des zones rurales.',
    stepByStepCorrection: [
      '1) Atouts : Disponibilité foncière importante et climat favorable aux cultures tropicales de haute valeur commerciale.',
      '2) Contraintes : Vulnérabilité face aux passages cycloniques fréquents, insuffisance de pistes rurales pour l\'évacuation des récoltes, et érosion du sol (tavy/lavaka).'
    ],
    explanation: 'La modernisation agricole et l\'irrigation constituent la clé de la souveraineté alimentaire malgache.',
    difficulty: 'medium'
  },
  {
    id: 'ex-ses-1',
    lessonId: 'les-ses-1',
    subjectId: 'ses',
    level: 'Terminale',
    seriesList: ['OSE', 'Toutes'],
    title: 'Exercice Type BAC : Calcul du PIB, de la Valeur Ajoutée et Taux de Croissance',
    question: 'Soit une économie composée de 3 entreprises : A (Agriculture), B (Agroalimentaire) et C (Distribution). 1) L\'entreprise A produit pour 100 millions d\'Ariary de canne à sucre sans consommation intermédiaire. 2) L\'entreprise B achète toute la récolte de A pour 100 millions et fabrique du sucre vendu 250 millions. 3) L\'entreprise C achète ce sucre et le vend aux ménages 320 millions avec 20 millions de frais de transport (CI). Calculez la Valeur Ajoutée de chaque entreprise et le PIB total.',
    type: 'open',
    correctAnswer: 'VA(A) = 100M, VA(B) = 150M, VA(C) = 50M. PIB total = Somme des VA = 300 millions d\'Ariary.',
    stepByStepCorrection: [
      '1) Formule : Valeur Ajoutée (VA) = Production (Chiffre d\'Affaires) - Consommations Intermédiaires (CI).',
      '2) Entreprise A : VA_A = 100 - 0 = 100 millions Ar.',
      '3) Entreprise B : VA_B = 250 - 100 (achat canne) = 150 millions Ar.',
      '4) Entreprise C : VA_C = 320 - (250 + 20) = 50 millions Ar.',
      '5) PIB = VA_A + VA_B + VA_C = 100 + 150 + 50 = 300 millions d\'Ariary.'
    ],
    explanation: 'Le PIB évite les doubles comptes en sommant uniquement les valeurs ajoutées créées à chaque stade du cycle de production.',
    difficulty: 'medium'
  },
  {
    id: 'ex-ses-2',
    lessonId: 'les-ses-2',
    subjectId: 'ses',
    level: 'Terminale',
    seriesList: ['OSE', 'Toutes'],
    title: 'Analyse Économique : Création Monétaire et Pouvoir d\'Achat',
    question: 'Expliquez comment une émission excessive de monnaie scripturale par le crédit bancaire sans contrepartie de production réelle de biens peut provoquer de l\'inflation (Théorie quantitative de la monnaie de Fisher : MV = PT).',
    type: 'open',
    correctAnswer: 'Selon l\'équation quantitative MV = PT, si la masse monétaire M augmente plus vite que le volume des transactions réelles T (la vitesse V étant stable), le niveau général des prix P augmente automatiquement (inflation).',
    stepByStepCorrection: [
      '1) Définir les variables : M (Masse monétaire), V (Vitesse de circulation), P (Niveau des prix), T (Volume des transactions/production).',
      '2) Expliquer le mécanisme : Un excès de monnaie en circulation face à une offre de biens rigide crée un excès de demande globale.',
      '3) Conséquence : Les producteurs augmentent leurs prix, ce qui déprécie le pouvoir d\'achat de la monnaie nationale (Ariary).',
      '4) Rôle de la Banque Centrale : Relever le taux directeur pour freiner le crédit.'
    ],
    explanation: 'La maîtrise de l\'inflation est la mission constitutionnelle prioritaire de la Banky Foiben\'i Madagasikara.',
    difficulty: 'hard'
  },
  {
    id: 'ex-math-1',
    lessonId: 'les-math-1',
    subjectId: 'maths',
    level: 'Terminale',
    seriesList: ['C', 'D', 'S'],
    title: 'Kajy ny Dérivée sy Tanjanta',
    question: 'Ataovy ny dérivée an\'ny fiana-kery f(x) = 2x³ - 6x + 5. Avy eo kajio ny f\'(1) sy ny fampitoviana ny tanjanta eo amin\'ny x₀ = 1.',
    type: 'mcq',
    choices: [
      'A) f\'(x) = 6x² - 6 ; f\'(1) = 0 ; y = 1',
      'B) f\'(x) = 6x² - 6 ; f\'(1) = 0 ; y = 1',
      'C) f\'(x) = 6x² - 6 ; f\'(1) = 0 ; y = 1',
      'D) f\'(x) = 6x² - 6 ; f\'(1) = 0 ; y = 1'
    ],
    correctAnswer: 0,
    stepByStepCorrection: [
      '1) f(x) = 2x³ - 6x + 5',
      '2) f\'(x) = 2 · (3x²) - 6 · (1) + 0 = 6x² - 6.',
      '3) f\'(1) = 6(1)² - 6 = 0.',
      '4) f(1) = 2(1)³ - 6(1) + 5 = 1.',
      '5) Tanjanta: y = f\'(1)(x - 1) + f(1) = 0(x - 1) + 1 = 1.'
    ],
    explanation: 'Raha f\'(1) = 0, ny tanjanta dia tsipika mitsivalana (tangente horizontale y = 1).',
    difficulty: 'easy'
  },
  {
    id: 'ex-math-2',
    lessonId: 'les-math-1',
    subjectId: 'maths',
    level: 'Terminale',
    seriesList: ['C', 'D', 'S'],
    title: 'Dérivée d\'un produit u(x) · v(x)',
    question: 'Kajio ny f\'(x) ho an\'ny f(x) = (x² + 1) · e^x.',
    type: 'open',
    correctAnswer: 'f\'(x) = (x² + 2x + 1) · e^x = (x + 1)² · e^x',
    stepByStepCorrection: [
      '1) Ampiasao ny raikipohy (u·v)\' = u\'v + uv\'.',
      '2) Azo u(x) = x² + 1 => u\'(x) = 2x.',
      '3) Azo v(x) = e^x => v\'(x) = e^x.',
      '4) f\'(x) = 2x · e^x + (x² + 1) · e^x = (x² + 2x + 1) · e^x.',
      '5) Homarihina fa x² + 2x + 1 = (x + 1)².'
    ],
    explanation: 'Koa satria (x + 1)² ≥ 0 sy e^x > 0 foana, dia f\'(x) ≥ 0 ambonin\'ny ℝ ny fiana-kery f.',
    difficulty: 'medium'
  },
  {
    id: 'ex-phys-1',
    lessonId: 'les-phys-1',
    subjectId: 'physique',
    level: 'Terminale',
    seriesList: ['C', 'D', 'S'],
    title: 'Mekanika - Chute libre',
    question: 'Bala milanja m = 0.5 kg latsaka tsy misy hafainganam-pandeha amboalohany (v₀ = 0) avy amin\'ny haavo h = 20m. Kajio ny fotoana t ilaina hahatongavany amin\'ny tany (raha g = 10 m/s²).',
    type: 'mcq',
    choices: [
      'A) t = 1 segondra',
      'B) t = 2 segondra',
      'C) t = 4 segondra',
      'D) t = 5 segondra'
    ],
    correctAnswer: 1,
    stepByStepCorrection: [
      '1) Ny équation horaire amin\'ny chute libre dia z(t) = 1/2 · g · t².',
      '2) Rehefa hahatratra ny tany, z(t) = h = 20m.',
      '3) 20 = 1/2 · (10) · t² => 20 = 5 · t².',
      '4) t² = 20 / 5 = 4 => t = √4 = 2 segondra.'
    ],
    explanation: 'Kajy tsotra amin\'ny fampiasana ny fari-potoana t = √(2h/g).',
    difficulty: 'easy'
  }
];

export const INITIAL_QUIZZES: Quiz[] = [
  {
    id: 'quiz-term-1',
    title: 'Test Diagnostique BAC - Mathématiques & Physique',
    level: 'Terminale',
    seriesList: ['C', 'D', 'S'],
    subjectId: 'maths',
    durationMinutes: 10,
    questions: [
      {
        id: 'q1',
        question: 'Inona no valin\'ny lim (x→+∞) [ (2x² + 3) / (x² - 5) ] ?',
        options: ['0', '2', '+∞', '1'],
        correctOptionIndex: 1,
        explanation: 'Fizarana polynomil dia alaina ny degré ambony indrindra: 2x² / x² = 2.'
      },
      {
        id: 'q2',
        question: 'Raha f\'(x) = (x - 3)(x + 1), eo amin\'ny inona no misy minimum local ny fiana-kery f?',
        options: ['x = -1', 'x = 3', 'x = 0', 'x = 1'],
        correctOptionIndex: 1,
        explanation: 'Manova famantarana avy amin\'ny (-) ho (+) eo amin\'ny x = 3 ny f\'(x), ka eo no misy minimum.'
      },
      {
        id: 'q3',
        question: 'Inona no singa hery (unité de force) ao amin\'ny Système International?',
        options: ['Joule (J)', 'Watt (W)', 'Newton (N)', 'Pascal (Pa)'],
        correctOptionIndex: 2,
        explanation: 'Ny hery (Force) dia refesina amin\'ny Newton (N = kg·m/s²).'
      },
      {
        id: 'q4',
        question: 'Inona no raikipohy ho an\'ny énergie cinétique E_c ?',
        options: ['m · g · h', '1/2 · m · v²', 'm · v', '1/2 · k · x'],
        correctOptionIndex: 1,
        explanation: 'E_c = 1/2 · m · v².'
      }
    ]
  },
  {
    id: 'quiz-term-2',
    title: 'Quiz Malagasy & Tantara - Baccalauréat',
    level: 'Terminale',
    seriesList: ['A', 'L', 'OSE'],
    subjectId: 'malagasy',
    durationMinutes: 8,
    questions: [
      {
        id: 'qm1',
        question: 'Iza no mpanoratra ny boky "Sombiny" sy ny tononkalo maro fantatra amin\'ny haitsoratra Malagasy?',
        options: ['Rado', 'JJ Rabearivelo', 'Ny Avana Ramanantoanina', 'Dox'],
        correctOptionIndex: 0,
        explanation: 'Rado (Georges Andriamanantena) dia mpanoratra sy poeta malaza amin\'ny teny Malagasy.'
      },
      {
        id: 'qm2',
        question: 'Oviana no nahazoan\'i Madagasikara ny Fahaleovantena berenty indray?',
        options: ['26 Jona 1960', '14 Oktobra 1958', '29 Marsa 1947', '30 Desambra 1975'],
        correctOptionIndex: 0,
        explanation: 'Ny 26 Jona 1960 no fetim-pirenena ankalazana ny fiverenan\'ny fahaleovantena.'
      }
    ]
  },
  {
    id: 'quiz-term-hg-ose',
    title: 'Quiz Officiel Terminale OSE - Histoire & Géographie (10 Questions)',
    level: 'Terminale',
    seriesList: ['OSE', 'A', 'Toutes'],
    subjectId: 'histogeo',
    durationMinutes: 15,
    questions: [
      {
        id: 'q-hg-1',
        question: 'En quelle année la doctrine Truman fondant le "containment" (endigment) du communisme a-t-elle été énoncée ?',
        options: ['1945', '1947', '1953', '1962'],
        correctOptionIndex: 1,
        explanation: 'La doctrine Truman a été présentée en mars 1947 au Congrès américain.'
      },
      {
        id: 'q-hg-2',
        question: 'Quel événement survenu le 9 novembre 1989 symbolise la chute imminente du bloc soviétique ?',
        options: ['La crise des missiles de Cuba', 'Le blocus de Berlin', 'La chute du Mur de Berlin', 'La signature des accords SALT I'],
        correctOptionIndex: 2,
        explanation: 'La chute du Mur de Berlin le 9 novembre 1989 a entraîné l\'effondrement du bloc communiste européen.'
      },
      {
        id: 'q-hg-3',
        question: 'Quel parti politique fondé en 1946 réclamait pacifiquement l\'indépendance de Madagascar par les urnes ?',
        options: ['PADESM', 'MDRM', 'PSD', 'AREMA'],
        correctOptionIndex: 1,
        explanation: 'Le MDRM (Mouvement Démocratique de la Rénovation Malgache) luttait pour la souveraineté nationale.'
      },
      {
        id: 'q-hg-4',
        question: 'Vrai ou Faux : L\'insurrection du 29 Mars 1947 a débuté simultanément dans toute l\'île de Madagascar.',
        options: ['Vrai', 'Faux'],
        correctOptionIndex: 1,
        explanation: 'Faux : L\'insurrection a éclaté principalement sur la côte Est et la falaise orientale (Moramanga, Manakara, Fenerive-Est).'
      },
      {
        id: 'q-hg-5',
        question: 'À quelle date la République Malgache a-t-elle été officiellement proclamée (autonomie interne) ?',
        options: ['29 mars 1947', '14 octobre 1958', '26 juin 1960', '30 décembre 1975'],
        correctOptionIndex: 1,
        explanation: 'La République Malgache est proclamée le 14 octobre 1958 au sein de la Communauté française.'
      },
      {
        id: 'q-hg-6',
        question: 'Qui fut le premier Président de la République Malgache de 1960 à 1972 ?',
        options: ['Didier Ratsiraka', 'Philibert Tsiranana', 'Albert Zafy', 'Marc Ravalomanana'],
        correctOptionIndex: 1,
        explanation: 'Philibert Tsiranana dirigera la Ière République jusqu\'aux événements du « Rotaka » en mai 1972.'
      },
      {
        id: 'q-hg-7',
        question: 'Quelle est la définition scientifique du modèle de la Transition Démographique ?',
        options: [
          'Passage d\'un régime de faible mortalité à forte natalité',
          'Passage d\'un régime traditionnel (fortes natalité et mortalité) à un régime moderne (faibles natalité et mortalité)',
          'Migration massive de la population rurale vers la capitale',
          'Augmentation continue du taux de chômage en milieu urbain'
        ],
        correctOptionIndex: 1,
        explanation: 'La transition démographique modélise la baisse successive de la mortalité puis de la natalité.'
      },
      {
        id: 'q-hg-8',
        question: 'Quel secteur économique emploie plus de 70% de la population active à Madagascar ?',
        options: ['Secteur primaire (Agriculture, Élevage, Pêche)', 'Secteur secondaire (Mines, Industries)', 'Secteur tertiaire (Banques, Tourisme)', 'Secteur quaternaire (Technologies)'],
        correctOptionIndex: 0,
        explanation: 'Le secteur primaire demeure le premier employeur du pays, malgré son faible taux de mécanisation.'
      },
      {
        id: 'q-hg-9',
        question: 'Quel produit agricole représente le premier poste d\'exportation en valeur pour Madagascar ?',
        options: ['Le riz pluvial', 'La vanille naturelle', 'Le café Robusta', 'Le manioc'],
        correctOptionIndex: 1,
        explanation: 'Madagascar produit près de 80% de la vanille bourbon mondiale (région SAVA).'
      },
      {
        id: 'q-hg-10',
        question: 'Comment appelle-t-on la forme spécifique d\'érosion en cratère qui dégrade le relief des Hautes Terres malgaches ?',
        options: ['Le Tavy', 'Le Lavaka', 'Le Karst', 'La Caldeira'],
        correctOptionIndex: 1,
        explanation: 'Le Lavaka est le nom malgache donné à cette forme d\'érosion régressive sous l\'effet du ruissellement.'
      }
    ]
  },
  {
    id: 'quiz-term-ses-ose',
    title: 'Quiz Officiel Terminale OSE - Sciences Économiques et Sociales (10 Questions)',
    level: 'Terminale',
    seriesList: ['OSE', 'Toutes'],
    subjectId: 'ses',
    durationMinutes: 15,
    questions: [
      {
        id: 'q-ses-1',
        question: 'Comment définit-on la croissance économique ?',
        options: [
          'Une augmentation ponctuelle des prix sur les marchés',
          'Une augmentation durable et soutenue de la production de biens et services mesurée par le PIB réel',
          'Une réduction du déficit budgétaire de l\'État',
          'Une hausse du taux d\'intérêt bancaire'
        ],
        correctOptionIndex: 1,
        explanation: 'La croissance économique est l\'augmentation cumulative de la production mesurée par l\'évolution du PIB en volume.'
      },
      {
        id: 'q-ses-2',
        question: 'Quelle est la différence fondamentale entre croissance extensive et croissance intensive ?',
        options: [
          'La croissance extensive repose sur l\'endettement, l\'intensive sur l\'épargne',
          'La croissance extensive résulte de la hausse du volume des facteurs (L et K), l\'intensive d\'une hausse de la productivité (PGF)',
          'La croissance extensive concerne l\'agriculture, l\'intensive les services',
          'Il n\'y a aucune différence'
        ],
        correctOptionIndex: 1,
        explanation: 'L\'accroissement de la PGF (Productivité Globale des Facteurs) caractérise la croissance intensive.'
      },
      {
        id: 'q-ses-3',
        question: 'Selon Joseph Schumpeter, quel mécanisme est au cœur de la dynamique du capitalisme ?',
        options: [
          'La baisse tendancielle du taux de profit',
          'La destruction créatrice portée par l\'innovation',
          'La fixation administrative des prix',
          'La stagnation séculaire'
        ],
        correctOptionIndex: 1,
        explanation: 'La destruction créatrice élimine les activités anciennes au profit d\'innovations plus productives.'
      },
      {
        id: 'q-ses-4',
        question: 'Qui est à l\'origine du principe des « avantages comparatifs » en économie internationale ?',
        options: ['Karl Marx', 'Adam Smith', 'David Ricardo', 'John Maynard Keynes'],
        correctOptionIndex: 2,
        explanation: 'David Ricardo a démontré en 1817 que chaque nation gagne à se spécialiser là où son avantage relatif est maximal.'
      },
      {
        id: 'q-ses-5',
        question: 'Que signifie l\'adage monétaire « Les crédits font les dépôts » ?',
        options: [
          'Les banques doivent attendre que les ménages déposent de l\'argent avant de prêter',
          'Les banques commerciales créent de la monnaie scripturale ex nihilo lors de l\'octroi de crédits',
          'L\'État imprime des billets pour remplir les coffres bancaires',
          'Les dépôts bancaires sont rémunérés au taux directeur'
        ],
        correctOptionIndex: 1,
        explanation: 'Les banques commerciales de second rang créent de la nouvelle monnaie par simple inscription au compte de l\'emprunteur.'
      },
      {
        id: 'q-ses-6',
        question: 'Quel est l\'objectif prioritaire de la politique monétaire menée par la Banky Foiben\'i Madagasikara (BFM) ?',
        options: [
          'Financer directement les entreprises privées',
          'Garantir la stabilité des prix en luttant contre l\'inflation',
          'Fixer le salaire minimum interprofessionnel garanti (SMI)',
          'Subventionner les exportations de vanille'
        ],
        correctOptionIndex: 1,
        explanation: 'La stabilité du niveau général des prix et la confiance dans la monnaie nationale (Ariary) constituent la mission première de la BFM.'
      },
      {
        id: 'q-ses-7',
        question: 'Qu\'est-ce que le "protectionnisme éducateur" théorisé par Friedrich List ?',
        options: [
          'L\'interdiction permanente de toutes les importations',
          'Une protection douanière temporaire des industries nationales naissantes jusqu\'à leur maturité compétitive',
          'Une taxe sur l\'apprentissage scolaire',
          'Un accord de libre-échange total avec l\'Union Européenne'
        ],
        correctOptionIndex: 1,
        explanation: 'Le protectionnisme éducateur vise à donner le temps aux industries naissantes d\'atteindre des économies d\'échelle.'
      },
      {
        id: 'q-ses-8',
        question: 'Comment se calcule le solde de la balance commerciale d\'un pays ?',
        options: [
          'PIB - Dépenses publiques',
          'Valeur des Exportations (X) - Valeur des Importations (M)',
          'Recettes fiscales - Dépenses budgétaires',
          'Masse monétaire M3 - Crédits à l\'économie'
        ],
        correctOptionIndex: 1,
        explanation: 'Le solde commercial = Exportations de marchandises - Importations de marchandises (X - M).'
      },
      {
        id: 'q-ses-9',
        question: 'Selon la théorie de la croissance endogène de Robert Lucas, quel type de capital est un moteur essentiel du développement ?',
        options: ['Le capital foncier', 'Le capital humain (éducation, compétences, santé)', 'Le capital spéculatif', 'Le capital or'],
        correctOptionIndex: 1,
        explanation: 'Robert Lucas (1988) a mis en évidence le rôle central de l\'accumulation du capital humain dans la croissance auto-entretenue.'
      },
      {
        id: 'q-ses-10',
        question: 'Quel accord commercial préférentiel permet aux entreprises franches de Madagascar d\'exporter sans droits de douane vers les États-Unis ?',
        options: ['L\'AGOA (African Growth and Opportunity Act)', 'L\'Accord de Schengen', 'Le Mercosur', 'L\'Accord de Bretton Woods'],
        correctOptionIndex: 0,
        explanation: 'L\'AGOA est la loi américaine favorisant l\'accès au marché des produits confectionnés en Afrique subsaharienne.'
      }
    ]
  }
];

export const INITIAL_BAC_PAPERS: BacPaper[] = [
  {
    id: 'bac-2025-ses-ose',
    year: 2025,
    level: 'Terminale',
    series: 'OSE',
    subjectId: 'ses',
    title: 'Sujet officiel type BAC 2025 - Sciences Économiques et Sociales (Série OSE)',
    difficulty: 'hard',
    paperText: `BACCALAURÉAT DE L'ENSEIGNEMENT GÉNÉRAL - SÉRIE OSE
ÉPREUVE : SCIENCES ÉCONOMIQUES ET SOCIALES (Coefficient : 6 - Durée : 4 heures)

PREMIÈRE PARTIE : QUESTIONS DE COURS ET ANALYSE DE DOCUMENTS (10 points)
1) Définissez la notion de Productivité Globale des Facteurs (PGF) et montrez son rôle dans le processus de croissance intensive. (3 points)
2) Document : Tableau d'évolution du PIB et de l'inflation à Madagascar (2019-2024).
   a) Distinguez la croissance du PIB en valeur (nominal) de la croissance du PIB en volume (réel). (2 points)
   b) Pourquoi la maîtrise de l'inflation par la Banque Centrale est-elle indispensable pour préserver le pouvoir d'achat des ménages malgaches ? (3 points)
3) Rappelez les trois fonctions économiques traditionnelles de la monnaie. (2 points)

DEUXIÈME PARTIE : DISSERTATION ÉCONOMIQUE (10 points)
Sujet au choix :
Sujet 1 : Dans quelle mesure l'ouverture au commerce international et la participation aux chaînes de valeur mondiales constituent-elles une opportunité pour l'industrialisation de Madagascar ?
Sujet 2 : Montrez comment l'accumulation des différentes formes de capitaux (physique, humain, public, technologique) et la qualité des institutions favorisent un développement économique durable.`,
    correctionText: `CORRIGÉ TYPE DÉTAILLÉ DU BACCALAURÉAT OSE - SCIENCES ÉCONOMIQUES ET SOCIALES :

PREMIÈRE PARTIE (10 points) :
1) PGF et Croissance Intensive :
- Définition : La PGF mesure l'efficacité globale avec laquelle sont combinés les facteurs travail (L) et capital (K). Elle correspond au résidu de Solow.
- Rôle : Elle traduit l'impact du progrès technique, de l'organisation du travail et de l'innovation. Contrairement à la croissance extensive (qui bute sur les rendements décroissants), les gains de PGF permettent d'augmenter la production sans augmenter proportionnellement les coûts.

2) Analyse économique :
a) PIB nominal vs PIB réel :
- Le PIB nominal (en valeur) est calculé aux prix courants de l'année considérée, ce qui inclut l'effet de l'inflation.
- Le PIB réel (en volume) déflate la valeur par l'indice des prix pour mesurer l'évolution réelle des quantités produites : PIB réel = (PIB nominal / Indice des prix) × 100.
b) Inflation et Pouvoir d'achat :
- L'inflation réduit le pouvoir d'achat de la monnaie (Ariary), pénalisant surtout les ménages à revenus modestes.
- La Banky Foiben'i Madagasikara (BFM) utilise ses taux directeurs pour freiner l'excès de crédit et stabiliser le taux de change afin de limiter l'inflation importée (carburants, riz).

3) Les trois fonctions de la monnaie :
- Unité de compte (étalon de valeur pour mesurer et comparer les prix).
- Intermédiaire des échanges (règle les transactions et supprime la double coïncidence des désirs du troc).
- Réserve de valeur (permet de différer la consommation dans le temps).

DEUXIÈME PARTIE (10 points) : Grille d'évaluation de la Dissertation (Sujet 1) :
- Introduction : Définition de la mondialisation et de l'industrialisation. Problématique : Comment transformer l'insertion commerciale en levier d'industrialisation pérenne ?
- Axe I : Les opportunités du commerce international (accès aux marchés d'exportation via l'AGOA et la SADC, création d'emplois dans les zones franches, transfert de technologies et IDE).
- Axe II : Les défis et limites pour Madagascar (dépendance aux matières premières brutes à faible valeur ajoutée, dégradation des termes de l'échange, nécessité d'un protectionnisme éducateur ciblé pour protéger l'agro-industrie naissante).
- Conclusion : L'ouverture commerciale doit être accompagnée d'investissements massifs dans les infrastructures (énergie, routes, ports) et le capital humain.`
  },
  {
    id: 'bac-2025-hg-ose',
    year: 2025,
    level: 'Terminale',
    series: 'OSE',
    subjectId: 'histogeo',
    title: 'Sujet officiel type BAC 2025 - Histoire-Géographie Série OSE',
    difficulty: 'hard',
    paperText: `BACCALAURÉAT SÉRIE OSE - HISTOIRE-GÉOGRAPHIE

PREMIÈRE PARTIE : HISTOIRE (10 points)
Sujet : La crise de mai 1972 à Madagascar et le tournant de la Deuxième République.
1) Présentez les causes profondes et immédiates du mouvement estudiantin de Mai 1972 (« Rotaka »). (4 points)
2) Analysez les ruptures politiques et économiques intervenues sous la Deuxième République (1975-1991) dirigée par le Président Didier Ratsiraka (Boky Mena, nationalisations, malgachisation). (6 points)

DEUXIÈME PARTIE : GÉOGRAPHIE (10 points)
Sujet : Les contraintes de la croissance démographique et de l'urbanisation à Madagascar.
1) À partir de vos connaissances, montrez comment la croissance démographique rapide impacte les ressources naturelles (forêts, sols) à Madagascar. (5 points)
2) Expliquez les défis d'aménagement du territoire posés par la macrocéphalie de la capitale Antananarivo. (5 points)`,
    correctionText: `CORRIGÉ TYPE DÉTAILLÉ DU BACCALAURÉAT OSE HISTOIRE-GÉOGRAPHIE :

HISTOIRE :
1) Causes du Mai 1972 :
- Causes profondes : contestation de l'hégémonie économique et culturelle française maintenant les accords de coopération de 1960 perçus comme néocoloniaux ; mécontentement paysan dans le Sud (KIM 1971).
- Cause immédiate : grève des étudiants en médecine de Befelatanana réclamant la révision des équivalences de diplômes et la malgachisation des programmes d'enseignement.
2) Tournant de la Deuxième République (1975-1991) :
- Rupture politique : adoption de la Charte de la Révolution Socialiste Malgache (Boky Mena), alliance avec le bloc soviétique.
- Rupture économique : nationalisation des banques, assurances, compagnies pétrolières et création des sociétés d'État (SOLIMA, BTM).
- Bilan : crise économique dans les années 1980 conduisant au Plan d'Ajustement Structurel du FMI.

GÉOGRAPHIE :
1) Impact démographique sur l'environnement :
- Pression foncière entraînant la pratique généralisée du Tavy (brûlis) et la déforestation progressive.
- Érosion massive des sols (formation des Lavaka) et ensablement des rizicoles en contrebas.
2) Macro-céphalie d'Antananarivo et Aménagement :
- Concentration de plus de 3 millions d'habitants par exode rural, provoquant saturation des transports, problème de gestion des déchets et inondations des bas-quartiers lors des saisons cycloniques.
- Nécessité de décentraliser vers les chefs-lieux des 24 Régions de Madagascar et de moderniser les axes routiers nationaux (RN2, RN7, RN4).`
  },
  {
    id: 'bac-2025-math-d',
    year: 2025,
    level: 'Terminale',
    series: 'D',
    subjectId: 'maths',
    title: 'Sujet officiel BAC 2025 - Mathématiques Série D',
    difficulty: 'hard',
    paperText: `EXERCICE 1 (4 points) - Probabilités
Ao anaty harona iray dia misy baolina 10: 4 mena sy 6 manga.
Tsoahina indray miara-mandeha ny baolina 3.
1) Kajio ny isa azo amboarina (Card Ω).
2) Kajio ny probabilité hahazoana baolina mena 2 sy manga 1.

PROBLÈME (12 points) - Étude de fonction
Aoka f(x) = (x - 1) · e^x + 2.
1) Kajio ny limits eo amin'ny -∞ sy +∞.
2) Kajio ny f'(x) ary ataovy ny tableau de variations.
3) Mitadiava ny fampitoviana ny tanjanta (T) eo amin'ny x = 0.
4) Amboary ny sarin-davitra C_f.`,
    correctionText: `LOHAHEVITRA sy FARA-KASOAVANA (Correction Officielle):

EXERCICE 1:
1) Card Ω = C(10, 3) = (10 × 9 × 8) / (3 × 2 × 1) = 120.
2) P(2 mena, 1 manga) = [C(4, 2) × C(6, 1)] / 120 = (6 × 6) / 120 = 36 / 120 = 3/10 = 0.3 (30%).

PROBLÈME:
1) lim (x→-∞) (x-1)e^x + 2 = 0 + 2 = 2. (Asymptote horizontale y = 2).
lim (x→+∞) (x-1)e^x + 2 = +∞.
2) f'(x) = 1·e^x + (x-1)e^x = x · e^x.
Koa satria e^x > 0 foana, ny famantarana ny f'(x) dia mitovy amin'ny x:
- Raha x < 0: f'(x) < 0 (f midina).
- Raha x > 0: f'(x) > 0 (f miakatra).
Minimum local eo amin'ny x = 0 miaraka amin'ny f(0) = (0-1)(1) + 2 = 1.
3) Tanjanta T: y = f'(0)(x - 0) + f(0) = 0(x) + 1 => y = 1.`
  },
  {
    id: 'bac-2024-pc-c',
    year: 2024,
    level: 'Terminale',
    series: 'C',
    subjectId: 'physique',
    examType: 'BAC',
    title: 'Sujet officiel BAC 2024 - Physique-Chimie Série C',
    difficulty: 'hard',
    paperText: `EXERCICE DE CHIMIE (6 points):
Dilation sy Ph d'une solution acide faible CH3COOH.
Kajio ny pH amin'ny solution C = 10^-2 mol/L raha K_a = 1.8 × 10^-5.

EXERCICE DE PHYSIQUE (14 points):
Circuit RLC en régime sinusoïdal forcé.
U(t) = 220 √2 cos(100 π t).
R = 50 Ω, L = 0.2 H, C = 10 μF.
1) Kajio ny impédance Z an'ny circuit.
2) Fantaro raha misy résonance d'intensité.`,
    correctionText: `CORRECTION OFFICIELLE BAC 2024 PHYSIQUE C:
1) Impédance Z = √[ R² + (Lω - 1/(Cω))² ].
ω = 100 π ≈ 314.16 rad/s.
Lω = 0.2 × 314.16 = 62.83 Ω.
1/(Cω) = 1 / (10^-5 × 314.16) = 318.3 Ω.
Z = √[ 50² + (62.83 - 318.3)² ] = √[ 2500 + (-255.47)² ] ≈ 260.3 Ω.
2) Tsy misy résonance satria Lω ≠ 1/(Cω).`
  },
  {
    id: 'bepc-2025-maths',
    year: 2025,
    level: '3e',
    series: 'Toutes',
    subjectId: 'maths',
    examType: 'BEPC',
    title: 'Sujet officiel BEPC 2025 - Mathématiques (Madagascar)',
    difficulty: 'medium',
    paperText: `FANADINANA BEPC MADAGASIKARA - MATHÉMATIQUES (KILASY 3e)
Laharam-potoana : 2 ora | Coefficient : 3

ASA 1 : ALGEBRA SY KAJY (6 points)
1) Kajio sy tsotsory ireto isa ireto :
   A = (3/4 - 1/2) ÷ 5/6
   B = √(75) - 2√(12) + √(27)
2) Vahao ao amin'ny R ny fampitoviana :
   (2x - 3)(x + 4) = 0
3) Vahao ny tsy fampitoviana :
   3x - 5 ≤ 7 + x

ASA 2 : GÉOMÉTRIE (8 points)
Soa ny telolafy ABC mahitsy eo amin'ny A ka AB = 6 cm sy AC = 8 cm.
1) Kajio ny halavan'ny BC (Ampiasao ny Théorème de Pythagore).
2) Kajio ny cos(ABC) sy ny sin(ABC).
3) Aoka H ny projection orthogonale an'i A eo amin'ny (BC). Kajio ny halavan'ny AH.

ASA 3 : STATISTIKA SY OLANA (6 points)
Nisy fanadihadiana natao tamin'ny mpianatra miisa 40 momba ny isa azon'izy ireo tamin'ny fanadinana andrana.
Kajio ny salan'isa (moyenne générale) sy ny isan-jaton'ireo nahazo isa mihoatra ny 10/20.`,
    correctionText: `VALINY SY FARA-KASOAVANA OFISIALY BEPC MATHÉMATIQUES :

ASA 1 :
1) A = (3/4 - 2/4) ÷ 5/6 = (1/4) × (6/5) = 6/20 = 3/10 (0.3).
   B = √(25×3) - 2√(4×3) + √(9×3) = 5√3 - 4√3 + 3√3 = 4√3.
2) (2x - 3)(x + 4) = 0 => 2x - 3 = 0 na x + 4 = 0 => x = 3/2 na x = -4. S = {-4 ; 3/2}.
3) 3x - x ≤ 7 + 5 => 2x ≤ 12 => x ≤ 6. S = ]-∞ ; 6].

ASA 2 :
1) BC² = AB² + AC² = 6² + 8² = 36 + 64 = 100 => BC = √100 = 10 cm.
2) cos(ABC) = AB / BC = 6 / 10 = 0.6.
   sin(ABC) = AC / BC = 8 / 10 = 0.8.
3) Velaran'ny ABC = (AB × AC) / 2 = (6 × 8) / 2 = 24 cm².
   Velarana koa = (BC × AH) / 2 => 24 = (10 × AH) / 2 => AH = 48 / 10 = 4.8 cm.

ASA 3 :
Fikajiana ny salan'isa : Moyenne = (∑ ni × xi) / N.
Famaritana ny fahombiazana : Taux de réussite = (Nombres ≥ 10 / 40) × 100.`
  },
  {
    id: 'bepc-2025-malagasy',
    year: 2025,
    level: '3e',
    series: 'Toutes',
    subjectId: 'malagasy',
    examType: 'BEPC',
    title: 'Sujet officiel BEPC 2025 - Teny Malagasy (3e)',
    difficulty: 'medium',
    paperText: `FANADINANA BEPC - TENY SY HAITSORATRA MALAGASY
Faharetany : 2 ora | Laharana voalohany

I- LAHATSORATRA : "Ny Fihavanana sy ny Fampandrosoana"
Ny fihavanana no fototry ny fiarahamonina malagasy hatramin'ny ela. Ny fihavanana tsy firaisana tsikombakomba amin'ny ratsy fa fifanampiana amin'ny asa soa sy fampandrosoana ny tanàna.

II- FANONTANIANA :
1) Famakafakana ny laha-tsoratra (4 pts) :
   - Inona no hevi-dehibe ambaran'ny mpanoratra momba ny fihavanana ?
   - Hazavao ny teny hoe "firaisana tsikombakomba".
2) Haifiteny sy Ritsoka (6 pts) :
   - Omeo ny fototeny sy ny tsirin-teny amin'ny teny hoe "fampandrosoana".
   - Lazao ny sokajin'asa sy ny endriky ny fehezanteny : "Manampy ny mpiara-belona ny olona vanona."
3) Famoronana (10 pts) :
   Manao lahatsoratra fohy (andalana 15) maneho ny anjara toeran'ny tanora amin'ny fiarovana ny tontolo iainana sy ny firaisankina eo an-tanàna.`,
    correctionText: `TOROLALANA SY FARA-KASOAVANA OFISIALY MALAGASY BEPC :

I- Famakafakana (4 pts) :
- Hevi-dehibe : Ny fihavanana marina dia mifototra amin'ny asa fanasoavana sy fampandrosoana, fa tsy fanakonana fahadisoana.
- Fanazavana : "firaisana tsikombakomba" = fifanarahana miafina hanao zavatra mifanohitra amin'ny lalàna na ny fahamarinana.

II- Haifiteny (6 pts) :
- "Fampandrosoana" : Fototeny = "roso". Tsirin-teny = Fam- (tovona) sy -ana (tovana) miaraka amin'ny fiovam-peo (-and-).
- Karazam-pehezanteny : Fehezanteny tsotra milaza (déclarative affirmative), ahitana lazaina (ny olona vanona), matoanteny (manampy), sy fenoina (ny mpiara-belona).

III- Famoronana (10 pts) :
- Firafitry ny asa : Fampidirana (2 pts), Votoatiny miaraka amin'ny ohatra velona (6 pts), Famaranana sy hafatra ho an'ny tanora (2 pts).
- Fanajana ny tsipelina sy ny firafitry ny teny malagasy madio.`
  }
];

export const INITIAL_MEN_ARTICLES: MenArticle[] = [
  {
    id: 'men-1',
    title: 'Dati-n\'ny Fanadinana BACC 2026 ary tetiandrom-pampianarana',
    titleFr: 'Dates officielles des examens BACC 2026 et calendrier scolaire',
    date: '2026-02-15',
    category: 'BAC',
    summary: 'Nivoaka amin\'ny fomba ofisialy ny tetiandron\'ny fanadinana Baccalauréat 2026 ho an\'ny ambaratonga rehetra manerana an\'i Madagasikara.',
    summaryFr: 'Le Ministère de l\'Éducation Nationale a publié les dates officielles des épreuves du Baccalauréat 2026 pour toutes les séries.',
    source: 'Ministère de l\'Éducation Nationale - Madagascar',
    originalUrl: 'https://www.education.gov.mg',
    isOfficial: true
  },
  {
    id: 'men-2',
    title: 'Fandaharana vaovao Série OSE (Organisation, Société, Économie)',
    titleFr: 'Nouveau programme pour la Série OSE',
    date: '2026-01-20',
    category: 'Réformes',
    summary: 'Toromarika momba ny fandaharam-pianarana vaovao OSE ho an\'ny kilasy Première sy Terminale.',
    summaryFr: 'Directives pédagogiques relatives au nouveau programme OSE pour les classes de Première et Terminale.',
    source: 'Direction Générale de la Pédagogie - MEN',
    originalUrl: 'https://www.education.gov.mg/dgp',
    isOfficial: true
  },
  {
    id: 'men-3',
    title: 'Fanampiana sy fitaovana ho an\'ny mpiadina BACC',
    titleFr: 'Ressources et annales gratuites pour candidats au BACC',
    date: '2026-01-10',
    category: 'Examens',
    summary: 'Fampahafantarana ny fitaovam-pampianarana maimaimpoana sy taratasy fanadinana taloha azon\'ny mpiadina ampiasaina.',
    summaryFr: 'Mise à disposition gratuite de sujets types et annales pour aider la préparation des élèves.',
    source: 'MEN Madagascar',
    originalUrl: 'https://www.education.gov.mg',
    isOfficial: true
  }
];

export const INITIAL_TEACHERS: TeacherProfile[] = [
  {
    id: 'prof-jean',
    name: 'Jean Rakoto',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    biography: 'Mpanabe sy mpampianatra teny Anglisy efa ho 12 taona. Manampy ireo tanora sy mpiadina hahay hiteny (speaking) sy hanomana fanadinana iraisam-pirenena.',
    subjects: ['Anglais', 'Communication'],
    languages: ['Anglais', 'Français', 'Malagasy'],
    experience: '12 ans d\'enseignement en Lycée et Centres de langues',
    coursesCount: 3,
    studentsCount: 142,
    rating: 4.9,
    contactEmail: 'jean.rakoto@tafita.mg',
    contactPhone: '+261 34 11 222 33'
  },
  {
    id: 'prof-hanta',
    name: 'Mme Hanta Ramino',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    biography: 'Professeur certifié de Français et Philosophie en Lycée public. Spécialiste de la dissertation littéraire et des épreuves du Baccalauréat.',
    subjects: ['Français', 'Philosophie'],
    languages: ['Français', 'Malagasy'],
    experience: '15 ans d\'expérience de jury au Baccalauréat',
    coursesCount: 2,
    studentsCount: 98,
    rating: 4.8,
    contactEmail: 'hanta.ramino@tafita.mg',
    contactPhone: '+261 32 44 555 66'
  },
  {
    id: 'prof-andry',
    name: 'Andry Ravelojaona',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    biography: 'Mpampianatra Matematika ao amin\'ny Lycée. Mpanomana ny kilasy Terminale C, D ary S amin\'ny fanadinana BACC.',
    subjects: ['Mathématiques', 'Physique'],
    languages: ['Français', 'Malagasy'],
    experience: '9 ans d\'enseignement et encadrement BACC',
    coursesCount: 4,
    studentsCount: 215,
    rating: 4.9,
    contactEmail: 'andry.ravelo@tafita.mg'
  },
  {
    id: 'prof-nirina',
    name: 'Pr. Nirina Randria',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    biography: 'Mpampianatra sy mpikaroka momba ny Toe-karena sy ny Fiarahamonina (SES). Manam-pahaizana manokana momba ny fandaharana vaovao Série OSE.',
    subjects: ['SES', 'Histoire-Géo'],
    languages: ['Français', 'Malagasy'],
    experience: '10 ans d\'expertise pédagogique et réforme OSE',
    coursesCount: 2,
    studentsCount: 160,
    rating: 4.7,
    contactEmail: 'nirina.randria@tafita.mg'
  },
  {
    id: 'prof-toky',
    name: 'Toky Andriatsitohaina',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
    biography: 'Injeniera amin\'ny Haikajy mirindra (Informatique) sy Mpampianatra fitaovana nomerika (Excel, Web, Canva).',
    subjects: ['Informatique', 'Numérique', 'Bureautique'],
    languages: ['Malagasy', 'Français', 'Anglais'],
    experience: '8 ans de formation professionnelle',
    coursesCount: 3,
    studentsCount: 310,
    rating: 4.9,
    contactEmail: 'toky.dev@tafita.mg'
  }
];

export const INITIAL_ONLINE_COURSES: OnlineCourse[] = [
  {
    id: 'course-en-speaking',
    title: 'English Speaking — Débutant & Intermédiaire',
    titleFr: 'Pratique de l\'Anglais Oral & Conversation',
    description: 'Cours interactif complet pour débloquer votre expression orale en anglais. Pratique axée sur les situations réelles, les présentations et les entretiens.',
    teacherId: 'prof-jean',
    teacherName: 'Jean Rakoto',
    teacherPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    teacherRole: 'Professeur d\'Anglais certifié',
    category: 'langues',
    subject: 'Anglais',
    level: 'Débutant à Intermédiaire',
    series: 'Toutes',
    language: 'Anglais',
    courseType: 'hybrid',
    isPaid: false,
    priceAriary: 0,
    currency: 'MGA',
    duration: '6 semaines • 12 sessions',
    maxStudents: 50,
    studentsCount: 142,
    coverImage: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&auto=format&fit=crop&q=80',
    topics: [
      'Speaking & Fluency',
      'Vocabulary & Common Idioms',
      'Grammar in Context',
      'Pronunciation & Accent Training',
      'Daily Conversation & Exam Prep'
    ],
    chapters: [
      { id: 'ch-1', title: 'Session 1 : Self-introduction & Breaking the ice', duration: '45 min', description: 'Apprendre à se présenter avec aisance' },
      { id: 'ch-2', title: 'Session 2 : Daily Routines & Expressing Preferences', duration: '50 min', description: 'Vocabulaire du quotidien et verbes d\'action' },
      { id: 'ch-3', title: 'Session 3 : Past Experiences & Storytelling', duration: '55 min', description: 'Maîtriser les temps du passé en parlant' },
      { id: 'ch-4', title: 'Session 4 : Expressing Opinions & Debating', duration: '60 min', description: 'Argumenter et donner son point de vue' }
    ],
    externalMeetingUrl: 'https://meet.google.com/tafita-english-live',
    liveSchedule: {
      date: 'Sabotsy 21 Febroary 2026',
      startTime: '09:00',
      endTime: '10:30',
      maxParticipants: 50,
      meetingUrl: 'https://meet.google.com/tafita-english-live',
      platform: 'google_meet'
    },
    rating: 4.9,
    ratingCount: 38,
    isTeacherCreated: true,
    createdAt: '2026-02-01T08:00:00.000Z',
    status: 'published'
  },
  {
    id: 'course-fr-dissertation',
    title: 'Méthodologie de la Dissertation & Commentaire BACC',
    titleFr: 'Réussir l\'épreuve de Français et Philosophie au Baccalauréat',
    description: 'Programme structuré pour maîtriser l\'analyse des sujets, l\'élaboration d\'un plan détaillé (thèse, antithèse, synthèse) et la rédaction sans fautes.',
    teacherId: 'prof-hanta',
    teacherName: 'Mme Hanta Ramino',
    teacherPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    teacherRole: 'Professeur de Lettres & Jury BACC',
    category: 'scolaires',
    subject: 'Français & Philosophie',
    level: 'Terminale',
    series: 'Toutes (OSE, L, S, C, D)',
    language: 'Français',
    courseType: 'recorded',
    isPaid: true,
    priceAriary: 15000,
    currency: 'MGA',
    duration: '4 modules • 8 vidéos + fiches PDF',
    maxStudents: 100,
    studentsCount: 98,
    coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format&fit=crop&q=80',
    topics: [
      'Analyse des mots-clés du sujet',
      'Problématique et construction du plan',
      'Citations littéraires et philosophiques',
      'Transition et conclusion percutante'
    ],
    chapters: [
      { id: 'ch-fr-1', title: 'Module 1 : Décortiquer la consigne et le libellé', duration: '40 min' },
      { id: 'ch-fr-2', title: 'Module 2 : Le plan dialectique pas à pas', duration: '55 min' },
      { id: 'ch-fr-3', title: 'Module 3 : Rédaction de l\'introduction parfaite', duration: '35 min' },
      { id: 'ch-fr-4', title: 'Module 4 : Analyse d\'exemples concrets des sujets 2020-2025', duration: '60 min' }
    ],
    rating: 4.8,
    ratingCount: 26,
    isTeacherCreated: true,
    createdAt: '2026-02-05T10:00:00.000Z',
    status: 'published'
  },
  {
    id: 'course-maths-live-term',
    title: 'Mathématiques Terminale : Fonctions Logarithmes, Exponentielles & Intégrales',
    titleFr: 'Préparation Intensive aux Épreuves de Maths BACC',
    description: 'Cours en direct axé sur la résolution d\'exercices types Bac, les astuces de calcul de limites, dérivées et l\'étude complète de fonctions.',
    teacherId: 'prof-andry',
    teacherName: 'Andry Ravelojaona',
    teacherPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    teacherRole: 'Professeur de Mathématiques Lycée',
    category: 'scolaires',
    subject: 'Mathématiques',
    level: 'Terminale',
    series: 'S, C, D, OSE',
    language: 'Français / Malagasy',
    courseType: 'live',
    isPaid: false,
    priceAriary: 0,
    currency: 'MGA',
    duration: 'Session Live 2h • Exercices corrigés',
    maxStudents: 150,
    studentsCount: 215,
    coverImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80',
    topics: [
      'Étude de fonctions avec Ln et Exp',
      'Calculs de limites indéterminées',
      'Primitives et intégration par parties',
      'Corrigé des annales BACC récentes'
    ],
    chapters: [
      { id: 'ch-m-1', title: 'Partie 1 : Révision des propriétés fondamentales', duration: '30 min' },
      { id: 'ch-m-2', title: 'Partie 2 : Résolution guidée en direct avec les élèves', duration: '60 min' },
      { id: 'ch-m-3', title: 'Partie 3 : Questions-réponses et astuces de calcul', duration: '30 min' }
    ],
    externalMeetingUrl: 'https://meet.google.com/tafita-maths-terminale',
    liveSchedule: {
      date: 'Alahady 22 Febroary 2026',
      startTime: '14:00',
      endTime: '16:00',
      maxParticipants: 150,
      meetingUrl: 'https://meet.google.com/tafita-maths-terminale',
      platform: 'google_meet'
    },
    rating: 4.9,
    ratingCount: 52,
    isTeacherCreated: true,
    createdAt: '2026-02-08T09:00:00.000Z',
    status: 'published'
  },
  {
    id: 'course-ses-ose',
    title: 'Série OSE : Fandrosoana Ara-toekarena & Firafitry ny Tsena',
    titleFr: 'Croissance économique, Mondialisation & Structure sociale',
    description: 'Fandinihana lalina ny fandaharana vaovao Série OSE ho an\'ny kilasy Terminale. Ohatra velona mifanaraka amin\'ny zava-misy eto Madagasikara sy maneran-tany.',
    teacherId: 'prof-nirina',
    teacherName: 'Pr. Nirina Randria',
    teacherPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    teacherRole: 'Spécialiste Économie & Réforme OSE',
    category: 'scolaires',
    subject: 'Sciences Économiques et Sociales (SES)',
    level: 'Terminale',
    series: 'OSE',
    language: 'Français / Malagasy',
    courseType: 'recorded',
    isPaid: false,
    priceAriary: 0,
    currency: 'MGA',
    duration: '5 chapitres • Fiches de synthèse',
    maxStudents: 200,
    studentsCount: 160,
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
    topics: [
      'Sources et limites de la croissance économique',
      'Stratification et mobilité sociale à Madagascar',
      'Commerce international et taux de change',
      'Politiques publiques d\'emploi et de redistribution'
    ],
    chapters: [
      { id: 'ch-s-1', title: 'Toko 1 : Ny fototry ny fitomboana ara-toekarena', duration: '45 min' },
      { id: 'ch-s-2', title: 'Toko 2 : Ny fampiasam-bola sy ny fanavaozana (Innovation)', duration: '50 min' },
      { id: 'ch-s-3', title: 'Toko 3 : Ny fizarana ny harena sy ny hetra', duration: '40 min' },
      { id: 'ch-s-4', title: 'Toko 4 : Famintinana sy fanomanana ny laza adina BACC', duration: '60 min' }
    ],
    rating: 4.7,
    ratingCount: 31,
    isTeacherCreated: true,
    createdAt: '2026-02-10T11:00:00.000Z',
    status: 'published'
  },
  {
    id: 'course-info-excel',
    title: 'Haikajy Nomerika : Fahaizana Excel & Fitaovana Bureautique',
    titleFr: 'Maîtriser Excel de Zéro à Avancé pour Études & Métiers',
    description: 'Fiofanana azo ampiharina avy hatrany amin\'ny tontolon\'ny asa : formulas (SI, RECHERCHEV), tableaux croisés dynamiques, fakana tatitra ara-bola.',
    teacherId: 'prof-toky',
    teacherName: 'Toky Andriatsitohaina',
    teacherPhoto: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
    teacherRole: 'Formateur certifié Informatique & Web',
    category: 'informatique',
    subject: 'Informatique',
    level: 'Tous niveaux',
    series: 'Toutes',
    language: 'Malagasy / Français',
    courseType: 'recorded',
    isPaid: true,
    priceAriary: 20000,
    currency: 'MGA',
    duration: '10 leçons vidéo • Fichiers d\'exercice .xlsx',
    maxStudents: 300,
    studentsCount: 310,
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
    topics: [
      'Base sy firafitry ny tabilao Excel',
      'Formules essentielles & Calculs automatisés',
      'Tableaux croisés dynamiques & Graphiques',
      'Gestion de budget et rapports professionnels'
    ],
    chapters: [
      { id: 'ch-i-1', title: 'Leçon 1 : Interface et raccourcis indispensables', duration: '35 min' },
      { id: 'ch-i-2', title: 'Leçon 2 : Formules logiques (SI, ET, OU) et calculs', duration: '45 min' },
      { id: 'ch-i-3', title: 'Leçon 3 : Tableaux croisés et graphiques clairs', duration: '50 min' },
      { id: 'ch-i-4', title: 'Leçon 4 : Projet pratique : Création d\'un budget complet', duration: '60 min' }
    ],
    rating: 4.9,
    ratingCount: 64,
    isTeacherCreated: true,
    createdAt: '2026-02-11T14:00:00.000Z',
    status: 'published'
  },
  {
    id: 'course-entrepreneuriat-mada',
    title: 'Famoronana Tetikasa sy Fandraharahana eto Madagasikara',
    titleFr: 'Lancer et Gérer son Entreprise ou Activité Génératrice',
    description: 'Dingana marina amin\'ny famoronana orinasa : fitadiavana hevitra mahomby, fanoratana Business Plan tsotra, fisoratana anarana ara-dalàna, ary fivarotana.',
    teacherId: 'prof-toky',
    teacherName: 'Toky Andriatsitohaina',
    teacherPhoto: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
    teacherRole: 'Formateur & Consultant Entrepreneuriat',
    category: 'entrepreneuriat',
    subject: 'Entrepreneuriat',
    level: 'Tous niveaux',
    series: 'Toutes',
    language: 'Malagasy',
    courseType: 'live',
    isPaid: false,
    priceAriary: 0,
    currency: 'MGA',
    duration: 'Session Live Interactive • Support PDF',
    maxStudents: 80,
    studentsCount: 74,
    coverImage: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&auto=format&fit=crop&q=80',
    topics: [
      'Fakafakana ny filàn\'ny tsena eto Madagasikara',
      'Fandrafetana ny Business Model Canvas',
      'Lalàna sy taratasy ilaina (NIF, STAT, RCS)',
      'Fitadiavana mpanjifa sy fampiasana tambazotran-tserasera'
    ],
    chapters: [
      { id: 'ch-e-1', title: 'Dingana 1 : Manomboka amin\'ny hevitra mankany amin\'ny tetikasa', duration: '40 min' },
      { id: 'ch-e-2', title: 'Dingana 2 : Kajy ny renivola ilaina sy ny tombom-barotra', duration: '50 min' },
      { id: 'ch-e-3', title: 'Dingana 3 : Resaka mivantana sy fanontaniana', duration: '30 min' }
    ],
    externalMeetingUrl: 'https://meet.google.com/tafita-entrepreneuriat',
    liveSchedule: {
      date: 'Asabotsy 28 Febroary 2026',
      startTime: '10:00',
      endTime: '12:00',
      maxParticipants: 80,
      meetingUrl: 'https://meet.google.com/tafita-entrepreneuriat',
      platform: 'google_meet'
    },
    rating: 4.8,
    ratingCount: 19,
    isTeacherCreated: true,
    createdAt: '2026-02-12T16:00:00.000Z',
    status: 'published'
  },
  {
    id: 'course-lang-de-a1',
    title: 'Deutsch für Anfänger — Allemand Débutant A1',
    titleFr: 'Apprendre les bases de la langue allemande',
    description: 'Cours de langue complet avec prononciation, grammaire de base, vocabulaire pour études en Allemagne et examens Goethe-Zertifikat A1.',
    teacherId: 'prof-jean',
    teacherName: 'Jean Rakoto',
    teacherPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    teacherRole: 'Professeur de Langues Étrangères',
    category: 'langues',
    subject: 'Allemand',
    level: 'Débutant (A1)',
    series: 'Toutes',
    language: 'Allemand',
    courseType: 'live',
    isPaid: true,
    priceAriary: 25000,
    currency: 'MGA',
    duration: '8 sessions live • Exercices audio',
    maxStudents: 30,
    studentsCount: 28,
    coverImage: 'https://images.unsplash.com/photo-1527866959252-deab85ef7d1b?w=600&auto=format&fit=crop&q=80',
    topics: [
      'Alphabet & Aussprache (Prononciation)',
      'Begrüßung & Sich vorstellen',
      'Grundgrammatik (Verben, Artikel, Kasus)',
      'Hörverstehen & Sprechen'
    ],
    chapters: [
      { id: 'ch-de-1', title: 'Lektion 1 : Hallo! Wie geht\'s?', duration: '50 min' },
      { id: 'ch-de-2', title: 'Lektion 2 : Familie und Freunde', duration: '50 min' },
      { id: 'ch-de-3', title: 'Lektion 3 : Essen, Trinken und Einkaufen', duration: '50 min' }
    ],
    externalMeetingUrl: 'https://meet.google.com/tafita-deutsch-a1',
    liveSchedule: {
      date: 'Alahady 1 Martsa 2026',
      startTime: '10:00',
      endTime: '11:30',
      maxParticipants: 30,
      meetingUrl: 'https://meet.google.com/tafita-deutsch-a1',
      platform: 'google_meet'
    },
    rating: 4.9,
    ratingCount: 14,
    isTeacherCreated: true,
    createdAt: '2026-02-13T10:00:00.000Z',
    status: 'published'
  }
];
