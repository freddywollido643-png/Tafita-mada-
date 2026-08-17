import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FeedPost, FeedPostType, FeedCategory, Level, Series, SubjectId } from '../types';
import { SUBJECTS } from '../data/mockDatabase';
import {
  Edit3,
  Video,
  GraduationCap,
  HelpCircle,
  Sparkles,
  Image,
  Send,
  X,
  CheckCircle2,
  Calendar,
  Phone,
  Tag,
  BookOpen,
  DollarSign,
  AlertCircle
} from 'lucide-react';

export const FeedPostComposer: React.FC<{
  onPostCreated?: () => void;
}> = ({ onPostCreated }) => {
  const { userProfile, addFeedPost } = useApp();
  const isMg = userProfile.language === 'mg';

  const [isOpen, setIsOpen] = useState(false);
  const [postType, setPostType] = useState<FeedPostType>(userProfile.role === 'teacher' ? 'course_ad' : 'student_request');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'video' | 'none'>('none');
  const [mediaUrl, setMediaUrl] = useState('');
  const [videoDuration, setVideoDuration] = useState('');

  // Course Specific Fields
  const [isPaid, setIsPaid] = useState(false);
  const [priceAriary, setPriceAriary] = useState<number>(10000);
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('15:00 - 17:00');
  const [contactPhone, setContactPhone] = useState('+261 34 00 000 00');
  const [meetingUrl, setMeetingUrl] = useState('');

  // Target Metadata
  const [targetLevel, setTargetLevel] = useState<Level | 'Toutes'>(userProfile.level || 'Terminale');
  const [targetSeries, setTargetSeries] = useState<Series | 'Toutes'>(userProfile.series || 'Toutes');
  const [targetSubject, setTargetSubject] = useState<SubjectId | 'general'>('maths');

  const [feedback, setFeedback] = useState<string | null>(null);

  const handleOpenWithType = (type: FeedPostType) => {
    setPostType(type);
    if (type === 'course_ad') {
      setMediaType('image');
      setMediaUrl('https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&auto=format&fit=crop&q=80');
    } else if (type === 'video') {
      setMediaType('video');
      setMediaUrl('https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&auto=format&fit=crop&q=80');
      setVideoDuration('10:00');
    }
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    let category: FeedCategory = 'courses';
    if (postType === 'course_ad') category = 'courses';
    else if (postType === 'news_local' || postType === 'news_international') category = 'news';
    else if (postType === 'video') category = 'videos';
    else if (postType === 'tip') category = 'tips';
    else if (postType === 'student_request') category = 'requests';

    const parsedTags = tagsInput.trim()
      ? tagsInput.split(',').map(t => t.trim().startsWith('#') ? t.trim() : `#${t.trim()}`)
      : [
          `#${targetLevel}`,
          targetSeries !== 'Toutes' ? `#Série${targetSeries}` : '#TroncCommun',
          `#${targetSubject.toUpperCase()}`
        ];

    const newPost: FeedPost = {
      id: `post-${Date.now()}`,
      authorId: userProfile.id,
      authorName: userProfile.name,
      authorRole: userProfile.role,
      authorAvatar: userProfile.role === 'teacher'
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      authorBadge: userProfile.role === 'teacher'
        ? (isMg ? '👨‍🏫 Mpampianatra mpanabe' : '👨‍🏫 Enseignant formateur')
        : (isMg ? `🎓 Mpianatra ${userProfile.level}` : `🎓 Élève ${userProfile.level}`),
      type: postType,
      category,
      title: title.trim() || undefined,
      content: content.trim(),
      tags: parsedTags,
      mediaType: mediaType !== 'none' ? mediaType : undefined,
      mediaUrl: mediaType !== 'none' && mediaUrl ? mediaUrl : undefined,
      videoDuration: mediaType === 'video' ? videoDuration || '05:00' : undefined,
      targetLevel,
      targetSeries,
      targetSubject,
      courseInfo: postType === 'course_ad' ? {
        isPaid,
        priceAriary: isPaid ? priceAriary : 0,
        scheduleDate: scheduleDate || (isMg ? 'Isaky ny Asabotsy' : 'Chaque Samedi'),
        scheduleTime: scheduleTime || '15:00 - 17:00',
        contactPhone,
        meetingUrl: meetingUrl || 'https://meet.google.com/tafita-mada',
        actionLabel: isPaid ? (isMg ? 'Hisoratra anarana' : 'S\'inscrire au cours') : (isMg ? 'Handray anjara maimaimpoana' : 'Participer gratuitement')
      } : undefined,
      reactions: {
        like: 1,
        idea: 0,
        applause: 0,
        fire: 0
      },
      userReaction: 'like',
      commentsCount: 0,
      sharesCount: 0,
      comments: [],
      createdAt: new Date().toISOString()
    };

    addFeedPost(newPost);
    setIsOpen(false);
    setContent('');
    setTitle('');
    setTagsInput('');

    setFeedback(isMg ? 'Navoaka soa aman-tsara ny fampahafantaranao !' : 'Votre publication a été partagée sur le fil !');
    setTimeout(() => setFeedback(null), 3000);
    if (onPostCreated) onPostCreated();
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl space-y-3 relative overflow-hidden">
      {/* Toast Feedback */}
      {feedback && (
        <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl text-emerald-300 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Main Composer Trigger Bar */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full ring-2 ring-amber-400/80 overflow-hidden bg-slate-800 flex-shrink-0">
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

        <button
          onClick={() => setIsOpen(true)}
          className="flex-1 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-400/50 rounded-2xl px-4 py-3 text-left text-xs sm:text-sm text-slate-400 transition-all flex items-center justify-between group shadow-inner"
        >
          <span className="truncate">
            {userProfile.role === 'teacher'
              ? isMg
                ? `Manao pub cours, fanambarana, na fizarana lesona, ${userProfile.name} ?`
                : `Publier une annonce de cours ou partager une leçon, ${userProfile.name} ?`
              : isMg
                ? `Inona no vaovao, lesona, na fanontaniana tianao hozaraina, ${userProfile.name} ?`
                : `Une question, une recherche de cours ou une astuce, ${userProfile.name} ?`}
          </span>
          <Edit3 className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors ml-2 flex-shrink-0" />
        </button>
      </div>

      {/* Quick Action Shortcut Buttons (Facebook Style) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800/80">
        <button
          type="button"
          onClick={() => handleOpenWithType('course_ad')}
          className="p-2 sm:py-2.5 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 hover:border-amber-400/40 text-left transition-all flex items-center space-x-2 text-xs font-bold text-slate-300 active:scale-95"
        >
          <div className="p-1.5 bg-amber-500/20 text-amber-400 rounded-lg">
            <GraduationCap className="w-4 h-4" />
          </div>
          <span className="truncate">{isMg ? '🎓 Pub Cours' : '🎓 Pub Cours'}</span>
        </button>

        <button
          type="button"
          onClick={() => handleOpenWithType('video')}
          className="p-2 sm:py-2.5 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 hover:border-cyan-400/40 text-left transition-all flex items-center space-x-2 text-xs font-bold text-slate-300 active:scale-95"
        >
          <div className="p-1.5 bg-cyan-500/20 text-cyan-400 rounded-lg">
            <Video className="w-4 h-4" />
          </div>
          <span className="truncate">{isMg ? '🎥 Horonantsary' : '🎥 Vidéo / Tuto'}</span>
        </button>

        <button
          type="button"
          onClick={() => handleOpenWithType('student_request')}
          className="p-2 sm:py-2.5 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 hover:border-emerald-400/40 text-left transition-all flex items-center space-x-2 text-xs font-bold text-slate-300 active:scale-95"
        >
          <div className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg">
            <HelpCircle className="w-4 h-4" />
          </div>
          <span className="truncate">{isMg ? '🙋‍♂️ Fikarohana' : '🙋‍♂️ Demande'}</span>
        </button>

        <button
          type="button"
          onClick={() => handleOpenWithType('tip')}
          className="p-2 sm:py-2.5 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 hover:border-purple-400/40 text-left transition-all flex items-center space-x-2 text-xs font-bold text-slate-300 active:scale-95"
        >
          <div className="p-1.5 bg-purple-500/20 text-purple-400 rounded-lg">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="truncate">{isMg ? '💡 Toro-hevitra' : '💡 Astuce'}</span>
        </button>
      </div>

      {/* FULL PUBLICATION COMPOSER MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl p-5 sm:p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full ring-2 ring-amber-400 overflow-hidden bg-slate-800">
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
                <div>
                  <h3 className="text-xs sm:text-sm font-black text-white">
                    {isMg ? 'Famoahana Vaovao na Tolotra Cours' : 'Créer une Publication / Annonce'}
                  </h3>
                  <span className="text-[10px] text-slate-400">
                    👤 {userProfile.name} ({userProfile.role === 'teacher' ? (isMg ? 'Mpampianatra' : 'Enseignant') : (isMg ? 'Mpianatra' : 'Élève')})
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Type of publication */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 block">
                  {isMg ? '1. Karazana Fampahafantarana :' : '1. Type de publication :'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'course_ad' as const, label: isMg ? '🎓 Tolotra Cours' : '🎓 Offre de Cours', desc: 'Mpampianatra / Prof' },
                    { id: 'student_request' as const, label: isMg ? '🙋‍♂️ Fikarohana' : '🙋‍♂️ Demande de cours', desc: 'Mpianatra / Groupe' },
                    { id: 'video' as const, label: isMg ? '🎥 Horonantsary' : '🎥 Vidéo explicative', desc: 'Capsule & Tuto' },
                    { id: 'tip' as const, label: isMg ? '💡 Toro-hevitra' : '💡 Astuce & Fiche', desc: 'Method & Formule' },
                    { id: 'news_local' as const, label: isMg ? '📢 Vaovao Mada' : '📢 Actualité Mada', desc: 'MEN / Concours' },
                    { id: 'news_international' as const, label: isMg ? '🌍 Iraisam-pirenena' : '🌍 International', desc: 'Bourses / Campus' }
                  ].map(t => (
                    <button
                      type="button"
                      key={t.id}
                      onClick={() => setPostType(t.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        postType === t.id
                          ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md font-bold'
                          : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                      }`}
                    >
                      <div className="text-xs font-bold">{t.label}</div>
                      <div className={`text-[10px] ${postType === t.id ? 'text-slate-900' : 'text-slate-400'}`}>{t.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 block">
                  {isMg ? '2. Lohanteny (Titre) :' : '2. Titre de l\'annonce :'}
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder={
                    postType === 'course_ad'
                      ? "Ex: 📢 Cours en Ligne BACC Maths & SES Spécial Série OSE"
                      : postType === 'student_request'
                      ? "Ex: 🙋‍♂️ Mitady namana hanao groupe d'étude en ligne"
                      : "Ex: 💡 Astuce de révision pour le BACC 2026..."
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:ring-2 focus:ring-amber-400 focus:outline-none font-bold"
                />
              </div>

              {/* Main Content Body */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 block">
                  {isMg ? '3. Votoatiny & Fanazavana :' : '3. Corps du message :'} <span className="text-rose-400">*</span>
                </label>
                <textarea
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  rows={5}
                  placeholder={
                    postType === 'course_ad'
                      ? "Hazavao eto ny fandaharam-potoana, ireo lohahevitra hianarana, ny fomba fampianarana (Google Meet, PDF, horonantsary)..."
                      : postType === 'student_request'
                      ? "Soraty eto ny taranja ilanao fanampiana, ny kilasinao ary ny fandaharam-potoana mety aminao..."
                      : "Soraty eto ny hevitra, toro-lalana, na vaovao tianao hozaraina amin'ny mpianatra..."
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  required
                />
              </div>

              {/* Targets (Level, Series, Subject) */}
              <div className="p-3 bg-slate-800/50 border border-slate-700/60 rounded-2xl space-y-2.5">
                <div className="text-xs font-bold text-amber-400">
                  🎯 {isMg ? 'Sokajy sy Taranja kendrena :' : 'Public cible & Matière :'}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">{isMg ? 'Kilasy :' : 'Classe :'}</label>
                    <select
                      value={targetLevel}
                      onChange={e => setTargetLevel(e.target.value as any)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white font-bold focus:ring-2 focus:ring-amber-400"
                    >
                      <option value="Toutes">Toutes les classes</option>
                      <option value="6e">6ème</option>
                      <option value="5e">5ème</option>
                      <option value="4e">4ème</option>
                      <option value="3e">3ème (BEPC)</option>
                      <option value="Seconde">Seconde</option>
                      <option value="Première">Première</option>
                      <option value="Terminale">Terminale (BACC)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">{isMg ? 'Série :' : 'Série :'}</label>
                    <select
                      value={targetSeries}
                      onChange={e => setTargetSeries(e.target.value as any)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white font-bold focus:ring-2 focus:ring-amber-400"
                    >
                      <option value="Toutes">Toutes les séries</option>
                      <option value="OSE">Série OSE</option>
                      <option value="L">Série L</option>
                      <option value="S">Série S</option>
                      <option value="A">Série A</option>
                      <option value="C">Série C</option>
                      <option value="D">Série D</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">{isMg ? 'Taranja :' : 'Matière :'}</label>
                    <select
                      value={targetSubject}
                      onChange={e => setTargetSubject(e.target.value as any)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white font-bold focus:ring-2 focus:ring-amber-400"
                    >
                      <option value="general">Général / Toutes</option>
                      {SUBJECTS.map(s => (
                        <option key={s.id} value={s.id}>{s.nameFr} ({s.nameMg})</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Specialized Course Ad Controls */}
              {postType === 'course_ad' && (
                <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-amber-300">
                      💰 {isMg ? 'Saram-pianarana & Fifandraisana :' : 'Tarif & Contact Enseignant :'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsPaid(!isPaid)}
                      className={`px-3 py-1 rounded-xl text-xs font-extrabold transition-colors ${
                        isPaid ? 'bg-amber-500 text-slate-950' : 'bg-emerald-500 text-slate-950'
                      }`}
                    >
                      {isPaid ? (isMg ? 'Misy sarany (Payant)' : 'Payant') : (isMg ? 'Maimaimpoana (Gratuit)' : 'Gratuit')}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {isPaid && (
                      <div>
                        <label className="text-[10px] text-slate-300 block mb-0.5">{isMg ? 'Sarany (Ariary) :' : 'Tarif en Ariary :'}</label>
                        <input
                          type="number"
                          value={priceAriary}
                          onChange={e => setPriceAriary(Number(e.target.value))}
                          placeholder="15000"
                          className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white font-bold"
                        />
                      </div>
                    )}

                    <div>
                      <label className="text-[10px] text-slate-300 block mb-0.5">{isMg ? 'Laharana Finday / WhatsApp :' : 'Téléphone / WhatsApp :'}</label>
                      <input
                        type="tel"
                        value={contactPhone}
                        onChange={e => setContactPhone(e.target.value)}
                        placeholder="+261 34 12 345 67"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-300 block mb-0.5">{isMg ? 'Ora / Fandaharam-potoana :' : 'Horaires :'}</label>
                      <input
                        type="text"
                        value={scheduleTime}
                        onChange={e => setScheduleTime(e.target.value)}
                        placeholder="Isaky ny Asabotsy 15h - 17h"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-300 block mb-0.5">{isMg ? 'Rohy Google Meet / Zoom :' : 'Lien réunion vidéo :'}</label>
                      <input
                        type="url"
                        value={meetingUrl}
                        onChange={e => setMeetingUrl(e.target.value)}
                        placeholder="https://meet.google.com/..."
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Media selection (Image / Video) */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  {isMg ? '4. Sary na Horonantsary (Média) :' : '4. Média d\'illustration / Vidéo :'}
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setMediaType('none')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                      mediaType === 'none' ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    {isMg ? 'Tsy asiana' : 'Aucun'}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMediaType('image');
                      if (!mediaUrl) setMediaUrl('https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&auto=format&fit=crop&q=80');
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1 ${
                      mediaType === 'image' ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    <Image className="w-3.5 h-3.5" />
                    <span>{isMg ? 'Sary' : 'Image'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMediaType('video');
                      if (!mediaUrl) setMediaUrl('https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&auto=format&fit=crop&q=80');
                      if (!videoDuration) setVideoDuration('10:00');
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1 ${
                      mediaType === 'video' ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>{isMg ? 'Horonantsary' : 'Vidéo'}</span>
                  </button>
                </div>

                {mediaType !== 'none' && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                    <div className="sm:col-span-2">
                      <input
                        type="url"
                        value={mediaUrl}
                        onChange={e => setMediaUrl(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white"
                      />
                    </div>
                    {mediaType === 'video' && (
                      <div>
                        <input
                          type="text"
                          value={videoDuration}
                          onChange={e => setVideoDuration(e.target.value)}
                          placeholder="Faharetana (ex: 12:45)"
                          className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 block">
                  {isMg ? '5. Tags / Teny fototra (saraho amin\'ny faingo) :' : '5. Tags / Hashtags :'}
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={e => setTagsInput(e.target.value)}
                  placeholder="Ex: #Terminale, #BACC2026, #Maths, #CoursEnLigne"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-3 bg-slate-800 hover:bg-slate-750 text-slate-300 font-bold text-xs rounded-2xl transition-colors"
                >
                  {isMg ? 'Aoka ihany' : 'Annuler'}
                </button>

                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs rounded-2xl shadow-xl transition-transform active:scale-95 flex items-center justify-center gap-2 border border-amber-300"
                >
                  <Send className="w-4 h-4" />
                  <span>{isMg ? 'Hamoaka amin\'ny Fil' : 'Partager la publication'}</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
