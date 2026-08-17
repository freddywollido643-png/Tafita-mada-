import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Newspaper,
  ShieldCheck,
  ExternalLink,
  RefreshCw,
  Wifi,
  WifiOff,
  Calendar
} from 'lucide-react';

export const MenNewsSection: React.FC = () => {
  const { menArticles, refreshMenNews, userProfile, effectiveIsOnline } = useApp();
  const isMg = userProfile.language === 'mg';

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
                <Newspaper className="w-6 h-6 text-cyan-400" />
                {isMg ? '📰 Vaovao MEN - Ministeran\'ny Fanabeazana' : '📰 Actualités MEN'}
              </h1>
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold rounded border border-emerald-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Ofisialy
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {isMg
                ? 'Lalam-panadinana, BACC, sy fanambarana ofisialy avy amin\'ny Ministeran\'ny Fanabeazana'
                : 'Annonces officielles, calendrier des examens et réformes du Ministère'}
            </p>
          </div>

          <button
            onClick={refreshMenNews}
            className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700"
            title="Hampifanaraka (Actualiser)"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {!effectiveIsOnline && (
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-xs text-amber-300 flex items-center gap-2">
            <WifiOff className="w-4 h-4 shrink-0" />
            <span>
              {isMg
                ? 'Ny vaovao farany dia tsy azo alaina amin\'izao fotoana izao. Jereo ireo vaovao efa voatahiry.'
                : 'Mode Hors-Ligne: Affichage des dernières actualités enregistrées.'}
            </span>
          </div>
        )}
      </div>

      {/* Articles List */}
      <div className="space-y-4">
        {menArticles.map(art => (
          <div
            key={art.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 bg-blue-500/20 text-blue-300 font-bold rounded-full">
                  {art.category}
                </span>
                <span className="text-slate-400 flex items-center gap-1 font-mono">
                  <Calendar className="w-3 h-3" />
                  {art.date}
                </span>
              </div>

              <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                {art.source}
              </span>
            </div>

            <h3 className="font-extrabold text-base text-white">
              {isMg ? art.title : art.titleFr || art.title}
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              {isMg ? art.summary : art.summaryFr || art.summary}
            </p>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <a
                href={art.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1"
              >
                <span>{isMg ? '[Lire la source officielle]' : 'Lire la source officielle'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
