import { EducationalStory, FeedPost } from '../types';

export const INITIAL_STORIES: EducationalStory[] = [
  {
    id: 'story-1',
    authorId: 't-1',
    authorName: 'Prof. Rakotoarisoa',
    authorRole: 'teacher',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    authorBadge: '👨‍🏫 Maths & SES (OSE/S)',
    mediaType: 'gradient',
    bgGradient: 'from-amber-600 via-orange-600 to-rose-700',
    title: '🔴 Live BACC ce soir 19h',
    subtitle: 'Fanomanana manokana Série OSE & S amin\'ny Google Meet !',
    tag: 'Live BACC',
    actionText: 'Midira amin\'ny Live',
    actionTab: 'online-courses',
    createdAt: '2026-08-16T10:00:00Z',
    likesCount: 142
  },
  {
    id: 'story-2',
    authorId: 'admin-men',
    authorName: 'MEN Madagascar',
    authorRole: 'admin',
    authorAvatar: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=150&auto=format&fit=crop&q=80',
    authorBadge: '⭐ Ofisialy MEN',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&auto=format&fit=crop&q=80',
    title: '🎓 Bourses d\'Excellence 2026',
    subtitle: 'Misokatra ny fisoratana anarana ho an\'ny kilasy Terminale sy Licence.',
    tag: 'Bourses 2026',
    actionText: 'Hamaky ny fepetra',
    actionTab: 'news',
    createdAt: '2026-08-16T08:30:00Z',
    likesCount: 389
  },
  {
    id: 'story-3',
    authorId: 't-2',
    authorName: 'Mme Sarah Jenkins',
    authorRole: 'teacher',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    authorBadge: '🇬🇧 English Coach',
    mediaType: 'video',
    mediaUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
    title: '💡 Flash Anglais : 10 Idioms',
    subtitle: 'Fomba fiteny mahatonga ny naoty ho tsara amin\'ny Expression Écrite.',
    tag: 'Flash Anglisy',
    actionText: 'Hijery ny toro-hevitra',
    actionTab: 'online-courses',
    createdAt: '2026-08-16T07:15:00Z',
    likesCount: 95
  },
  {
    id: 'story-4',
    authorId: 't-3',
    authorName: 'Dr. Voahirana SVT',
    authorRole: 'teacher',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    authorBadge: '🧬 Siansa SVT',
    mediaType: 'gradient',
    bgGradient: 'from-emerald-600 via-teal-600 to-cyan-700',
    title: '🌱 Génétique & Méiose',
    subtitle: 'Fomba famahana ny "Brassage inter-chromosomique" amin\'ny 3 minitra.',
    tag: 'Astuce SVT',
    actionText: 'Hamaky ny famintinana',
    actionTab: 'lessons',
    createdAt: '2026-08-15T18:00:00Z',
    likesCount: 210
  },
  {
    id: 'story-5',
    authorId: 'stud-1',
    authorName: 'Rivo (Mpianatra Tle S)',
    authorRole: 'student',
    authorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    authorBadge: '🎓 Mpianatra Lycée',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80',
    title: '📚 Groupe d\'étude en ligne',
    subtitle: 'Manao révision Maths & Physique isaky ny hariva amin\'ny Discord/Meet!',
    tag: 'Entraide',
    actionText: 'Handefa hafatra',
    actionTab: 'home',
    createdAt: '2026-08-15T15:20:00Z',
    likesCount: 78
  },
  {
    id: 'story-6',
    authorId: 't-4',
    authorName: 'M. Hery (Haisoratra)',
    authorRole: 'teacher',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    authorBadge: '🇲🇬 Malagasy & Haisoratra',
    mediaType: 'gradient',
    bgGradient: 'from-purple-600 via-indigo-600 to-blue-700',
    title: '📜 Riba sy Haisoratra',
    subtitle: 'Ireo mpanoratra lehibe tsy maintsy fehezina amin\'ny BACC 2026.',
    tag: 'Malagasy BACC',
    actionText: 'Hijery ny lesona',
    actionTab: 'lessons',
    createdAt: '2026-08-15T12:00:00Z',
    likesCount: 165
  }
];

