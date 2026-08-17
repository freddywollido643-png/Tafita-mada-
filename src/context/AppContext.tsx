import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  UserProfile,
  Lesson,
  Exercise,
  Quiz,
  BacPaper,
  MenArticle,
  DownloadedItem,
  SubjectId,
  Level,
  Series,
  UserRole,
  OnlineCourse,
  TeacherProfile,
  CourseEnrollment,
  CourseReservation,
  DirectMessage,
  AppNotification,
  FeedPost,
  FeedComment,
  EducationalStory
} from '../types';
import {
  INITIAL_LESSONS,
  INITIAL_EXERCISES,
  INITIAL_QUIZZES,
  INITIAL_BAC_PAPERS,
  INITIAL_MEN_ARTICLES,
  INITIAL_TEACHERS,
  INITIAL_ONLINE_COURSES
} from '../data/mockDatabase';
import { storageService } from '../services/storageService';
import { apiService } from '../services/apiService';

export type AppTab =
  | 'home'
  | 'lessons'
  | 'online-courses'
  | 'exercises'
  | 'quizzes'
  | 'ai'
  | 'bac'
  | 'bepc'
  | 'news'
  | 'revision'
  | 'progress'
  | 'downloads'
  | 'teacher'
  | 'admin'
  | 'android'
  | 'profile'
  | 'derivative';

interface AppContextType {
  userProfile: UserProfile;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  isOnline: boolean;
  isOfflineOverride: boolean;
  setIsOfflineOverride: (override: boolean) => void;
  effectiveIsOnline: boolean;
  currentTab: AppTab;
  setCurrentTab: (tab: AppTab) => void;
  lessons: Lesson[];
  exercises: Exercise[];
  quizzes: Quiz[];
  bacPapers: BacPaper[];
  menArticles: MenArticle[];
  favoriteLessonIds: string[];
  completedLessonIds: string[];
  downloadedItems: DownloadedItem[];
  toggleFavoriteLesson: (lessonId: string) => void;
  markLessonCompleted: (lessonId: string) => void;
  downloadItem: (item: DownloadedItem) => void;
  removeDownload: (id: string) => void;
  isDownloaded: (id: string) => boolean;
  selectedSubjectId: SubjectId | null;
  setSelectedSubjectId: (subjectId: SubjectId | null) => void;
  selectedLesson: Lesson | null;
  setSelectedLesson: (lesson: Lesson | null) => void;
  activeSearchQuery: string;
  setActiveSearchQuery: (query: string) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
  addCustomLesson: (lesson: Lesson) => void;
  addCustomExercise: (exercise: Exercise) => void;
  addCustomQuiz: (quiz: Quiz) => void;
  addCustomBacPaper: (paper: BacPaper) => void;
  addMenArticle: (article: MenArticle) => void;
  refreshMenNews: () => Promise<void>;
  triggerSync: () => Promise<void>;

  // Phase 6: Online Courses & Teachers
  onlineCourses: OnlineCourse[];
  teachers: TeacherProfile[];
  favoriteOnlineCourseIds: string[];
  enrollments: CourseEnrollment[];
  reservations: CourseReservation[];
  directMessages: DirectMessage[];
  notifications: AppNotification[];
  selectedOnlineCourse: OnlineCourse | null;
  setSelectedOnlineCourse: (course: OnlineCourse | null) => void;
  selectedTeacherForView: TeacherProfile | null;
  setSelectedTeacherForView: (teacher: TeacherProfile | null) => void;
  addOnlineCourse: (course: OnlineCourse) => void;
  deleteOnlineCourse: (courseId: string) => void;
  toggleFavoriteOnlineCourse: (courseId: string) => void;
  enrollInCourse: (course: OnlineCourse) => void;
  cancelEnrollment: (courseId: string) => void;
  isEnrolledInCourse: (courseId: string) => boolean;
  reserveLiveSession: (course: OnlineCourse, timeSlot?: string) => CourseReservation;
  cancelLiveReservation: (reservationId: string) => void;
  sendDirectMessage: (receiverId: string, receiverName: string, content: string, courseId?: string, courseTitle?: string) => void;
  markNotificationRead: (id: string) => void;

