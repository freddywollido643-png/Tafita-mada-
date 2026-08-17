import React, { useState } from 'react';
import { useApp, AppTab } from '../context/AppContext';
import { EducationalStoriesBar } from './EducationalStoriesBar';
import { SocialFeed } from './SocialFeed';
import {
  BookOpen,
  FileText,
  Brain,
  Bot,
  GraduationCap,
  Sparkles,
  Search,
  X,
  ArrowRight,
  Clock,
  Wifi,
  WifiOff,
  Video,
  Target,
  Award,
  Menu,
  ChevronRight,
  Layers,
  Sparkle,
  Calculator,
  Compass,
  Zap
} from 'lucide-react';

export const HomeDashboard: React.FC<{
  onOpenAndroidModal: () => void;
  onOpenMenu?: () => void;
}> = ({ onOpenAndroidModal, onOpenMenu }) => {
  const {
    userProfile,
    setCurrentTab,
    effectiveIsOnline,
    completedLessonIds,
    lessons,
    setSelectedLesson
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const isMg = userProfile.language === 'mg';

  // Calculate student overall progress
  const totalLessons = lessons.length;
  const completedCount = completedLessonIds.length;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 15;

  // Filter lessons for instant search
  const filteredLessons = searchQuery.trim()
    ? lessons.filter(l =>
        l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.chapterTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.subjectId.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Academic items placed in the 2nd menu with quick launcher chips
  const quickAcademicChips: { id: string; tab: AppTab; labelMg: string; labelFr: string; icon: any; color: string }[] = [
    { id: 'lessons', tab: 'lessons', labelMg: '📚 Cours & Leçons', labelFr: '📚 Cours & Leçons', icon: BookOpen, color: 'text-blue-400 border-blue-500/30 bg-blue-500/10' },
    { id: 'online-courses', tab: 'online-courses', labelMg: '💻 Cours en Ligne', labelFr: '💻 Cours en Ligne', icon: Video, color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10' },
    { id: 'exercises', tab: 'exercises', labelMg: '📝 Exercices', labelFr: '📝 Exercices', icon: FileText, color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' },
    { id: 'quizzes', tab: 'quizzes', labelMg: '🎯 Quiz', labelFr: '🎯 Quiz', icon: Brain, color: 'text-purple-400 border-purple-500/30 bg-purple-500/10' },
    { id: 'bac', tab: 'bac', labelMg: '🏆 Préparation BACC', labelFr: '🏆 Préparation BACC', icon: GraduationCap, color: 'text-rose-400 border-rose-500/30 bg-rose-500/10' },
    { id: 'ai', tab: 'ai', labelMg: '🤖 AI TAFITA', labelFr: '🤖 AI TAFITA', icon: Bot, color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' },
    { id: 'derivative', tab: 'derivative', labelMg: '📐 La Dérivée & App', labelFr: '📐 La Dérivée & App', icon: Calculator, color: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10' }
  ];

  return (
    <div className="space-y-6 pb-20 max-w-5xl mx-auto">
      
      {/* 1. Welcoming Hero Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold rounded-full flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                🇲🇬 TAFITA MADA
              </span>
              <span className="px-2.5 py-0.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-semibold rounded-full">
                {userProfile.level} {userProfile.level === 'Terminale' ? `• Série ${userProfile.series}` : ''}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              👋 {isMg ? `Salama, ${userProfile.name} !` : `Bonjour, ${userProfile.name} !`}
            </h1>
            <p className="text-amber-300 font-semibold text-sm">
              {isMg ? 'Vonona hianatra sy hahatafita ny fanadinana androany ?' : 'Prêt à étudier et réussir vos examens aujourd\'hui ?'}
            </p>
            <p className="text-slate-400 text-xs italic">
              “Mianara anio, tafita rahampitso.”
            </p>
          </div>

          {/* User Progress Mini Badge */}
          <div className="bg-slate-800/90 backdrop-blur-md border border-slate-700/80 rounded-2xl p-4 min-w-[220px]">
            <div className="flex justify-between items-center text-xs text-slate-300 mb-2">
              <span className="font-bold text-slate-200">
                📊 {isMg ? 'Fandrosoanao' : 'Progression'}
              </span>
              <span className="font-black text-amber-400 text-base">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-700 h-2.5 rounded-full overflow-hidden shadow-inner">
              <div
                className="bg-gradient-to-r from-amber-400 to-amber-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.max(progressPercent, 5)}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
              <span>{completedCount}/{totalLessons} {isMg ? 'vita' : 'complétés'}</span>
              <span className="text-emerald-400 font-bold">🔥 {userProfile.streakDays} {isMg ? 'andro' : 'j'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. RECHERCHE (Interactive Search Bar with Auto-Suggestions) */}
      <div className="relative">
        <div className="relative flex items-center">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={isMg ? '🔎 Mitadiava lesona, taranja, na exercice...' : '🔎 Rechercher un cours, une matière, un exercice...'}
            className="w-full bg-slate-900 border border-slate-800 hover:border-slate-700 focus:border-amber-500 text-white placeholder-slate-400 text-sm rounded-2xl pl-12 pr-10 py-3.5 outline-none transition-all shadow-lg"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Live Search Suggestions Dropdown */}
        {searchQuery.trim().length > 0 && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 z-50 max-h-80 overflow-y-auto space-y-2">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
              {isMg ? `Valin'ny fikarohana (${filteredLessons.length})` : `Résultats (${filteredLessons.length})`}
            </div>
            {filteredLessons.length === 0 ? (
              <p className="text-xs text-slate-400 italic py-2">
                {isMg ? 'Tsy misy lesona na exercice mifanaraka amin\'izany.' : 'Aucun cours ou exercice trouvé.'}
              </p>
            ) : (
              filteredLessons.map(lesson => (
                <button
                  key={lesson.id}
                  onClick={() => {
                    setSelectedLesson(lesson);
                    setCurrentTab('lessons');
                    setSearchQuery('');
                  }}
                  className="w-full text-left p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-blue-500/50 transition-colors flex items-center justify-between"
                >
                  <div>
                    <span className="text-xs font-semibold px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded mr-2 uppercase">
                      {lesson.subjectId}
                    </span>
                    <span className="text-sm font-bold text-white">
                      {isMg ? lesson.title : lesson.titleFr || lesson.title}
                    </span>
                    <p className="text-xs text-slate-400 mt-0.5">{lesson.chapterTitle}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {/* 3. STORIES & FLASH FANABEAZANA (Facebook Style Educational Stories) */}
      <EducationalStoriesBar />

      {/* 4. ACCÈS RAPIDE AU 2ÈME MENU (Modules Pédagogiques ao ambadika / Drawer) */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-black">
              ☰
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                <span>{isMg ? 'Menu 2 (Fitaovam-pianarana sy Fandaharana)' : 'Deuxième Menu (Modules & Programmes)'}</span>
                <span className="text-[10px] px-2 py-0.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full font-bold">
                  Ao ambadika
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                {isMg
                  ? 'Cours, cours en ligne, exercices, quiz, BACC, AI TAFITA, la dérivée ao amin\'ny Menu ☰'
                  : 'Cours, cours en ligne, exercices, quiz, Bac, AI TAFITA et dérivées accessibles dans le tiroir latéral.'}
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenMenu && onOpenMenu()}
            className="self-start sm:self-auto px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-1.5 flex-shrink-0"
          >
            <Menu className="w-4 h-4" />
            <span>{isMg ? 'Sokafy ny Menu ☰' : 'Ouvrir le Menu ☰'}</span>
          </button>
        </div>

        {/* Quick Horizontal Scroll Chips for 1-Click Access */}
        <div className="flex items-center space-x-2 overflow-x-auto pt-2 scrollbar-none pb-1">
          {quickAcademicChips.map(chip => {
            const Icon = chip.icon;
            return (
              <button
                key={chip.id}
                onClick={() => setCurrentTab(chip.tab)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold whitespace-nowrap hover:brightness-110 active:scale-95 transition-all ${chip.color}`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{isMg ? chip.labelMg : chip.labelFr}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. FIL D'ACTUALITÉ ÉDUCATIF (Main Community & Social Feed) */}
      <SocialFeed />

      {/* 6. ANDROID EXPORT CALLOUT BANNER */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 border border-indigo-500/30 rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start space-x-2">
            <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded border border-emerald-500/30">
              OFFLINE READY
            </span>
            <span className="text-xs font-semibold text-slate-300">
              {isMg ? 'Fampiharana ho an\'ny Finday' : 'Application Mobile'}
            </span>
          </div>
          <h4 className="text-base font-bold text-white">
            📱 {isMg ? 'Ampidiro amin\'ny finday (APK Android)' : 'Installer l\'application Android'}
          </h4>
          <p className="text-xs text-slate-400 max-w-md">
            {isMg
              ? 'Mianara na aiza na aiza, na tsy misy connexion Internet aza amin\'ny finday Android.'
              : 'Apprenez partout à Madagascar, 100% hors-ligne sans connexion requise.'}
          </p>
        </div>

        <button
          onClick={onOpenAndroidModal}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center space-x-2 flex-shrink-0"
        >
          <span>{isMg ? 'Haka ny APK' : 'Obtenir l\'APK'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
