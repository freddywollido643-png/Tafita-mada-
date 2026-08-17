import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { apiService } from '../services/apiService';
import { FormattedContent } from './FormattedContent';
import {
  Bot,
  Send,
  WifiOff,
  Sparkles,
  HelpCircle,
  RotateCcw,
  BookOpen,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const AiTafita: React.FC = () => {
  const { userProfile, effectiveIsOnline } = useApp();
  const isMg = userProfile.language === 'mg';

  const [prompt, setPrompt] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: isMg
        ? `Manao ahoana! Izaho dia 🤖 **AI TAFITA**, mpanampy anao amin'ny fianarana sy ny fanomana ny BAC Malagasy.\n\n"Mianara anio, tafita rahampitso."\n\nAfaka manontany ahy momba ny lesona matematika, fizika, SVT, Malagasy na frantsay ianao.`
        : `Bonjour ! Je suis 🤖 **AI TAFITA**, votre tuteur IA dédié à la préparation du Baccalauréat à Madagascar.\n\n"Mianara anio, tafita rahampitso."\n\nPosez-moi vos questions sur les cours, formules ou exercices.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [loading, setLoading] = useState<boolean>(false);

  const [docText, setDocText] = useState<string>('');
  const [showDocUpload, setShowDocUpload] = useState<boolean>(false);

  const quickActionButtons = [
    {
      action: 'Hazavao',
      icon: '💡',
      promptMg: 'Hazavao amiko amin\'ny fomba tsotra sy amin\'ny teny Malagasy ity lesona ity.',
      promptFr: 'Explique-moi cette leçon de façon claire et pédagogique.'
    },
    {
      action: 'Omeo exercice',
      icon: '📝',
      promptMg: 'Omeo exercice fampiharana miaraka amin\'ny lalana hamahana azy ho an\'ny kilasy Terminale.',
      promptFr: 'Donne-moi un exercice d\'entraînement corrigé niveau Terminale.'
    },
    {
      action: 'Ahitsio',
      icon: '✅',
      promptMg: 'Ahitsio amim-pombam-pahaizana ity valin-tefina na fampiharana ity ary toroy ny diso.',
      promptFr: 'Corrige ma réponse et explique pas à pas les erreurs.'
    },
    {
      action: 'Omeo résumé',
      icon: '📚',
      promptMg: 'Omeo famintinana fohy sy mazava (résumé) amin\'ny taranja sy toko lafatra.',
      promptFr: 'Fais-moi un résumé synthétique de ce cours.'
    },
    {
      action: 'Ataovy quiz',
      icon: '🎯',
      promptMg: 'Ataovy quiz ahitana fanontaniana 3 sy safidy maro (QCM) mba hitsapana ny fahaizako.',
      promptFr: 'Génère un quiz QCM de 3 questions pour évaluer mes connaissances.'
    }
  ];

  const handleDocAnalyze = () => {
    if (!docText.trim()) return;
    const analyzePrompt = isMg
      ? `Ireto misy sora-tsoratra na fampiharana avy amin'ny dokimanta na boky. Ahalalaho sy famintino na omeo exercices aminy:\n\n${docText}`
      : `Voici le texte extrait d'un document de cours. Analyse-le, fais-en un résumé et propose 2 questions de révision:\n\n${docText}`;
    
    handleSendMessage(analyzePrompt);
    setDocText('');
    setShowDocUpload(false);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || prompt;
    if (!query.trim() || loading) return;

    if (!effectiveIsOnline) {
      return;
    }

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setPrompt('');
    setLoading(true);

    try {
      const reply = await apiService.askAiTafita({
        prompt: query,
        language: userProfile.language,
        context: `${userProfile.level} - Série ${userProfile.series}`
      });

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'ai',
        text:
          err.message ||
          'AI TAFITA mila connexion Internet amin\'izao fotoana izao. Jereo ny connexion internet na andramo indray.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/10 border border-amber-500/30 rounded-3xl p-6 shadow-lg flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 font-black text-xl flex items-center justify-center shadow-md">
            🤖
          </div>
          <div>
            <h1 className="text-xl font-black text-white flex items-center gap-2">
              AI TAFITA
              <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
                Gemini AI
              </span>
            </h1>
            <p className="text-xs text-slate-300">
              {isMg
                ? 'Mpanampy anao amin\'ny lesona sy fanadinana BAC'
                : 'Tuteur IA dédié à la réussite de vos examens'}
            </p>
          </div>
        </div>

        <button
          onClick={() =>
            setMessages([
              {
                id: 'msg-1',
                sender: 'ai',
                text: isMg
                  ? `Manao ahoana! Izaho dia 🤖 **AI TAFITA**, mpanampy anao amin'ny fianarana.\n\n"Mianara anio, tafita rahampitso."`
                  : `Bonjour ! Je suis 🤖 **AI TAFITA**, votre tuteur IA.`,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }
            ])
          }
          className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs flex items-center gap-1 font-semibold"
          title="Hamerina"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="hidden sm:inline">{isMg ? 'Hamerina' : 'Réinitialiser'}</span>
        </button>
      </div>

      {/* Offline Alert Banner */}
      {!effectiveIsOnline && (
        <div className="bg-amber-500/10 border border-amber-500/40 rounded-2xl p-4 text-amber-300 text-xs flex items-center space-x-3 shadow-md">
          <WifiOff className="w-6 h-6 shrink-0 text-amber-400" />
          <div>
            <h4 className="font-bold text-sm">
              AI TAFITA mila connexion Internet amin\'izao fotoana izao.
            </h4>
            <p className="text-amber-200/90 mt-0.5">
              {isMg
                ? 'Raha handefa fanontaniana amin\'i AI TAFITA dia mila mifandray amin\'ny internet ianao. Azonao ampiasaina amin\'ny mode OFFLINE kosa ny lesona sy exercices efa voatahiry.'
                : 'AI TAFITA requiert une connexion Internet active pour générer des réponses en direct. Les cours et exercices restent accessibles hors-ligne.'}
            </p>
          </div>
        </div>
      )}

      {/* Official Disclaimer Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 px-4 text-[11px] text-slate-400 flex items-center justify-between gap-2 shadow-inner">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            {isMg
              ? '⚠️ Jereo hatrany ny loharano sy ny cours officiel miaraka amin\'ny mpampianatra anao.'
              : '⚠️ Vérifiez toujours les sources et le cours officiel auprès de vos enseignants.'}
          </span>
        </div>
        <button
          onClick={() => setShowDocUpload(!showDocUpload)}
          className="text-xs font-bold text-amber-400 hover:text-amber-300 underline shrink-0"
        >
          {showDocUpload ? (isMg ? 'Afeno dokimanta' : 'Masquer document') : (isMg ? '+ Ampidiro dokimanta' : '+ Analyser document')}
        </button>
      </div>

      {/* Document Paste / Analysis Section */}
      {showDocUpload && effectiveIsOnline && (
        <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-4 space-y-3 shadow-lg">
          <h4 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            {isMg ? 'Famintinana na fandalinana dokimanta / cours' : 'Analyse & Résumé de Document / Cours'}
          </h4>
          <textarea
            value={docText}
            onChange={e => setDocText(e.target.value)}
            rows={4}
            placeholder={
              isMg
                ? 'Kapory na soraty eto ny Lahatsoratra, Ny Sombin-desona, na Exercice avy amin\'ny boky na PDF mba ho famakafakain\'i AI TAFITA...'
                : 'Collez ici le texte de votre cours, extrait ou exercice pour analyse...'
            }
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500"
          />
          <div className="flex justify-end">
            <button
              onClick={handleDocAnalyze}
              disabled={!docText.trim() || loading}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md disabled:opacity-50"
            >
              {isMg ? 'Famintino sy Vakafakao' : 'Analyser & Résumer'}
            </button>
          </div>
        </div>
      )}

      {/* 5 Quick Action Buttons */}
      {effectiveIsOnline && (
        <div className="space-y-1.5">
          <span className="text-xs font-bold text-slate-400 block px-1">
            {isMg ? 'Mianara amin\'ny fipihana haingana (Actions rapides) :' : 'Actions pédagogiques rapides :'}
          </span>
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-thin">
            {quickActionButtons.map((qb, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(isMg ? qb.promptMg : qb.promptFr)}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-amber-500/50 text-slate-200 hover:text-white rounded-xl text-xs font-bold whitespace-nowrap transition-all shadow-md flex items-center gap-1.5"
              >
                <span>{qb.icon}</span>
                <span>{qb.action}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Messages Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 space-y-4 shadow-xl min-h-[350px] max-h-[500px] overflow-y-auto">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 space-y-1 shadow-md ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] opacity-70 mb-2">
                <span className="font-bold flex items-center gap-1">
                  {msg.sender === 'user' ? userProfile.name : '🤖 AI TAFITA'}
                </span>
                <span>{msg.timestamp}</span>
              </div>
              <div className="text-sm leading-relaxed font-sans">
                {msg.sender === 'ai' ? (
                  <FormattedContent content={msg.text} />
                ) : (
                  <div className="whitespace-pre-line">{msg.text}</div>
                )}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 flex items-center space-x-3 text-amber-400 text-xs font-semibold animate-pulse">
              <Bot className="w-5 h-5 animate-spin" />
              <span>{isMg ? 'Mieritreritra sy mikajy i AI TAFITA...' : 'AI TAFITA réfléchit...'}</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Field */}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
          disabled={!effectiveIsOnline || loading}
          placeholder={
            effectiveIsOnline
              ? isMg
                ? 'Mametraha fanontaniana eto (ohatra: Hazavao amiko...)...'
                : 'Posez votre question ici...'
              : 'AI TAFITA mila connexion Internet amin\'izao fotoana izao.'
          }
          className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 disabled:opacity-50"
        />
        <button
          onClick={() => handleSendMessage()}
          disabled={!effectiveIsOnline || loading || !prompt.trim()}
          className="p-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-2xl disabled:opacity-50 transition-transform active:scale-95 shadow-lg"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};
