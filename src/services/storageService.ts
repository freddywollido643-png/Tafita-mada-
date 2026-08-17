import {
  UserProfile,
  QuizResult,
  DownloadedItem,
  RevisionPlan,
  Lesson,
  Exercise,
  Quiz,
  BacPaper,
  TeacherDraft,
  OnlineCourse,
  CourseEnrollment,
  CourseReservation,
  DirectMessage,
  AppNotification,
  FeedPost,
  FeedComment,
  EducationalStory
} from '../types';
import { INITIAL_STORIES, INITIAL_FEED_POSTS } from '../data/socialFeedData';

const STORAGE_KEYS = {
  USER_PROFILE: 'tafita_user_profile_v1',
  FAVORITE_LESSONS: 'tafita_fav_lessons_v1',
  COMPLETED_LESSONS: 'tafita_completed_lessons_v1',
  QUIZ_RESULTS: 'tafita_quiz_results_v1',
  DOWNLOADS: 'tafita_downloads_v1',
  REVISION_PLAN: 'tafita_revision_plan_v1',
  CUSTOM_LESSONS: 'tafita_custom_lessons_v1',
  CUSTOM_EXERCISES: 'tafita_custom_exercises_v1',
  CUSTOM_QUIZZES: 'tafita_custom_quizzes_v1',
  CUSTOM_PAPERS: 'tafita_custom_papers_v1',
  TEACHER_DRAFTS: 'tafita_teacher_drafts_v1',
  ONLINE_COURSES: 'tafita_online_courses_v1',
  FAVORITE_ONLINE_COURSES: 'tafita_fav_online_courses_v1',
  ENROLLMENTS: 'tafita_enrollments_v1',
  RESERVATIONS: 'tafita_reservations_v1',
  DIRECT_MESSAGES: 'tafita_direct_messages_v1',
  NOTIFICATIONS: 'tafita_notifications_v1',
  FEED_POSTS: 'tafita_social_feed_posts_v1',
  STORIES: 'tafita_educational_stories_v1',
  SAVED_POSTS: 'tafita_saved_posts_v1',
  PENDING_SYNC: 'tafita_pending_sync_v1'
};

