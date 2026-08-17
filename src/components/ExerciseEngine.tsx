import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Exercise, Difficulty, SubjectId } from '../types';
import { SUBJECTS } from '../data/mockDatabase';
import { cleanMathNotation } from './FormattedContent';
import {
  FileText,
  CheckCircle,
  XCircle,
  HelpCircle,
  Bot,
  ChevronDown,
  ChevronUp,
  Award,
  Filter
} from 'lucide-react';

export const ExerciseEngine: React.FC = () => {
  const { exercises, userProfile, selectedSubjectId, setSelectedSubjectId, setCurrentTab } = useApp();
  const isMg = userProfile.language === 'mg';

  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all');
  const [userAnswers, setUserAnswers] = useState<{ [exerciseId: string]: number | string }>({});
  const [showCorrections, setShowCorrections] = useState<{ [exerciseId: string]: boolean }>({});

  const filteredExercises = exercises.filter(ex => {
    const subjectMatch = selectedSubjectId ? ex.subjectId === selectedSubjectId : true;
    const diffMatch = selectedDifficulty === 'all' ? true : ex.difficulty === selectedDifficulty;
    return subjectMatch && diffMatch;
  });

  const handleSelectChoice = (exerciseId: string, choiceIndex: number) => {
    setUserAnswers(prev => ({ ...prev, [exerciseId]: choiceIndex }));
  };

  const toggleCorrection = (exerciseId: string) => {
    setShowCorrections(prev => ({ ...prev, [exerciseId]: !prev[exerciseId] }));
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header & Filters */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-lg">
        <div>
          <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-emerald-400" />
            {isMg ? 'Môdily Fanazarantena & Valiny (Exercices)' : 'Exercices & Corrigés Détaillés'}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {isMg
              ? 'Fanazarantena miaraka amin\'ny fanazavana isam-pandingana ho amin\'ny fanadinana'
              : 'Entraînez-vous avec les explications étape par étape'}
          </p>
        </div>

        {/* Difficulty Filter */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-slate-300">
              {isMg ? 'Laharana (Difficulté) :' : 'Difficulté :'}
            </span>
            <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700">
              <button
                onClick={() => setSelectedDifficulty('all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedDifficulty === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {isMg ? 'Rehetra' : 'Tous'}
              </button>
              <button
                onClick={() => setSelectedDifficulty('easy')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedDifficulty === 'easy'
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🟢 {isMg ? 'Tsotra' : 'Facile'}
              </button>
              <button
                onClick={() => setSelectedDifficulty('medium')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedDifficulty === 'medium'
                    ? 'bg-amber-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🟡 {isMg ? 'Antonony' : 'Moyen'}
              </button>
              <button
                onClick={() => setSelectedDifficulty('hard')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedDifficulty === 'hard'
                    ? 'bg-rose-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🔴 {isMg ? 'Sarotra' : 'Difficile'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Exercise Cards */}
      <div className="space-y-4">
        {filteredExercises.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-2">
            <HelpCircle className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white">
              {isMg ? 'Tsy misy exercice hita amin\'ity fifantenana ity' : 'Aucun exercice trouvé'}
            </h3>
          </div>
        ) : (
          filteredExercises.map((ex, idx) => {
            const isMcq = ex.type === 'mcq';
            const selectedChoice = userAnswers[ex.id];
            const isCorrectionVisible = showCorrections[ex.id];

            let isCorrect = false;
            if (isMcq && selectedChoice !== undefined) {
              isCorrect = selectedChoice === ex.correctAnswer;
            }

            return (
              <div
                key={ex.id}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-md space-y-4"
              >
                {/* Exercise Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-lg bg-emerald-600/20 text-emerald-400 text-xs font-black flex items-center justify-center border border-emerald-500/30">
                      {idx + 1}
                    </span>
                    <h3 className="font-bold text-base text-white">{ex.title}</h3>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                      ex.difficulty === 'easy'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : ex.difficulty === 'medium'
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                    }`}
                  >
                    {ex.difficulty === 'easy'
                      ? '🟢 Easy'
                      : ex.difficulty === 'medium'
                      ? '🟡 Medium'
                      : '🔴 Hard'}
                  </span>
                </div>

                {/* Question Prompt */}
                <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl">
                  <p className="text-sm font-semibold text-slate-200 leading-relaxed whitespace-pre-line">
                    {cleanMathNotation(ex.question)}
                  </p>
                </div>

                {/* MCQ Choices */}
                {isMcq && ex.choices && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 block">
                      {isMg ? 'Fidiliana valiny (Choix) :' : 'Sélectionnez votre réponse :'}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {ex.choices.map((choice, cIdx) => {
                        const isChosen = selectedChoice === cIdx;
                        const isRightChoice = cIdx === ex.correctAnswer;

                        let style =
                          'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700';

                        if (isChosen) {
                          if (isRightChoice) {
                            style = 'bg-emerald-600 text-white border-emerald-500 font-bold';
                          } else {
                            style = 'bg-rose-600 text-white border-rose-500 font-bold';
                          }
                        } else if (selectedChoice !== undefined && isRightChoice) {
                          style = 'bg-emerald-950/80 text-emerald-300 border-emerald-600 font-bold';
                        }

                        return (
                          <button
                            key={cIdx}
                            onClick={() => handleSelectChoice(ex.id, cIdx)}
                            className={`p-3 rounded-xl border text-xs text-left transition-all ${style}`}
                          >
                            {cleanMathNotation(choice)}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Feedback status for MCQ */}
                {selectedChoice !== undefined && isMcq && (
                  <div
                    className={`p-3 rounded-xl border text-xs font-bold flex items-center space-x-2 ${
                      isCorrect
                        ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                        : 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                    }`}
                  >
                    {isCorrect ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <span>{isMg ? 'Marina ny valin-teninao! 🎉' : 'Bonne réponse ! 🎉'}</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-rose-400" />
                        <span>
                          {isMg
                            ? 'Misy diso kely, jereo ny fanazavana feno ambany.'
                            : 'Mauvaise réponse. Consultez le corrigé ci-dessous.'}
                        </span>
                      </>
                    )}
                  </div>
                )}

                {/* Correction Toggle & Action Controls */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
                  <button
                    onClick={() => toggleCorrection(ex.id)}
                    className="flex items-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-colors"
                  >
                    <span>
                      {isCorrectionVisible
                        ? isMg
                          ? 'Afeno ny fanazavana'
                          : 'Masquer le corrigé'
                        : isMg
                        ? 'Jereo ny fanazavana amin\'ny antsipiriany (Corrigé)'
                        : 'Voir le corrigé détaillé'}
                    </span>
                    {isCorrectionVisible ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>

                  <button
                    onClick={() => setCurrentTab('ai')}
                    className="flex items-center space-x-1.5 px-3.5 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-bold transition-colors"
                  >
                    <Bot className="w-4 h-4" />
                    <span>{isMg ? 'Manontany an\'i AI TAFITA' : 'Demander à AI TAFITA'}</span>
                  </button>
                </div>

                {/* Step-by-Step Correction Drawer */}
                {isCorrectionVisible && (
                  <div className="bg-slate-950 border border-emerald-900/60 rounded-2xl p-5 space-y-3 shadow-inner">
                    <h4 className="font-bold text-emerald-400 text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <Award className="w-4 h-4" />
                      {isMg ? 'Fanazavana feno isam-pandingana (Correction)' : 'Corrigé pas-à-pas'}
                    </h4>
                    <ol className="space-y-2 text-xs text-slate-300">
                      {ex.stepByStepCorrection.map((step, sIdx) => (
                        <li
                          key={sIdx}
                          className="bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl font-mono text-emerald-300"
                        >
                          {cleanMathNotation(step)}
                        </li>
                      ))}
                    </ol>

                    <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-300">
                      <strong>Note:</strong> {cleanMathNotation(ex.explanation)}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
