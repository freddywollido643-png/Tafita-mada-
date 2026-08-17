import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  OnlineCourse,
  OnlineCourseCategory,
  TeacherProfile,
  OnlineCourseType
} from '../types';
import {
  Search,
  BookOpen,
  Radio,
  Video,
  Users,
  Star,
  Globe,
  Clock,
  CheckCircle,
  ExternalLink,
  Heart,
  MessageSquare,
  Sparkles,
  Calendar,
  Layers,
  ChevronRight,
  ShieldCheck,
  User,
  Send,
  X,
  Filter,
  Check,
  Award,
  DollarSign,
  AlertCircle
} from 'lucide-react';

const CATEGORIES: { id: OnlineCourseCategory; labelMg: string; labelFr: string; icon: string }[] = [
  { id: 'all', labelMg: 'Rehetra', labelFr: 'Tous les cours', icon: '🌟' },
  { id: 'langues', labelMg: 'Fiteny vahiny', labelFr: 'Langues', icon: '🗣️' },
  { id: 'scolaires', labelMg: 'Taranja an-tsekoly', labelFr: 'Matières scolaires', icon: '📚' },
  { id: 'professionnel', labelMg: 'Fiofanana asa', labelFr: 'Formation professionnelle', icon: '💼' },
  { id: 'personnel', labelMg: 'Fahaiza-miaina', labelFr: 'Développement personnel', icon: '🌱' },
  { id: 'informatique', labelMg: 'Haikajy / Nomerika', labelFr: 'Informatique / Numérique', icon: '💻' },
  { id: 'entrepreneuriat', labelMg: 'Fandraharahana', labelFr: 'Entrepreneuriat', icon: '🚀' },
  { id: 'autres', labelMg: 'Fiofanana hafa', labelFr: 'Autres formations', icon: '🎨' }
];

const LANGUAGE_FILTERS = [
  { code: 'all', name: 'Toutes les langues', flag: '🌐' },
  { code: 'Anglais', name: 'Anglais', flag: '🇬🇧' },
  { code: 'Français', name: 'Français', flag: '🇫🇷' },
  { code: 'Allemand', name: 'Allemand', flag: '🇩🇪' },
  { code: 'Espagnol', name: 'Espagnol', flag: '🇪🇸' },
  { code: 'Russe', name: 'Russe', flag: '🇷🇺' },
  { code: 'Malagasy', name: 'Malagasy', flag: '🇲🇬' }
];

