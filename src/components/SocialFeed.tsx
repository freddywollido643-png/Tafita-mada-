import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { FeedPostComposer } from './FeedPostComposer';
import { FeedPostCard } from './FeedPostCard';
import { FeedCategory } from '../types';
import {
  Sparkles,
  Filter,
  Search,
  Video,
  GraduationCap,
  HelpCircle,
  Newspaper,
  Layers,
  Flame,
  Globe2,
  BookOpen,
  ArrowRight
} from 'lucide-react';

export const SocialFeed: React.FC = () => {
  const { feedPosts, userProfile, setCurrentTab } = useApp();
  const isMg = userProfile.language === 'mg';

  const [activeCategory, setActiveCategory] = useState<FeedCategory>('all');
  const [feedSearch, setFeedSearch] = useState('');

  // Category Tabs Configuration
  const categoryTabs: { id: FeedCategory; labelMg: string; labelFr: string; icon: any; count?: number }[] = [
    { id: 'all', labelMg: '🌟 Rehetra (Tout)', labelFr: '🌟 Tout le flux', icon: Layers },
    { id: 'courses', labelMg: '🎓 Tolotra Cours & Pubs', labelFr: '🎓 Offres & Cours', icon: GraduationCap },
    { id: 'news', labelMg: '📢 Vaovao Fanabeazana', labelFr: '📢 Actualités MEN & Bourses', icon: Newspaper },
    { id: 'videos', labelMg: '🎥 Horonantsary & Vidéos', labelFr: '🎥 Vidéos & Tutos', icon: Video },
    { id: 'tips', labelMg: '💡 Toro-hevitra & Fiches', labelFr: '💡 Astuces & Méthodes', icon: Sparkles },
    { id: 'requests', labelMg: '🙋‍♂️ Fikarohana Mpianatra', labelFr: '🙋‍♂️ Entraide & Demandes', icon: HelpCircle }
  ];

  // Filter posts based on active category and search query
  const filteredPosts = useMemo(() => {
    return feedPosts.filter(post => {
      // Category filter
      if (activeCategory !== 'all') {
        if (post.category !== activeCategory) return false;
      }

      // Search filter
      if (feedSearch.trim()) {
        const query = feedSearch.toLowerCase();
        const matchTitle = post.title?.toLowerCase().includes(query) || false;
        const matchContent = post.content.toLowerCase().includes(query);
        const matchAuthor = post.authorName.toLowerCase().includes(query);
        const matchTag = post.tags.some(t => t.toLowerCase().includes(query));
        if (!matchTitle && !matchContent && !matchAuthor && !matchTag) return false;
      }

      return true;
    });
  }, [feedPosts, activeCategory, feedSearch]);

  return (
    <div className="space-y-5">
      
      {/* 1. Composer for new post / advertisement */}
      <FeedPostComposer />

      {/* 2. Filter Tabs & Search Header */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <h2 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-1.5">
              <span>{isMg ? 'Fil d\'actualité Fanabeazana' : 'Fil d\'Actualité Éducatif'}</span>
            </h2>
            <span className="text-[11px] px-2 py-0.5 bg-slate-800 text-amber-300 font-bold rounded-full border border-slate-700">
              {filteredPosts.length} {isMg ? 'hafatra' : 'posts'}
            </span>
          </div>

          {/* Feed Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={feedSearch}
              onChange={e => setFeedSearch(e.target.value)}
              placeholder={isMg ? 'Karohy amin\'ny fil...' : 'Rechercher dans le fil...'}
              className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500 text-white placeholder-slate-400 text-xs rounded-xl pl-9 pr-3 py-2 outline-none transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Category Pills Bar (Horizontal Scrollable) */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          {categoryTabs.map(tab => {
            const Icon = tab.icon;
            const isSelected = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 border active:scale-95 shadow-md ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 border-amber-400 font-black shadow-amber-500/20'
                    : 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{isMg ? tab.labelMg : tab.labelFr}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Educational Highlights Bar */}
      <div className="bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/60 border border-blue-500/30 rounded-2xl p-3 sm:p-4 flex items-center justify-between gap-3 text-xs shadow-lg">
        <div className="flex items-center space-x-3 text-slate-200">
          <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30 flex-shrink-0">
            <Globe2 className="w-4 h-4" />
          </div>
          <div>
            <span className="font-black text-amber-300 uppercase tracking-wider text-[10px]">
              📢 {isMg ? 'Vaovao Fohy' : 'Flash Info'} :
            </span>
            <p className="text-white font-semibold line-clamp-1">
              {isMg
                ? 'Misokatra ny fampianarana mivantana BACC 2026 sy ny fangatahana vatsim-pianarana iraisam-pirenena !'
                : 'Ouverture des sessions de préparation BACC 2026 et des bourses d\'études internationales !'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveCategory('news')}
          className="hidden sm:flex items-center gap-1 text-amber-400 hover:text-amber-300 font-black whitespace-nowrap text-xs"
        >
          <span>{isMg ? 'Hijery vaovao' : 'Voir plus'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 4. Stream of Educational Post Cards */}
      {filteredPosts.length === 0 ? (
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-black text-white">
            {isMg ? 'Tsy misy publication mifanaraka amin\'ny sivana' : 'Aucune publication trouvée'}
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {isMg
              ? 'Miezaha manova ny teny hokarohina na manindry ny "🌟 Rehetra" mba hahitana ny votoatiny rehetra.'
              : 'Essayez de modifier votre recherche ou sélectionnez "🌟 Tout le flux".'}
          </p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setFeedSearch('');
            }}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs rounded-xl transition-colors border border-slate-700"
          >
            {isMg ? 'Hamerina ny sivana rehetra' : 'Réinitialiser les filtres'}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPosts.map(post => (
            <FeedPostCard key={post.id} post={post} />
          ))}
        </div>
      )}

    </div>
  );
};