  // Social Educational Feed & Stories
  feedPosts: FeedPost[];
  stories: EducationalStory[];
  savedPostIds: string[];
  addFeedPost: (post: FeedPost) => void;
  deleteFeedPost: (postId: string) => void;
  toggleFeedPostReaction: (postId: string, reactionType: 'like' | 'idea' | 'applause' | 'fire') => void;
  addFeedComment: (postId: string, content: string) => void;
  addStory: (story: EducationalStory) => void;
  toggleSavePost: (postId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile>(() => storageService.getUserProfile());
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [isOfflineOverride, setIsOfflineOverride] = useState<boolean>(userProfile.isOfflineOverride || false);
  const [currentTab, setCurrentTab] = useState<AppTab>('home');
  const [selectedSubjectId, setSelectedSubjectId] = useState<SubjectId | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const [lessons, setLessons] = useState<Lesson[]>(() => {
    const custom = storageService.getCustomLessons();
    return [...INITIAL_LESSONS, ...custom];
  });
  const [exercises, setExercises] = useState<Exercise[]>(() => {
    const custom = storageService.getCustomExercises();
    return [...INITIAL_EXERCISES, ...custom];
  });
  const [quizzes, setQuizzes] = useState<Quiz[]>(() => {
    const custom = storageService.getCustomQuizzes();
    return [...INITIAL_QUIZZES, ...custom];
  });
  const [bacPapers, setBacPapers] = useState<BacPaper[]>(() => {
    const custom = storageService.getCustomBacPapers();
    return [...INITIAL_BAC_PAPERS, ...custom];
  });
  const [menArticles, setMenArticles] = useState<MenArticle[]>(INITIAL_MEN_ARTICLES);

  const [favoriteLessonIds, setFavoriteLessonIds] = useState<string[]>(() => storageService.getFavoriteLessonIds());
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() => storageService.getCompletedLessonIds());
  const [downloadedItems, setDownloadedItems] = useState<DownloadedItem[]>(() => storageService.getDownloadedItems());

  const [activeSearchQuery, setActiveSearchQuery] = useState<string>('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);

  // Phase 6 States
  const [teachers] = useState<TeacherProfile[]>(INITIAL_TEACHERS);
  const [onlineCourses, setOnlineCourses] = useState<OnlineCourse[]>(() => {
    const custom = storageService.getCustomOnlineCourses();
    return [...INITIAL_ONLINE_COURSES, ...custom];
  });
  const [favoriteOnlineCourseIds, setFavoriteOnlineCourseIds] = useState<string[]>(() => storageService.getFavoriteOnlineCourseIds());
  const [enrollments, setEnrollments] = useState<CourseEnrollment[]>(() => storageService.getEnrollments());
  const [reservations, setReservations] = useState<CourseReservation[]>(() => storageService.getReservations());
  const [directMessages, setDirectMessages] = useState<DirectMessage[]>(() => storageService.getDirectMessages());
  const [notifications, setNotifications] = useState<AppNotification[]>(() => storageService.getNotifications());
  const [selectedOnlineCourse, setSelectedOnlineCourse] = useState<OnlineCourse | null>(null);
  const [selectedTeacherForView, setSelectedTeacherForView] = useState<TeacherProfile | null>(null);

  // Social Feed & Stories States
  const [feedPosts, setFeedPosts] = useState<FeedPost[]>(() => storageService.getFeedPosts());
  const [stories, setStories] = useState<EducationalStory[]>(() => storageService.getStories());
  const [savedPostIds, setSavedPostIds] = useState<string[]>(() => storageService.getSavedPostIds());

  // Network state detection
  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // Initial check
    setIsOnline(navigator.onLine);

    // Optional server health ping if available
    apiService.checkServerHealth().then(healthy => {
      if (healthy) {
        setIsOnline(true);
      }
    });

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  // Fetch MEN news on load
  useEffect(() => {
    apiService.fetchMenNews().then(result => {
      setMenArticles(result.news);
    });
  }, []);

  const effectiveIsOnline = isOnline && !isOfflineOverride;

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUserProfile(prev => {
      const updated = { ...prev, ...updates };
      storageService.saveUserProfile(updated);
      return updated;
    });
  };

  const toggleFavoriteLesson = (lessonId: string) => {
    storageService.toggleFavoriteLesson(lessonId);
    setFavoriteLessonIds(storageService.getFavoriteLessonIds());
  };

  const markLessonCompleted = (lessonId: string) => {
    storageService.markLessonCompleted(lessonId);
    setCompletedLessonIds(storageService.getCompletedLessonIds());
  };

