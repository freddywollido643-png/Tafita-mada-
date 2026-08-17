import React from 'react';
import { useApp } from '../context/AppContext';
import { SUBJECTS } from '../data/mockDatabase';
import { storageService } from '../services/storageService';
import {
  BarChart2,
  CheckCircle,
  TrendingUp,
  Award,
  Sparkles,
  BookOpen,
  Brain
} from 'lucide-react';

export const ProgressDashboard: React.FC = () => {
  const { userProfile, lessons, completedLessonIds } = useApp();
  const isMg = userProfile.language === 'mg';

  const quizResults = storageService.getQuizResults();

  const totalLessons = lessons.length;
  const completedCount = completedLessonIds.length;
  const overallPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 15;

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-lg space-y-4">
        <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
          <BarChart2 className="w-6 h-6 text-indigo-400" />
          {isMg ? '📊 Ma progression - Tohindrano sy Antontan-isa' : '📊 Ma Progression'}
        </h1>
        <p className="text-xs text-slate-400">
          {isMg
            ? 'Fanarahana ny fandrosoanao amin\'ny lesona sy quiz ary toromarika manokana'
            : 'Suivez vos performances et recommandations personnalisées pour le BAC'}
        </p>

        {/* Overall Completion Gauge */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200">
              {isMg ? 'Taha-pahatsorana ankapobeny (Taux d\'achèvement)' : 'Taux global d\'avancement'}
            </span>
            <span className="text-lg font-black text-amber-400">{overallPercent}%</span>
          </div>

          <div className="w-full bg-slate-700 h-3 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 via-indigo-500 to-amber-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.max(overallPercent, 5)}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <span>{completedCount} / {totalLessons} {isMg ? 'Lesona vita' : 'leçons terminées'}</span>
            <span className="text-emerald-400 font-bold">
              🔥 {userProfile.streakDays} {isMg ? 'Andro mifanesy' : 'jours de suite'}
            </span>
          </div>
        </div>
      </div>

      {/* Malagasy Recommendations Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/10 border border-amber-500/30 rounded-3xl p-6 shadow-md space-y-2">
        <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
          <Sparkles className="w-5 h-5" />
          <span>{isMg ? 'Toromarika Malagasy Manokana (Recommandation)' : 'Recommandation Pédagogique'}</span>
        </div>
        <p className="text-xs text-slate-200 leading-relaxed font-medium">
          {overallPercent < 40
            ? '“Tokony hamerina ny chapitre momba ny Fonctions sy Mécanique ianao amin\'ity kerinandro ity mba hanatsarana ny naoty.”'
            : '“Tonga lafatra! Efa tsara ny fandrosoanao amin\'ny taranja lehibe. Tohizo ny fanaovana fampiharana BAC Blanc.”'}
        </p>
      </div>

      {/* Subject Breakdown Bars */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <h3 className="font-bold text-base text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-400" />
          {isMg ? 'Fandrosoana isan-taranja' : 'Progression par matière'}
        </h3>

        <div className="space-y-4">
          {SUBJECTS.map(subj => {
            const subjLessons = lessons.filter(l => l.subjectId === subj.id);
            const subjComp = subjLessons.filter(l => completedLessonIds.includes(l.id)).length;
            const pct =
              subjLessons.length > 0 ? Math.round((subjComp / subjLessons.length) * 100) : 25;

            return (
              <div key={subj.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">
                    {isMg ? subj.nameMg : subj.nameFr}
                  </span>
                  <span className="font-mono font-bold text-amber-400">{pct}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-700/60">
                  <div
                    className="bg-blue-500 h-full rounded-full"
                    style={{ width: `${Math.max(pct, 8)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quiz History */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <h3 className="font-bold text-base text-white flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-400" />
          {isMg ? 'Tantara ny Quiz efa natao' : 'Historique des Quiz'}
        </h3>

        {quizResults.length === 0 ? (
          <p className="text-xs text-slate-400 italic">
            {isMg ? 'Mbola tsy nanao quiz ianao.' : 'Aucun résultat de quiz enregistré.'}
          </p>
        ) : (
          <div className="space-y-2">
            {quizResults.map((r, i) => (
              <div
                key={i}
                className="bg-slate-800/80 border border-slate-700/80 p-3.5 rounded-2xl flex items-center justify-between text-xs"
              >
                <div>
                  <h4 className="font-bold text-white">{r.quizTitle}</h4>
                  <span className="text-slate-400">{new Date(r.date).toLocaleDateString()}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-amber-400">{r.score} / {r.totalQuestions}</span>
                  <span className="block text-[10px] text-emerald-400 font-bold">{r.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
