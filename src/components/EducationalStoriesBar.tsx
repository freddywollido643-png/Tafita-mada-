import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { EducationalStory, StoryMediaType } from '../types';
import {
  Plus,
  Sparkles,
  X,
  Heart,
  MessageCircle,
  Share2,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Video,
  BookOpen,
  Send,
  CheckCircle2,
  Flame
} from 'lucide-react';

export const EducationalStoriesBar: React.FC = () => {
  const { stories, addStory, userProfile, setCurrentTab, setSelectedOnlineCourse, onlineCourses } = useApp();
  const isMg = userProfile.language === 'mg';

  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // New Story Form State
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newTag, setNewTag] = useState(isMg ? 'Toro-hevitra' : 'Astuce');
  const [newMediaType, setNewMediaType] = useState<StoryMediaType>('gradient');
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [newBgGradient, setNewBgGradient] = useState('from-amber-600 via-orange-600 to-rose-700');
  const [newActionText, setNewActionText] = useState(isMg ? 'Hijery ny antsipiriany' : 'Voir les détails');
  const [newActionTab, setNewActionTab] = useState('online-courses');

  // Story Viewer Timer Progress
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  const activeStory = activeStoryIndex !== null ? stories[activeStoryIndex] : null;

  // Auto advance story timer
  useEffect(() => {
    if (!isStoryModalOpen || activeStoryIndex === null || isPaused) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          if (activeStoryIndex < stories.length - 1) {
            setActiveStoryIndex(prevIndex => (prevIndex !== null ? prevIndex + 1 : null));
            return 0;
          } else {
            setIsStoryModalOpen(false);
            setActiveStoryIndex(null);
            return 0;
          }
        }
        return prev + 2; // ~5 seconds per story
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isStoryModalOpen, activeStoryIndex, isPaused, stories.length]);

  const handleOpenStory = (index: number) => {
    setActiveStoryIndex(index);
    setProgress(0);
    setIsStoryModalOpen(true);
  };

  const handleNextStory = () => {
    if (activeStoryIndex !== null && activeStoryIndex < stories.length - 1) {
      setActiveStoryIndex(activeStoryIndex + 1);
      setProgress(0);
    } else {
      setIsStoryModalOpen(false);
      setActiveStoryIndex(null);
    }
  };

  const handlePrevStory = () => {
    if (activeStoryIndex !== null && activeStoryIndex > 0) {
      setActiveStoryIndex(activeStoryIndex - 1);
      setProgress(0);
    }
  };

  const handleCreateStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const story: EducationalStory = {
      id: `story-${Date.now()}`,
      authorId: userProfile.id,
      authorName: userProfile.name,
      authorRole: userProfile.role,
      authorAvatar: userProfile.role === 'teacher'
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      authorBadge: userProfile.role === 'teacher'
        ? (isMg ? '👨‍🏫 Mpampianatra' : '👨‍🏫 Enseignant')
        : (isMg ? `🎓 Mpianatra ${userProfile.level}` : `🎓 Élève ${userProfile.level}`),
      mediaType: newMediaType,
      mediaUrl: newMediaType === 'image' || newMediaType === 'video' ? (newMediaUrl || 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&auto=format&fit=crop&q=80') : undefined,
      bgGradient: newBgGradient,
      title: newTitle,
      subtitle: newSubtitle,
      tag: newTag,
      actionText: newActionText,
      actionTab: newActionTab,
      createdAt: new Date().toISOString(),
      likesCount: 1
    };

    addStory(story);
    setIsCreateModalOpen(false);
    setNewTitle('');
    setNewSubtitle('');

    setFeedbackToast(isMg ? 'Navoaka soa aman-tsara ny Story-nao !' : 'Votre Story a été publiée avec succès !');
    setTimeout(() => setFeedbackToast(null), 3000);
  };

  const handleSendQuickReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setFeedbackToast(isMg ? 'Lasa ny hafatrao !' : 'Votre message a été envoyé !');
    setReplyText('');
    setTimeout(() => setFeedbackToast(null), 3000);
  };

  const gradientOptions = [
    { label: 'Amber Flame', val: 'from-amber-600 via-orange-600 to-rose-700' },
    { label: 'Emerald Nature', val: 'from-emerald-600 via-teal-600 to-cyan-700' },
    { label: 'Royal Purple', val: 'from-purple-600 via-indigo-600 to-blue-700' },
    { label: 'Midnight Blue', val: 'from-blue-700 via-indigo-900 to-slate-900' }
  ];

  return (
    <div className="space-y-2">
      {/* Feedback Toast */}
      {feedbackToast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-2xl shadow-2xl flex items-center gap-2 border border-emerald-400 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{feedbackToast}</span>
        </div>
      )}

      {/* Stories Section Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <h3 className="text-xs sm:text-sm font-black text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <span>{isMg ? 'Stories & Flash Fanabeazana' : 'Stories & Flash Éducatifs'}</span>
          </h3>
        </div>
        <span className="text-[11px] font-bold text-slate-400">
          {stories.length} {isMg ? 'mavitrika' : 'actives'}
        </span>
      </div>

      {/* Horizontal Scrollable Stories Container */}
      <div className="flex items-center space-x-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        
        {/* 1. Add Story Card */}
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex-shrink-0 w-28 sm:w-32 h-44 sm:h-48 rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-dashed border-amber-500/50 hover:border-amber-400 transition-all flex flex-col items-center justify-between p-3 group relative overflow-hidden text-left shadow-lg active:scale-95"
        >
          <div className="w-full flex justify-end">
            <span className="text-[9px] font-black uppercase px-1.5 py-0.5 bg-amber-500/20 text-amber-300 rounded border border-amber-500/30">
              {isMg ? '+ Vaovao' : '+ Nouveau'}
            </span>
          </div>

          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-amber-600 text-slate-950 flex items-center justify-center font-black shadow-md group-hover:scale-110 transition-transform">
            <Plus className="w-5 h-5" />
          </div>

          <div className="w-full text-center">
            <p className="text-xs font-black text-white leading-tight">
              {isMg ? 'Mamorona Story' : 'Créer une Story'}
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5">
              {isMg ? 'Flash / Pub' : 'Flash ou pub'}
            </p>
          </div>
        </button>

        {/* 2. List of Stories */}
        {stories.map((story, idx) => (
          <button
            key={story.id}
            onClick={() => handleOpenStory(idx)}
            className="flex-shrink-0 w-28 sm:w-32 h-44 sm:h-48 rounded-2xl relative overflow-hidden transition-all duration-200 hover:-translate-y-1 active:scale-95 text-left shadow-xl group border-2 border-amber-500/60 p-2.5 flex flex-col justify-between"
          >
            {/* Background Content */}
            {story.mediaType === 'image' && story.mediaUrl ? (
              <img
                src={story.mediaUrl}
                alt={story.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            ) : story.mediaType === 'video' && story.mediaUrl ? (
              <img
                src={story.mediaUrl}
                alt={story.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className={`absolute inset-0 bg-gradient-to-br ${story.bgGradient || 'from-blue-600 to-indigo-800'}`} />
            )}

            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            {/* Top Area: Author Avatar with ring */}
            <div className="relative z-10 flex items-center justify-between w-full">
              <div className="w-8 h-8 rounded-full ring-2 ring-amber-400 p-0.5 overflow-hidden bg-slate-900 shadow-md">
                <img
                  src={story.authorAvatar}
                  alt={story.authorName}
                  className="w-full h-full rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {story.tag && (
                <span className="text-[9px] font-black uppercase px-1.5 py-0.5 bg-black/60 backdrop-blur-md text-amber-300 rounded border border-white/20">
                  {story.tag}
                </span>
              )}
            </div>

            {/* Bottom Area: Title & Author Name */}
            <div className="relative z-10 space-y-0.5">
              <h4 className="text-[11px] sm:text-xs font-black text-white leading-tight line-clamp-2 drop-shadow-md">
                {story.title}
              </h4>
              <p className="text-[9px] font-bold text-slate-300 truncate">
                {story.authorName}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* FULL-SCREEN STORY VIEWER MODAL */}
      {isStoryModalOpen && activeStory && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4">
          
          {/* Main Story Container */}
          <div
            className="relative w-full max-w-sm sm:max-w-md h-[88vh] max-h-[720px] rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between border border-slate-700 bg-slate-900 select-none"
            onMouseDown={() => setIsPaused(true)}
            onMouseUp={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            {/* Background Media / Gradient */}
            {activeStory.mediaType === 'image' && activeStory.mediaUrl ? (
              <img
                src={activeStory.mediaUrl}
                alt={activeStory.title}
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : activeStory.mediaType === 'video' && activeStory.mediaUrl ? (
              <div className="absolute inset-0">
                <img
                  src={activeStory.mediaUrl}
                  alt={activeStory.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <div className="p-4 bg-amber-500 text-slate-950 rounded-full shadow-2xl">
                    <Video className="w-8 h-8" />
                  </div>
                </div>
              </div>
            ) : (
              <div className={`absolute inset-0 bg-gradient-to-br ${activeStory.bgGradient || 'from-amber-600 via-orange-600 to-rose-700'}`} />
            )}

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90 pointer-events-none" />

            {/* Top Navigation & Progress Bars */}
            <div className="relative z-20 p-4 space-y-3">
              {/* Progress Bars */}
              <div className="flex items-center space-x-1.5">
                {stories.map((_, i) => (
                  <div key={i} className="flex-1 h-1 rounded-full bg-white/30 overflow-hidden">
                    <div
                      className={`h-full bg-amber-400 transition-all ${
                        i < (activeStoryIndex || 0)
                          ? 'w-full'
                          : i === activeStoryIndex
                          ? ''
                          : 'w-0'
                      }`}
                      style={{
                        width: i === activeStoryIndex ? `${progress}%` : undefined
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Author Info Bar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-10 h-10 rounded-full ring-2 ring-amber-400 overflow-hidden bg-slate-800 shadow">
                    <img
                      src={activeStory.authorAvatar}
                      alt={activeStory.authorName}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-xs text-white drop-shadow">
                        {activeStory.authorName}
                      </span>
                      {activeStory.authorBadge && (
                        <span className="text-[10px] px-1.5 py-0.2 bg-amber-500/30 text-amber-300 font-black rounded border border-amber-500/40">
                          {activeStory.authorBadge}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-300 drop-shadow">
                      {activeStory.tag || (isMg ? 'Story Fanabeazana' : 'Story Éducative')}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsStoryModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Left & Right Tap Zones for Navigation */}
            <button
              onClick={handlePrevStory}
              className="absolute left-0 top-20 bottom-32 w-1/4 z-10 flex items-center justify-start pl-2 opacity-0 hover:opacity-100 transition-opacity text-white"
            >
              <div className="p-2 bg-black/40 rounded-full">
                <ChevronLeft className="w-6 h-6" />
              </div>
            </button>

            <button
              onClick={handleNextStory}
              className="absolute right-0 top-20 bottom-32 w-1/4 z-10 flex items-center justify-end pr-2 opacity-0 hover:opacity-100 transition-opacity text-white"
            >
              <div className="p-2 bg-black/40 rounded-full">
                <ChevronRight className="w-6 h-6" />
              </div>
            </button>

            {/* Center Story Content & Typography */}
            <div className="relative z-20 px-6 py-4 text-center my-auto space-y-3">
              <span className="inline-block px-3 py-1 bg-black/50 backdrop-blur-md text-amber-300 border border-amber-400/40 text-xs font-black rounded-full shadow-lg">
                ✨ {activeStory.tag || (isMg ? 'Toro-hevitra' : 'Astuce')}
              </span>

              <h2 className="text-xl sm:text-2xl font-black text-white drop-shadow-lg leading-snug">
                {activeStory.title}
              </h2>

              {activeStory.subtitle && (
                <p className="text-sm font-semibold text-slate-100 drop-shadow max-w-xs mx-auto leading-relaxed bg-black/30 backdrop-blur-sm p-3 rounded-2xl border border-white/10">
                  {activeStory.subtitle}
                </p>
              )}

              {/* Action Link Button if Available */}
              {activeStory.actionText && (
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setIsStoryModalOpen(false);
                      if (activeStory.actionTab) {
                        setCurrentTab(activeStory.actionTab as any);
                      }
                    }}
                    className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs rounded-2xl shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-2 mx-auto border border-amber-300"
                  >
                    <span>{activeStory.actionText}</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Quick Reply & Interaction Bar */}
            <div className="relative z-20 p-4 border-t border-white/10 bg-black/60 backdrop-blur-md space-y-2">
              <form onSubmit={handleSendQuickReply} className="flex items-center gap-2">
                <input
                  type="text"
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  placeholder={isMg ? 'Mametraha hevitra na hafatra...' : 'Envoyer un message ou poser une question...'}
                  className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-4 py-2 text-xs text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <button
                  type="submit"
                  className="p-2.5 bg-amber-500 text-slate-950 rounded-2xl font-bold shadow hover:bg-amber-400 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

              <div className="flex items-center justify-between text-xs text-slate-300 pt-1">
                <button
                  onClick={() => {
                    setFeedbackToast('❤️ ' + (isMg ? 'Nankasitrahanao ny Story !' : 'Vous aimez cette Story !'));
                    setTimeout(() => setFeedbackToast(null), 2500);
                  }}
                  className="flex items-center gap-1.5 hover:text-rose-400 transition-colors font-bold"
                >
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                  <span>{activeStory.likesCount} {isMg ? 'tiana' : 'j\'aime'}</span>
                </button>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-slate-400">
                    💡 {isMg ? 'Tsindrio ny sisiny handroso/hihemotra' : 'Touchez les côtés pour naviguer'}
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* CREATE STORY MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-black text-white">
                  {isMg ? 'Mamorona Story na Flash Fanabeazana' : 'Créer une Story Éducative'}
                </h3>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateStory} className="space-y-4">
              {/* Type & Background */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  {isMg ? 'Karazana Story sy Loko fototra :' : 'Format de la Story & Fond :'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewMediaType('gradient')}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                      newMediaType === 'gradient'
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    🎨 {isMg ? 'Loko Dégradé' : 'Dégradé'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewMediaType('image')}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                      newMediaType === 'image'
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    🖼️ {isMg ? 'Sary (Image)' : 'Image'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewMediaType('video')}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                      newMediaType === 'video'
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    🎥 {isMg ? 'Vidéo' : 'Vidéo'}
                  </button>
                </div>
              </div>

              {/* Gradient Choices */}
              {newMediaType === 'gradient' && (
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 block">
                    {isMg ? 'Safidio ny loko dégradé :' : 'Choisir la palette de couleur :'}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {gradientOptions.map(g => (
                      <button
                        type="button"
                        key={g.val}
                        onClick={() => setNewBgGradient(g.val)}
                        className={`h-10 rounded-xl bg-gradient-to-br ${g.val} border-2 transition-all flex items-center justify-center text-[10px] font-black text-white shadow ${
                          newBgGradient === g.val ? 'border-white ring-2 ring-amber-400' : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Image / Video URL */}
              {(newMediaType === 'image' || newMediaType === 'video') && (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300 block">
                    {isMg ? 'Rohy sary na video (URL) :' : 'Lien de l\'image ou vidéo (URL) :'}
                  </label>
                  <input
                    type="url"
                    value={newMediaUrl}
                    onChange={e => setNewMediaUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  />
                </div>
              )}

              {/* Title / Headline */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 block">
                  {isMg ? 'Lohanteny lehibe (Titre de la Story) :' : 'Titre principal de la Story :'} <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="Ex: 🔴 Live BACC Maths ce soir à 19h !"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  required
                />
              </div>

              {/* Subtitle / Details */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 block">
                  {isMg ? 'Fanazavana fohy (Sous-titre / Message) :' : 'Message ou précision :'}
                </label>
                <textarea
                  value={newSubtitle}
                  onChange={e => setNewSubtitle(e.target.value)}
                  rows={2}
                  placeholder="Ex: Fandinihana ireo laza adina lasa sy toro-marika amin'ny Google Meet."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>

              {/* Tag / Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    {isMg ? 'Tag / Sokajy :' : 'Étiquette / Tag :'}
                  </label>
                  <input
                    type="text"
                    value={newTag}
                    onChange={e => setNewTag(e.target.value)}
                    placeholder="Ex: Live BACC, Flash Anglais, Astuce"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    {isMg ? 'Rohy fidirana (Bouton d\'action) :' : 'Redirection du bouton :'}
                  </label>
                  <select
                    value={newActionTab}
                    onChange={e => setNewActionTab(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:ring-2 focus:ring-amber-400 focus:outline-none font-bold"
                  >
                    <option value="online-courses">{isMg ? 'Cours en Ligne' : 'Cours en Ligne'}</option>
                    <option value="lessons">{isMg ? 'Lesona (Cours)' : 'Cours & Leçons'}</option>
                    <option value="exercises">{isMg ? 'Exercices' : 'Exercices'}</option>
                    <option value="quizzes">{isMg ? 'Quiz' : 'Quiz'}</option>
                    <option value="bac">{isMg ? 'Préparation BACC' : 'Préparation BACC'}</option>
                    <option value="news">{isMg ? 'Vaovao MEN' : 'Actualités'}</option>
                  </select>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-300 font-bold text-xs rounded-xl transition-colors"
                >
                  {isMg ? 'Aoka ihany' : 'Annuler'}
                </button>

                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 border border-amber-300"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isMg ? 'Hamoaka ny Story' : 'Publier la Story'}</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