export const INITIAL_FEED_POSTS: FeedPost[] = [
  {
    id: 'post-1',
    authorId: 't-1',
    authorName: 'Prof. Rakotoarisoa Jean',
    authorRole: 'teacher',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    authorBadge: '👨‍🏫 Mpampianatra BACC OSE & S • 12 taona traikefa',
    type: 'course_ad',
    category: 'courses',
    title: '📢 Fampianarana manokana (Cours de Renforcement BACC 2026) : Maths & SES',
    content: `Salama tompoko ry mpianatra sy ray aman-dreny !
Manokatra fisoratana anarana ho an'ny **Cours en Ligne BACC 2026** manokana ho an'ny kilasy **Terminale Série OSE sy Série S** izahay :

✨ **Ireo votoatiny hianarana :**
1. Fandinihana ny Laza Adina BACC 2018 - 2025 miaraka amin'ny toro-marika fanitsiana.
2. Fomba famakafakana antontan-kevitra ara-toekarena (Tableaux statistiques SES).
3. Fanazavana ny 'Calcul Intégral' sy 'Probabilités' amin'ny fomba tsotra sy mazava.
4. Fizarana Fiche PDF famintinana isaky ny toko.

🗓️ **Fandaharam-potoana :** Isaky ny Asabotsy 15:00 - 17:00 (Mivantana amin'ny Google Meet) + Horonantsary azon'ny mpianatra averina jerena amin'ny fotoana rehetra.`,
    tags: ['#Terminale', '#SerieOSE', '#SerieS', '#MathsBACC', '#SESMadagascar', '#CoursEnLigne'],
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&auto=format&fit=crop&q=80',
    targetLevel: 'Terminale',
    targetSeries: 'OSE',
    targetSubject: 'maths',
    courseInfo: {
      courseId: 'oc-1',
      isPaid: true,
      priceAriary: 15000,
      scheduleDate: 'Isaky ny Asabotsy',
      scheduleTime: '15:00 - 17:00',
      contactPhone: '+261 34 12 345 67',
      contactEmail: 'rakoto.cours@tafita.mg',
      meetingUrl: 'https://meet.google.com/tafita-maths-ose',
      actionLabel: 'Hisoratra anarana amin\'ny Cours'
    },
    reactions: {
      like: 48,
      idea: 19,
      applause: 32,
      fire: 27
    },
    commentsCount: 6,
    sharesCount: 14,
    comments: [
      {
        id: 'c-1',
        postId: 'post-1',
        authorId: 'stud-1',
        authorName: 'Faly Nirina (Terminale S)',
        authorRole: 'student',
        authorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
        content: 'Misaotra Prof ! Azo atao ve ny mahazo ny enregistrement raha sendra misy fahatapahan-jiro mandritra ny live ?',
        likesCount: 5,
        createdAt: '2026-08-16T11:15:00Z'
      },
      {
        id: 'c-2',
        postId: 'post-1',
        authorId: 't-1',
        authorName: 'Prof. Rakotoarisoa Jean',
        authorRole: 'teacher',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        content: 'Eny tompoko Faly ! Misy vidéo replay voarakitra an-tsary sy PDF azo alaina foana ao amin\'ny fitaovana na tsy nisy tambajotra aza.',
        likesCount: 8,
        createdAt: '2026-08-16T11:22:00Z'
      }
    ],
    isPinned: true,
    isOfficial: false,
    createdAt: '2026-08-16T09:30:00Z'
  },
  {
    id: 'post-2',
    authorId: 'admin-men',
    authorName: 'Minisiteran\'ny Fanabeazam-pirenena (MEN)',
    authorRole: 'admin',
    authorAvatar: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=150&auto=format&fit=crop&q=80',
    authorBadge: '⭐ Fampitam-baovao Ofisialy • MEN Madagascar',
    type: 'news_local',
    category: 'news',
    title: '🇲🇬 Tetiandro Ofisialin\'ny Fanadinana BEPC sy Bakalorea 2026 eto Madagasikara',
    content: `📢 **FAMPITAM-BAOVAO OFISIALY HO AN\'NY FIANAKAVIAM-BEN\'NY FANABEAZANA**

Namoaka tamin'ny fomba ofisialy ny tetiandrom-panadinana ho an'ny taom-pianarana 2025-2026 ny Minisiteran'ny Fanabeazam-pirenena :

📅 **Fanadinana BEPC (Kilasy faha-3ème) :**
- Daty : 30 Jona hatramin'ny 03 Jolay 2026 manerana ny Nosy.
- Taranja voalohany : Malagasy sy SVT.

📅 **Fanadinana BACCALAURÉAT (Enseignement Général & Technique) :**
- Epreuves écrites : 20 Jolay hatramin'ny 24 Jolay 2026.
- Série misy : Série OSE, Série L, Série S, ary Série A, C, D mahazatra.
- Fampatsiahivana : Misy ny coefficient 32 mitovy ho an'ny Série OSE, L, ary S.

Mirary soa sy fahombiazana ho an'ny mpiadina rehetra !`,
    tags: ['#MENMadagascar', '#TetiandroBACC2026', '#BEPC2026', '#FanabeazanaOfisialy'],
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
    targetLevel: 'Toutes',
    targetSeries: 'Toutes',
    sourceName: 'Minisiteran\'ny Fanabeazam-pirenena Madagasikara',
    sourceUrl: 'https://men.gov.mg',
    reactions: {
      like: 124,
      idea: 45,
      applause: 88,
      fire: 63
    },
    commentsCount: 12,
    sharesCount: 52,
    comments: [
      {
        id: 'c-3',
        postId: 'post-2',
        authorId: 'stud-2',
        authorName: 'Mialy Raharison (3ème)',
        authorRole: 'student',
        content: 'Misaotra amin\'ny fampahafantarana ny tetiandro ! Efa manomboka manao révision mafy amin\'ny fampiharana BEPC.',
        likesCount: 7,
        createdAt: '2026-08-16T09:00:00Z'
      }
    ],
    isPinned: true,
    isOfficial: true,
    createdAt: '2026-08-16T08:00:00Z'
  },
  {
    id: 'post-3',
    authorId: 't-phys',
    authorName: 'Prof. Andrianina (Siansa Fizika)',
    authorRole: 'teacher',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    authorBadge: '👨‍🏫 Mpampianatra Physique-Chimie',
    type: 'video',
    category: 'videos',
    title: '🎥 [HORONANTSARY] Fizika Tle S/C : Ahoana ny famahana ny "Mouvement dans un champ de pesanteur" ?',
    content: `Ao anatin'ity horonantsary fohy 12 minitra ity no hanazavako :
1. Ny fampiharana ny Lalàn'i Newton faharoa : **Σ F = m.a**.
2. Ny fitadiavana ny Equation horaire : **x(t)** sy **y(t)**.
3. Ny fomba fitadiavana ny Haavo farany ambony (Flèche) sy ny halavirana (Portée).
4. Ohatra mivantana nalaina tamin'ny Laza Adina BACC lasa.

Tsindrio ny bokotra eto ambany hijerena ny horonantsary sy hisintonana ny Fiche de synthèse !`,
    tags: ['#FizikaTerminale', '#LoiDeNewton', '#BACCScientifique', '#VideoTuto'],
    mediaType: 'video',
    mediaUrl: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&auto=format&fit=crop&q=80',
    videoDuration: '12:45',
    targetLevel: 'Terminale',
    targetSeries: 'S',
    targetSubject: 'physique',
    reactions: {
      like: 89,
      idea: 41,
      applause: 36,
      fire: 54
    },
    commentsCount: 8,
    sharesCount: 29,
    comments: [],
    createdAt: '2026-08-15T19:40:00Z'
  },
  {
    id: 'post-4',
    authorId: 'news-intl',
    authorName: 'Campus Monde & Bourses',
    authorRole: 'admin',
    authorAvatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
    authorBadge: '🌍 Vaovao Iraisam-pirenena & Bourses',
    type: 'news_international',
    category: 'news',
    title: '🌍 Bourses d\'Études Internationales 2026-2027 : Frantsa, Kanada & Japon',
    content: `📢 **VAOVAO IRAISAM-PIRENENA HO AN\'NY MPIANATRA MALAGASY :**

Misokatra amin'izao fotoana izao ireo fangatahana bourses d'études ho an'ny taom-pianarana 2026-2027 :

1. 🇫🇷 **Bourse France Excellence Eiffel (Master & Doctorat)** :
   - Fepetra : Fahaizana ambony amin'ny siansa, toekarena, lalàna na injeniera.
   - Vatsim-pianarana : 1,181€ hatramin'ny 1,700€ isam-bolana + tapakila fiaramanidina.

2. 🇨🇦 **Programme de Bourses de la Francophonie (Kanada)** :
   - Ho an'ny mpianatra sy mpikaroka malagasy.
   - Fandrakofana 100% ny saram-pianarana sy ny fiantohana ara-pahasalamana.

3. 🇯🇵 **Bourse MEXT Gouvernement du Japon (Undergraduate & Research)** :
   - Misokatra ho an'ny nahazo ny Bakalorea Série C, S, D na OSE manana Mention Assez Bien na Bien.

💡 *Toro-hevitra : Omano mialoha ny taratasy fanamarinana naoty sy ny 'Lettre de motivation'.*`,
    tags: ['#BoursesInternationales', '#CampusFrance', '#Kanada', '#JaponMEXT', '#FianaranaAnyIvelany'],
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80',
    sourceName: 'Agence Universitaire de la Francophonie & Campus France',
    sourceUrl: 'https://campusfrance.org',
    reactions: {
      like: 215,
      idea: 78,
      applause: 140,
      fire: 92
    },
    commentsCount: 18,
    sharesCount: 76,
    comments: [
      {
        id: 'c-4',
        postId: 'post-4',
        authorId: 'stud-3',
        authorName: 'Tojo Randria',
        authorRole: 'student',
        content: 'Misaotra indrindra ! Ilaina ve ny manana certificat DELF/DALF B2 na C1 rehefa manao candidature ?',
        likesCount: 6,
        createdAt: '2026-08-15T21:10:00Z'
      },
      {
        id: 'c-5',
        postId: 'post-4',
        authorId: 'news-intl',
        authorName: 'Campus Monde & Bourses',
        authorRole: 'admin',
        content: 'Eny Tojo ! Tena tombony lehibe ny fananana fanamarinana teny frantsay (B2 farafahakeliny) na anglisy (IELTS/TOEFL) raha taranja amin\'ny teny anglisy.',
        likesCount: 11,
        createdAt: '2026-08-15T21:30:00Z'
      }
    ],
    createdAt: '2026-08-15T16:20:00Z'
  },
  {
    id: 'post-5',
    authorId: 'stud-4',
    authorName: 'Sarah Ravelo (Terminale OSE)',
    authorRole: 'student',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    authorBadge: '🎓 Mpianatra Lycée',
    type: 'student_request',
    category: 'requests',
    title: '🙋‍♀️ Mitady namana hanao Groupe de Révision SES sy Philosophie (Terminale OSE)',
    content: `Salama daholo ry namana ! 👋
Izaho Sarah, mpianatra kilasy Terminale Série OSE eto Antananarivo.
Mitady namana 3 na 4 izahay mba hiaraka hanao fanazarana sy fizarana hevitra amin'ny :
- **SES** : Ny tontolon'ny asa sy ny fiovan'ny fiarahamonina (Thème 2).
- **Filozofia** : Ny fahalalahana sy ny rariny (La liberté et la justice).

Manao fihaonana an-tserasera (Google Meet na WhatsApp) isaky ny Alahady tolakandro amin'ny 16:00.
Raha misy liana dia mametraha hafatra eto na mandefasa hafatra mivantana azafady ! Misaotra betsaka. 😊`,
    tags: ['#GroupeDeRevision', '#TerminaleOSE', '#SES', '#Philosophie', '#FianaranaIarahana'],
    targetLevel: 'Terminale',
    targetSeries: 'OSE',
    targetSubject: 'ses',
    reactions: {
      like: 34,
      idea: 15,
      applause: 22,
      fire: 18
    },
    commentsCount: 7,
    sharesCount: 5,
    comments: [
      {
        id: 'c-6',
        postId: 'post-5',
        authorId: 'stud-5',
        authorName: 'Herizo (Tle OSE Mahajanga)',
        authorRole: 'student',
        content: 'Tena liana aho Sarah ! Efa nandefa hafatra aho hiditra amin\'ny groupe.',
        likesCount: 3,
        createdAt: '2026-08-15T17:00:00Z'
      }
    ],
    createdAt: '2026-08-15T14:15:00Z'
  },
  {
    id: 'post-6',
    authorId: 't-philo',
    authorName: 'M. Solohery (Mpanabe Filozofia)',
    authorRole: 'teacher',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    authorBadge: '💡 Mpampianatra Filozofia BACC',
    type: 'tip',
    category: 'tips',
    title: '💡 [ASTUCE BACC] Ireo dingana 4 tsy maintsy arahina amin\'ny Dissertation Philosophique',
    content: `Ho an'ireo mpiadina BACC rehetra manana ahiahy amin'ny taranja Filozofia, ireto ny tsiambaratelon'ny 'Plan Dialectique' hahazoana naoty tsara :

1. **Fampidirana (Introduction)** :
   - Fanamarihana ankapobeny (Amorce / Constat).
   - Fametrahana ny olan-kevitra (Problématique mazava).
   - Fanambarana ny fizarana (Annonce du plan).

2. **Fizarana voalohany (Thèse)** :
   - Fanazavana ny hevitra voalohany tohanan'ny ohatra sy citations filôzôfika (Kant, Descartes, Rousseau).

3. **Fizarana faharoa (Antithèse)** :
   - Fandinihana ny fetra sy ny lafiny mifanohitra (Nietzsche, Marx, Sartre).

4. **Famaranana (Synthèse & Conclusion)** :
   - Fandravonana sy vahaolana vaovao manokatra fomba fijery.

📌 *Tehirizo ity torolalana ity fa tena hanampy amin'ny famerenana lesona !*`,
    tags: ['#AstucePhilo', '#DissertationBACC', '#FilozofiaMalagasy', '#Torolalana'],
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=80',
    targetLevel: 'Terminale',
    targetSeries: 'Toutes',
    targetSubject: 'philo',
    reactions: {
      like: 162,
      idea: 67,
      applause: 84,
      fire: 71
    },
    commentsCount: 9,
    sharesCount: 44,
    comments: [],
    createdAt: '2026-08-15T11:00:00Z'
  },
  {
    id: 'post-7',
    authorId: 't-anglais',
    authorName: 'Coach Tina (English Mastery)',
    authorRole: 'teacher',
    authorAvatar: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=150&auto=format&fit=crop&q=80',
    authorBadge: '🇬🇧 Mpampianatra Anglisy & TOEFL',
    type: 'video',
    category: 'videos',
    title: '🎥 [VIDEO] Teny Anglezo : 5 Fahadisoana matetika amin\'ny fanadinana BEPC & BACC',
    content: `Amin'ity horonantsary ity dia hanitsy ireo fahadisoana mpanao matetika isika :
❌ "I am agree with you" ➡️ ✅ "I agree with you"
❌ "I am in Madagascar since 3 years" ➡️ ✅ "I have been in Madagascar for 3 years"
❌ "Explain me the lesson" ➡️ ✅ "Explain the lesson to me"

Jereo ny fanazavana feno sy ny fanononana (Pronunciation guide) amin'ny horonantsary !`,
    tags: ['#TenyAnglezo', '#EnglishGrammar', '#BEPC2026', '#BACC2026'],
    mediaType: 'video',
    mediaUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&auto=format&fit=crop&q=80',
    videoDuration: '08:15',
    targetLevel: 'Toutes',
    targetSubject: 'anglais',
    reactions: {
      like: 110,
      idea: 53,
      applause: 65,
      fire: 49
    },
    commentsCount: 14,
    sharesCount: 38,
    comments: [],
    createdAt: '2026-08-15T09:30:00Z'
  }
];
