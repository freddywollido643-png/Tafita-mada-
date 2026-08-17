import React from 'react';
import { useApp } from '../context/AppContext';
import { DownloadedItem } from '../types';
import {
  Download,
  Trash2,
  BookOpen,
  FileText,
  HardDrive,
  Eye,
  CheckCircle2
} from 'lucide-react';

export const OfflineDownloads: React.FC = () => {
  const { downloadedItems, removeDownload, userProfile, setSelectedLesson, setCurrentTab } = useApp();
  const isMg = userProfile.language === 'mg';

  const totalSizeKb = downloadedItems.reduce((acc, curr) => acc + (curr.sizeKb || 200), 0);
  const totalSizeMb = (totalSizeKb / 1024).toFixed(2);

  const handleOpenItem = (item: DownloadedItem) => {
    if (item.type === 'lesson' && item.data) {
      setSelectedLesson(item.data);
      setCurrentTab('lessons');
    }
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
              <Download className="w-6 h-6 text-emerald-400" />
              {isMg ? '📥 Mes téléchargements - Tahiry Hors-Ligne' : '📥 Mes Téléchargements Hors-Ligne'}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              {isMg
                ? 'Lesona sy taratasy fanadinana azo ampiasaina rehefa TSY Misy INTERNET'
                : 'Vos cours, sujets et PDF consultables en mode 100% hors-ligne'}
            </p>
          </div>

          <div className="bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-2xl text-right">
            <span className="text-[10px] text-slate-400 block">{isMg ? 'Habetsahana' : 'Espace utilisé'}</span>
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
              <HardDrive className="w-3.5 h-3.5" />
              {totalSizeMb} MB
            </span>
          </div>
        </div>
      </div>

      {/* Item list */}
      <div className="space-y-3">
        {downloadedItems.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-3">
            <Download className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white">
              {isMg ? 'Mbola tsy misy tahiry voaendrika (Tsy misy downloads)' : 'Aucun contenu téléchargé'}
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {isMg
                ? 'Kitiho ny [Télécharger] eo amin\'ny lesona na taratasy BAC mba hametrahana azy amin\'ny mode OFFLINE.'
                : 'Cliquez sur [Télécharger] sur n\'importe quelle leçon pour la lire hors-ligne.'}
            </p>
          </div>
        ) : (
          downloadedItems.map(item => (
            <div
              key={item.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-md flex items-center justify-between gap-4"
            >
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">{item.title}</h4>
                  <p className="text-[11px] text-slate-400">
                    {item.sizeKb} KB • {new Date(item.downloadedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleOpenItem(item)}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{isMg ? 'Hamaky' : 'Ouvrir'}</span>
                </button>

                <button
                  onClick={() => removeDownload(item.id)}
                  className="p-2 bg-slate-800 hover:bg-rose-900/40 text-slate-400 hover:text-rose-300 rounded-xl border border-slate-700"
                  title="Fafana"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
