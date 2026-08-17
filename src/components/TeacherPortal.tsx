import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Lesson,
  Exercise,
  Quiz,
  BacPaper,
  Level,
  Series,
  SubjectId,
  TeacherContentType,
  TeacherDraft,
  OnlineCourse,
  OnlineCourseCategory,
  OnlineCourseType
} from '../types';
import { SUBJECTS } from '../data/mockDatabase';
import { storageService } from '../services/storageService';
import {
  Plus,
  CheckCircle,
  FileText,
  Send,
  Save,
  Trash2,
  Edit3,
  BookOpen,
  HelpCircle,
  Award,
  Sparkles,
  Layers,
  GraduationCap,
  ChevronDown,
  Info,
  Check,
  Eye,
  Video,
  Radio,
  Clock,
  Calendar,
  DollarSign,
  Globe,
  ExternalLink,
  MessageSquare,
  Users
} from 'lucide-react';

export const TeacherPortal: React.FC = () => {
  const {
    userProfile,
    addCustomLesson,
    addCustomExercise,
    addCustomQuiz,
    addCustomBacPaper,
    lessons,
    exercises,
    quizzes,
    bacPapers,
    onlineCourses,
    addOnlineCourse,
    deleteOnlineCourse,
    enrollments,
    reservations,
    directMessages
  } = useApp();

  const isMg = userProfile.language === 'mg';

  // Active Management Section Tab
  const [activeSection, setActiveSection] = useState<'content' | 'online-course' | 'my-courses' | 'messages'>('content');

  // Toggle form visibility
  const [isFormOpen, setIsFormOpen] = useState(true);

  // Standard Content Form State
  const [contentType, setContentType] = useState<TeacherContentType>('cours');
  const [level, setLevel] = useState<Level>('Terminale');
  const [series, setSeries] = useState<Series>('OSE');
  const [subjectId, setSubjectId] = useState<SubjectId>('ses');
  const [chapterTitle, setChapterTitle] = useState('');
  const [title, setTitle] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [mainContent, setMainContent] = useState('');
  const [summaryOrSolution, setSummaryOrSolution] = useState('');

  // Online Course Form State
  const [ocTitle, setOcTitle] = useState('');
  const [ocCategory, setOcCategory] = useState<OnlineCourseCategory>('langues');
  const [ocLanguage, setOcLanguage] = useState('Français');
  const [ocCourseType, setOcCourseType] = useState<OnlineCourseType>('live');
  const [ocLevel, setOcLevel] = useState('Tous niveaux');
  const [ocSeries, setOcSeries] = useState('Toutes');
  const [ocSubject, setOcSubject] = useState('');
  const [ocDescription, setOcDescription] = useState('');
  const [ocIsPaid, setOcIsPaid] = useState(false);
  const [ocPriceAriary, setOcPriceAriary] = useState(15000);
  const [ocCoverImage, setOcCoverImage] = useState('');
  const [ocTopics, setOcTopics] = useState('');
  const [ocDate, setOcDate] = useState('');
  const [ocStartTime, setOcStartTime] = useState('14:00');
  const [ocEndTime, setOcEndTime] = useState('15:30');
  const [ocMaxParticipants, setOcMaxParticipants] = useState(30);
  const [ocMeetingUrl, setOcMeetingUrl] = useState('https://meet.google.com/');

  // Drafts state
  const [drafts, setDrafts] = useState<TeacherDraft[]>(() => storageService.getTeacherDrafts());
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'info'; text: string; details?: string } | null>(null);

  const showStatus = (text: string, details?: string, type: 'success' | 'info' = 'success') => {
    setStatusMessage({ type, text, details });
    setTimeout(() => setStatusMessage(null), 5000);
  };

  // Reset standard form
  const resetForm = () => {
    setTitle('');
    setChapterTitle('');
    setIntroduction('');
    setMainContent('');
    setSummaryOrSolution('');
  };

  // Reset online course form
  const resetOnlineCourseForm = () => {
    setOcTitle('');
    setOcSubject('');
    setOcDescription('');
    setOcTopics('');
    setOcCoverImage('');
    setOcMeetingUrl('https://meet.google.com/');
  };

  // Save as draft to storageService
  const handleSaveDraft = () => {
    if (!title && !mainContent) {
      showStatus(
        isMg ? 'Mila lohanteny na votoatiny farafahakeliny' : 'Veuillez renseigner au moins un titre ou du contenu',
        undefined,
        'info'
      );
      return;
    }

    const draft: TeacherDraft = {
      id: `draft-${Date.now()}`,
      type: contentType,
      level,
      series: level === 'Terminale' || level === 'Première' ? series : 'Toutes',
      subjectId,
      chapterTitle: chapterTitle || (isMg ? 'Toko tsy misy lohanteny' : 'Chapitre sans titre'),
      title: title || (isMg ? 'Brouillon tsy misy lohanteny' : 'Brouillon sans titre'),
      content: mainContent,
      summary: summaryOrSolution,
      question: mainContent,
      correction: summaryOrSolution,
      savedAt: new Date().toISOString()
    };

    storageService.saveTeacherDraft(draft);
    setDrafts(storageService.getTeacherDrafts());

    const subjectMeta = SUBJECTS.find(s => s.id === subjectId);
    showStatus(
      isMg ? 'Voatahiry soa aman-tsara ao amin\'ny Brouillons !' : 'Brouillon enregistré avec succès !',
      `${level} • ${level === 'Terminale' ? `Série ${series} • ` : ''}${subjectMeta?.nameFr || subjectId.toUpperCase()} • "${draft.title}"`,
      'success'
    );
  };

  // Load a draft into the form
  const handleLoadDraft = (draft: TeacherDraft) => {
    setContentType(draft.type);
    setLevel(draft.level);
    setSeries(draft.series);
    setSubjectId(draft.subjectId);
    setChapterTitle(draft.chapterTitle || '');
    setTitle(draft.title);
    setMainContent(draft.content || draft.question || '');
    setSummaryOrSolution(draft.summary || draft.correction || '');
    setIsFormOpen(true);
    setActiveSection('content');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete draft
  const handleDeleteDraft = (draftId: string) => {
    storageService.deleteTeacherDraft(draftId);
    setDrafts(storageService.getTeacherDrafts());
    showStatus(isMg ? 'Voafafa ilay brouillon' : 'Brouillon supprimé', undefined, 'info');
  };

  // Publish Standard Content
  const handlePublishStandardContent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !mainContent.trim()) {
      showStatus(isMg ? 'Fenoy ny lohanteny sy ny votoatiny' : 'Veuillez remplir le titre et le contenu', undefined, 'info');
      return;
    }

    const currentSeries: Series = level === 'Terminale' || level === 'Première' ? series : 'Toutes';

    if (contentType === 'cours') {
      const newLesson: Lesson = {
        id: `lesson-t-${Date.now()}`,
        level,
        seriesList: [currentSeries],
        subjectId,
        chapterId: `chap-${Date.now()}`,
        chapterTitle: chapterTitle || title,
        title,
        titleFr: title,
        estimatedMinutes: 45,
        content: {
          introduction: introduction || 'Fampidirana ny lesona.',
          objectives: introduction ? [introduction] : ['Mahafehy ny lesona'],
          definitions: [],
          examples: [],
          mainText: mainContent,
          summary: summaryOrSolution || ''
        },
        teacherCreated: true,
        isApproved: true
      };
      addCustomLesson(newLesson);
    } else if (contentType === 'exercice') {
      const newEx: Exercise = {
        id: `ex-t-${Date.now()}`,
        lessonId: `lesson-t-${Date.now()}`,
        level,
        seriesList: [currentSeries],
        subjectId,
        title,
        question: mainContent,
        type: 'open',
        correctAnswer: summaryOrSolution || 'Valiny ofisialy',
        stepByStepCorrection: summaryOrSolution ? [summaryOrSolution] : ['Dingana voalohany amin\'ny famahana.'],
        explanation: introduction || 'Fanazavana feno.',
        difficulty: 'medium',
        teacherCreated: true,
        isApproved: true
      };
      addCustomExercise(newEx);
    } else if (contentType === 'quiz') {
      const newQuiz: Quiz = {
        id: `quiz-t-${Date.now()}`,
        level,
        seriesList: [currentSeries],
        subjectId,
        title,
        durationMinutes: 15,
        questions: [
          {
            id: `q-${Date.now()}-1`,
            question: mainContent,
            options: [
              summaryOrSolution || 'Safidy marina (A)',
              'Safidy faharoa (B)',
              'Safidy fahatelo (C)',
              'Safidy fahefatra (D)'
            ],
            correctOptionIndex: 0,
            explanation: introduction || 'Fanazavana ny valiny marina.'
          }
        ]
      };
      addCustomQuiz(newQuiz);
    } else if (contentType === 'bac') {
      const newBac: BacPaper = {
        id: `bac-t-${Date.now()}`,
        year: 2026,
        level,
        series: currentSeries,
        subjectId,
        title,
        examType: level === '3e' ? 'BEPC' : 'BAC',
        paperText: mainContent,
        correctionText: summaryOrSolution || 'Corrigé officiel en cours.',
        difficulty: 'medium'
      };
      addCustomBacPaper(newBac);
    }

    showStatus(
      isMg ? 'Tafavoaka soa aman-tsara ny votoatiny !' : 'Contenu publié avec succès !',
      `${level} • Série ${currentSeries} • "${title}"`
    );
    resetForm();
  };

  // Publish Online Course
  const handlePublishOnlineCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ocTitle.trim() || !ocDescription.trim()) {
      showStatus(isMg ? 'Fenoy ny lohanteny sy ny famaritana' : 'Veuillez remplir le titre et la description', undefined, 'info');
      return;
    }

    const topicsArray = ocTopics
      .split('\n')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const newCourse: OnlineCourse = {
      id: `oc-${Date.now()}`,
      title: ocTitle,
      category: ocCategory,
      subject: ocSubject || ocCategory,
      level: ocLevel,
      series: ocSeries,
      language: ocLanguage,
      teacherId: userProfile.id,
      teacherName: userProfile.name,
      teacherRole: 'Mpanabe & Mpampiofana',
      teacherPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      description: ocDescription,
      courseType: ocCourseType,
      isPaid: ocIsPaid,
      priceAriary: ocIsPaid ? ocPriceAriary : 0,
      currency: 'MGA',
      duration: '45 min',
      studentsCount: 0,
      rating: 5.0,
      ratingCount: 1,
      coverImage: ocCoverImage || 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&auto=format&fit=crop&q=80',
      chapters: [
        {
          id: `chap-${Date.now()}-1`,
          title: 'Module 1 : Fampidirana sy Fototra',
          duration: '20 min',
          description: 'Fandinihana ireo hevi-dehibe sy fampiharana voalohany'
        }
      ],
      topics: topicsArray.length > 0 ? topicsArray : ['Fampidirana', 'Lesona fototra', 'Fampiharana'],
      liveSchedule: ocCourseType === 'live' ? {
        date: ocDate || new Date().toISOString().slice(0, 10),
        startTime: ocStartTime,
        endTime: ocEndTime,
        maxParticipants: ocMaxParticipants,
        meetingUrl: ocMeetingUrl
      } : undefined,
      externalMeetingUrl: ocMeetingUrl,
      isTeacherCreated: true,
      createdAt: new Date().toISOString(),
      status: 'published'
    };

    addOnlineCourse(newCourse);
    showStatus(
      isMg ? 'Tafavoaka soa aman-tsara ny fampianarana an-tserasera !' : 'Cours en ligne publié avec succès !',
      `"${newCourse.title}" • ${newCourse.category} • ${newCourse.language}`
    );
    resetOnlineCourseForm();
    setActiveSection('my-courses');
  };

  // Filter teacher's own published online courses
  const myOnlineCourses = onlineCourses.filter(c => c.teacherId === userProfile.id || c.isTeacherCreated);

  return (
    <div className="space-y-6 pb-24 max-w-5xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-black flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                {isMg ? 'Espace Mpampianatra & Mpanabe' : 'Espace Enseignant & Formateur'}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-bold">
                👨‍🏫 {userProfile.name}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white">
              {isMg ? '✍️ Famoahana Votoatiny & Fampianarana an-tserasera' : '✍️ Création de Contenus & Cours en Ligne'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              {isMg
                ? 'Mamorona lesona, fanazaran-tena na tolotra fampianarana an-tserasera (Live, horonantsary, fiteny vahiny).'
                : 'Publiez des cours scolaires, des exercices ou proposez de vraies formations en ligne (Langues, séances live, ateliers professionnels).'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-3 text-center min-w-[120px]">
              <span className="text-xl font-black text-amber-400">{myOnlineCourses.length}</span>
              <p className="text-[10px] text-slate-400 font-bold uppercase">{isMg ? 'Cours en ligne' : 'Cours créés'}</p>
            </div>
            <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-3 text-center min-w-[120px]">
              <span className="text-xl font-black text-indigo-400">{enrollments.length}</span>
              <p className="text-[10px] text-slate-400 font-bold uppercase">{isMg ? 'Mpianatra' : 'Inscriptions'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveSection('content')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeSection === 'content'
              ? 'bg-amber-500 text-slate-950 font-black shadow-md'
              : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>{isMg ? 'Lesona & Fanazaran-tena' : 'Cours & Exercices (MEN)'}</span>
        </button>

        <button
          onClick={() => setActiveSection('online-course')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeSection === 'online-course'
              ? 'bg-amber-500 text-slate-950 font-black shadow-md'
              : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
          }`}
        >
          <Video className="w-3.5 h-3.5" />
          <span>{isMg ? '+ Hamorona Cours en Ligne' : '+ Proposer un cours en ligne'}</span>
        </button>

        <button
          onClick={() => setActiveSection('my-courses')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeSection === 'my-courses'
              ? 'bg-amber-500 text-slate-950 font-black shadow-md'
              : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{isMg ? 'Ireo fampianarako' : 'Mes cours en ligne'} ({myOnlineCourses.length})</span>
        </button>

        <button
          onClick={() => setActiveSection('messages')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeSection === 'messages'
              ? 'bg-amber-500 text-slate-950 font-black shadow-md'
              : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>{isMg ? 'Hafatra voaray' : 'Messages reçus'} ({directMessages.length})</span>
        </button>
      </div>

      {/* Status Banner */}
      {statusMessage && (
        <div
          className={`p-4 rounded-2xl border text-xs font-medium flex items-center gap-3 animate-in fade-in slide-in-from-top-2 ${
            statusMessage.type === 'success'
              ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
              : 'bg-blue-950/60 border-blue-500/40 text-blue-300'
          }`}
        >
          <CheckCircle className="w-5 h-5 flex-shrink-0 text-emerald-400" />
          <div className="space-y-0.5">
            <div className="font-bold">{statusMessage.text}</div>
            {statusMessage.details && <div className="text-[11px] opacity-80">{statusMessage.details}</div>}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. FORM TO PROPOSE AN ONLINE COURSE (PHASE 6) */}
      {/* ========================================================================= */}
      {activeSection === 'online-course' && (
        <form onSubmit={handlePublishOnlineCourse} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <Video className="w-5 h-5 text-amber-400" />
              <span>{isMg ? 'Hamorona tolotra Fampianarana an-tserasera' : 'Créer et publier un cours en ligne'}</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {isMg
                ? 'Ampidiro ny antsipiriany : Taranja, sokajy, sarany, fiteny, ary ny rohy fidirana amin\'ny live session (Google Meet / Zoom).'
                : 'Renseignez les détails : Catégorie, tarif en Ariary, langue enseignée, et le lien de visioconférence externe.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Title */}
            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-bold text-slate-300 block">
                {isMg ? 'Lohanteny fampianarana :' : 'Titre du cours en ligne :'} <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={ocTitle}
                onChange={e => setOcTitle(e.target.value)}
                placeholder="Ex: Anglais pour Débutants (A1-A2) / Préparation Intensive BACC Maths"
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Category */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 block">
                {isMg ? 'Sokajy :' : 'Catégorie :'}
              </label>
              <select
                value={ocCategory}
                onChange={e => setOcCategory(e.target.value as OnlineCourseCategory)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option value="langues">🗣️ Langues (Fiteny vahiny)</option>
                <option value="scolaires">📚 Matières scolaires</option>
                <option value="professionnel">💼 Formation professionnelle</option>
                <option value="personnel">🌱 Développement personnel</option>
                <option value="informatique">💻 Informatique / Numérique</option>
                <option value="entrepreneuriat">🚀 Entrepreneuriat</option>
                <option value="autres">🎨 Autres formations</option>
              </select>
            </div>

            {/* Language */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 block">
                {isMg ? 'Fiteny ampianarana :' : 'Langue d\'enseignement :'}
              </label>
              <select
                value={ocLanguage}
                onChange={e => setOcLanguage(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option value="Français">🇫🇷 Français</option>
                <option value="Anglais">🇬🇧 Anglais</option>
                <option value="Malagasy">🇲🇬 Malagasy</option>
                <option value="Allemand">🇩🇪 Allemand</option>
                <option value="Espagnol">🇪🇸 Espagnol</option>
                <option value="Russe">🇷🇺 Russe</option>
              </select>
            </div>

            {/* Format / Course Type */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 block">
                Format
              </label>
              <select
                value={ocCourseType}
                onChange={e => setOcCourseType(e.target.value as OnlineCourseType)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option value="live">🎙️ Direct (Session Live)</option>
                <option value="recorded">📼 Enregistré (Vidéo)</option>
                <option value="hybrid">🔀 Hybride (Live + Vidéo)</option>
              </select>
            </div>

            {/* Level */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 block">
                {isMg ? 'Ambaratonga :' : 'Niveau ciblé :'}
              </label>
              <select
                value={ocLevel}
                onChange={e => setOcLevel(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option value="Tous niveaux">Tous niveaux</option>
                <option value="Débutant">Débutant</option>
                <option value="Intermédiaire">Intermédiaire</option>
                <option value="Avancé">Avancé</option>
                <option value="Terminale">Terminale (BACC)</option>
                <option value="3e">3ème (BEPC)</option>
              </select>
            </div>
          </div>

          {/* Pricing Config */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-200 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-amber-400" />
                <span>{isMg ? 'Sarany (Tarif du cours) :' : 'Modèle de tarification :'}</span>
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setOcIsPaid(false)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    !ocIsPaid ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  🟢 {isMg ? 'Maimaimpoana' : 'Gratuit'}
                </button>
                <button
                  type="button"
                  onClick={() => setOcIsPaid(true)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    ocIsPaid ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  💳 {isMg ? 'Misy sarany' : 'Payant'}
                </button>
              </div>
            </div>

            {ocIsPaid && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                    {isMg ? 'Sarany amin\'ny Ariary :' : 'Prix du cours en Ariary (Ar) :'}
                  </label>
                  <input
                    type="number"
                    value={ocPriceAriary}
                    onChange={e => setOcPriceAriary(Number(e.target.value))}
                    step={1000}
                    min={1000}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-amber-400 font-bold focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div className="text-[11px] text-slate-400 flex items-center">
                  💡 {isMg ? 'Marihina : Aseho ny sarany ary ny fifandraisana dia mivantana amin\'ny mpampianatra.' : 'Affichage transparent du prix. Inscription enregistrée localement sans passerelle bancaire fictive.'}
                </div>
              </div>
            )}
          </div>

          {/* Live Schedule (If Live or Hybrid) */}
          {(ocCourseType === 'live' || ocCourseType === 'hybrid') && (
            <div className="bg-slate-950/80 border border-indigo-500/30 rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-400">
                <Radio className="w-4 h-4 text-red-400 animate-pulse" />
                <span>{isMg ? 'Fandaharam-potoana Live Session :' : 'Planification de la classe virtuelle :'}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Date :</label>
                  <input
                    type="date"
                    value={ocDate}
                    onChange={e => setOcDate(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Début :</label>
                  <input
                    type="time"
                    value={ocStartTime}
                    onChange={e => setOcStartTime(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Fin :</label>
                  <input
                    type="time"
                    value={ocEndTime}
                    onChange={e => setOcEndTime(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Max élèves :</label>
                  <input
                    type="number"
                    value={ocMaxParticipants}
                    onChange={e => setOcMaxParticipants(Number(e.target.value))}
                    min={5}
                    max={100}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 text-xs block mb-1">
                  {isMg ? 'Rohy Google Meet / Zoom :' : 'Lien visioconférence externe (Google Meet / Zoom) :'}
                </label>
                <input
                  type="url"
                  value={ocMeetingUrl}
                  onChange={e => setOcMeetingUrl(e.target.value)}
                  placeholder="https://meet.google.com/abc-defg-hij"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-xs text-slate-200 font-mono"
                />
              </div>
            </div>
          )}

          {/* Description */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300 block">
              {isMg ? 'Famaritana ny fampianarana :' : 'Description détaillée du cours :'} <span className="text-rose-400">*</span>
            </label>
            <textarea
              rows={4}
              value={ocDescription}
              onChange={e => setOcDescription(e.target.value)}
              placeholder="Hazavao ny vontoatiny, ny fomba fampianarana ary ny zavatra ho azon'ny mpianatra..."
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Topics / Competencies */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300 block">
              {isMg ? 'Lohahevitra & Fahaiza-manao (Andalana iray isaky ny lohahevitra) :' : 'Points abordés / Compétences (Une ligne par élément) :'}
            </label>
            <textarea
              rows={3}
              value={ocTopics}
              onChange={e => setOcTopics(e.target.value)}
              placeholder={"Grammaire et vocabulaire usuel\nExpression orale et prononciation\nExercices pratiques et mises en situation"}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={resetOnlineCourseForm}
              className="px-4 py-2.5 bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-semibold rounded-xl cursor-pointer"
            >
              {isMg ? 'Hamafa' : 'Réinitialiser'}
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{isMg ? '+ Hamoaka ny cours en ligne' : '+ Publier le cours en ligne'}</span>
            </button>
          </div>
        </form>
      )}

      {/* ========================================================================= */}
      {/* 2. FORM TO PUBLISH STANDARD LESSON / EXERCISE / QUIZ / BACC */}
      {/* ========================================================================= */}
      {activeSection === 'content' && (
        <form onSubmit={handlePublishStandardContent} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-amber-400" />
              <span>{isMg ? '+ Hamoaka votoatiny fampianarana (Classe, Série & Matière)' : '+ Publier un contenu pédagogique'}</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {isMg
                ? 'Fidio ny Kilasy, ny Série (ho an\'ny Terminale/1ère), ary ny Taranja alohan\'ny hamonjena.'
                : 'Sélectionnez obligatoirement la Classe, la Série (pour Terminale/1ère) et la Matière avant de sauvegarder.'}
            </p>
          </div>

          {/* Type Selector */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300 block">
              {isMg ? 'Karazana votoatiny :' : 'Type de contenu :'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'cours' as const, label: '📚 Cours / Leçon' },
                { id: 'exercice' as const, label: '✍️ Exercice' },
                { id: 'quiz' as const, label: '❓ Quiz' },
                { id: 'bac' as const, label: '🎓 Sujet BACC' }
              ].map(t => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setContentType(t.id)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    contentType === t.id
                      ? 'bg-amber-500 text-slate-950 font-black'
                      : 'bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Level, Series & Subject */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Level */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 block">
                {isMg ? 'Kilasy / Ambaratonga :' : 'Classe / Niveau :'} <span className="text-rose-400">*</span>
              </label>
              <select
                value={level}
                onChange={e => setLevel(e.target.value as Level)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option value="Terminale">Terminale (Lycée)</option>
                <option value="Première">Première (Lycée)</option>
                <option value="Seconde">Seconde (Lycée)</option>
                <option value="3e">3ème (Collège - BEPC)</option>
                <option value="4e">4ème (Collège)</option>
                <option value="5e">5ème (Collège)</option>
                <option value="6e">6ème (Collège)</option>
              </select>
            </div>

            {/* Series */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 block">
                {isMg ? 'Série / Lalam-piofanana :' : 'Série (Lycée) :'}
              </label>
              <select
                value={series}
                onChange={e => setSeries(e.target.value as Series)}
                disabled={level !== 'Terminale' && level !== 'Première'}
                className={`w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400 ${
                  level !== 'Terminale' && level !== 'Première' ? 'opacity-40 cursor-not-allowed' : ''
                }`}
              >
                <option value="OSE">Série OSE (Organisation - Société - Économie)</option>
                <option value="S">Série S (Scientifique)</option>
                <option value="L">Série L (Littéraire)</option>
                <option value="A">Série A (Lettres)</option>
                <option value="C">Série C (Maths & Sciences Physiques)</option>
                <option value="D">Série D (Sciences Naturelles & Chimie)</option>
                <option value="Technique">Série Technique & Tertiaire</option>
                <option value="Toutes">Toutes les séries</option>
              </select>
            </div>

            {/* Subject */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 block">
                {isMg ? 'Taranja :' : 'Matière :'} <span className="text-rose-400">*</span>
              </label>
              <select
                value={subjectId}
                onChange={e => setSubjectId(e.target.value as SubjectId)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                {SUBJECTS.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.nameFr} ({s.nameMg})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Chapter Title & Title */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 block">
                {isMg ? 'Lohantokony (Chapitre) :' : 'Titre du chapitre :'}
              </label>
              <input
                type="text"
                value={chapterTitle}
                onChange={e => setChapterTitle(e.target.value)}
                placeholder="Ex: Toko 1 : Ny Tsena sy ny Fifanakalozana..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 block">
                {isMg ? 'Lohanteny (Titre du contenu) :' : 'Titre de la leçon / épreuve :'} <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Ex: Fandaminana ny Tsena sy ny Vidy..."
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300 block">
              {contentType === 'cours'
                ? isMg ? 'Votoatin\'ny lesona (Markdown supporté) :' : 'Corps du cours (Markdown supporté) :'
                : isMg ? 'Laza olana (Énoncé) :' : 'Énoncé de l\'exercice / sujet :'} <span className="text-rose-400">*</span>
            </label>
            <textarea
              rows={6}
              value={mainContent}
              onChange={e => setMainContent(e.target.value)}
              placeholder="Soraty eto ny fanazavana, formulas, ohatra na fanontaniana..."
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono"
            />
          </div>

          {/* Summary / Solution */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300 block">
              {contentType === 'cours'
                ? isMg ? 'Fehiny (Résumé à retenir) :' : 'Points clés / Résumé :'
                : isMg ? 'Fanitsiana & Valiny (Corrigé) :' : 'Corrigé & Solution :'}
            </label>
            <textarea
              rows={3}
              value={summaryOrSolution}
              onChange={e => setSummaryOrSolution(e.target.value)}
              placeholder="Ex: Fanitsiana amin'ny antsipiriany na fehin-kevitra..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="flex-1 py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4 text-amber-400" />
              <span>{isMg ? 'Tehirizo amin\'ny Brouillon' : 'Enregistrer brouillon'}</span>
            </button>

            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{isMg ? '+ Hamoaka avy hatrany' : '+ Publier le contenu'}</span>
            </button>
          </div>
        </form>
      )}

      {/* ========================================================================= */}
      {/* 3. MY PUBLISHED ONLINE COURSES (PHASE 6) */}
      {/* ========================================================================= */}
      {activeSection === 'my-courses' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Video className="w-4 h-4 text-amber-400" />
              <h2 className="text-sm font-black text-white">
                {isMg ? 'Ireo Cours en Ligne navoakako' : 'Mes cours en ligne publiés'} ({myOnlineCourses.length})
              </h2>
            </div>
            <button
              onClick={() => setActiveSection('online-course')}
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isMg ? 'Hamorona vaovao' : 'Nouveau cours'}</span>
            </button>
          </div>

          {myOnlineCourses.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-xs">
              {isMg ? 'Mbola tsy namoaka fampianarana an-tserasera ianao.' : 'Vous n\'avez pas encore publié de cours en ligne.'}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myOnlineCourses.map(course => (
                <div key={course.id} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-[10px]">
                        <span className="px-2 py-0.5 rounded bg-amber-400/10 text-amber-400 font-bold uppercase">
                          {course.category}
                        </span>
                        <span className="text-slate-400">🗣️ {course.language}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white line-clamp-1">
                        {course.title}
                      </h4>
                    </div>

                    <button
                      onClick={() => deleteOnlineCourse(course.id)}
                      className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg transition-colors cursor-pointer"
                      title={isMg ? 'Fafao' : 'Supprimer'}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="font-bold text-amber-400">
                      {course.isPaid ? `${(course.priceAriary || 0).toLocaleString()} Ar` : (isMg ? 'Maimaimpoana' : 'Gratuit')}
                    </span>
                    <span className="text-slate-400 text-[11px]">
                      👥 {course.studentsCount} {isMg ? 'mpianatra' : 'élèves inscrits'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. MESSAGES RECEIVED */}
      {/* ========================================================================= */}
      {activeSection === 'messages' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <MessageSquare className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm font-black text-white">
              {isMg ? 'Hafatra mivantana avy amin\'ny mpianatra' : 'Messages directs reçus'} ({directMessages.length})
            </h2>
          </div>

          {directMessages.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-xs">
              {isMg ? 'Tsy misy hafatra voaray amin\'izao fotoana izao.' : 'Aucun message direct reçu pour le moment.'}
            </div>
          ) : (
            <div className="space-y-3">
              {directMessages.map(msg => (
                <div key={msg.id} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-slate-200 flex items-center gap-2">
                      <span>👤 {msg.senderName}</span>
                      {msg.courseTitle && (
                        <span className="text-[10px] text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full font-normal">
                          {msg.courseTitle}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500">
                      {new Date(msg.sentAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 bg-slate-900 p-3 rounded-xl border border-slate-800/80 leading-relaxed">
                    {msg.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. DRAFTS SECTION */}
      {/* ========================================================================= */}
      {activeSection === 'content' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Save className="w-4 h-4 text-amber-400" />
              <h2 className="text-sm font-black text-white">
                {isMg ? 'Ireo Brouillons voatahiry' : 'Brouillons enregistrés dans storageService'} ({drafts.length})
              </h2>
            </div>
            <span className="text-[11px] text-slate-400">
              {isMg ? 'Azo sokafana sy ahitsy amin\'ny fotoana rehetra' : 'Éditables à tout moment'}
            </span>
          </div>

          {drafts.length === 0 ? (
            <div className="text-center py-6 text-slate-500 text-xs">
              {isMg ? 'Tsy misy brouillon voatahiry amin\'izao fotoana izao.' : 'Aucun brouillon enregistré pour le moment.'}
            </div>
          ) : (
            <div className="space-y-2.5">
              {drafts.map(draft => (
                <div
                  key={draft.id}
                  className="p-3.5 bg-slate-800/80 border border-slate-700 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm hover:border-slate-600 transition-colors"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded-md border border-amber-500/30">
                        {draft.type}
                      </span>
                      <span className="text-xs font-black text-white truncate">
                        {draft.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate">
                      <strong className="text-slate-300">{draft.level}</strong> • Série <strong className="text-amber-300">{draft.series}</strong> • {draft.subjectId.toUpperCase()} • {draft.chapterTitle}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
                    <button
                      onClick={() => handleLoadDraft(draft)}
                      className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                      <span>{isMg ? 'Hovaina' : 'Modifier'}</span>
                    </button>
                    <button
                      onClick={() => handleDeleteDraft(draft.id)}
                      className="p-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 rounded-xl transition-colors cursor-pointer"
                      title={isMg ? 'Fafao' : 'Supprimer'}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};


