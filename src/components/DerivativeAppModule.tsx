import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Calculator,
  BookOpen,
  Zap,
  TrendingUp,
  Activity,
  Award,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Sparkles,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Layers,
  BarChart3,
  Flame,
  FileText
} from 'lucide-react';

interface PredefinedFunction {
  id: string;
  name: string;
  expression: string;
  derivative: string;
  defaultX0: number;
  explanationMg: string;
  explanationFr: string;
  stepsMg: string[];
  stepsFr: string[];
  calculate: (x: number) => number;
  calculateDerivative: (x: number) => number;
}

export const DerivativeAppModule: React.FC = () => {
  const { userProfile, setCurrentTab } = useApp();
  const isMg = userProfile.language === 'mg';

  const [activeSubTab, setActiveSubTab] = useState<'calculator' | 'formulas' | 'applications' | 'bac-exercises' | 'quick-quiz'>('calculator');

  // Predefined interactive functions for the calculator
  const predefinedFunctions: PredefinedFunction[] = [
    {
      id: 'poly1',
      name: 'Polynôme 3ème degré (Bac C/D/S)',
      expression: 'f(x) = 2x³ - 6x + 5',
      derivative: "f'(x) = 6x² - 6 = 6(x - 1)(x + 1)",
      defaultX0: 1,
      explanationMg: "Ny dérivée an'ny ax^n dia n·a·x^(n-1). Noho izany: (2x³)' = 6x², (-6x)' = -6, (5)' = 0.",
      explanationFr: "La dérivée de ax^n est n·a·x^(n-1). Ainsi : (2x³)' = 6x², (-6x)' = -6, et (5)' = 0.",
      stepsMg: [
        "1. Ampiharo ny raikipohy (xⁿ)' = n·xⁿ⁻¹",
        "2. (2x³)' = 2 × 3x² = 6x²",
        "3. (-6x)' = -6 × 1 = -6",
        "4. (5)' = 0 (isa tsy miova / constante)",
        "5. fitambarany: f'(x) = 6x² - 6 = 6(x² - 1)"
      ],
      stepsFr: [
        "1. Appliquer la formule (xⁿ)' = n·xⁿ⁻¹",
        "2. (2x³)' = 2 × 3x² = 6x²",
        "3. (-6x)' = -6 × 1 = -6",
        "4. (5)' = 0 (constante)",
        "5. Conclusion : f'(x) = 6x² - 6 = 6(x - 1)(x + 1)"
      ],
      calculate: (x: number) => 2 * Math.pow(x, 3) - 6 * x + 5,
      calculateDerivative: (x: number) => 6 * Math.pow(x, 2) - 6
    },
    {
      id: 'poly2',
      name: 'Polynôme 2nd degré (Parabole)',
      expression: 'f(x) = x² - 4x + 3',
      derivative: "f'(x) = 2x - 4 = 2(x - 2)",
      defaultX0: 2,
      explanationMg: "Sommet an'ny parabole: f'(x) = 0 rehefa x = 2. Ao no misy ny extremum (minimum).",
      explanationFr: "Sommet de la parabole : f'(x) = 0 quand x = 2. C'est l'extremum local (minimum).",
      stepsMg: [
        "1. (x²)' = 2x",
        "2. (-4x)' = -4",
        "3. (3)' = 0",
        "4. f'(x) = 2x - 4"
      ],
      stepsFr: [
        "1. (x²)' = 2x",
        "2. (-4x)' = -4",
        "3. (3)' = 0",
        "4. f'(x) = 2x - 4"
      ],
      calculate: (x: number) => Math.pow(x, 2) - 4 * x + 3,
      calculateDerivative: (x: number) => 2 * x - 4
    },
    {
      id: 'fraction',
      name: 'Fonction Rationnelle u/v (Homographique)',
      expression: 'f(x) = (2x + 1) / (x - 2)',
      derivative: "f'(x) = -5 / (x - 2)²",
      defaultX0: 3,
      explanationMg: "Ampiasaina ny raikipohy (u/v)' = (u'v - uv') / v² miaraka amin'ny u = 2x+1 sy v = x-2.",
      explanationFr: "On utilise la formule du quotient (u/v)' = (u'v - uv') / v² avec u = 2x+1 et v = x-2.",
      stepsMg: [
        "1. u(x) = 2x + 1 ⇒ u'(x) = 2",
        "2. v(x) = x - 2 ⇒ v'(x) = 1",
        "3. u'v - uv' = 2(x - 2) - (2x + 1)(1) = 2x - 4 - 2x - 1 = -5",
        "4. v² = (x - 2)²",
        "5. f'(x) = -5 / (x - 2)² < 0 (mihena hatrany ny f)"
      ],
      stepsFr: [
        "1. Poser u(x) = 2x + 1 ⇒ u'(x) = 2",
        "2. Poser v(x) = x - 2 ⇒ v'(x) = 1",
        "3. Numérateur : u'v - uv' = 2(x - 2) - 1·(2x + 1) = 2x - 4 - 2x - 1 = -5",
        "4. Dénominateur : v² = (x - 2)²",
        "5. Résultat : f'(x) = -5 / (x - 2)² < 0 (f est strictement décroissante)"
      ],
      calculate: (x: number) => (x !== 2 ? (2 * x + 1) / (x - 2) : 0),
      calculateDerivative: (x: number) => (x !== 2 ? -5 / Math.pow(x - 2, 2) : 0)
    },
    {
      id: 'expo',
      name: 'Fonction Exponentielle u·e^x (Bac S/C/D)',
      expression: 'f(x) = (x - 1)·e^(x)',
      derivative: "f'(x) = x·e^(x)",
      defaultX0: 0,
      explanationMg: "Vokatra u·v : (u·v)' = u'v + uv'. u = x - 1 ⇒ u' = 1 sy v = e^x ⇒ v' = e^x.",
      explanationFr: "Produit u·v : (u·v)' = u'v + uv'. Avec u = x - 1 ⇒ u' = 1 et v = e^x ⇒ v' = e^x.",
      stepsMg: [
        "1. u(x) = x - 1 ⇒ u'(x) = 1",
        "2. v(x) = e^x ⇒ v'(x) = e^x",
        "3. (u·v)' = 1·e^x + (x - 1)·e^x",
        "4. Famahana: e^x·(1 + x - 1) = x·e^x",
        "5. f'(x) = x·e^x"
      ],
      stepsFr: [
        "1. Poser u(x) = x - 1 ⇒ u'(x) = 1",
        "2. Poser v(x) = e^x ⇒ v'(x) = e^x",
        "3. f'(x) = 1·e^x + (x - 1)e^x",
        "4. Factoriser par e^x : f'(x) = e^x(1 + x - 1) = x·e^x",
        "5. Signe : dépend uniquement du signe de x car e^x > 0"
      ],
      calculate: (x: number) => (x - 1) * Math.exp(x),
      calculateDerivative: (x: number) => x * Math.exp(x)
    },
    {
      id: 'ln',
      name: 'Fonction Logarithme népérien ln(x) (Bac S/C/D/OSE)',
      expression: 'f(x) = x·ln(x) - x',
      derivative: "f'(x) = ln(x)",
      defaultX0: 1,
      explanationMg: "Ny dérivée an'ny x·ln(x) dia 1·ln(x) + x·(1/x) = ln(x) + 1. Esory ny (-x)' = -1 dia azo f'(x) = ln(x).",
      explanationFr: "La dérivée de x·ln(x) est ln(x) + 1. Avec la dérivée de -x qui vaut -1, on trouve f'(x) = ln(x).",
      stepsMg: [
        "1. Dérivée an'ny x·ln(x) : 1·ln(x) + x × (1/x) = ln(x) + 1",
        "2. Dérivée an'ny -x : -1",
        "3. Fitambarany: f'(x) = ln(x) + 1 - 1 = ln(x)",
        "4. f'(1) = ln(1) = 0 (tanjanta marindrano)"
      ],
      stepsFr: [
        "1. Dérivée du produit x·ln(x) : 1·ln(x) + x·(1/x) = ln(x) + 1",
        "2. Dérivée de -x : -1",
        "3. Somme : f'(x) = ln(x) + 1 - 1 = ln(x)",
        "4. En x = 1 : f'(1) = ln(1) = 0 (tangente horizontale)"
      ],
      calculate: (x: number) => (x > 0 ? x * Math.log(x) - x : 0),
      calculateDerivative: (x: number) => (x > 0 ? Math.log(x) : 0)
    }
  ];

  const [selectedFunc, setSelectedFunc] = useState<PredefinedFunction>(predefinedFunctions[0]);
  const [pointX0, setPointX0] = useState<number>(selectedFunc.defaultX0);
  const [showSteps, setShowSteps] = useState(true);

  // Values computed dynamically for selected function
  const f_x0 = selectedFunc.calculate(pointX0);
  const f_prime_x0 = selectedFunc.calculateDerivative(pointX0);
  // Tangent line equation: y = f'(x0) * (x - x0) + f(x0) = f'(x0)*x + (f(x0) - f'(x0)*x0)
  const tangentSlope = f_prime_x0;
  const tangentIntercept = f_x0 - f_prime_x0 * pointX0;

  // Format tangent equation nicely
  const formatTangentEquation = () => {
    const slopeStr = Math.abs(tangentSlope - 1) < 0.001 ? 'x' : Math.abs(tangentSlope + 1) < 0.001 ? '-x' : `${tangentSlope.toFixed(2)}x`;
    if (Math.abs(tangentSlope) < 0.001) {
      return `y = ${tangentIntercept.toFixed(2)}  (Tanjanta Marindrano / Horizontale)`;
    }
    const interceptStr = tangentIntercept >= 0 ? `+ ${tangentIntercept.toFixed(2)}` : `- ${Math.abs(tangentIntercept).toFixed(2)}`;
    return `y = ${slopeStr} ${interceptStr}`;
  };

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<{ [qId: number]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const quizQuestions = [
    {
      id: 1,
      questionMg: "Inona ny dérivée an'ny f(x) = 3x⁴ - 5x² + 7 ?",
      questionFr: "Quelle est la dérivée de f(x) = 3x⁴ - 5x² + 7 ?",
      options: [
        "f'(x) = 12x³ - 10x",
        "f'(x) = 12x³ - 10x + 7",
        "f'(x) = 7x³ - 10x",
        "f'(x) = 12x⁴ - 10x²"
      ],
      correctIndex: 0,
      explanationMg: "(3x⁴)' = 12x³, (-5x²)' = -10x, ary (7)' = 0.",
      explanationFr: "(3x⁴)' = 12x³, (-5x²)' = -10x, et la dérivée d'une constante (7) est 0."
    },
    {
      id: 2,
      questionMg: "Raha f'(x₀) = 0, inona ny hevitr'izany ara-jeometrika eo amin'ny curve C_f ?",
      questionFr: "Si f'(x₀) = 0, que signifie cela géométriquement pour la courbe C_f ?",
      options: [
        "Misy tanjanta marindrano (horizontale) eo amin'ny teboka (x₀, f(x₀))",
        "Misy tanjanta mitsangana (verticale)",
        "Tsy azo atao ny curve",
        "Tapaka ny fiana-kery (discontinue)"
      ],
      correctIndex: 0,
      explanationMg: "f'(x₀) = 0 dia midika fa 0 ny pente an'ny tanjanta, noho izany marindrano (horizontale) izy: y = f(x₀).",
      explanationFr: "f'(x₀) = 0 signifie que la pente de la tangente est nulle, la tangente est donc horizontale d'équation y = f(x₀)."
    },
    {
      id: 3,
      questionMg: "Inona ny raikipohy marina fikajiana ny dérivée an'ny fizarana (u / v) ?",
      questionFr: "Quelle est la formule correcte de dérivation d'un quotient (u / v) ?",
      options: [
        "(u'v - uv') / v²",
        "(u'v + uv') / v²",
        "u' / v'",
        "(uv' - u'v) / v"
      ],
      correctIndex: 0,
      explanationMg: "Raikipohy ofisialy : (u/v)' = (u'v - uv') / v² miaraka amin'ny v(x) ≠ 0.",
      explanationFr: "Formule officielle : (u/v)' = (u'v - uv') / v² avec v(x) ≠ 0."
    },
    {
      id: 4,
      questionMg: "Amin'ny Fizika, raha x(t) ny toerana (position), inona ny hafainganam-pandeha v(t) (vitesse instantanée) ?",
      questionFr: "En Physique, si x(t) est l'équation horaire, quelle est la vitesse instantanée v(t) ?",
      options: [
        "v(t) = dx/dt = x'(t) (dérivée voalohany an'ny toerana)",
        "v(t) = x(t) × t",
        "v(t) = x''(t)",
        "v(t) = 1 / x(t)"
      ],
      correctIndex: 0,
      explanationMg: "Ny hafainganam-pandeha avy hatrany dia ny tahan'ny fiovan'ny toerana manoloana ny fotoana : v(t) = x'(t).",
      explanationFr: "La vitesse instantanée est la dérivée temporelle de la position : v(t) = x'(t) = dx/dt."
    },
    {
      id: 5,
      questionMg: "Amin'ny Toe-karena (Série OSE / SES), inona no atao hoe Coût marginal C_m(q) ?",
      questionFr: "En Économie (Série OSE / SES), que représente le Coût marginal C_m(q) ?",
      options: [
        "C_m(q) = C'(q) (dérivée an'ny coût total C(q))",
        "C_m(q) = C(q) / q",
        "C_m(q) = C(q) × q",
        "C_m(q) = 1 / C'(q)"
      ],
      correctIndex: 0,
      explanationMg: "Ny coût marginal dia tombanana amin'ny dérivée an'ny coût total C'(q) manoloana ny habetsaky ny vokatra q.",
      explanationFr: "Le coût marginal est modélisé par la dérivée du coût total : C_m(q) = C'(q)."
    }
  ];

  const calculateScore = () => {
    let score = 0;
    quizQuestions.forEach(q => {
      if (quizAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  return (
    <div className="space-y-6 pb-20 max-w-5xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-black rounded-full flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5 text-indigo-400" />
                MATHÉMATIQUES & SCIENCES
              </span>
              <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold rounded-full">
                Terminale & Première (S, C, D, OSE, L)
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              📐 {isMg ? 'La Dérivée sy ny Fampiharana Azy' : 'La Dérivée et ses Applications'}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              {isMg
                ? "Fitaovana matematika ifanakalozana, raikipohy feno, kajy ny tanjanta sy tableau de variation, ary fampiharana amin'ny Fizika, SVT ary Toekarena ho an'ny BACC Madagasikara."
                : "Module interactif complet : calcul pas-à-pas, équation de tangente, tableau de variation et applications concrètes en Physique, SVT et Économie pour le Baccalauréat."}
            </p>
          </div>

          <div className="flex flex-wrap md:flex-col gap-2">
            <button
              onClick={() => setCurrentTab('lessons')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>{isMg ? 'Hiverina amin\'ny Cours' : 'Voir tous les cours'}</span>
            </button>
            <button
              onClick={() => setCurrentTab('ai')}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black rounded-xl shadow-md transition-transform active:scale-95 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isMg ? 'Hanontany AI TAFITA' : 'Aide IA TAFITA'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center space-x-1 sm:space-x-2 bg-slate-900/90 border border-slate-800 p-1.5 rounded-2xl overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveSubTab('calculator')}
          className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap transition-all ${
            activeSubTab === 'calculator'
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>{isMg ? '1. Kajy & Tanjanta' : '1. Simulateur & Tangente'}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('formulas')}
          className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap transition-all ${
            activeSubTab === 'formulas'
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>{isMg ? '2. Fiches Raikipohy' : '2. Formulaire Complet'}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('applications')}
          className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap transition-all ${
            activeSubTab === 'applications'
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>{isMg ? '3. Fampiharana (Physique, Eco, SVT)' : '3. Applications Réelles'}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('bac-exercises')}
          className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap transition-all ${
            activeSubTab === 'bac-exercises'
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>{isMg ? '4. Laza Adina BACC Corrigés' : '4. Sujets Bac Corrigés'}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('quick-quiz')}
          className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap transition-all ${
            activeSubTab === 'quick-quiz'
              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Flame className="w-4 h-4" />
          <span>{isMg ? '5. Auto-Quiz Test' : '5. Auto-Quiz Test'}</span>
        </button>
      </div>

      {/* 1. CALCULATEUR & TANGENTE SIMULATOR */}
      {activeSubTab === 'calculator' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Controls & Selector */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
                <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-amber-400" />
                  <span>{isMg ? 'Safidio ny Fiana-kery f(x)' : 'Choisir la fonction f(x)'}</span>
                </h3>

                <div className="space-y-2">
                  {predefinedFunctions.map(fn => (
                    <button
                      key={fn.id}
                      onClick={() => {
                        setSelectedFunc(fn);
                        setPointX0(fn.defaultX0);
                      }}
                      className={`w-full text-left p-3 rounded-2xl border transition-all ${
                        selectedFunc.id === fn.id
                          ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md'
                          : 'bg-slate-800/50 border-slate-700/50 text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <div className="font-extrabold text-sm text-amber-300">{fn.name}</div>
                      <div className="font-mono text-xs text-white font-bold mt-1 bg-slate-950/60 px-2 py-1 rounded-lg border border-slate-800">
                        {fn.expression}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Point x0 Slider / Input */}
                <div className="pt-3 border-t border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-300">
                      {isMg ? 'Teboka x₀ hanaovana ny tanjanta :' : 'Point d\'abscisse x₀ :'}
                    </span>
                    <span className="font-black font-mono text-amber-400 text-sm bg-slate-800 px-2.5 py-0.5 rounded-lg border border-slate-700">
                      x₀ = {pointX0}
                    </span>
                  </div>

                  <input
                    type="range"
                    min={-4}
                    max={4}
                    step={0.5}
                    value={pointX0}
                    onChange={e => setPointX0(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />

                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>-4</span>
                    <span>-2</span>
                    <span>0</span>
                    <span>+2</span>
                    <span>+4</span>
                  </div>
                </div>
              </div>

              {/* Tips for Exam */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-3xl p-4 text-xs space-y-2">
                <div className="flex items-center space-x-2 font-black text-amber-300 uppercase">
                  <Sparkles className="w-4 h-4" />
                  <span>{isMg ? 'Toro-hevitra BACC Madagasikara' : 'Rappel officiel Bac'}</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {isMg
                    ? "Raha te-hikaroka ny fampitoviana ny Tanjanta (T) eo amin'ny teboka A(x₀, f(x₀)), dia tadidio foana ny raikipohy: (T) : y = f'(x₀)(x - x₀) + f(x₀)."
                    : "Pour trouver l'équation de la Tangente (T) au point A(x₀, f(x₀)), appliquez toujours la formule : (T) : y = f'(x₀)(x - x₀) + f(x₀)."}
                </p>
              </div>
            </div>

            {/* Right: Results, Step-by-Step & Tangent Equation */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Primary Output Card */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-850 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-wider">
                    {isMg ? 'Valin\'ny Kajy Mivantana' : 'Résultats Mathématiques'}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Calcul Validé MEN
                  </span>
                </div>

                {/* Function & Derivative */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      {isMg ? 'Fiana-kery fototra' : 'Fonction f(x)'}
                    </span>
                    <div className="font-mono text-sm sm:text-base font-black text-white">
                      {selectedFunc.expression}
                    </div>
                    <div className="text-xs font-mono text-blue-400 pt-1">
                      f({pointX0}) = <span className="font-bold text-white">{f_x0.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="bg-slate-950/80 border border-indigo-500/40 rounded-2xl p-4 space-y-1">
                    <span className="text-[10px] font-bold text-indigo-300 uppercase">
                      {isMg ? 'Dérivée voalohany' : "Dérivée f'(x)"}
                    </span>
                    <div className="font-mono text-sm sm:text-base font-black text-indigo-300">
                      {selectedFunc.derivative}
                    </div>
                    <div className="text-xs font-mono text-amber-400 pt-1">
                      f'({pointX0}) = <span className="font-bold text-white">{f_prime_x0.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Tangent Line Equation Box */}
                <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-500/30 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-amber-300 uppercase flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-amber-400" />
                      <span>{isMg ? "Fampitoviana ny Tanjanta (T) eo amin'ny x₀ :" : 'Équation de la Tangente (T) en x₀ :'}</span>
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      y = f'(x₀)(x - x₀) + f(x₀)
                    </span>
                  </div>

                  <div className="font-mono text-base sm:text-lg font-black text-amber-300 bg-slate-950/90 border border-amber-500/40 p-3 rounded-xl text-center shadow-inner">
                    (T) : {formatTangentEquation()}
                  </div>

                  <p className="text-[11px] text-slate-300 text-center">
                    {isMg
                      ? `Pente (coef directeur) = ${f_prime_x0.toFixed(2)} • Teboka ifanenana : (${pointX0}, ${f_x0.toFixed(2)})`
                      : `Pente = ${f_prime_x0.toFixed(2)} • Point de contact : (${pointX0}, ${f_x0.toFixed(2)})`}
                  </p>
                </div>

                {/* Variation & Monotony Summary */}
                <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-2">
                  <span className="text-xs font-black text-slate-300 uppercase">
                    📊 {isMg ? 'Fironana sy Fiovaovana (Variation) :' : 'Sens de Variation & Signe de f\' :'}
                  </span>
                  <div className="text-xs text-slate-300 space-y-1 leading-relaxed">
                    {f_prime_x0 > 0 ? (
                      <p className="text-emerald-400 font-semibold flex items-center gap-1.5">
                        <TrendingUp className="w-4 h-4" />
                        <span>{isMg ? `f'(${pointX0}) > 0 : Mitombo (strictement croissante) ny fiana-kery manodidina an'io teboka io.` : `f'(${pointX0}) > 0 : La fonction f est strictement croissante au voisinage de ce point.`}</span>
                      </p>
                    ) : f_prime_x0 < 0 ? (
                      <p className="text-rose-400 font-semibold flex items-center gap-1.5">
                        <TrendingUp className="w-4 h-4 rotate-180" />
                        <span>{isMg ? `f'(${pointX0}) < 0 : Mihena (strictement décroissante) ny fiana-kery manodidina an'io teboka io.` : `f'(${pointX0}) < 0 : La fonction f est strictement décroissante au voisinage de ce point.`}</span>
                      </p>
                    ) : (
                      <p className="text-amber-400 font-semibold flex items-center gap-1.5">
                        <Activity className="w-4 h-4" />
                        <span>{isMg ? `f'(${pointX0}) = 0 : Extremum local (Tanjanta marindrano / Sommet na tanjaka)` : `f'(${pointX0}) = 0 : Extremum local (Tangente horizontale).`}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Step-by-Step Toggle */}
                <div className="pt-2">
                  <button
                    onClick={() => setShowSteps(!showSteps)}
                    className="w-full flex items-center justify-between p-3 bg-slate-800 hover:bg-slate-750 text-white font-bold text-xs rounded-xl border border-slate-700 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-blue-400" />
                      <span>{isMg ? 'Fomba fikajiana tsikelikely (Étapes de dérivation)' : 'Détails du calcul pas-à-pas'}</span>
                    </span>
                    {showSteps ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {showSteps && (
                    <div className="mt-3 p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2 font-mono text-xs">
                      {(isMg ? selectedFunc.stepsMg : selectedFunc.stepsFr).map((step, idx) => (
                        <div key={idx} className="text-slate-300 flex items-start space-x-2">
                          <span className="text-amber-400 font-bold">•</span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

      {/* 2. FORMULAIRE COMPLET DES DÉRIVÉES */}
      {activeSubTab === 'formulas' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
            <div>
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-400" />
                <span>{isMg ? 'Raikipohy Fototry ny Dérivée (Formulaire de Référence)' : 'Formulaire Officiel des Dérivées Usuelles'}</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {isMg
                  ? "Ireo raikipohy rehetra takiana amin'ny fanadinana BACC Madagasikara (Séries C, D, S, OSE, L, A)."
                  : "Toutes les formules usuelles et opérations indispensables pour le Baccalauréat."}
              </p>
            </div>

            {/* Table 1: Fonctions Usuelles */}
            <div className="space-y-3">
              <h3 className="text-xs font-black text-amber-400 uppercase tracking-wider">
                1. Fonctions Usuelles (Fiana-kery Tsotra)
              </h3>
              <div className="overflow-x-auto rounded-2xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-800/80 text-slate-300 font-bold border-b border-slate-700">
                    <tr>
                      <th className="p-3">f(x)</th>
                      <th className="p-3">f'(x)</th>
                      <th className="p-3">Domain (D_f')</th>
                      <th className="p-3">Ohatra / Exemple</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-slate-200">
                    <tr className="hover:bg-slate-800/40">
                      <td className="p-3 font-bold text-white">k (constante)</td>
                      <td className="p-3 text-amber-400 font-bold">0</td>
                      <td className="p-3 text-slate-400">ℝ</td>
                      <td className="p-3 text-slate-400">(7)' = 0</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40">
                      <td className="p-3 font-bold text-white">x</td>
                      <td className="p-3 text-amber-400 font-bold">1</td>
                      <td className="p-3 text-slate-400">ℝ</td>
                      <td className="p-3 text-slate-400">(x)' = 1</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40">
                      <td className="p-3 font-bold text-white">xⁿ (n ∈ ℤ*)</td>
                      <td className="p-3 text-amber-400 font-bold">n · xⁿ⁻¹</td>
                      <td className="p-3 text-slate-400">ℝ (na ℝ* raha n &lt; 0)</td>
                      <td className="p-3 text-slate-400">(x⁴)' = 4x³</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40">
                      <td className="p-3 font-bold text-white">1 / x</td>
                      <td className="p-3 text-amber-400 font-bold">-1 / x²</td>
                      <td className="p-3 text-slate-400">ℝ*</td>
                      <td className="p-3 text-slate-400">(3/x)' = -3/x²</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40">
                      <td className="p-3 font-bold text-white">√x</td>
                      <td className="p-3 text-amber-400 font-bold">1 / (2√x)</td>
                      <td className="p-3 text-slate-400">]0, +∞[</td>
                      <td className="p-3 text-slate-400">Tsy dérivale eo amin'ny 0</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40">
                      <td className="p-3 font-bold text-white">eˣ</td>
                      <td className="p-3 text-amber-400 font-bold">eˣ</td>
                      <td className="p-3 text-slate-400">ℝ</td>
                      <td className="p-3 text-slate-400">(2eˣ)' = 2eˣ</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40">
                      <td className="p-3 font-bold text-white">ln(x)</td>
                      <td className="p-3 text-amber-400 font-bold">1 / x</td>
                      <td className="p-3 text-slate-400">]0, +∞[</td>
                      <td className="p-3 text-slate-400">(5ln x)' = 5/x</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40">
                      <td className="p-3 font-bold text-white">sin(x)</td>
                      <td className="p-3 text-amber-400 font-bold">cos(x)</td>
                      <td className="p-3 text-slate-400">ℝ</td>
                      <td className="p-3 text-slate-400">(sin x)' = cos x</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40">
                      <td className="p-3 font-bold text-white">cos(x)</td>
                      <td className="p-3 text-amber-400 font-bold">-sin(x)</td>
                      <td className="p-3 text-slate-400">ℝ</td>
                      <td className="p-3 text-slate-400">(cos x)' = -sin x</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table 2: Opérations & Fonctions Composées */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-black text-indigo-400 uppercase tracking-wider">
                2. Opérations sy Fiana-kery Mifangaro (Fonctions Composées)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-1.5 font-mono text-xs">
                  <span className="text-[10px] font-bold text-amber-400 uppercase font-sans">Fitambarana / Somme</span>
                  <div className="font-bold text-white text-sm">(u + v)' = u' + v'</div>
                  <p className="text-slate-400 text-[11px] font-sans">Dérivée de la somme = somme des dérivées.</p>
                </div>

                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-1.5 font-mono text-xs">
                  <span className="text-[10px] font-bold text-amber-400 uppercase font-sans">Fampitomboana isa / Produit par scalaire</span>
                  <div className="font-bold text-white text-sm">(k · u)' = k · u'</div>
                  <p className="text-slate-400 text-[11px] font-sans">Ny isa k dia tazonina fotsiny.</p>
                </div>

                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-1.5 font-mono text-xs">
                  <span className="text-[10px] font-bold text-amber-400 uppercase font-sans">Fampitomboana / Produit u × v</span>
                  <div className="font-bold text-indigo-300 text-sm">(u · v)' = u'v + uv'</div>
                  <p className="text-slate-400 text-[11px] font-sans">Tandremo: tsy u' × v' velively !</p>
                </div>

                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-1.5 font-mono text-xs">
                  <span className="text-[10px] font-bold text-amber-400 uppercase font-sans">Fizarana / Quotient u / v</span>
                  <div className="font-bold text-rose-400 text-sm">(u / v)' = (u'v - uv') / v²</div>
                  <p className="text-slate-400 text-[11px] font-sans">Signe (-) eo afovoany ary v² eo ambany.</p>
                </div>

                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-1.5 font-mono text-xs">
                  <span className="text-[10px] font-bold text-amber-400 uppercase font-sans">Exponentielle mifangaro</span>
                  <div className="font-bold text-cyan-300 text-sm">(eᵘ)' = u' · eᵘ</div>
                  <p className="text-slate-400 text-[11px] font-sans">Ohatra: (e^(2x+3))' = 2e^(2x+3)</p>
                </div>

                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-1.5 font-mono text-xs">
                  <span className="text-[10px] font-bold text-amber-400 uppercase font-sans">Logarithme mifangaro</span>
                  <div className="font-bold text-emerald-300 text-sm">(ln u)' = u' / u</div>
                  <p className="text-slate-400 text-[11px] font-sans">Ohatra: (ln(x² + 1))' = 2x / (x² + 1)</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 3. APPLICATIONS CONCRÈTES (Physique, Eco, SVT) */}
      {activeSubTab === 'applications' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Physique-Chimie */}
            <div className="bg-slate-900 border border-blue-500/30 rounded-3xl p-5 shadow-xl space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold">
                ⚡
              </div>
              <h3 className="font-extrabold text-white text-base">
                1. Physique-Chimie
              </h3>
              <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <div className="font-bold text-amber-300">Vitesse instantanée :</div>
                  <div className="font-mono text-blue-300">v(t) = dx/dt = x'(t)</div>
                  <p className="text-[11px] text-slate-400">Dérivée de l'équation horaire du mouvement.</p>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <div className="font-bold text-amber-300">Accélération :</div>
                  <div className="font-mono text-indigo-300">a(t) = dv/dt = x''(t)</div>
                  <p className="text-[11px] text-slate-400">Dérivée seconde de la position.</p>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <div className="font-bold text-amber-300">Courant Électrique :</div>
                  <div className="font-mono text-emerald-300">i(t) = dq/dt = q'(t)</div>
                  <p className="text-[11px] text-slate-400">Dérivée de la charge du condensateur.</p>
                </div>
              </div>
            </div>

            {/* Économie & SES (Série OSE) */}
            <div className="bg-slate-900 border border-emerald-500/30 rounded-3xl p-5 shadow-xl space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
                📈
              </div>
              <h3 className="font-extrabold text-white text-base">
                2. Économie (Série OSE / SES)
              </h3>
              <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <div className="font-bold text-emerald-300">Coût Marginal :</div>
                  <div className="font-mono text-emerald-200">C_m(q) = C'(q)</div>
                  <p className="text-[11px] text-slate-400">Vidina fanampiny amin'ny famokarana singa 1 fanampiny.</p>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <div className="font-bold text-emerald-300">Bénéfice Maximal :</div>
                  <div className="font-mono text-amber-300">B'(q) = 0 ⇔ R_m(q) = C_m(q)</div>
                  <p className="text-[11px] text-slate-400">Tombony ambony indrindra rehefa Recette = Coût.</p>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <div className="font-bold text-emerald-300">Élasticité de la demande :</div>
                  <div className="font-mono text-cyan-300">e(p) = (p / D(p)) · D'(p)</div>
                  <p className="text-[11px] text-slate-400">Fihetsiky ny mpanjifa manoloana ny vidin-javatra.</p>
                </div>
              </div>
            </div>

            {/* SVT & Biologie */}
            <div className="bg-slate-900 border border-amber-500/30 rounded-3xl p-5 shadow-xl space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
                🌱
              </div>
              <h3 className="font-extrabold text-white text-base">
                3. SVT & Biologie
              </h3>
              <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <div className="font-bold text-amber-300">Taux de croissance bactérien :</div>
                  <div className="font-mono text-amber-200">dN/dt = μ · N(t)</div>
                  <p className="text-[11px] text-slate-400">Hafainganam-pitomboan'ny mikraoba anaty kolontsaina.</p>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <div className="font-bold text-amber-300">Cinétique enzymatique :</div>
                  <div className="font-mono text-blue-300">v_0 = -d[S]/dt = +d[P]/dt</div>
                  <p className="text-[11px] text-slate-400">Hafainganam-piasan'ny anzima amin'ny fandravana sakafo.</p>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <div className="font-bold text-amber-300">Absorption de médicament :</div>
                  <div className="font-mono text-rose-300">C'(t) = -k · C(t)</div>
                  <p className="text-[11px] text-slate-400">Fihenan'ny tahan'ny fanafody anaty rà rehefa mandeha ny ora.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 4. LAZA ADINA BACC CORRIGÉS */}
      {activeSubTab === 'bac-exercises' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-white text-base flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span>{isMg ? 'Ohatra Laza Adina BACC Madagascar misy Fanitsiana' : 'Exercices Types Baccalauréat Corrigés'}</span>
              </h3>
              <span className="text-xs bg-amber-500/20 text-amber-300 font-bold px-2.5 py-1 rounded-full border border-amber-500/30">
                Sujets Validés
              </span>
            </div>

            {/* Sujet 1 */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-blue-400 uppercase">Baccalauréat Série C/D/S - Problème d'Analyse</span>
                <span className="text-[11px] text-slate-400">Laza adina 5 isa</span>
              </div>
              <p className="text-xs text-slate-200 font-semibold leading-relaxed">
                Aoka ny fiana-kery f voafaritra amin'ny ℝ amin'ny: <span className="font-mono text-amber-300 font-bold">f(x) = (x - 2)·eˣ + x</span>.<br />
                1. Kajio ny f'(x) ary anontanio ny variation an'ny f.<br />
                2. Soraty ny fampitoviana ny tanjanta (T) eo amin'ny teboka x₀ = 0.
              </p>
              <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-750 text-xs font-mono space-y-2">
                <div className="text-emerald-400 font-bold font-sans flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Fanitsiana (Corrigé Type) :</span>
                </div>
                <div className="text-slate-300">
                  1. f'(x) = 1·eˣ + (x - 2)eˣ + 1 = eˣ(1 + x - 2) + 1 = <strong className="text-amber-300">(x - 1)eˣ + 1</strong>.<br />
                  2. f(0) = (0 - 2)e⁰ + 0 = -2.<br />
                  3. f'(0) = (0 - 1)e⁰ + 1 = -1 + 1 = <strong className="text-amber-300">0</strong>.<br />
                  4. Noho izany: (T) : y = f'(0)(x - 0) + f(0) ⇒ <strong className="text-emerald-300">y = -2 (Tanjanta marindrano)</strong>.
                </div>
              </div>
            </div>

            {/* Sujet 2 */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-emerald-400 uppercase">Baccalauréat Série OSE/SES - Coût & Bénéfice</span>
                <span className="text-[11px] text-slate-400">Laza adina 4 isa</span>
              </div>
              <p className="text-xs text-slate-200 font-semibold leading-relaxed">
                Ny orinasa iray eto Madagasikara dia manana coût total : <span className="font-mono text-amber-300 font-bold">C(q) = q³ - 12q² + 60q + 100</span> (amin'ny alina Ariary).<br />
                Kajio ny Coût marginal C_m(q) rehefa mamokatra q = 5 unités.
              </p>
              <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-750 text-xs font-mono space-y-2">
                <div className="text-emerald-400 font-bold font-sans flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Fanitsiana (Corrigé Type) :</span>
                </div>
                <div className="text-slate-300">
                  1. C_m(q) = C'(q) = 3q² - 24q + 60.<br />
                  2. Ho an'ny q = 5 : C'(5) = 3(25) - 24(5) + 60 = 75 - 120 + 60 = <strong className="text-amber-300">15</strong>.<br />
                  3. Fehin-kevitra: Ny vidin'ny famokarana singa fahadimy fanampiny dia <strong className="text-emerald-300">15 000 Ariary</strong>.
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 5. QUICK QUIZ */}
      {activeSubTab === 'quick-quiz' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-black text-white text-base flex items-center gap-2">
                  <Flame className="w-5 h-5 text-amber-400" />
                  <span>{isMg ? 'Fitsapam-pahaizana Haingana (Auto-Quiz)' : 'Auto-Évaluation Dérivées (5 Questions)'}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {isMg ? 'Andramo ny fahaizanao ny raikipohy sy hevitry ny dérivée.' : 'Testez vos connaissances en 3 minutes.'}
                </p>
              </div>

              {quizSubmitted && (
                <div className="px-4 py-2 bg-amber-500/20 border border-amber-500/40 rounded-2xl text-center">
                  <div className="text-[10px] uppercase font-black text-amber-400">Score</div>
                  <div className="text-lg font-black text-white">
                    {calculateScore()} / {quizQuestions.length}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-5">
              {quizQuestions.map((q, qIndex) => {
                const isSelected = quizAnswers[q.id] !== undefined;
                const selectedOpt = quizAnswers[q.id];

                return (
                  <div key={q.id} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                    <div className="flex items-start space-x-3">
                      <span className="w-6 h-6 rounded-full bg-slate-800 text-amber-400 text-xs font-black flex items-center justify-center flex-shrink-0">
                        {qIndex + 1}
                      </span>
                      <h4 className="font-bold text-sm text-white">
                        {isMg ? q.questionMg : q.questionFr}
                      </h4>
                    </div>

                    <div className="space-y-2 pl-9">
                      {q.options.map((opt, optIdx) => {
                        const isChosen = selectedOpt === optIdx;
                        const isCorrect = q.correctIndex === optIdx;

                        let optStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850';
                        if (quizSubmitted) {
                          if (isCorrect) {
                            optStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-200 font-bold';
                          } else if (isChosen && !isCorrect) {
                            optStyle = 'bg-rose-500/20 border-rose-500 text-rose-200 font-bold';
                          }
                        } else if (isChosen) {
                          optStyle = 'bg-indigo-600/30 border-indigo-500 text-white font-bold';
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={quizSubmitted}
                            onClick={() => {
                              setQuizAnswers({ ...quizAnswers, [q.id]: optIdx });
                            }}
                            className={`w-full text-left p-3 rounded-xl border text-xs font-mono transition-all flex items-center justify-between ${optStyle}`}
                          >
                            <span>{opt}</span>
                            {quizSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                          </button>
                        );
                      })}
                    </div>

                    {quizSubmitted && (
                      <div className="pl-9 text-xs text-slate-400 italic pt-1">
                        💡 {isMg ? q.explanationMg : q.explanationFr}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              {!quizSubmitted ? (
                <button
                  onClick={() => setQuizSubmitted(true)}
                  disabled={Object.keys(quizAnswers).length === 0}
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all"
                >
                  {isMg ? 'Hanamarina ny valiny' : 'Valider mes réponses'}
                </button>
              ) : (
                <button
                  onClick={() => {
                    setQuizAnswers({});
                    setQuizSubmitted(false);
                  }}
                  className="flex items-center space-x-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl border border-slate-700 transition-colors"
                >
                  <RotateCcw className="w-4 h-4 text-amber-400" />
                  <span>{isMg ? 'Hamerina indray' : 'Recommencer le test'}</span>
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
