import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FeedPost, FeedComment } from '../types';
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Sparkles,
  Video,
  Play,
  Pause,
  Clock,
  Send,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  Calendar,
  Phone,
  Mail,
  MoreHorizontal,
  Flame,
  Lightbulb,
  ThumbsUp,
  Tag,
  Trash2,
  UserCheck
} from 'lucide-react';

export const FeedPostCard: React.FC<{
  post: FeedPost;
  onSelectCourse?: (courseId: string) => void;
}> = ({ post, onSelectCourse }) => {
  const {
    userProfile,
    toggleFeedPostReaction,
    addFeedComment,
    deleteFeedPost,
    savedPostIds,
    toggleSavePost,
    enrollInCourse,
    sendDirectMessage,
    setCurrentTab
  } = useApp();

  const isMg = userProfile.language === 'mg';
  const isSaved = savedPostIds.includes(post.id);

  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);
  const [isEnrolledLocal, setIsEnrolledLocal] = useState(false);

  // Time formatter
  const formatTime = (dateStr: string) => {
    const diffHours = Math.round((Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60));
    if (diffHours < 1) return isMg ? 'Vao teo' : 'À l\'instant';
    if (diffHours < 24) return isMg ? `${diffHours} ora lasa` : `Il y a ${diffHours} h`;
    const diffDays = Math.round(diffHours / 24);
    return isMg ? `${diffDays} andro lasa` : `Il y a ${diffDays} j`;
  };

  const handleReaction = (type: 'like' | 'idea' | 'applause' | 'fire') => {
    toggleFeedPostReaction(post.id, type);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    addFeedComment(post.id, commentInput.trim());
    setCommentInput('');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setFeedbackToast(isMg ? 'Voakopika ny rohy (Lien copié) !' : 'Lien de la publication copié !');
    setTimeout(() => setFeedbackToast(null), 3000);
  };

  const handleEnrollCourseAd = () => {
    setIsEnrolledLocal(true);
    setFeedbackToast(
      isMg
        ? `✅ Voasoratra anarana amin'ny fampianaran'i ${post.authorName} ianao !`
        : `✅ Inscription réussie au cours de ${post.authorName} !`
    );
    setTimeout(() => setFeedbackToast(null), 4000);
  };

  const handleContactTeacher = () => {
    sendDirectMessage(
      post.authorId,
      post.authorName,
      `Salama ${post.authorName}, liana tamin'ilay fampahafantaranao momba ny ${post.title || 'cours'} aho.`,
      post.courseInfo?.courseId,
      post.title
    );
    setFeedbackToast(isMg ? 'Lasa any amin\'ny Mpampianatra ny hafatrao !' : 'Message envoyé à l\'enseignant !');
    setTimeout(() => setFeedbackToast(null), 3500);
  };

  // Get total reactions
  const totalReactions =
    (post.reactions?.like || 0) +
    (post.reactions?.idea || 0) +
    (post.reactions?.applause || 0) +
    (post.reactions?.fire || 0);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-xl space-y-4 hover:border-slate-700/80 transition-all relative">
      
      {/* Toast Notification */}
      {feedbackToast && (
        <div className="absolute top-3 right-3 z-30 px-3.5 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-2xl flex items-center gap-2 border border-emerald-400 animate-fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>{feedbackToast}</span>
        </div>
      )}

      {/* 1. Header: Author Info, Role Badges, Category Tag & Date */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-11 h-11 rounded-full ring-2 ring-amber-400/80 overflow-hidden bg-slate-800 shadow-md">
              <img
                src={post.authorAvatar}
                alt={post.authorName}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Active Online Indicator */}
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-slate-900" />
          </div>

          <div>
            <div className="flex items-center flex-wrap gap-1.5">
              <h3 className="text-sm font-black text-white hover:text-amber-400 transition-colors cursor-pointer">
                {post.authorName}
              </h3>
              {post.isOfficial && (
                <span className="px-1.5 py-0.2 bg-amber-500/20 text-amber-300 text-[10px] font-black rounded border border-amber-500/40">
                  ⭐ Ofisialy
                </span>
              )}
            </div>

            <div className="flex items-center flex-wrap gap-2 text-xs text-slate-400 mt-0.5">
              {post.authorBadge && (
                <span className="text-[11px] font-bold text-amber-300/90">
                  {post.authorBadge}
                </span>
              )}
              <span>•</span>
              <span className="text-[11px] text-slate-400">
                {formatTime(post.createdAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Category Badge & Options */}
        <div className="flex items-center space-x-1.5 flex-shrink-0">
          <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border ${
            post.type === 'course_ad'
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              : post.type === 'video'
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
              : post.type === 'news_local' || post.type === 'news_international'
              ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
              : post.type === 'tip'
              ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
              : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
          }`}>
            {post.type === 'course_ad' ? (isMg ? '🎓 Tolotra Cours' : '🎓 Offre Cours')
              : post.type === 'video' ? (isMg ? '🎥 Horonantsary' : '🎥 Vidéo')
              : post.type === 'news_local' ? '🇲🇬 MEN Mada'
              : post.type === 'news_international' ? '🌍 Iraisam-pirenena'
              : post.type === 'tip' ? (isMg ? '💡 Toro-hevitra' : '💡 Astuce')
              : (isMg ? '🙋‍♂️ Fikarohana' : '🙋‍♂️ Demande')}
          </span>

          {post.authorId === userProfile.id && (
            <button
              onClick={() => deleteFeedPost(post.id)}
              className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
              title={isMg ? 'Fafao ny publication' : 'Supprimer'}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Target Level & Subject Pills */}
      {(post.targetLevel || post.targetSubject) && (
        <div className="flex items-center flex-wrap gap-1.5 text-[10px] font-bold">
          {post.targetLevel && post.targetLevel !== 'Toutes' && (
            <span className="px-2 py-0.5 bg-blue-500/15 text-blue-300 border border-blue-500/30 rounded-md">
              📚 {post.targetLevel}
            </span>
          )}
          {post.targetSeries && post.targetSeries !== 'Toutes' && (
            <span className="px-2 py-0.5 bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 rounded-md">
              🏷️ Série {post.targetSeries}
            </span>
          )}
          {post.targetSubject && post.targetSubject !== 'general' && (
            <span className="px-2 py-0.5 bg-slate-800 text-slate-300 border border-slate-700 rounded-md uppercase">
              📌 {post.targetSubject}
            </span>
          )}
        </div>
      )}

      {/* 3. Post Title (if exists) */}
      {post.title && (
        <h2 className="text-base sm:text-lg font-black text-white leading-snug">
          {post.title}
        </h2>
      )}

      {/* 4. Text Content Body (Formatted Markdown/Paragraphs) */}
      <div className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line">
        {post.content}
      </div>

      {/* 5. COURSE AD HIGHLIGHT BOX (Tolotra Cours en Ligne) */}
      {post.type === 'course_ad' && post.courseInfo && (
        <div className="bg-gradient-to-br from-amber-500/15 via-slate-800/80 to-slate-900 border-2 border-amber-500/40 rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-500/20 pb-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>{isMg ? 'Tolotra Fampianarana Mivantana' : 'Session & Cours en Ligne'}</span>
                </span>
              </div>
              <p className="text-xs text-slate-300">
                {post.courseInfo.scheduleDate} • {post.courseInfo.scheduleTime}
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <div className="px-3.5 py-1.5 bg-amber-500 text-slate-950 font-black text-sm rounded-xl shadow-md">
                {post.courseInfo.isPaid && post.courseInfo.priceAriary && post.courseInfo.priceAriary > 0
                  ? `${post.courseInfo.priceAriary.toLocaleString()} Ar / ${isMg ? 'volana' : 'mois'}`
                  : (isMg ? 'Maimaimpoana (Gratuit)' : 'Gratuit')}
              </div>
            </div>
          </div>

          {/* Contact Details & Action CTA Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            <button
              onClick={handleEnrollCourseAd}
              disabled={isEnrolledLocal}
              className={`py-3 px-4 rounded-xl text-xs font-black shadow-xl transition-transform active:scale-95 flex items-center justify-center gap-2 border ${
                isEnrolledLocal
                  ? 'bg-emerald-600 text-white border-emerald-500'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 border-amber-300'
              }`}
            >
              {isEnrolledLocal ? (
                <>
                  <UserCheck className="w-4 h-4" />
                  <span>{isMg ? 'Efa voasoratra anarana ✓' : 'Inscrit ✓'}</span>
                </>
              ) : (
                <>
                  <GraduationCap className="w-4 h-4" />
                  <span>{post.courseInfo.actionLabel || (isMg ? 'Hisoratra anarana amin\'ny Cours' : 'Rejoindre le cours')}</span>
                </>
              )}
            </button>

            <button
              onClick={handleContactTeacher}
              className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 text-amber-300 hover:text-white border border-slate-700 font-extrabold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>{isMg ? `Hiantso (${post.courseInfo.contactPhone || 'Mpampianatra'})` : 'Contacter l\'enseignant'}</span>
            </button>
          </div>
        </div>
      )}

      {/* 6. VIDEO PLAYER / MEDIA DISPLAY */}
      {post.mediaType === 'video' && post.mediaUrl && (
        <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-black aspect-video group">
          <img
            src={post.mediaUrl}
            alt={post.title || 'Video'}
            className={`w-full h-full object-cover transition-all ${isVideoPlaying ? 'opacity-90 scale-105' : 'opacity-75 group-hover:scale-105'}`}
            referrerPolicy="no-referrer"
          />

          {/* Video Overlay controls */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-between p-4">
            <div className="flex justify-between items-center">
              <span className="px-2.5 py-1 bg-rose-600/90 text-white font-black text-[10px] rounded-lg uppercase flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5" />
                <span>Horonantsary TAFITA</span>
              </span>

              {post.videoDuration && (
                <span className="px-2 py-0.5 bg-black/70 backdrop-blur-md text-amber-300 font-bold text-xs rounded-lg border border-white/10 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{post.videoDuration}</span>
                </span>
              )}
            </div>

            {/* Play Button Center */}
            <div className="flex items-center justify-center my-auto">
              <button
                onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                className="w-14 h-14 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95"
              >
                {isVideoPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
              </button>
            </div>

            {/* Bottom video status */}
            <div className="text-white space-y-1">
              <p className="text-xs font-bold truncate">{post.title}</p>
              {isVideoPlaying && (
                <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full rounded-full w-1/3 animate-pulse" />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 7. IMAGE DISPLAY (for News, Tips, Course Flyers) */}
      {post.mediaType === 'image' && post.mediaUrl && post.type !== 'course_ad' && (
        <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-xl max-h-96">
          <img
            src={post.mediaUrl}
            alt={post.title || 'Publication image'}
            className="w-full h-full object-cover hover:scale-102 transition-transform duration-300"
            referrerPolicy="no-referrer"
          />
        </div>
      )}

      {/* 8. Source Attribution (for Official MEN / International News) */}
      {post.sourceName && (
        <div className="flex items-center justify-between p-3 bg-slate-800/40 rounded-xl border border-slate-800 text-xs text-slate-400">
          <span className="flex items-center gap-1.5 font-bold text-slate-300">
            <span>Loharano (Source) :</span>
            <span className="text-amber-400 font-extrabold">{post.sourceName}</span>
          </span>
          {post.sourceUrl && (
            <a
              href={post.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
            >
              <span>{isMg ? 'Hamaky bebe kokoa' : 'Lire la suite'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      )}

      {/* 9. Tags / Hashtags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex items-center flex-wrap gap-1.5 pt-1">
          {post.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-[11px] font-bold text-amber-400/90 hover:text-amber-300 cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* 10. Reactions Counter Bar */}
      <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80 px-1">
        <div className="flex items-center space-x-2 font-bold">
          <div className="flex -space-x-1 items-center">
            <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40 flex items-center justify-center text-[10px]">❤️</span>
            <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center text-[10px]">💡</span>
            <span className="w-5 h-5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/40 flex items-center justify-center text-[10px]">🔥</span>
          </div>
          <span className="text-slate-300 font-extrabold">{totalReactions}</span>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <button
            onClick={() => setIsCommentsOpen(!isCommentsOpen)}
            className="hover:text-amber-400 transition-colors font-bold"
          >
            {post.comments?.length || 0} {isMg ? 'hevitra' : 'commentaires'}
          </button>
          <span>•</span>
          <button
            onClick={handleShare}
            className="hover:text-amber-400 transition-colors font-bold"
          >
            {post.sharesCount || 0} {isMg ? 'fizarana' : 'partages'}
          </button>
        </div>
      </div>

      {/* 11. Interactive Action Bar (Facebook Style Reactions, Comment, Share, Bookmark) */}
      <div className="grid grid-cols-4 gap-1 pt-1 border-t border-slate-800/80">
        
        {/* Multi-Reaction Like */}
        <button
          onClick={() => handleReaction('like')}
          className={`py-2 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 active:scale-95 ${
            post.userReaction === 'like'
              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
              : 'hover:bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${post.userReaction === 'like' ? 'fill-rose-500' : ''}`} />
          <span className="hidden sm:inline">{isMg ? 'Tiako' : 'J\'aime'}</span>
        </button>

        {/* Idea / Smart Reaction */}
        <button
          onClick={() => handleReaction('idea')}
          className={`py-2 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 active:scale-95 ${
            post.userReaction === 'idea'
              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              : 'hover:bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Lightbulb className="w-4 h-4" />
          <span className="hidden sm:inline">{isMg ? 'Mahasoa' : 'Utile'}</span>
        </button>

        {/* Comment Button */}
        <button
          onClick={() => setIsCommentsOpen(!isCommentsOpen)}
          className="py-2 rounded-xl hover:bg-slate-800 font-bold text-xs text-slate-400 hover:text-white transition-all flex items-center justify-center gap-1.5 active:scale-95"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="hidden sm:inline">{isMg ? 'Hevitra' : 'Commenter'}</span>
        </button>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="py-2 rounded-xl hover:bg-slate-800 font-bold text-xs text-slate-400 hover:text-white transition-all flex items-center justify-center gap-1.5 active:scale-95"
        >
          <Share2 className="w-4 h-4" />
          <span className="hidden sm:inline">{isMg ? 'Hizara' : 'Partager'}</span>
        </button>

      </div>

      {/* 12. EXPANDABLE COMMENTS SECTION */}
      {isCommentsOpen && (
        <div className="space-y-3 pt-3 border-t border-slate-800 bg-slate-950/40 p-3 sm:p-4 rounded-2xl">
          
          {/* Write comment */}
          <form onSubmit={handleAddComment} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-800 flex-shrink-0 ring-1 ring-amber-400">
              <img
                src={
                  userProfile.role === 'teacher'
                    ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
                    : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
                }
                alt={userProfile.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <input
              type="text"
              value={commentInput}
              onChange={e => setCommentInput(e.target.value)}
              placeholder={isMg ? 'Manorata hevitra na fanontaniana...' : 'Écrire un commentaire ou poser une question...'}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <button
              type="submit"
              className="p-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Comments List */}
          <div className="space-y-2.5 pt-2">
            {(!post.comments || post.comments.length === 0) ? (
              <p className="text-xs text-slate-400 italic text-center py-2">
                {isMg ? 'Mbola tsy misy hevitra. Aoka ianao ho voalohany hametraka !' : 'Aucun commentaire. Soyez le premier à réagir !'}
              </p>
            ) : (
              post.comments.map(c => (
                <div key={c.id} className="flex items-start space-x-2.5 bg-slate-900/80 p-3 rounded-2xl border border-slate-800/80">
                  <div className="w-7 h-7 rounded-full overflow-hidden bg-slate-800 flex-shrink-0">
                    <img
                      src={c.authorAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                      alt={c.authorName}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-white">
                        {c.authorName}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {formatTime(c.createdAt)}
                      </span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      {c.content}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      )}

    </div>
  );
};
