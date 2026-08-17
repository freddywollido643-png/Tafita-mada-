import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Lesson, Level, Series, SubjectId } from '../types';
import {
  SUBJECTS,
  BEPC_SUBJECT_IDS,
  TERMINALE_SERIES_COEFFICIENTS,
  getSubjectCoefficient
} from '../data/mockDatabase';
import { FormattedContent, cleanMathNotation } from './FormattedContent';
import {
  BookOpen,
  CheckCircle,
  Star,
  Download,
  Bot,
  ArrowLeft,
  Clock,
  Bookmark,
  FileText,
  Lightbulb,
  Layers,
  ChevronRight,
  Filter,
  GraduationCap,
  Award,
  Target,
  Sparkles,
  Calculator,
  Atom,
  Dna,
  Languages,
  Globe,
  Globe2,
  Activity,
  TrendingUp,
  Brain
} from 'lucide-react';

export const LessonSystem: React.FC = () => {
  const {
    userProfile,
    updateUserProfile,
    lessons,
    favoriteLessonIds,
    completedLessonIds,
    toggleFavoriteLesson,
    markLessonCompleted,
    downloadItem,
    isDownloaded,
    selectedLesson,
    setSelectedLesson,
    selectedSubjectId,
    setSelectedSubjectId,
    setCurrentTab
  } = useApp();

  const isMg = userProfile.language === 'mg';

  // Category: 'exam' vs 'passage'
  const isExamLevel = userProfile.level === '3e' || userProfile.level === 'Terminale';
  const [activeCategory, setActiveCategory] = useState<'exam' | 'passage'>(
    isExamLevel ? 'exam' : 'passage'
  );

  // Active series for Terminale
  const activeSeries: 'OSE' | 'L' | 'S' =
    userProfile.series === 'OSE' || userProfile.series === 'L' || userProfile.series === 'S'
      ? userProfile.series
      : 'OSE';

  // Helper to render subject icon
  const renderSubjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'Calculator': return <Calculator className="w-4 h-4" />;
      case 'Atom': return <Atom className="w-4 h-4" />;
      case 'Dna': return <Dna className="w-4 h-4" />;
      case 'BookOpen': return <BookOpen className="w-4 h-4" />;
      case 'Languages': return <Languages className="w-4 h-4" />;
      case 'Brain': return <Brain className="w-4 h-4" />;
      case 'Globe': return <Globe className="w-4 h-4" />;
      case 'Globe2': return <Globe2 className="w-4 h-4" />;
      case 'TrendingUp': return <TrendingUp className="w-4 h-4" />;
      case 'Activity': return <Activity className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  // Get displayed subjects with coefficients based on current selection
  const getDisplayedSubjects = () => {
    if (userProfile.level === '3e') {
      return BEPC_SUBJECT_IDS.map(id => {
        const meta = SUBJECTS.find(s => s.id === id);
        return {
          meta: meta!,
          coef: 2
        };
      });
    }

    if (userProfile.level === 'Terminale') {
      const coefs = TERMINALE_SERIES_COEFFICIENTS[activeSeries];
      return SUBJECTS.map(meta => ({
        meta,
        coef: coefs[meta.id] || 1
      })).sort((a, b) => b.coef - a.coef);
    }

    // Passage classes (6e, 5e, 4e, Seconde, Première)
    return SUBJECTS.filter(s => {
      if (userProfile.level === '6e' || userProfile.level === '5e' || userProfile.level === '4e') {
        return s.id !== 'philo' && s.id !== 'ses';
      }
      return true;
    }).map(meta => ({
      meta,
      coef: meta.coefficientDefault
    }));
  };

  const displayedSubjects = getDisplayedSubjects();

  // Filter lessons based on level, series, subject
  const filteredLessons = lessons.filter(l => {
    const levelMatch = l.level === userProfile.level;
    const seriesMatch =
      l.seriesList.includes('Toutes') ||
      l.seriesList.includes(userProfile.series) ||
      (userProfile.level === '3e') ||
      (['6e', '5e', '4e'].includes(userProfile.level));
    const subjectMatch = selectedSubjectId ? l.subjectId === selectedSubjectId : true;
    return levelMatch && seriesMatch && subjectMatch;
  });

  const handleDownload = (lesson: Lesson) => {
    downloadItem({
      id: lesson.id,
      type: 'lesson',
      title: lesson.title,
      subjectId: lesson.subjectId,
      sizeKb: 240,
      downloadedAt: new Date().toISOString(),
      data: lesson
    });
  };

  if (selectedLesson) {
    const isFav = favoriteLessonIds.includes(selectedLesson.id);
    const isComp = completedLessonIds.includes(selectedLesson.id);
    const isDown = isDownloaded(selectedLesson.id);

    return (
      <div className="space-y-6 pb-20">
        
        {/* Navigation Top Bar */}
        <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-md">
          <button
            onClick={() => setSelectedLesson(null)}
            className="flex items-center space-x-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 px-3 py-1.5 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isMg ? 'Rerena amin\'ny lisitra' : 'Retour aux leçons'}</span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => toggleFavoriteLesson(selectedLesson.id)}
              className={`p-2 rounded-xl border text-xs font-semibold transition-all ${
                isFav
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
              }`}
              title={isMg ? 'Mampiditra amin\'ny Favorite' : 'Ajouter aux favoris'}
            >
              <Star className={`w-4 h-4 ${isFav ? 'fill-amber-400 text-amber-400' : ''}`} />
            </button>

            <button
              onClick={() => handleDownload(selectedLesson)}
              disabled={isDown}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                isDown
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
              }`}
            >
              <Download className="w-4 h-4" />
              <span>{isDown ? (isMg ? 'Voatahiry' : 'Téléchargé') : (isMg ? 'Hatahiry' : 'Télécharger')}</span>
            </button>

            <button
              onClick={() => {
                markLessonCompleted(selectedLesson.id);
              }}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isComp
                  ? 'bg-emerald-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>
                {isComp
                  ? isMg
                    ? 'Efa vita'
                    : 'Terminé'
                  : isMg
                  ? 'Marquer comme terminé'
                  : 'Marquer comme terminé'}
              </span>
            </button>
          </div>
        </div>

        {/* Lesson Detail Reader */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          
          {/* Header */}
          <div className="border-b border-slate-800 pb-5 space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2.5 py-0.5 bg-blue-500/20 text-blue-300 font-bold rounded-full">
                {selectedLesson.level} - Série {selectedLesson.seriesList.join(', ')}
              </span>
              <span className="px-2.5 py-0.5 bg-slate-800 text-slate-300 font-medium rounded-full flex items-center gap-1">
                <Clock className="w-3 h-3 text-amber-400" />
                {selectedLesson.estimatedMinutes} min
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
              {isMg ? selectedLesson.title : selectedLesson.titleFr || selectedLesson.title}
            </h1>
            <p className="text-sm font-semibold text-amber-400">{selectedLesson.chapterTitle}</p>
          </div>

          {/* Introduction */}
          <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-5 space-y-2">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              {isMg ? 'Fampidirana (Introduction)' : 'Introduction'}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {selectedLesson.content.introduction}
            </p>
          </div>

          {/* Objectives */}
          {selectedLesson.content.objectives && (
            <div className="space-y-3">
              <h3 className="font-bold text-base text-white">
                🎯 {isMg ? 'Tanjona trandrahana (Objectifs)' : 'Objectifs de la leçon'}
              </h3>
              <ul className="space-y-2">
                {selectedLesson.content.objectives.map((obj, i) => (
                  <li
                    key={i}
                    className="flex items-start space-x-2.5 text-sm text-slate-300 bg-slate-800/40 p-3 rounded-xl border border-slate-800"
                  >
                    <span className="w-5 h-5 rounded-full bg-blue-600/30 text-blue-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Definitions */}
          {selectedLesson.content.definitions.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-bold text-base text-white">
                📖 {isMg ? 'Famaritana sy Hevitra (Définitions)' : 'Définitions clés'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedLesson.content.definitions.map((def, i) => (
                  <div
                    key={i}
                    className="bg-slate-800/80 border border-slate-700 p-4 rounded-2xl space-y-1"
                  >
                    <h4 className="font-bold text-amber-300 text-sm">{def.term}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{def.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Formulas */}
          {selectedLesson.content.formulas && selectedLesson.content.formulas.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-bold text-base text-white">
                📐 {isMg ? 'Raikipohy lehibe (Formules)' : 'Formules mathématiques/scientifiques'}
              </h3>
              <div className="space-y-2">
                {selectedLesson.content.formulas.map((f, i) => (
                  <div
                    key={i}
                    className="bg-slate-950 border border-blue-900/60 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-inner"
                  >
                    <div>
                      <span className="text-xs font-semibold text-slate-400">{f.name}</span>
                      {f.explanation && (
                        <p className="text-xs text-slate-400 mt-0.5">{f.explanation}</p>
                      )}
                    </div>
                    <code className="text-sm font-mono font-bold text-emerald-400 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800 break-words">
                      {cleanMathNotation(f.formula)}
                    </code>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Examples */}
          {selectedLesson.content.examples.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-bold text-base text-white">
                💡 {isMg ? 'Ohatra azo tsapain-tanana (Exemples)' : 'Exemples pratiques'}
              </h3>
              <div className="space-y-2">
                {selectedLesson.content.examples.map((ex, i) => (
                  <div key={i} className="bg-slate-800/50 border border-slate-700/80 p-4 rounded-2xl space-y-1">
                    <h4 className="font-bold text-sm text-blue-300">{ex.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{ex.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Main Text */}
          <div className="space-y-2">
            <h3 className="font-bold text-base text-white">
              📝 {isMg ? 'Votoatin-desona (Votoatiny)' : 'Développement de la leçon'}
            </h3>
            <div className="bg-slate-950/70 border border-slate-800 p-5 rounded-2xl">
              <FormattedContent content={selectedLesson.content.mainText} />
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gradient-to-r from-amber-500/10 via-slate-800 to-amber-500/10 border border-amber-500/30 rounded-2xl p-5 space-y-2">
            <h3 className="font-bold text-sm text-amber-300 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-amber-400" />
              {isMg ? 'Fehiny sy Tsara ho fantatra (Résumé)' : 'Résumé & Points essentiels'}
            </h3>
            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              {selectedLesson.content.summary}
            </p>
          </div>

          {/* Prompt AI TAFITA Button */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setCurrentTab('ai')}
              className="flex-1 flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-xs rounded-2xl shadow-xl transition-all"
            >
              <Bot className="w-5 h-5" />
              <span>
                {isMg
                  ? 'Manohatra na manontany an\'i AI TAFITA momba ity lesona ity'
                  : 'Demander des explications à AI TAFITA'}
              </span>
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      
      {/* PARCOURS & ORIENTATION SELECTOR (Classes d'examen vs Classes de passage) */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-5 shadow-xl">
        
        {/* Header & Category Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-amber-400" />
              {isMg ? 'Parcours, Orientation & Lesona' : 'Parcours, Orientation & Leçons'}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              {isMg
                ? 'Safidio ny kilasy, ny série ary ny taranja tianao ianarana'
                : 'Sélectionnez votre classe, série et matière à étudier'}
            </p>
          </div>

          <div className="flex items-center bg-slate-800/90 p-1 rounded-2xl border border-slate-700/80 self-start sm:self-auto">
            <button
              onClick={() => {
                setActiveCategory('exam');
                if (userProfile.level !== '3e' && userProfile.level !== 'Terminale') {
                  updateUserProfile({ level: 'Terminale', series: 'OSE' });
                }
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                activeCategory === 'exam'
                  ? 'bg-amber-500 text-slate-950 shadow-md ring-1 ring-amber-300'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Award className="w-4 h-4" />
              1. Classes d'examen
            </button>
            <button
              onClick={() => {
                setActiveCategory('passage');
                if (userProfile.level === '3e' || userProfile.level === 'Terminale') {
                  updateUserProfile({ level: 'Seconde', series: 'Toutes' });
                }
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                activeCategory === 'passage'
                  ? 'bg-blue-600 text-white shadow-md ring-1 ring-blue-400'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              2. Classes de passage
            </button>
          </div>
        </div>

        {/* 1. CLASSES D'EXAMEN VIEW (BEPC vs BACC) */}
        {activeCategory === 'exam' && (
          <div className="space-y-4">
            {/* Exam sub-choice (BEPC vs BACC) */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => updateUserProfile({ level: '3e', series: 'Toutes' })}
                className={`flex-1 sm:flex-initial px-4 py-2 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 border ${
                  userProfile.level === '3e'
                    ? 'bg-rose-600/20 text-rose-300 border-rose-500 shadow-lg ring-1 ring-rose-400'
                    : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
                }`}
              >
                <Target className="w-4 h-4 text-rose-400" />
                🎯 BEPC — 3ème
              </button>

              <button
                onClick={() => updateUserProfile({ level: 'Terminale', series: activeSeries })}
                className={`flex-1 sm:flex-initial px-4 py-2 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 border ${
                  userProfile.level === 'Terminale'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500 shadow-lg ring-1 ring-amber-400'
                    : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
                }`}
              >
                <GraduationCap className="w-4 h-4 text-amber-400" />
                🎓 BACC — Terminale
              </button>
            </div>

            {/* If Terminale: Series Selector (OSE, L, S) */}
            {userProfile.level === 'Terminale' && (
              <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-3.5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    {isMg ? 'Safidio ny Série BACC (Fizaram-pahaizana) :' : 'Sélectionnez votre Série du BACC :'}
                  </span>
                  <span className="text-[11px] text-slate-400 font-bold">
                    Série {activeSeries} • Total Coef. 32
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    {
                      id: 'OSE' as const,
                      name: 'Série OSE',
                      titleMg: 'Organisation, Société & Économie',
                      titleFr: 'Organisation, Société & Économie',
                      keySubjects: 'SES (6), Hist-Géo (6), Maths (5)',
                      color: 'from-amber-500/20 to-amber-600/10 border-amber-500/60 text-amber-300'
                    },
                    {
                      id: 'L' as const,
                      name: 'Série L',
                      titleMg: 'Haisoratra & Teny (Littéraire)',
                      titleFr: 'Littéraire & Langues',
                      keySubjects: 'Malagasy (6), Français (5), Anglais (5), Philo (5)',
                      color: 'from-blue-500/20 to-blue-600/10 border-blue-500/60 text-blue-300'
                    },
                    {
                      id: 'S' as const,
                      name: 'Série S',
                      titleMg: 'Siansa Fototra (Scientifique)',
                      titleFr: 'Scientifique',
                      keySubjects: 'Maths (6), SPC (6), SVT (6)',
                      color: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/60 text-emerald-300'
                    }
                  ].map(s => {
                    const isSelected = activeSeries === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => updateUserProfile({ level: 'Terminale', series: s.id })}
                        className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden ${
                          isSelected
                            ? `bg-gradient-to-br ${s.color} shadow-lg ring-1 ring-amber-400/50`
                            : 'bg-slate-800/80 border-slate-700 hover:bg-slate-800'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-xs font-black ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                            {s.name}
                          </span>
                          {isSelected && (
                            <span className="text-[9px] bg-amber-500 text-slate-950 font-bold px-1.5 py-0.2 rounded-full">
                              Active ✓
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-300 font-medium truncate">
                          {isMg ? s.titleMg : s.titleFr}
                        </p>
                        <p className="text-[10px] text-amber-400 font-semibold mt-1 truncate">
                          ★ {s.keySubjects}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. CLASSES DE PASSAGE VIEW */}
        {activeCategory === 'passage' && (
          <div className="space-y-2.5">
            <span className="text-xs font-extrabold text-blue-400 uppercase tracking-wider block">
              {isMg ? 'Mifidiana Kilasy de Passage :' : 'Sélectionnez une classe de passage :'}
            </span>
            <div className="flex flex-wrap gap-2">
              {(['6e', '5e', '4e', 'Seconde', 'Première'] as const).map(lvl => {
                const isSelected = userProfile.level === lvl;
                return (
                  <button
                    key={lvl}
                    onClick={() => updateUserProfile({ level: lvl, series: 'Toutes' })}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-500 shadow-md ring-1 ring-blue-300'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    {lvl === '6e' ? '6ème (Collège)' : lvl === '5e' ? '5ème (Collège)' : lvl === '4e' ? '4ème (Collège)' : lvl === 'Seconde' ? 'Seconde (Lycée)' : 'Première (Lycée)'}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* SUBJECTS & COEFFICIENTS FILTER BAR */}
        <div className="space-y-2.5 pt-3 border-t border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <label className="text-xs font-extrabold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-amber-400" />
              {isMg ? 'Sivana araka ny Taranja (Matières & Coef.) :' : 'Filtrer par matière :'}
            </label>
            {userProfile.level === 'Terminale' && (
              <span className="text-[10px] font-bold text-amber-300/90 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-lg self-start sm:self-auto">
                Total Coef. = 32
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-thin">
            <button
              onClick={() => setSelectedSubjectId(null)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap border transition-all ${
                selectedSubjectId === null
                  ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
              }`}
            >
              {isMg ? 'Taranja Rehetra' : 'Toutes les matières'}
            </button>

            {displayedSubjects.map(({ meta, coef }) => {
              const isSelected = selectedSubjectId === meta.id;
              return (
                <button
                  key={meta.id}
                  onClick={() => setSelectedSubjectId(isSelected ? null : meta.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap border transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md scale-105'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                  }`}
                >
                  <span>{isMg ? meta.nameMg : meta.nameFr}</span>
                  {userProfile.level === 'Terminale' && (
                    <span
                      className={`text-[10px] font-black px-1.5 py-0.2 rounded-md ${
                        isSelected
                          ? 'bg-slate-950 text-amber-400'
                          : 'bg-slate-700 text-slate-300'
                      }`}
                    >
                      ×{coef}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Lesson List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400 px-1">
          <span>{filteredLessons.length} {isMg ? 'Lesona hita' : 'leçons trouvées'}</span>
          <span>
            {userProfile.level} {userProfile.level === 'Terminale' ? `— Série ${activeSeries}` : ''}
          </span>
        </div>

        {filteredLessons.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-3">
            <BookOpen className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white">
              {isMg ? 'Tsy misy lesona amin\'ity taranja/série ity aloha' : 'Aucune leçon disponible'}
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {isMg
                ? 'Afaka mifidy taranja hafa na miova série ianao hijerena ny fandaharam-pianarana.'
                : 'Sélectionnez une autre matière ou série pour explorer le programme.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {filteredLessons.map(les => {
              const isFav = favoriteLessonIds.includes(les.id);
              const isComp = completedLessonIds.includes(les.id);
              const isDown = isDownloaded(les.id);

              return (
                <div
                  key={les.id}
                  onClick={() => setSelectedLesson(les)}
                  className="group bg-slate-900 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {les.chapterTitle}
                      </span>
                      <div className="flex items-center space-x-1">
                        {isComp && (
                          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                            ✓ Vita
                          </span>
                        )}
                        {isDown && (
                          <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full">
                            📥 Offline
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="font-bold text-base text-white group-hover:text-amber-400 transition-colors">
                      {isMg ? les.title : les.titleFr || les.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2">
                      {les.content.introduction}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs font-semibold text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      {les.estimatedMinutes} min
                    </span>
                    <span className="text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      {isMg ? 'Hamaky' : 'Lire la leçon'}
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