export const OnlineCourses: React.FC = () => {
  const {
    userProfile,
    onlineCourses,
    teachers,
    favoriteOnlineCourseIds,
    toggleFavoriteOnlineCourse,
    enrollInCourse,
    cancelEnrollment,
    isEnrolledInCourse,
    reserveLiveSession,
    reservations,
    sendDirectMessage
  } = useApp();

  const isMg = userProfile.language === 'mg';

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState<OnlineCourseCategory>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'live' | 'recorded' | 'hybrid'>('all');
  const [pricingFilter, setPricingFilter] = useState<'all' | 'free' | 'paid'>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  // Modals state
  const [activeCourseModal, setActiveCourseModal] = useState<OnlineCourse | null>(null);
  const [activeTeacherModal, setActiveTeacherModal] = useState<TeacherProfile | null>(null);
  const [messageRecipient, setMessageRecipient] = useState<{ teacher: TeacherProfile; course?: OnlineCourse } | null>(null);
  const [messageText, setMessageText] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Filtered Courses
  const filteredCourses = useMemo(() => {
    return onlineCourses.filter(course => {
      // Category
      if (selectedCategory !== 'all' && course.category !== selectedCategory) {
        return false;
      }
      // Language
      if (selectedLanguage !== 'all') {
        if (!course.language.toLowerCase().includes(selectedLanguage.toLowerCase())) {
          return false;
        }
      }
      // Course Type
      if (typeFilter !== 'all' && course.courseType !== typeFilter) {
        return false;
      }
      // Pricing
      if (pricingFilter === 'free' && course.isPaid) return false;
      if (pricingFilter === 'paid' && !course.isPaid) return false;
      // Level
      if (selectedLevel !== 'all' && !course.level.toLowerCase().includes(selectedLevel.toLowerCase())) {
        return false;
      }
      // Search query (title, teacher, subject, description, topics)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = course.title.toLowerCase().includes(q) || (course.titleFr && course.titleFr.toLowerCase().includes(q));
        const matchesTeacher = course.teacherName.toLowerCase().includes(q);
        const matchesSubject = course.subject?.toLowerCase().includes(q);
        const matchesDesc = course.description.toLowerCase().includes(q);
        const matchesTopics = course.topics?.some(t => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesTeacher && !matchesSubject && !matchesDesc && !matchesTopics) {
          return false;
        }
      }
      return true;
    });
  }, [onlineCourses, selectedCategory, selectedLanguage, typeFilter, pricingFilter, selectedLevel, searchQuery]);

  // Handle Enrollment
  const handleEnrollToggle = (course: OnlineCourse) => {
    if (isEnrolledInCourse(course.id)) {
      cancelEnrollment(course.id);
      showToast(isMg ? 'Nofoanana ny fisoratana anarana' : 'Inscription annulée');
    } else {
      enrollInCourse(course);
      showToast(
        isMg
          ? `Voasoratra anarana soa aman-tsara amin'ny "${course.title}" !`
          : `Inscription réussie au cours "${course.title}" !`
      );
    }
  };

  // Handle Live Reservation
  const handleReserve = (course: OnlineCourse) => {
    reserveLiveSession(course);
    showToast(
      isMg
        ? `Voatokana ny toeranao amin'ny Live session !`
        : `Votre place pour la session en direct est réservée !`
    );
  };

  // Handle Send Message
  const handleSendMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageRecipient || !messageText.trim()) return;

    sendDirectMessage(
      messageRecipient.teacher.id,
      messageRecipient.teacher.name,
      messageText,
      messageRecipient.course?.id,
      messageRecipient.course?.title
    );

    showToast(
      isMg
        ? `Lasa ny hafatra ho an'i ${messageRecipient.teacher.name} !`
        : `Message envoyé à ${messageRecipient.teacher.name} !`
    );
    setMessageText('');
    setMessageRecipient(null);
  };

  // Find teacher profile helper
  const getTeacherProfile = (teacherId: string): TeacherProfile | undefined => {
    return teachers.find(t => t.id === teacherId);
  };

  return (
    <div className="space-y-6 pb-24 max-w-7xl mx-auto">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-18 right-4 z-50 bg-emerald-600 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-sm font-medium animate-in fade-in slide-in-from-top-2">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-semibold">
            <Video className="w-3.5 h-3.5" />
            <span>{isMg ? 'Sehatra Fianarana Mivantana' : 'Plateforme de Cours & Formations en Ligne'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            🎥 {isMg ? 'Fampianarana sy Fiofanana an-tserasera' : 'Cours en Ligne & Formations'}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {isMg
              ? 'Mianara miaraka amin\'ireo mpampianatra sy mpampiofana manampahaizana manerana an\'i Madagasikara : Fiteny vahiny, fanadinana BACC & BEPC, asa sy fandraharahana.'
              : 'Apprenez avec des professeurs certifiés et formateurs experts à Madagascar : Langues vivantes, préparation BACC & BEPC, compétences professionnelles et numériques.'}
          </p>
        </div>
      </div>

      {/* Category Pills (Horizontal Scroll on Mobile) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map(cat => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                if (cat.id !== 'langues') {
                  setSelectedLanguage('all');
                }
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 scale-102 font-bold'
                  : 'bg-slate-900/90 text-slate-300 border border-slate-800 hover:border-slate-700 hover:bg-slate-800'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{isMg ? cat.labelMg : cat.labelFr}</span>
            </button>
          );
        })}
      </div>

      {/* Language Pills (Visible if Category is Langues or Always Accessible) */}
      {selectedCategory === 'langues' && (
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-3 flex items-center gap-2 overflow-x-auto">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 mr-1 flex-shrink-0">
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            {isMg ? 'Fisafidianana teny :' : 'Langue :'}
          </span>
          {LANGUAGE_FILTERS.map(lang => {
            const isLangSelected = selectedLanguage === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => setSelectedLanguage(lang.code)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex-shrink-0 cursor-pointer ${
                  isLangSelected
                    ? 'bg-indigo-600 text-white font-bold shadow'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Search & Multi-Filters Toolbar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              isMg
                ? 'Mitadiava fampianarana, taranja, na anaran\'ny mpampianatra...'
                : 'Rechercher un cours, une matière ou un professeur...'
            }
            className="w-full pl-10 pr-10 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Filter Selectors */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 pt-1">
          {/* Format / Type */}
          <div>
            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Format
            </label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:border-amber-400 focus:outline-none"
            >
              <option value="all">{isMg ? 'Endrika rehetra' : 'Tous formats'}</option>
              <option value="live">🎙️ {isMg ? 'Mivantana (Live)' : 'Cours en direct'}</option>
              <option value="recorded">📼 {isMg ? 'Voarakitra' : 'Cours enregistré'}</option>
              <option value="hybrid">🔀 {isMg ? 'Mifangaro (Hybride)' : 'Hybride'}</option>
            </select>
          </div>

          {/* Pricing */}
          <div>
            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              {isMg ? 'Sarany' : 'Tarif'}
            </label>
            <select
              value={pricingFilter}
              onChange={(e) => setPricingFilter(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:border-amber-400 focus:outline-none"
            >
              <option value="all">{isMg ? 'Sarany rehetra' : 'Tous tarifs'}</option>
              <option value="free">🟢 {isMg ? 'Maimaimpoana' : 'Gratuit'}</option>
              <option value="paid">💳 {isMg ? 'Misy sarany' : 'Payant'}</option>
            </select>
          </div>

          {/* Level */}
          <div>
            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              {isMg ? 'Ambaratonga' : 'Niveau'}
            </label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:border-amber-400 focus:outline-none"
            >
              <option value="all">{isMg ? 'Ambaratonga rehetra' : 'Tous niveaux'}</option>
              <option value="Terminale">Terminale (BACC)</option>
              <option value="3e">3ème (BEPC)</option>
              <option value="Débutant">Débutant</option>
              <option value="Intermédiaire">Intermédiaire</option>
            </select>
          </div>

          {/* Count Counter */}
          <div className="flex items-end">
            <div className="w-full py-1.5 px-3 bg-slate-950/60 border border-slate-800/80 rounded-lg text-xs text-slate-400 flex items-center justify-between">
              <span>{isMg ? 'Isan\'ny tolotra :' : 'Résultats :'}</span>
              <span className="font-bold text-amber-400">{filteredCourses.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Catalog Grid */}
      {filteredCourses.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-3">
          <BookOpen className="w-12 h-12 text-slate-600 mx-auto" />
          <p className="text-slate-300 font-semibold text-base">
            {isMg ? 'Tsy misy fampianarana mifanaraka amin\'ny sivana' : 'Aucun cours ne correspond à vos critères'}
          </p>
          <p className="text-slate-500 text-xs max-w-sm mx-auto">
            {isMg ? 'Andramo ovaina ny sivana na ny fikarohana.' : 'Essayez de réinitialiser la recherche ou de changer de catégorie.'}
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedLanguage('all');
              setTypeFilter('all');
              setPricingFilter('all');
              setSelectedLevel('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            {isMg ? 'Avereno amin\'ny voalohany' : 'Réinitialiser les filtres'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCourses.map(course => {
            const isFav = favoriteOnlineCourseIds.includes(course.id);
            const isEnrolled = isEnrolledInCourse(course.id);
            const teacher = getTeacherProfile(course.teacherId);

            return (
              <div
                key={course.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all flex flex-col group"
              >
                {/* Course Cover Image Banner */}
                <div className="relative h-44 bg-slate-800 overflow-hidden">
                  <img
                    src={course.coverImage || 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&auto=format&fit=crop&q=80'}
                    alt={course.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    {/* Distinction Badge */}
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide backdrop-blur-md bg-slate-900/85 text-amber-400 border border-amber-400/30">
                      <span>👨‍🏫</span>
                      <span>{isMg ? 'Mpanabe' : 'Contenu enseignant'}</span>
                    </span>

                    {/* Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavoriteOnlineCourse(course.id);
                      }}
                      className={`p-1.5 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                        isFav
                          ? 'bg-rose-500 text-white scale-110'
                          : 'bg-slate-900/70 text-slate-300 hover:text-rose-400 hover:bg-slate-900'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Bottom Format & Pricing Overlay */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs">
                    {/* Course Type Pill */}
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-slate-900/90 text-slate-200 font-medium backdrop-blur-sm border border-slate-700/60 text-[11px]">
                      {course.courseType === 'live' ? (
                        <>
                          <Radio className="w-3 h-3 text-red-400 animate-pulse" />
                          <span>Direct Live</span>
                        </>
                      ) : course.courseType === 'recorded' ? (
                        <>
                          <Video className="w-3 h-3 text-sky-400" />
                          <span>Enregistré</span>
                        </>
                      ) : (
                        <>
                          <Layers className="w-3 h-3 text-amber-400" />
                          <span>Hybride</span>
                        </>
                      )}
                    </span>

                    {/* Pricing Badge */}
                    <span
                      className={`px-2.5 py-0.5 rounded-lg font-bold text-[11px] backdrop-blur-sm ${
                        course.isPaid
                          ? 'bg-amber-500/90 text-slate-950'
                          : 'bg-emerald-600/90 text-white'
                      }`}
                    >
                      {course.isPaid
                        ? `${(course.priceAriary || 0).toLocaleString()} Ar`
                        : (isMg ? 'Maimaimpoana' : 'Gratuit')}
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    {/* Category & Level Badges */}
                    <div className="flex items-center gap-2 flex-wrap text-[11px]">
                      <span className="text-amber-400 font-semibold uppercase tracking-wider">
                        {course.subject || course.category}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-400">
                        {course.level} {course.series && course.series !== 'Toutes' ? `(${course.series})` : ''}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-400">🗣️ {course.language}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-slate-100 group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
                      {course.title}
                    </h3>

                    {/* Description preview */}
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  {/* Teacher & Stats Meta Footer */}
                  <div className="pt-3 border-t border-slate-800/80 space-y-3">
                    <div className="flex items-center justify-between">
                      {/* Teacher Profile Snapshot */}
                      <button
                        onClick={() => {
                          if (teacher) {
                            setActiveTeacherModal(teacher);
                          }
                        }}
                        className="flex items-center gap-2 hover:opacity-80 transition-opacity text-left cursor-pointer"
                      >
                        <img
                          src={course.teacherPhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'}
                          alt={course.teacherName}
                          referrerPolicy="no-referrer"
                          className="w-7 h-7 rounded-full object-cover border border-amber-400/40"
                        />
                        <div>
                          <div className="text-xs font-semibold text-slate-200 line-clamp-1">
                            {course.teacherName}
                          </div>
                          <div className="text-[10px] text-slate-400 line-clamp-1">
                            {course.teacherRole || (isMg ? 'Mpanabe' : 'Enseignant')}
                          </div>
                        </div>
                      </button>

                      {/* Rating & Students */}
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-xs text-amber-400 font-bold justify-end">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span>{course.rating || 4.8}</span>
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {course.studentsCount} {isMg ? 'mpianatra' : 'élèves'}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => setActiveCourseModal(course)}
                        className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-all text-center cursor-pointer"
                      >
                        {isMg ? 'Hijery ny fampianarana' : 'Voir le cours'}
                      </button>

                      <button
                        onClick={() => handleEnrollToggle(course)}
                        className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          isEnrolled
                            ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/40'
                            : course.isPaid
                            ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/10'
                            : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                        }`}
                      >
                        {isEnrolled ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>{isMg ? 'Efa voasoratra' : 'Inscrit'}</span>
                          </>
                        ) : course.isPaid ? (
                          <span>{isMg ? 'Handray anjara' : 'S\'inscrire'}</span>
                        ) : (
                          <span>{isMg ? 'Hiditra' : 'Rejoindre'}</span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. COURSE DETAIL MODAL */}
      {/* ========================================================================= */}
      {activeCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95">
            
            {/* Modal Top Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap text-xs">
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-400/10 border border-amber-400/30 text-amber-400 font-semibold">
                    👨‍🏫 {isMg ? 'Contenu Enseignant' : 'Contenu Enseignant (Non officiel MEN)'}
                  </span>
                  <span className="text-slate-400 font-medium">
                    {activeCourseModal.level} • {activeCourseModal.language}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-100">
                  {activeCourseModal.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveCourseModal(null)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cover & Live Schedule Box */}
            {activeCourseModal.liveSchedule && (
              <div className="bg-slate-950 border border-indigo-500/30 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-indigo-400 font-bold">
                  <span className="flex items-center gap-1.5">
                    <Radio className="w-4 h-4 text-red-400 animate-pulse" />
                    {isMg ? 'Fivoriana mivantana (Session Live) :' : 'Session Live programmée :'}
                  </span>
                  <span>{activeCourseModal.liveSchedule.maxParticipants} max</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>{activeCourseModal.liveSchedule.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>{activeCourseModal.liveSchedule.startTime} - {activeCourseModal.liveSchedule.endTime}</span>
                  </div>
                </div>
                {activeCourseModal.externalMeetingUrl && (
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">
                      {isMg ? 'Lien fidirana amin\'ny fampianarana :' : 'Lien de la classe virtuelle :'}
                    </span>
                    <a
                      href={activeCourseModal.externalMeetingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-amber-400 hover:underline font-semibold"
                    >
                      <span>Google Meet / Zoom</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {isMg ? 'Famaritana ny fampianarana' : 'Description du cours'}
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                {activeCourseModal.description}
              </p>
            </div>

            {/* Topics / Objectives (for Language or School courses) */}
            {activeCourseModal.topics && activeCourseModal.topics.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {isMg ? 'Tanjona sy fahaiza-manao hianarana' : 'Objectifs & Compétences visées'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeCourseModal.topics.map((t, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300 bg-slate-950/60 p-2 rounded-xl border border-slate-800">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Program / Chapters */}
            {activeCourseModal.chapters && activeCourseModal.chapters.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {isMg ? 'Fandaharana / Toko' : 'Programme / Chapitres'}
                </h4>
                <div className="space-y-2">
                  {activeCourseModal.chapters.map((ch, idx) => (
                    <div key={ch.id || idx} className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                      <div className="space-y-0.5">
                        <div className="font-semibold text-slate-200">
                          {ch.title}
                        </div>
                        {ch.description && (
                          <div className="text-[11px] text-slate-400">{ch.description}</div>
                        )}
                      </div>
                      {ch.duration && (
                        <span className="text-[10px] text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full font-mono font-medium">
                          {ch.duration}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Teacher Snapshot in Modal */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={activeCourseModal.teacherPhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'}
                  alt={activeCourseModal.teacherName}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border border-amber-400"
                />
                <div>
                  <div className="text-sm font-bold text-slate-200">
                    {activeCourseModal.teacherName}
                  </div>
                  <div className="text-xs text-slate-400">
                    {activeCourseModal.teacherRole || 'Professeur & Formateur'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const prof = getTeacherProfile(activeCourseModal.teacherId);
                    if (prof) {
                      setMessageRecipient({ teacher: prof, course: activeCourseModal });
                    }
                  }}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{isMg ? 'Hiresaka' : 'Contacter'}</span>
                </button>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-2 flex items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                  {isMg ? 'Sarany' : 'Tarif'}
                </div>
                <div className="text-lg font-black text-amber-400">
                  {activeCourseModal.isPaid
                    ? `${(activeCourseModal.priceAriary || 0).toLocaleString()} Ar`
                    : (isMg ? 'Maimaimpoana' : 'Gratuit')}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {activeCourseModal.courseType === 'live' && (
                  <button
                    onClick={() => {
                      handleReserve(activeCourseModal);
                      setActiveCourseModal(null);
                    }}
                    className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    {isMg ? 'Hamandrika toerana (Réserver)' : 'Réserver une place'}
                  </button>
                )}

                <button
                  onClick={() => {
                    handleEnrollToggle(activeCourseModal);
                    setActiveCourseModal(null);
                  }}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isEnrolledInCourse(activeCourseModal.id)
                      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      : activeCourseModal.isPaid
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  }`}
                >
                  {isEnrolledInCourse(activeCourseModal.id)
                    ? (isMg ? 'Hanafoana ny fandraisana anjara' : 'Annuler l\'inscription')
                    : (isMg ? 'Hiditra amin\'ny fampianarana' : 'Rejoindre le cours')}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. TEACHER PROFILE MODAL */}
      {/* ========================================================================= */}
      {activeTeacherModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full shadow-2xl p-6 sm:p-8 space-y-5 animate-in fade-in zoom-in-95">
            
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={activeTeacherModal.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'}
                  alt={activeTeacherModal.name}
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-400"
                />
                <div>
                  <h3 className="text-lg font-black text-slate-100">
                    {activeTeacherModal.name}
                  </h3>
                  <div className="text-xs text-amber-400 font-semibold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{activeTeacherModal.rating || 4.9} / 5.0</span>
                    <span className="text-slate-400 font-normal">({activeTeacherModal.studentsCount} élèves)</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setActiveTeacherModal(null)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Bio */}
            <div className="space-y-1 text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80">
              <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">
                {isMg ? 'Momba ny mpampianatra :' : 'Biographie :'}
              </span>
              <p>{activeTeacherModal.biography}</p>
            </div>

            {/* Experience & Subjects */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-400 font-semibold uppercase">{isMg ? 'Taranja' : 'Matières'}</div>
                <div className="font-bold text-slate-200 mt-0.5">{activeTeacherModal.subjects.join(', ')}</div>
              </div>
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-400 font-semibold uppercase">{isMg ? 'Fiteny' : 'Langues'}</div>
                <div className="font-bold text-slate-200 mt-0.5">{activeTeacherModal.languages.join(', ')}</div>
              </div>
            </div>

            <div className="text-xs text-slate-400 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>{activeTeacherModal.experience}</span>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setSearchQuery(activeTeacherModal.name);
                  setActiveTeacherModal(null);
                }}
                className="py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-colors text-center cursor-pointer"
              >
                {isMg ? 'Hijery ny fampianarany' : 'Voir ses cours'}
              </button>

              <button
                onClick={() => {
                  setMessageRecipient({ teacher: activeTeacherModal });
                  setActiveTeacherModal(null);
                }}
                className="py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{isMg ? 'Handefa hafatra' : 'Contacter'}</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. DIRECT MESSAGING MODAL (Student <-> Teacher) */}
      {/* ========================================================================= */}
      {messageRecipient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full shadow-2xl p-6 space-y-4 animate-in fade-in zoom-in-95">
            
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-amber-400" />
                  <span>{isMg ? 'Handefa hafatra ho an\'i' : 'Contacter'} {messageRecipient.teacher.name}</span>
                </h3>
                {messageRecipient.course && (
                  <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                    {isMg ? 'Momba ny :' : 'À propos de :'} {messageRecipient.course.title}
                  </p>
                )}
              </div>
              <button
                onClick={() => setMessageRecipient(null)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSendMessageSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  {isMg ? 'Hafatrao :' : 'Votre message :'}
                </label>
                <textarea
                  rows={4}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder={
                    isMg
                      ? 'Manahoana tompoko, te hahazo fanazavana fanampiny momba ny fampianarana aho...'
                      : 'Bonjour professeur, j\'aimerais avoir plus d\'informations sur votre cours...'
                  }
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setMessageRecipient(null)}
                  className="px-4 py-2 bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-semibold rounded-xl cursor-pointer"
                >
                  {isMg ? 'Hanafoana' : 'Annuler'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-lg shadow-amber-500/10"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isMg ? 'Handefa' : 'Envoyer'}</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

