import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { apiService } from '../services/apiService';
import { MenArticle } from '../types';
import {
  ShieldAlert,
  Newspaper,
  BookOpen,
  Users,
  Plus,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { userProfile, addMenArticle, refreshMenNews, lessons } = useApp();
  const isMg = userProfile.language === 'mg';

  const [newsTitle, setNewsTitle] = useState('');
  const [newsSummary, setNewsSummary] = useState('');
  const [newsCategory, setNewsCategory] = useState('BAC');
  const [newsUrl, setNewsUrl] = useState('https://www.education.gov.mg');
  const [statusMsg, setStatusMsg] = useState('');

  const handlePublishNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsTitle) return;

    try {
      const created = await apiService.postMenNews({
        title: newsTitle,
        titleFr: newsTitle,
        summary: newsSummary,
        summaryFr: newsSummary,
        category: newsCategory,
        originalUrl: newsUrl,
        date: new Date().toISOString().split('T')[0]
      });

      addMenArticle(created);
      setStatusMsg(isMg ? 'Tafita soa aman-tsara ny vaovao MEN!' : 'Article MEN publié avec succès !');
      setNewsTitle('');
      setNewsSummary('');
      setTimeout(() => setStatusMsg(''), 3000);
    } catch (e: any) {
      setStatusMsg('Erreur: ' + e.message);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-lg space-y-2">
        <div className="flex items-center space-x-2">
          <ShieldAlert className="w-6 h-6 text-amber-400" />
          <h1 className="text-xl font-extrabold text-white">
            {isMg ? 'Seho Fitantanana (Panneau Admin)' : 'Tableau de Bord Administrateur'}
          </h1>
        </div>
        <p className="text-xs text-slate-400">
          {isMg
            ? 'Fitantanana ny vaovao MEN, fankatoavana lesona, ary fanavaozana fandaharam-pianarana tsy mila APK vaovao'
            : 'Mise à jour des contenus pédagogiques et actualités MEN sans recompilation APK'}
        </p>
      </div>

      {statusMsg && (
        <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl text-emerald-300 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>{statusMsg}</span>
        </div>
      )}

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <span className="text-xs text-slate-400">{isMg ? 'Mpianatra Active' : 'Élèves actifs'}</span>
          <p className="text-xl font-black text-amber-400 mt-1">1,240</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <span className="text-xs text-slate-400">{isMg ? 'Lesona manontolo' : 'Total leçons'}</span>
          <p className="text-xl font-black text-blue-400 mt-1">{lessons.length}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <span className="text-xs text-slate-400">Annales BAC</span>
          <p className="text-xl font-black text-rose-400 mt-1">12</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <span className="text-xs text-slate-400">Sources MEN</span>
          <p className="text-xl font-black text-emerald-400 mt-1">Official</p>
        </div>
      </div>

      {/* Publish MEN Article Form */}
      <form onSubmit={handlePublishNews} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <h3 className="font-bold text-base text-white flex items-center gap-2">
          <Newspaper className="w-5 h-5 text-cyan-400" />
          {isMg ? 'Handefa Vaovao MEN Vaovao' : 'Publier une actualité MEN officielle'}
        </h3>

        <div>
          <label className="text-xs font-bold text-slate-300 block mb-1">Lohanteny (Titre) :</label>
          <input
            type="text"
            value={newsTitle}
            onChange={e => setNewsTitle(e.target.value)}
            placeholder="Dati-n'ny BAC 2026..."
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">Sokajy (Catégorie) :</label>
            <select
              value={newsCategory}
              onChange={e => setNewsCategory(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
            >
              <option value="BAC">BAC</option>
              <option value="Examens">Examens</option>
              <option value="Calendrier">Calendrier</option>
              <option value="Réformes">Réformes</option>
              <option value="Communiqués">Communiqués</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">Lien Officiel MEN :</label>
            <input
              type="text"
              value={newsUrl}
              onChange={e => setNewsUrl(e.target.value)}
              placeholder="https://www.education.gov.mg/..."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-300 block mb-1">Sombiny sy famintinana (Résumé) :</label>
          <textarea
            value={newsSummary}
            onChange={e => setNewsSummary(e.target.value)}
            rows={3}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-xs rounded-2xl shadow-lg transition-transform active:scale-95 flex items-center justify-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>{isMg ? 'Mamoaka amin\'ny fomba ofisialy' : 'Publier immédiatement'}</span>
        </button>
      </form>

    </div>
  );
};
