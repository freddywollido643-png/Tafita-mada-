import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Quiz, QuizQuestion, QuizResult } from '../types';
import { storageService } from '../services/storageService';
import { cleanMathNotation } from './FormattedContent';
import {
  Brain,
  Clock,
  CheckCircle,
  XCircle,
  Award,
  RotateCcw,
  Bot,
  ArrowRight
} from 'lucide-react';

export const QuizSystem: React.FC = () => {
  const { quizzes, userProfile, setCurrentTab } = useApp();
  const isMg = userProfile.language === 'mg';

  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: string]: number }>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  // Countdown timer effect
  useEffect(() => {
    if (!activeQuiz || isQuizCompleted) return;

    if (timeLeftSeconds <= 0) {
      handleFinishQuiz();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeftSeconds(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [activeQuiz, timeLeftSeconds, isQuizCompleted]);

  const handleStartQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setTimeLeftSeconds(quiz.durationMinutes * 60);
    setIsQuizCompleted(false);
    setQuizResult(null);
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (isQuizCompleted) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleFinishQuiz = () => {
    if (!activeQuiz) return;

    let score = 0;
    activeQuiz.questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctOptionIndex) {
        score += 1;
      }
    });

    const total = activeQuiz.questions.length;
    const percentage = Math.round((score / total) * 100);
    const timeSpent = activeQuiz.durationMinutes * 60 - timeLeftSeconds;

    const result: QuizResult = {
      id: `res-${Date.now()}`,
      quizId: activeQuiz.id,
      quizTitle: activeQuiz.title,
      subjectId: activeQuiz.subjectId,
      score,
      totalQuestions: total,
      percentage,
      timeSpentSeconds: timeSpent,
      date: new Date().toISOString(),
      recommendedRevision:
        percentage < 70
          ? 'Mila mamerina tsara ny toko sy lesona momba ity taranja ity ianao.'
          : 'Tonga lafatra! Tohizo ny fanaovana fampiharana.'
    };

    storageService.saveQuizResult(result);
    setQuizResult(result);
    setIsQuizCompleted(true);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (activeQuiz && !isQuizCompleted) {
    const q = activeQuiz.questions[currentQuestionIndex];
    const isLast = currentQuestionIndex === activeQuiz.questions.length - 1;
    const selectedOpt = selectedAnswers[q.id];

    return (
      <div className="space-y-6 pb-20">
        
        {/* Quiz Active Header */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold px-2.5 py-0.5 bg-purple-500/20 text-purple-300 rounded-full">
              Quiz {currentQuestionIndex + 1} / {activeQuiz.questions.length}
            </span>
            <h2 className="text-base font-bold text-white mt-1">{activeQuiz.title}</h2>
          </div>

          <div className="flex items-center space-x-2 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 text-amber-400 font-mono font-bold text-sm">
            <Clock className="w-4 h-4" />
            <span>{formatTime(timeLeftSeconds)}</span>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <h3 className="text-lg font-bold text-white leading-relaxed">
            {cleanMathNotation(q.question)}
          </h3>

          <div className="space-y-3">
            {q.options.map((opt, oIdx) => {
              const isSelected = selectedOpt === oIdx;
              return (
                <button
                  key={oIdx}
                  onClick={() => handleSelectOption(q.id, oIdx)}
                  className={`w-full text-left p-4 rounded-2xl border text-sm font-semibold transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-purple-600 text-white border-purple-500 shadow-md scale-[1.01]'
                      : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  <span>
                    <strong className="mr-2">{String.fromCharCode(65 + oIdx)}.</strong> {cleanMathNotation(opt)}
                  </span>
                  {isSelected && <CheckCircle className="w-5 h-5 text-white shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Stepper Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2 bg-slate-800 text-slate-400 disabled:opacity-50 text-xs font-bold rounded-xl"
            >
              {isMg ? 'Lasa' : 'Précédent'}
            </button>

            {isLast ? (
              <button
                onClick={handleFinishQuiz}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg transition-transform active:scale-95"
              >
                {isMg ? 'Mamarana ny Quiz' : 'Terminer le Quiz'}
              </button>
            ) : (
              <button
                onClick={() =>
                  setCurrentQuestionIndex(prev =>
                    Math.min(activeQuiz.questions.length - 1, prev + 1)
                  )
                }
                className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl shadow-lg flex items-center space-x-1"
              >
                <span>{isMg ? 'Mandroso' : 'Suivant'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>
    );
  }

  if (activeQuiz && isQuizCompleted && quizResult) {
    return (
      <div className="space-y-6 pb-20">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-6 shadow-xl">
          <div className="w-16 h-16 rounded-3xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              {isMg ? 'Valim-pifaninana (Résultats)' : 'Résultats du Quiz'}
            </span>
            <h2 className="text-2xl font-extrabold text-white mt-1">{activeQuiz.title}</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
              <span className="text-xs text-slate-400">{isMg ? 'Nomeram-pahaizana' : 'Score'}</span>
              <p className="text-xl font-black text-amber-400 mt-1">
                {quizResult.score} / {quizResult.totalQuestions}
              </p>
            </div>
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
              <span className="text-xs text-slate-400">Pourcentage</span>
              <p className="text-xl font-black text-emerald-400 mt-1">{quizResult.percentage}%</p>
            </div>
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 col-span-2 sm:col-span-1">
              <span className="text-xs text-slate-400">{isMg ? 'Fotoana' : 'Temps'}</span>
              <p className="text-xl font-black text-blue-400 mt-1">
                {formatTime(quizResult.timeSpentSeconds)}
              </p>
            </div>
          </div>

          <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-2xl text-xs text-purple-200 text-left">
            <strong>Toromarika (Recommandation) :</strong> {quizResult.recommendedRevision}
          </div>

          {/* Detailed Question Review */}
          <div className="space-y-3 text-left pt-2">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              {isMg ? 'Fandalinana ny fanontaniana rehetra (Corrigé détaillé) :' : 'Détail des réponses & explications :'}
            </h4>
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {activeQuiz.questions.map((q, idx) => {
                const userAns = selectedAnswers[q.id];
                const isUserCorrect = userAns === q.correctOptionIndex;
                return (
                  <div
                    key={q.id}
                    className={`p-3 rounded-2xl border text-xs space-y-1.5 ${
                      isUserCorrect
                        ? 'bg-emerald-950/40 border-emerald-500/40 text-slate-200'
                        : 'bg-rose-950/40 border-rose-500/40 text-slate-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-white flex-1">
                        {idx + 1}. {cleanMathNotation(q.question)}
                      </span>
                      <span className="shrink-0">
                        {isUserCorrect ? (
                          <span className="text-emerald-400 font-bold flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5" /> {isMg ? 'Marina' : 'Correct'}
                          </span>
                        ) : (
                          <span className="text-rose-400 font-bold flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5" /> {isMg ? 'Diso' : 'Incorrect'}
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-300">
                      <strong className="text-emerald-400">
                        {isMg ? 'Valiny marina :' : 'Bonne réponse :'}
                      </strong>{' '}
                      {cleanMathNotation(q.options[q.correctOptionIndex])}
                    </div>
                    {q.explanation && (
                      <div className="text-[11px] text-amber-200/90 bg-slate-900/60 p-2 rounded-xl border border-slate-800">
                        💡 {cleanMathNotation(q.explanation)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-800">
            <button
              onClick={() => handleStartQuiz(activeQuiz)}
              className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{isMg ? 'Hamerina ny Quiz' : 'Recommencer'}</span>
            </button>
            <button
              onClick={() => setActiveQuiz(null)}
              className="flex-1 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl"
            >
              {isMg ? 'Hivoaka ny Quiz' : 'Retour aux Quizzes'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-lg">
        <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
          <Brain className="w-6 h-6 text-purple-400" />
          {isMg ? 'Quiz & Fitsapana Fahaizana' : 'Quiz & Evaluation Chronométrée'}
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          {isMg
            ? 'Pitsopitsony sy fitsapana fahaizana miaraka amin\'ny kajy fotoana ho an\'ny BACC'
            : 'Tests interactifs avec chronomètre pour mesurer votre vitesse et vos connaissances'}
        </p>
      </div>

      {/* Quiz list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quizzes.map(q => (
          <div
            key={q.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300">
                  {q.level} - Série {q.seriesList.join(', ')}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  {q.durationMinutes} min
                </span>
              </div>
              <h3 className="font-bold text-base text-white">{q.title}</h3>
              <p className="text-xs text-slate-400">
                {q.questions.length} {isMg ? 'fanontaniana haingana' : 'questions interactives'}
              </p>
            </div>

            <button
              onClick={() => handleStartQuiz(q)}
              className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center space-x-2"
            >
              <span>{isMg ? 'Hanolotra amin\'izao' : 'Démarrer le Quiz'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};
