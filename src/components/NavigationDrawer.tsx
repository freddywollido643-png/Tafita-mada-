import React, { useState } from 'react';
import { useApp, AppTab } from '../context/AppContext';
import {
  X,
  User,
  BookOpen,
  Download,
  Star,
  Bell,
  Calendar,
  BarChart2,
  Settings,
  Info,
  PlusCircle,
  FolderKanban,
  FileEdit,
  Video,
  Users,
  Radio,
  TrendingUp,
  ChevronRight,
  Sparkles,
  Wifi,
  WifiOff,
  Globe,
  GraduationCap,
  FileText,
  Brain,
  Bot,
  Calculator,
  Search,
  Target,
  Layers,
  Sparkle
} from 'lucide-react';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAndroidModal?: () => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  onOpenAndroidModal
}) => {
  const {
    userProfile,
    updateUserProfile,
    setCurrentTab,
    effectiveIsOnline,
    isOfflineOverride,
    setIsOfflineOverride,
    favoriteLessonIds,
    downloadedItems,
    completedLessonIds
  } = useApp();

  const isMg = userProfile.language === 'mg';
  const isTeacher = userProfile.role === 'teacher' || userProfile.role === 'admin';

  const [searchFilter, setSearchFilter] = useState('');

  if (!isOpen) return null;

  const handleNavigate = (tab: AppTab) => {
    setCurrentTab(tab);
    onClose();
  };

  // 1. CORE EDUCATIONAL MODULES (The primary requested learning tools)
  const coreAcademicModules = [
    {
      id: 'lessons',
      tab: 'lessons' as AppTab,
      labelMg: '📚 Cours & Leçons',
      labelFr: '📚 Cours & Leçons',
      descMg: 'Fandaharam-pianarana ofisialy araka ny kilasy sy série',
      descFr: 'Programme officiel complet par classe et série',
      icon: BookOpen,
      badge: `${completedLessonIds.length} vita`,
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/30'
    },
    {
      id: 'online-courses',
      tab: 'online-courses' as AppTab,
      labelMg: '💻 Cours en Ligne',
      labelFr: '💻 Cours en Ligne',
      descMg: 'Fampianarana an-tsary, feo famintinana sy sessions live',
      descFr: 'Classes virtuelles, vidéos et séances en direct',
      icon: Video,
      badge: 'Live & Vidéos',
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30'
    },
    {
      id: 'exercises',
      tab: 'exercises' as AppTab,
      labelMg: '📝 Exercices & Fampiharana',
      labelFr: '📝 Exercices & Applications',
      descMg: 'Fampiharana tarihana miaraka amin\'ny fanitsiana tsikelikely',
      descFr: 'Exercices d\'application guidés avec corrigés types',
      icon: FileText,
      badge: 'Pratique',
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
    },
    {
      id: 'quizzes',
      tab: 'quizzes' as AppTab,
      labelMg: '🎯 Quiz & Fitsapam-pahaizana',
      labelFr: '🎯 Quiz & Auto-Évaluation',
      descMg: 'Fanombanana sy fitsapam-pahaizana mandeha fotoana',
      descFr: 'Auto-évaluation interactive chronométrée',
      icon: Brain,
      badge: 'QCM',
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/30'
    },
    {
      id: 'bac',
      tab: 'bac' as AppTab,
      labelMg: '🏆 Préparation BACC',
      labelFr: '🏆 Préparation BACC',
      descMg: 'Laza adina lasa sy fanitsiana (Série OSE, L, S, A, C, D)',
      descFr: 'Annales officielles et corrigés types Terminale',
      icon: GraduationCap,
      badge: 'Terminale',
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/30'
    },
    {
      id: 'bepc',
      tab: 'bepc' as AppTab,
      labelMg: '🎯 Préparation BEPC',
      labelFr: '🎯 Préparation BEPC',
      descMg: 'Laza adina 3ème sy torolalana amin\'ny fanadinana',
      descFr: 'Sujets et annales classe de 3ème',
      icon: Target,
      badge: '3ème',
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/30'
    },
    {
      id: 'ai',
      tab: 'ai' as AppTab,
      labelMg: '🤖 AI TAFITA (Mpanampy)',
      labelFr: '🤖 AI TAFITA (Tuteur IA)',
      descMg: 'Mpanampy marani-tsaina manazava amin\'ny teny Malagasy sy Frantsay',
      descFr: 'Tuteur intelligent 24/7 disponible en MG & FR',
      icon: Bot,
      badge: 'IA 24/7',
      color: 'text-amber-300 bg-amber-500/20 border-amber-500/40',
      highlight: true
    },
    {
      id: 'derivative',
      tab: 'derivative' as AppTab,
      labelMg: '📐 La Dérivée sy Fampiharana',
      labelFr: '📐 La Dérivée et ses Applications',
      descMg: 'Kajy tanjanta, raikipohy feno, fampiharana Physique, SVT sy Eco',
      descFr: 'Simulateur tangente, formulaire complet et applications concrètes',
      icon: Calculator,
      badge: 'Maths Spécial',
      color: 'text-indigo-400 bg-indigo-500/20 border-indigo-500/40',
      highlight: true
    }
  ];

  // 2. STUDY & REVISION TOOLS (Productivity & Tracking)
  const studyTools = [
    {
      id: 'revision',
      tab: 'revision' as AppTab,
      labelMg: '📅 Plan de Révision',
      labelFr: '📅 Plan de Révision',
      descMg: 'Fandaminana fotoana sy tetiandrom-panadinana',
      descFr: 'Planning personnalisé et calendrier d\'étude',
      icon: Calendar,
      badge: 'Planning'
    },
    {
      id: 'progress',
      tab: 'progress' as AppTab,
      labelMg: '📊 Progression & Statistiques',
      labelFr: '📊 Progression & Statistiques',
      descMg: 'Taha-pahalalana isaky ny taranja sy fahombiazana',
      descFr: 'Suivi de maîtrise par matière et scores',
      icon: BarChart2,
      badge: 'Stats'
    },
    {
      id: 'downloads',
      tab: 'downloads' as AppTab,
      labelMg: '💾 Mes Téléchargements',
      labelFr: '💾 Mes Téléchargements',
      descMg: 'Lesona sy laza adina voatahiry azo ampiasaina tsy misy internet',
      descFr: 'Contenus accessibles hors-ligne sans connexion',
      icon: Download,
      badge: `${downloadedItems.length}`
    },
    {
      id: 'news',
      tab: 'news' as AppTab,
      labelMg: '📢 Actualités MEN Madagascar',
      labelFr: '📢 Actualités MEN Madagascar',
      descMg: 'Fampandrenesana ofisialy sy tetiandrom-panadinana',
      descFr: 'Annonces officielles du Ministère de l\'Éducation',
      icon: Bell,
      badge: 'Ofisialy'
    }
  ];

  // 3. TEACHER-SPECIFIC TOOLS
  const teacherMenuItems = [
    {
      id: 't-publish',
      labelMg: '+ Publier un cours / exercice',
      labelFr: '+ Publier un cours',
      descMg: 'Mamoaka lesona, exercice, quiz na laza adina vaovao',
      descFr: 'Créer et publier du contenu pédagogique validé',
      icon: PlusCircle,
      action: () => handleNavigate('teacher'),
      highlight: true
    },
    {
      id: 't-publications',
      labelMg: 'Mes publications (Votoatiny navoakako)',
      labelFr: 'Mes publications',
      descMg: 'Fitantanana ireo lesona sy exercices efa navoaka',
      descFr: 'Gérer vos cours, exercices et quiz en ligne',
      icon: FolderKanban,
      action: () => handleNavigate('teacher')
    },
    {
      id: 't-drafts',
      labelMg: 'Mes brouillons (Brouillons voatahiry)',
      labelFr: 'Mes brouillons',
      descMg: 'Lesona sy laza adina mbola eo am-panoratana',
      descFr: 'Brouillons enregistrés hors-ligne à finaliser',
      icon: FileEdit,
      action: () => handleNavigate('teacher')
    },
    {
      id: 't-online-classes',
      labelMg: 'Mes cours en ligne (Fampianarana an-tsary)',
      labelFr: 'Mes cours en ligne',
      descMg: 'Fitantanana ny efitrano fampianarana nomerika',
      descFr: 'Gestion des cours numériques et modules vidéo',
      icon: Video,
      action: () => handleNavigate('online-courses')
    },
    {
      id: 't-students',
      labelMg: 'Mes élèves (Fizarana fahaizan\'ny mpianatra)',
      labelFr: 'Mes élèves',
      descMg: 'Fijerena ny fandrosoan\'ny mpianatra sy naotin\'ny quiz',
      descFr: 'Suivi de la classe, assiduité et résultats',
      icon: Users,
      action: () => handleNavigate('teacher')
    },
    {
      id: 't-live',
      labelMg: 'Mes sessions live (Fotoana mivantana)',
      labelFr: 'Mes sessions live',
      descMg: 'Fandaharana fampianarana sy fanitsiana mivantana',
      descFr: 'Planifier et lancer des séances live de révision',
      icon: Radio,
      action: () => handleNavigate('online-courses')
    },
    {
      id: 't-stats',
      labelMg: 'Statistiques Enseignant (Antontan\'isa)',
      labelFr: 'Statistiques',
      descMg: 'Isan\'ny mpianatra namaky, tahan\'ny fahombiazana',
      descFr: 'Taux de consultation, réussite aux quiz et impact',
      icon: TrendingUp,
      action: () => handleNavigate('teacher')
    }
  ];

  // Filtering based on search query inside drawer
  const query = searchFilter.toLowerCase().trim();
  const filteredAcademic = coreAcademicModules.filter(m =>
    !query ||
    m.labelMg.toLowerCase().includes(query) ||
    m.labelFr.toLowerCase().includes(query) ||
    m.descMg.toLowerCase().includes(query) ||
    m.descFr.toLowerCase().includes(query)
  );

  const filteredStudy = studyTools.filter(m =>
    !query ||
    m.labelMg.toLowerCase().includes(query) ||
    m.labelFr.toLowerCase().includes(query) ||
    m.descMg.toLowerCase().includes(query) ||
    m.descFr.toLowerCase().includes(query)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end animate-fadeIn">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-over Drawer Panel */}
      <div className="relative w-full max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl h-full flex flex-col z-10 overflow-hidden">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-900/95 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center font-black text-slate-950 text-xl shadow-md">
              ☰
            </div>
            <div>
              <h2 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
                {isMg ? 'Menu & Fitaovana' : 'Menu & Modules'}
              </h2>
              <p className="text-xs text-slate-400">
                {isMg ? 'Ireo fitaovam-pianarana sy fandaharana rehetra' : 'Tous les cours, exercices & outils'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
            title="Hikatona"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Search Filter */}
        <div className="p-3 bg-slate-950/60 border-b border-slate-800">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchFilter}
              onChange={e => setSearchFilter(e.target.value)}
              placeholder={isMg ? 'Tadiavo ao anaty menu...' : 'Filtrer les menus...'}
              className="w-full bg-slate-800 border border-slate-700 focus:border-amber-500 text-white placeholder-slate-400 text-xs rounded-xl pl-9 pr-8 py-2 outline-none transition-all"
            />
            {searchFilter && (
              <button
                onClick={() => setSearchFilter('')}
                className="absolute right-2.5 text-slate-400 hover:text-white p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Menu Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6 scrollbar-thin">
          
          {/* Active User Card & Role Switcher */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-850 border border-slate-700/80 rounded-3xl p-4 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white font-black text-lg flex items-center justify-center shadow-md">
                  {userProfile.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-sm sm:text-base leading-tight">
                    {userProfile.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {userProfile.role === 'teacher' ? '👨‍🏫 Enseignant' : '🎓 Élève'}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {userProfile.level} • {userProfile.series}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleNavigate('profile')}
                className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold rounded-xl transition-colors"
              >
                {isMg ? 'Profil' : 'Profil'}
              </button>
            </div>

            {/* Role Switcher Pill */}
            <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400 font-medium">
                {isMg ? 'Toerana (Rôle) :' : 'Mode utilisateur :'}
              </span>
              <button
                onClick={() => {
                  const newRole = userProfile.role === 'teacher' ? 'student' : 'teacher';
                  updateUserProfile({ role: newRole });
                }}
                className={`px-3 py-1 rounded-xl font-bold text-[11px] transition-all border ${
                  userProfile.role === 'teacher'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                    : 'bg-blue-500/20 text-blue-300 border-blue-500/40 hover:bg-blue-500/30'
                }`}
              >
                {userProfile.role === 'teacher' ? '👨‍🏫 Mpampianatra' : '🎓 Mpianatra'}
              </button>
            </div>
          </div>

          {/* Quick Shortcuts (Langue, Mode Offline) */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                updateUserProfile({
                  language: userProfile.language === 'mg' ? 'fr' : 'mg'
                });
              }}
              className="p-3 bg-slate-800/70 hover:bg-slate-800 border border-slate-700/70 rounded-2xl text-left flex items-center justify-between transition-colors"
            >
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-bold text-slate-200">
                  {userProfile.language === 'mg' ? '🇲🇬 Malagasy' : '🇫🇷 Français'}
                </span>
              </div>
              <span className="text-[10px] font-black text-amber-400 uppercase">{userProfile.language}</span>
            </button>

            <button
              onClick={() => setIsOfflineOverride(!isOfflineOverride)}
              className={`p-3 border rounded-2xl text-left flex items-center justify-between transition-colors ${
                effectiveIsOnline
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20'
                  : 'bg-amber-500/10 border-amber-500/30 text-amber-300 hover:bg-amber-500/20'
              }`}
            >
              <div className="flex items-center space-x-2">
                {effectiveIsOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
                <span className="text-xs font-bold">
                  {effectiveIsOnline ? 'ONLINE' : 'OFFLINE'}
                </span>
              </div>
              <span className="text-[10px] font-bold opacity-80">{isMg ? 'Hanova' : 'Bascule'}</span>
            </button>
          </div>

          {/* SECTION 1: CORE EDUCATIONAL MODULES (Requested by user in 2nd menu) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkle className="w-3.5 h-3.5 text-amber-400" />
                <span>{isMg ? 'Fampianarana & Fitaovana' : 'Programmes & Matières'}</span>
              </h4>
              <span className="text-[10px] text-slate-400 font-medium">
                {filteredAcademic.length} {isMg ? 'votoatiny' : 'modules'}
              </span>
            </div>

            <div className="space-y-2">
              {filteredAcademic.map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.tab)}
                    className={`w-full text-left p-3 rounded-2xl transition-all flex items-center justify-between group border shadow-md ${
                      item.highlight
                        ? 'bg-gradient-to-r from-slate-850 via-slate-800 to-indigo-950/40 border-amber-500/40 hover:border-amber-400'
                        : 'bg-slate-800/60 hover:bg-slate-800 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${item.color} group-hover:scale-105 transition-transform`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-extrabold text-white group-hover:text-amber-400 transition-colors flex items-center gap-1.5">
                          <span>{isMg ? item.labelMg : item.labelFr}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-tight">
                          {isMg ? item.descMg : item.descFr}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {item.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-750 text-slate-300 border border-slate-650">
                          {item.badge}
                        </span>
                      )}
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 2: STUDY & TRACKING TOOLS */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider px-1">
              {isMg ? 'Fandaminana sy Fanarahana' : 'Organisation & Suivi'}
            </h4>

            <div className="space-y-1.5">
              {filteredStudy.map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.tab)}
                    className="w-full text-left p-3 rounded-2xl bg-slate-800/40 hover:bg-slate-800 border border-slate-800/80 hover:border-slate-700 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-xl bg-slate-750 border border-slate-700 flex items-center justify-center text-slate-300 group-hover:text-amber-400">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors">
                          {isMg ? item.labelMg : item.labelFr}
                        </div>
                        <p className="text-[11px] text-slate-400 leading-tight">
                          {isMg ? item.descMg : item.descFr}
                        </p>
                      </div>
                    </div>

                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 3: TEACHER-ONLY SECTION */}
          {isTeacher && (
            <div className="pt-4 border-t border-slate-800 space-y-2">
              <div className="flex items-center justify-between px-1">
                <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-amber-400" />
                  <span>👨‍🏫 ESPACE ENSEIGNANT</span>
                </h4>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
                  Réservé Enseignants
                </span>
              </div>

              <div className="space-y-1.5 mt-2">
                {teacherMenuItems.map(item => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      className={`w-full text-left p-3 rounded-2xl transition-all flex items-center justify-between group border ${
                        item.highlight
                          ? 'bg-gradient-to-r from-amber-500/20 to-amber-600/10 border-amber-500/40 hover:border-amber-400'
                          : 'bg-slate-800/60 hover:bg-slate-800 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                          item.highlight
                            ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                            : 'bg-slate-750 border border-slate-700 text-amber-400'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className={`text-xs sm:text-sm font-extrabold ${
                            item.highlight ? 'text-amber-300 font-black' : 'text-white group-hover:text-amber-400'
                          } transition-colors`}>
                            {isMg ? item.labelMg : item.labelFr}
                          </div>
                          <p className="text-[11px] text-slate-400 leading-tight">
                            {isMg ? item.descMg : item.descFr}
                          </p>
                        </div>
                      </div>

                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* About / APK */}
          <div className="pt-2">
            <button
              onClick={() => {
                if (onOpenAndroidModal) {
                  onOpenAndroidModal();
                  onClose();
                } else {
                  handleNavigate('profile');
                }
              }}
              className="w-full p-3 bg-slate-950 border border-slate-800 hover:border-amber-500/40 rounded-2xl text-left flex items-center justify-between transition-all group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-slate-850 flex items-center justify-center text-amber-400">
                  <Info className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-amber-300">
                    {isMg ? 'Momba ny TAFITA MADA & APK Android' : 'À propos & Export APK Android'}
                  </div>
                  <p className="text-[10px] text-slate-400">Version 1.0 • Conforme Réforme MEN</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
          </div>

        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900 flex items-center justify-between text-xs text-slate-400">
          <span>🇲🇬 TAFITA MADA v1.0</span>
          <span className="text-[11px] text-amber-400 font-semibold">
            Conforme Réforme MEN
          </span>
        </div>

      </div>
    </div>
  );
};
