import React from 'react';
import { useApp } from '../context/AppContext';
import { Series, Level, UserRole } from '../types';
import { storageService } from '../services/storageService';
import {
  User,
  Award,
  Flame,
  BookOpen,
  CheckCircle,
  Brain,
  Globe,
  Wifi,
  WifiOff,
  Shield,
  GraduationCap,
  Sparkles,
  Layers
} from 'lucide-react';

export const StudentProfileView: React.FC = () => {
  const {
    userProfile,
    updateUserProfile,
    completedLessonIds,
    lessons,
    exercises,
    isOfflineOverride,
    setIsOfflineOverride,
    effectiveIsOnline,
    setCurrentTab
  } = useApp();

  const isMg = userProfile.language === 'mg';
  const quizResults = storageService.getQuizResults();

  const completedCount = completedLessonIds.length;
  const quizCount = quizResults.length;
  const highQuizScoreCount = quizResults.filter(q => q.percentage >= 80).length;

  // Gamification badges calculation
  const badges = [
    {
      id: 'badge-first-lesson',
      titleMg: '🏆 Lesona Voalohany',
      titleFr: '🏆 Première Leçon',
      descMg: 'Vita ny lesona 1 voalohany',
      descFr: 'Terminé 1 première leçon',
      unlocked: completedCount >= 1
    },
    {
      id: 'badge-7-streak',
      titleMg: '🔥 7 Andro Misesy',
      titleFr: '🔥 7 Jours de Suite',
      descMg: 'Mianatra am-potoana mandritra ny 7 andro',
      descFr: '7 jours consécutifs d\'apprentissage',
      unlocked: userProfile.streakDays >= 7
    },
    {
      id: 'badge-10-exercises',
      titleMg: '🎯 10 Exercices',
      titleFr: '🎯 10 Exercices',
      descMg: 'Nahavitana exercices fampiharana 10',
      descFr: 'Résolu 10 exercices de révision',
      unlocked: completedCount >= 3 || quizCount >= 2
    },
    {
      id: 'badge-20-lessons',
      titleMg: '📚 20 Lesona Vita',
      titleFr: '📚 20 Leçons Accomplies',
      descMg: 'Nandalina lesona 20 feno amin\'ny taranja',
      descFr: 'Terminé 20 leçons du programme',
      unlocked: completedCount >= 20
    },
    {
      id: 'badge-quiz-master',
      titleMg: '🥇 Quiz Master (80%+)',
      titleFr: '🥇 Expert des Quiz',
      descMg: 'Nahazo 80%+ amin\'ny Quiz BAC',
      descFr: 'Obtenu au moins 80% sur un quiz',
      unlocked: highQuizScoreCount > 0
    }
  ];

  return (
    <div className="space-y-6 pb-20">
      
      {/* Profile Main Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left relative z-10">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-blue-600 to-amber-500 text-white font-black text-3xl flex items-center justify-center shadow-xl border-2 border-white/20 shrink-0">
            {userProfile.name.charAt(0).toUpperCase()}
          </div>

          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl font-black text-white tracking-tight">{userProfile.name}</h1>
              <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold rounded-full">
                {userProfile.level} - Série {userProfile.series}
              </span>
              <span className="px-2.5 py-0.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold rounded-full uppercase">
                Role: {userProfile.role}
              </span>
            </div>

            <p className="text-xs text-slate-400 font-mono">{userProfile.email}</p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2 text-xs">
              <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded-xl font-bold">
                <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
                {userProfile.streakDays} {isMg ? 'Andro nianarana' : 'jours de suite'}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 rounded-xl font-bold">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                {completedCount} {isMg ? 'Lesona vita' : 'leçons terminées'}
              </span>
            </div>
          </div>
        </div>

        {/* Series & Level Quick Switcher */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-3">
          <h3 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4" />
            {isMg ? 'Miova Série na Kilasy (Changer de Série)' : 'Changer de Série & Classe'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1">
                {isMg ? 'Kilasy (Classe) :' : 'Classe :'}
              </label>
              <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
                {(['Seconde', 'Première', 'Terminale'] as Level[]).map(lvl => (
                  <button
                    key={lvl}
                    onClick={() => updateUserProfile({ level: lvl })}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      userProfile.level === lvl
                        ? 'bg-blue-600 text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">
                {isMg ? 'Série BAC :' : 'Série Baccalauréat :'}
              </label>
              <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
                {(['A', 'C', 'D'] as Series[]).map(s => (
                  <button
                    key={s}
                    onClick={() => updateUserProfile({ series: s })}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      userProfile.series === s
                        ? 'bg-amber-500 text-slate-950 font-black shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Série {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Role Switcher (Student / Teacher / Admin) */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-2">
          <h3 className="text-xs font-extrabold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
            <Shield className="w-4 h-4" />
            {isMg ? 'Rôles sy Safidy (Espace Utilisateur)' : 'Rôle & Permissions'}
          </h3>

          <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
            {(
              [
                { role: 'student' as UserRole, labelMg: '👨‍🎓 Mpianatra', labelFr: 'Élève' },
                { role: 'teacher' as UserRole, labelMg: '👨‍🏫 Mpampianatra', labelFr: 'Enseignant' },
                { role: 'admin' as UserRole, labelMg: '🛡️ Admin', labelFr: 'Admin' }
              ]
            ).map(r => (
              <button
                key={r.role}
                onClick={() => {
                  updateUserProfile({ role: r.role });
                  if (r.role === 'teacher') setCurrentTab('teacher');
                  if (r.role === 'admin') setCurrentTab('admin');
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  userProfile.role === r.role
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {isMg ? r.labelMg : r.labelFr}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gamification Badges Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            {isMg ? 'Fankasitrahana sy Medaly (Badges)' : 'Badges & Récompenses'}
          </h2>
          <span className="text-xs font-bold text-amber-400">
            {badges.filter(b => b.unlocked).length} / {badges.length} {isMg ? 'Azo' : 'Obtenus'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {badges.map(badge => (
            <div
              key={badge.id}
              className={`p-4 rounded-2xl border transition-all flex items-start space-x-3 ${
                badge.unlocked
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-200'
                  : 'bg-slate-950/60 border-slate-800 text-slate-500 opacity-60'
              }`}
            >
              <div className="text-2xl shrink-0">{badge.titleMg.substring(0, 2)}</div>
              <div>
                <h4 className="font-extrabold text-xs text-white">
                  {isMg ? badge.titleMg : badge.titleFr}
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {isMg ? badge.descMg : badge.descFr}
                </p>
                {badge.unlocked && (
                  <span className="inline-block mt-2 text-[10px] font-bold px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">
                    ✓ {isMg ? 'Efa azo' : 'Débloqué'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Language & Network Preferences */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Globe className="w-5 h-5 text-blue-400" />
          {isMg ? 'Fikirakirana (Paramètres)' : 'Paramètres Application'}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Language Preference */}
          <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-2xl flex items-center justify-between">
            <div>
              <h4 className="font-bold text-xs text-white">{isMg ? 'Teny fampiasa' : 'Langue d\'interface'}</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {userProfile.language === 'mg' ? '🇲🇬 Teny Malagasy (Primary)' : '🇫🇷 Français (Secondaire)'}
              </p>
            </div>
            <button
              onClick={() =>
                updateUserProfile({
                  language: userProfile.language === 'mg' ? 'fr' : 'mg'
                })
              }
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-transform active:scale-95"
            >
              {userProfile.language === 'mg' ? 'Miova FR' : 'Miova MG'}
            </button>
          </div>

          {/* Offline Mode Toggle */}
          <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-2xl flex items-center justify-between">
            <div>
              <h4 className="font-bold text-xs text-white">
                {effectiveIsOnline ? 'Status: ONLINE' : 'Status: OFFLINE'}
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {effectiveIsOnline
                  ? 'Mifandray amin\'ny internet'
                  : 'Mode Hors-Ligne (Offline Override)'}
              </p>
            </div>
            <button
              onClick={() => setIsOfflineOverride(!isOfflineOverride)}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-colors ${
                effectiveIsOnline
                  ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  : 'bg-emerald-600 text-white'
              }`}
            >
              {effectiveIsOnline ? 'Simulate Offline' : 'Restore Online'}
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};