  const downloadItem = (item: DownloadedItem) => {
    storageService.saveDownloadedItem(item);
    setDownloadedItems(storageService.getDownloadedItems());
  };

  const removeDownload = (id: string) => {
    storageService.removeDownloadedItem(id);
    setDownloadedItems(storageService.getDownloadedItems());
  };

  const isDownloaded = (id: string) => downloadedItems.some(item => item.id === id);

  const addCustomLesson = (lesson: Lesson) => {
    storageService.saveCustomLesson(lesson);
    setLessons(prev => [...prev, lesson]);
  };

  const addCustomExercise = (exercise: Exercise) => {
    storageService.saveCustomExercise(exercise);
    setExercises(prev => [...prev, exercise]);
  };

  const addCustomQuiz = (quiz: Quiz) => {
    storageService.saveCustomQuiz(quiz);
    setQuizzes(prev => [...prev, quiz]);
  };

  const addCustomBacPaper = (paper: BacPaper) => {
    storageService.saveCustomBacPaper(paper);
    setBacPapers(prev => [...prev, paper]);
  };

  const addMenArticle = (article: MenArticle) => {
    setMenArticles(prev => [article, ...prev]);
  };

  const refreshMenNews = async () => {
    const result = await apiService.fetchMenNews();
    setMenArticles(result.news);
  };

  const triggerSync = async () => {
    if (effectiveIsOnline) {
      await apiService.syncPendingData();
    }
  };

  // Phase 6 Online Course Handlers
  const addOnlineCourse = (course: OnlineCourse) => {
    storageService.saveOnlineCourse(course);
    setOnlineCourses(prev => {
      const filtered = prev.filter(c => c.id !== course.id);
      return [course, ...filtered];
    });
  };

  const deleteOnlineCourse = (courseId: string) => {
    storageService.deleteOnlineCourse(courseId);
    setOnlineCourses(prev => prev.filter(c => c.id !== courseId));
  };

  const toggleFavoriteOnlineCourse = (courseId: string) => {
    storageService.toggleFavoriteOnlineCourse(courseId);
    setFavoriteOnlineCourseIds(storageService.getFavoriteOnlineCourseIds());
  };

  const enrollInCourse = (course: OnlineCourse) => {
    const newEnrollment: CourseEnrollment = {
      id: `enr-${Date.now()}`,
      courseId: course.id,
      courseTitle: course.title,
      teacherId: course.teacherId,
      teacherName: course.teacherName,
      studentId: userProfile.id,
      studentName: userProfile.name,
      status: 'enrolled',
      isPaid: course.isPaid,
      priceAriary: course.priceAriary,
      progressPercent: 0,
      enrolledAt: new Date().toISOString()
    };
    storageService.saveEnrollment(newEnrollment);
    setEnrollments(storageService.getEnrollments());

    // Add local confirmation notification
    const notif: AppNotification = {
      id: `notif-${Date.now()}`,
      type: 'course_confirmed',
      title: userProfile.language === 'mg' ? 'Fisoratana anarana voaray' : 'Inscription confirmée',
      message: `${course.title} • ${course.teacherName}`,
      timestamp: new Date().toISOString(),
      read: false,
      linkTab: 'online-courses'
    };
    storageService.saveNotification(notif);
    setNotifications(storageService.getNotifications());
  };

  const cancelEnrollment = (courseId: string) => {
    storageService.cancelEnrollment(courseId, userProfile.id);
    setEnrollments(storageService.getEnrollments());
  };

  const isEnrolledInCourse = (courseId: string) => {
    return enrollments.some(e => e.courseId === courseId && e.studentId === userProfile.id);
  };

  const reserveLiveSession = (course: OnlineCourse, timeSlot?: string) => {
    const reservation: CourseReservation = {
      id: `res-${Date.now()}`,
      courseId: course.id,
      courseTitle: course.title,
      teacherId: course.teacherId,
      teacherName: course.teacherName,
      studentId: userProfile.id,
      studentName: userProfile.name,
      date: course.liveSchedule?.date || new Date().toISOString().slice(0, 10),
      timeSlot: timeSlot || (course.liveSchedule ? `${course.liveSchedule.startTime} - ${course.liveSchedule.endTime}` : '09:00 - 10:30'),
      meetingUrl: course.externalMeetingUrl,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };
    storageService.saveReservation(reservation);
    setReservations(storageService.getReservations());

    // Auto enroll as well
    if (!isEnrolledInCourse(course.id)) {
      enrollInCourse(course);
    }

    return reservation;
  };