export const storageService = {
  // User Profile
  getUserProfile(): UserProfile {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {
        console.error('Error parsing profile', e);
      }
    }
    const defaultProfile: UserProfile = {
      id: 'student-default-1',
      name: 'Mpianatra TAFITA',
      email: 'student@tafita.mg',
      role: 'student',
      level: 'Terminale',
      series: 'D',
      language: 'mg',
      streakDays: 4,
      isOfflineOverride: false
    };
    this.saveUserProfile(defaultProfile);
    return defaultProfile;
  },

  saveUserProfile(profile: UserProfile) {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  },

  // Favorite Lessons
  getFavoriteLessonIds(): string[] {
    const raw = localStorage.getItem(STORAGE_KEYS.FAVORITE_LESSONS);
    return raw ? JSON.parse(raw) : ['les-math-1'];
  },

  toggleFavoriteLesson(lessonId: string): boolean {
    const favorites = this.getFavoriteLessonIds();
    const index = favorites.indexOf(lessonId);
    let isFav = false;
    if (index >= 0) {
      favorites.splice(index, 1);
      isFav = false;
    } else {
      favorites.push(lessonId);
      isFav = true;
    }
    localStorage.setItem(STORAGE_KEYS.FAVORITE_LESSONS, JSON.stringify(favorites));
    return isFav;
  },

  // Completed Lessons
  getCompletedLessonIds(): string[] {
    const raw = localStorage.getItem(STORAGE_KEYS.COMPLETED_LESSONS);
    return raw ? JSON.parse(raw) : [];
  },

  markLessonCompleted(lessonId: string): boolean {
    const completed = this.getCompletedLessonIds();
    if (!completed.includes(lessonId)) {
      completed.push(lessonId);
      localStorage.setItem(STORAGE_KEYS.COMPLETED_LESSONS, JSON.stringify(completed));
      this.addPendingSync('lesson_completed', { lessonId, timestamp: Date.now() });
    }
    return true;
  },

  // Quiz Results
  getQuizResults(): QuizResult[] {
    const raw = localStorage.getItem(STORAGE_KEYS.QUIZ_RESULTS);
    return raw ? JSON.parse(raw) : [];
  },

  saveQuizResult(result: QuizResult) {
    const results = this.getQuizResults();
    results.unshift(result);
    localStorage.setItem(STORAGE_KEYS.QUIZ_RESULTS, JSON.stringify(results));
    this.addPendingSync('quiz_result', result);
  },

  // Offline Downloads Manager
  getDownloadedItems(): DownloadedItem[] {
    const raw = localStorage.getItem(STORAGE_KEYS.DOWNLOADS);
    return raw ? JSON.parse(raw) : [];
  },

  saveDownloadedItem(item: DownloadedItem) {
    const items = this.getDownloadedItems();
    const existingIndex = items.findIndex(i => i.id === item.id);
    if (existingIndex >= 0) {
      items[existingIndex] = item;
    } else {
      items.push(item);
    }
    localStorage.setItem(STORAGE_KEYS.DOWNLOADS, JSON.stringify(items));
  },

  removeDownloadedItem(id: string) {
    const items = this.getDownloadedItems().filter(i => i.id !== id);
    localStorage.setItem(STORAGE_KEYS.DOWNLOADS, JSON.stringify(items));
  },

  isDownloaded(id: string): boolean {
    return this.getDownloadedItems().some(i => i.id === id);
  },

  // Revision Plan
  getRevisionPlan(): RevisionPlan | null {
    const raw = localStorage.getItem(STORAGE_KEYS.REVISION_PLAN);
    return raw ? JSON.parse(raw) : null;
  },

  saveRevisionPlan(plan: RevisionPlan) {
    localStorage.setItem(STORAGE_KEYS.REVISION_PLAN, JSON.stringify(plan));
  },

  // Custom Teacher Lessons
  getCustomLessons(): Lesson[] {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_LESSONS);
    return raw ? JSON.parse(raw) : [];
  },

  saveCustomLesson(lesson: Lesson) {
    const lessons = this.getCustomLessons();
    lessons.push(lesson);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_LESSONS, JSON.stringify(lessons));
  },

  // Custom Teacher Exercises
  getCustomExercises(): Exercise[] {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_EXERCISES);
    return raw ? JSON.parse(raw) : [];
  },

  saveCustomExercise(exercise: Exercise) {
    const exercises = this.getCustomExercises();
    exercises.push(exercise);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_EXERCISES, JSON.stringify(exercises));
  },

  // Custom Teacher Quizzes
  getCustomQuizzes(): Quiz[] {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_QUIZZES);
    return raw ? JSON.parse(raw) : [];
  },

  saveCustomQuiz(quiz: Quiz) {
    const quizzes = this.getCustomQuizzes();
    quizzes.push(quiz);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_QUIZZES, JSON.stringify(quizzes));
  },

  // Custom Teacher Bac / BEPC Papers
  getCustomBacPapers(): BacPaper[] {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_PAPERS);
    return raw ? JSON.parse(raw) : [];
  },

  saveCustomBacPaper(paper: BacPaper) {
    const papers = this.getCustomBacPapers();
    papers.push(paper);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_PAPERS, JSON.stringify(papers));
  },

  // Teacher Drafts
  getTeacherDrafts(): TeacherDraft[] {
    const raw = localStorage.getItem(STORAGE_KEYS.TEACHER_DRAFTS);
    return raw ? JSON.parse(raw) : [];
  },

  saveTeacherDraft(draft: TeacherDraft) {
    const drafts = this.getTeacherDrafts();
    const idx = drafts.findIndex(d => d.id === draft.id);
    if (idx >= 0) {
      drafts[idx] = draft;
    } else {
      drafts.unshift(draft);
    }
    localStorage.setItem(STORAGE_KEYS.TEACHER_DRAFTS, JSON.stringify(drafts));
  },

  deleteTeacherDraft(id: string) {
    const drafts = this.getTeacherDrafts().filter(d => d.id !== id);
    localStorage.setItem(STORAGE_KEYS.TEACHER_DRAFTS, JSON.stringify(drafts));
  },

  // Online Courses (Teacher created & Custom published)
  getCustomOnlineCourses(): OnlineCourse[] {
    const raw = localStorage.getItem(STORAGE_KEYS.ONLINE_COURSES);
    return raw ? JSON.parse(raw) : [];
  },

  saveOnlineCourse(course: OnlineCourse) {
    const courses = this.getCustomOnlineCourses();
    const idx = courses.findIndex(c => c.id === course.id);
    if (idx >= 0) {
      courses[idx] = course;
    } else {
      courses.unshift(course);
    }
    localStorage.setItem(STORAGE_KEYS.ONLINE_COURSES, JSON.stringify(courses));
    this.addPendingSync('online_course_published', course);
  },

  deleteOnlineCourse(courseId: string) {
    const courses = this.getCustomOnlineCourses().filter(c => c.id !== courseId);
    localStorage.setItem(STORAGE_KEYS.ONLINE_COURSES, JSON.stringify(courses));
  },

  // Favorite Online Courses
  getFavoriteOnlineCourseIds(): string[] {
    const raw = localStorage.getItem(STORAGE_KEYS.FAVORITE_ONLINE_COURSES);
    return raw ? JSON.parse(raw) : [];
  },

  toggleFavoriteOnlineCourse(courseId: string): boolean {
    const favs = this.getFavoriteOnlineCourseIds();
    const idx = favs.indexOf(courseId);
    let isFav = false;
    if (idx >= 0) {
      favs.splice(idx, 1);
      isFav = false;
    } else {
      favs.push(courseId);
      isFav = true;
    }
    localStorage.setItem(STORAGE_KEYS.FAVORITE_ONLINE_COURSES, JSON.stringify(favs));
    return isFav;
  },

  // Course Enrollments (Student)
  getEnrollments(): CourseEnrollment[] {
    const raw = localStorage.getItem(STORAGE_KEYS.ENROLLMENTS);
    return raw ? JSON.parse(raw) : [];
  },

  saveEnrollment(enrollment: CourseEnrollment) {
    const enrollments = this.getEnrollments();
    const idx = enrollments.findIndex(e => e.courseId === enrollment.courseId && e.studentId === enrollment.studentId);
    if (idx >= 0) {
      enrollments[idx] = enrollment;
    } else {
      enrollments.unshift(enrollment);
    }
    localStorage.setItem(STORAGE_KEYS.ENROLLMENTS, JSON.stringify(enrollments));
    this.addPendingSync('course_enrollment', enrollment);
  },

  cancelEnrollment(courseId: string, studentId: string) {
    const enrollments = this.getEnrollments().filter(
      e => !(e.courseId === courseId && e.studentId === studentId)
    );
    localStorage.setItem(STORAGE_KEYS.ENROLLMENTS, JSON.stringify(enrollments));
  },

  // Live Course Reservations
  getReservations(): CourseReservation[] {
    const raw = localStorage.getItem(STORAGE_KEYS.RESERVATIONS);
    return raw ? JSON.parse(raw) : [];
  },

  saveReservation(reservation: CourseReservation) {
    const reservations = this.getReservations();
    const idx = reservations.findIndex(r => r.id === reservation.id);
    if (idx >= 0) {
      reservations[idx] = reservation;
    } else {
      reservations.unshift(reservation);
    }
    localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(reservations));
    this.addPendingSync('live_reservation', reservation);
  },

  cancelReservation(reservationId: string) {
    const reservations = this.getReservations().map(r => 
      r.id === reservationId ? { ...r, status: 'cancelled' as const } : r
    );
    localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(reservations));
  },

  // Direct Messages (Student <-> Teacher)
  getDirectMessages(): DirectMessage[] {
    const raw = localStorage.getItem(STORAGE_KEYS.DIRECT_MESSAGES);
    return raw ? JSON.parse(raw) : [];
  },

  saveDirectMessage(msg: DirectMessage) {
    const msgs = this.getDirectMessages();
    msgs.unshift(msg);
    localStorage.setItem(STORAGE_KEYS.DIRECT_MESSAGES, JSON.stringify(msgs));
  },

  // Notifications (Local Architecture)
  getNotifications(): AppNotification[] {
    const raw = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    return raw ? JSON.parse(raw) : [
      {
        id: 'notif-welcome',
        type: 'new_course',
        title: 'Tongasoa eto amin\'ny Cours en Ligne !',
        message: 'Maro ireo fampianarana mivantana sy voarakitra azo araharahina.',
        timestamp: new Date().toISOString(),
        read: false,
        linkTab: 'online-courses'
      }
    ];
  },

  saveNotification(notif: AppNotification) {
    const notifs = this.getNotifications();
    notifs.unshift(notif);
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));
  },

  markNotificationRead(id: string) {
    const notifs = this.getNotifications().map(n => n.id === id ? { ...n, read: true } : n);
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));
  },

  // Educational Stories
  getStories(): EducationalStory[] {
    const raw = localStorage.getItem(STORAGE_KEYS.STORIES);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {
        console.error('Error parsing stories', e);
      }
    }
    return INITIAL_STORIES;
  },

  saveStories(stories: EducationalStory[]) {
    localStorage.setItem(STORAGE_KEYS.STORIES, JSON.stringify(stories));
  },

  addStory(story: EducationalStory) {
    const stories = this.getStories();
    stories.unshift(story);
    this.saveStories(stories);
    this.addPendingSync('add_story', story);
  },

  // Social Educational Feed Posts
  getFeedPosts(): FeedPost[] {
    const raw = localStorage.getItem(STORAGE_KEYS.FEED_POSTS);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {
        console.error('Error parsing feed posts', e);
      }
    }
    return INITIAL_FEED_POSTS;
  },

  saveFeedPosts(posts: FeedPost[]) {
    localStorage.setItem(STORAGE_KEYS.FEED_POSTS, JSON.stringify(posts));
  },

  addFeedPost(post: FeedPost) {
    const posts = this.getFeedPosts();
    posts.unshift(post);
    this.saveFeedPosts(posts);
    this.addPendingSync('add_feed_post', post);
  },

  deleteFeedPost(postId: string) {
    const posts = this.getFeedPosts().filter(p => p.id !== postId);
    this.saveFeedPosts(posts);
  },

  toggleFeedPostReaction(postId: string, reactionType: 'like' | 'idea' | 'applause' | 'fire'): FeedPost | null {
    const posts = this.getFeedPosts();
    const post = posts.find(p => p.id === postId);
    if (!post) return null;

    if (!post.reactions) {
      post.reactions = { like: 0, idea: 0, applause: 0, fire: 0 };
    }

    if (post.userReaction === reactionType) {
      // Remove reaction
      post.reactions[reactionType] = Math.max(0, (post.reactions[reactionType] || 1) - 1);
      post.userReaction = null;
    } else {
      // If had previous reaction, decrement it
      if (post.userReaction) {
        post.reactions[post.userReaction] = Math.max(0, (post.reactions[post.userReaction] || 1) - 1);
      }
      post.reactions[reactionType] = (post.reactions[reactionType] || 0) + 1;
      post.userReaction = reactionType;
    }

    this.saveFeedPosts(posts);
    return post;
  },

  addFeedComment(postId: string, comment: FeedComment): FeedPost | null {
    const posts = this.getFeedPosts();
    const post = posts.find(p => p.id === postId);
    if (!post) return null;

    if (!post.comments) post.comments = [];
    post.comments.push(comment);
    post.commentsCount = post.comments.length;

    this.saveFeedPosts(posts);
    this.addPendingSync('add_feed_comment', { postId, comment });
    return post;
  },

  // Saved Posts (Bookmarks)
  getSavedPostIds(): string[] {
    const raw = localStorage.getItem(STORAGE_KEYS.SAVED_POSTS);
    return raw ? JSON.parse(raw) : [];
  },

  toggleSavePost(postId: string): boolean {
    const saved = this.getSavedPostIds();
    const idx = saved.indexOf(postId);
    let isSaved = false;
    if (idx >= 0) {
      saved.splice(idx, 1);
      isSaved = false;
    } else {
      saved.push(postId);
      isSaved = true;
    }
    localStorage.setItem(STORAGE_KEYS.SAVED_POSTS, JSON.stringify(saved));
    return isSaved;
  },

  // Pending Sync Queue
  getPendingSyncQueue(): any[] {
    const raw = localStorage.getItem(STORAGE_KEYS.PENDING_SYNC);
    return raw ? JSON.parse(raw) : [];
  },

  addPendingSync(action: string, data: any) {
    const queue = this.getPendingSyncQueue();
    queue.push({ id: `sync-${Date.now()}`, action, data, createdAt: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEYS.PENDING_SYNC, JSON.stringify(queue));
  },

  clearPendingSyncQueue() {
    localStorage.removeItem(STORAGE_KEYS.PENDING_SYNC);
  }
};