  const cancelLiveReservation = (reservationId: string) => {
    storageService.cancelReservation(reservationId);
    setReservations(storageService.getReservations());
  };

  const sendDirectMessage = (
    receiverId: string,
    receiverName: string,
    content: string,
    courseId?: string,
    courseTitle?: string
  ) => {
    const msg: DirectMessage = {
      id: `msg-${Date.now()}`,
      senderId: userProfile.id,
      senderName: userProfile.name,
      senderRole: userProfile.role,
      receiverId,
      receiverName,
      courseId,
      courseTitle,
      content,
      sentAt: new Date().toISOString(),
      read: false
    };
    storageService.saveDirectMessage(msg);
    setDirectMessages(storageService.getDirectMessages());
  };

  const markNotificationRead = (id: string) => {
    storageService.markNotificationRead(id);
    setNotifications(storageService.getNotifications());
  };

  // Feed & Story Handlers
  const addFeedPost = (post: FeedPost) => {
    storageService.addFeedPost(post);
    setFeedPosts(storageService.getFeedPosts());
  };

  const deleteFeedPost = (postId: string) => {
    storageService.deleteFeedPost(postId);
    setFeedPosts(storageService.getFeedPosts());
  };

  const toggleFeedPostReaction = (postId: string, reactionType: 'like' | 'idea' | 'applause' | 'fire') => {
    storageService.toggleFeedPostReaction(postId, reactionType);
    setFeedPosts(storageService.getFeedPosts());
  };

  const addFeedComment = (postId: string, content: string) => {
    const newComment: FeedComment = {
      id: `comm-${Date.now()}`,
      postId,
      authorId: userProfile.id,
      authorName: userProfile.name,
      authorRole: userProfile.role,
      authorAvatar: userProfile.role === 'teacher'
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      content,
      likesCount: 0,
      createdAt: new Date().toISOString()
    };
    storageService.addFeedComment(postId, newComment);
    setFeedPosts(storageService.getFeedPosts());
  };

  const addStory = (story: EducationalStory) => {
    storageService.addStory(story);
    setStories(storageService.getStories());
  };

  const toggleSavePost = (postId: string) => {
    storageService.toggleSavePost(postId);
    setSavedPostIds(storageService.getSavedPostIds());
  };

  return (
    <AppContext.Provider
      value={{
        userProfile,
        updateUserProfile,
        isOnline,
        isOfflineOverride,
        setIsOfflineOverride: (override) => {
          setIsOfflineOverride(override);
          updateUserProfile({ isOfflineOverride: override });
        },
        effectiveIsOnline,
        currentTab,
        setCurrentTab,
        lessons,
        exercises,
        quizzes,
        bacPapers,
        menArticles,
        favoriteLessonIds,
        completedLessonIds,
        downloadedItems,
        toggleFavoriteLesson,
        markLessonCompleted,
        downloadItem,
        removeDownload,
        isDownloaded,
        selectedSubjectId,
        setSelectedSubjectId,
        selectedLesson,
        setSelectedLesson,
        activeSearchQuery,
        setActiveSearchQuery,
        isSearchModalOpen,
        setIsSearchModalOpen,
        addCustomLesson,
        addCustomExercise,
        addCustomQuiz,
        addCustomBacPaper,
        addMenArticle,
        refreshMenNews,
        triggerSync,

        // Phase 6
        onlineCourses,
        teachers,
        favoriteOnlineCourseIds,
        enrollments,
        reservations,
        directMessages,
        notifications,
        selectedOnlineCourse,
        setSelectedOnlineCourse,
        selectedTeacherForView,
        setSelectedTeacherForView,
        addOnlineCourse,
        deleteOnlineCourse,
        toggleFavoriteOnlineCourse,
        enrollInCourse,
        cancelEnrollment,
        isEnrolledInCourse,
        reserveLiveSession,
        cancelLiveReservation,
        sendDirectMessage,
        markNotificationRead,

        // Social Feed & Stories
        feedPosts,
        stories,
        savedPostIds,
        addFeedPost,
        deleteFeedPost,
        toggleFeedPostReaction,
        addFeedComment,
        addStory,
        toggleSavePost
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
