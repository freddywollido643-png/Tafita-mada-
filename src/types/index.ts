export type Level = '6e' | '5e' | '4e' | '3e' | 'Seconde' | 'Première' | 'Terminale';

export type Series = 'A' | 'C' | 'D' | 'L' | 'S' | 'OSE' | 'Toutes';

export type ExamTarget = 'BEPC' | 'BAC' | 'GENERAL';

export type SubjectId =
  | 'maths'
  | 'physique'
  | 'svt'
  | 'francais'
  | 'malagasy'
  | 'anglais'
  | 'histogeo'
  | 'philo'
  | 'ses'
  | 'eps';

export type Difficulty = 'easy' | 'medium' | 'hard';

export type UserRole = 'student' | 'teacher' | 'admin';

export type Language = 'mg' | 'fr';

export interface SubjectMeta {
  id: SubjectId;
  nameMg: string;
  nameFr: string;
  icon: string;
  color: string;
  coefficientDefault: number;
}

export interface LessonContent {
  introduction: string;
  objectives: string[];
  definitions: { term: string; explanation: string }[];
  formulas?: { name: string; formula: string; explanation?: string }[];
  examples: { title: string; description: string }[];
  mainText: string;
  summary: string;
}

export interface Lesson {
  id: string;
  level: Level;
  seriesList: Series[];
  subjectId: SubjectId;
  chapterId: string;
  chapterTitle: string;
  chapterTitleFr?: string;
  title: string;
  titleFr?: string;
  estimatedMinutes: number;
  content: LessonContent;
  isDownloaded?: boolean;
  isFavorite?: boolean;
  isCompleted?: boolean;
  teacherCreated?: boolean;
  isApproved?: boolean;
}

export interface Exercise {
  id: string;
  lessonId: string;
  subjectId: SubjectId;
  level: Level;
  seriesList: Series[];
  title: string;
  question: string;
  type: 'mcq' | 'open';
  choices?: string[];
  correctAnswer: string | number; // index or text
  stepByStepCorrection: string[];
  explanation: string;
  difficulty: Difficulty;
  teacherCreated?: boolean;
  isApproved?: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  level: Level;
  seriesList: Series[];
  subjectId: SubjectId;
  durationMinutes: number;
  questions: QuizQuestion[];
}

export interface QuizResult {
  id: string;
  quizId: string;
  quizTitle: string;
  subjectId: SubjectId;
  score: number;
  totalQuestions: number;
  percentage: number;
  timeSpentSeconds: number;
  date: string;
  recommendedRevision?: string;
}

export interface BacPaper {
  id: string;
  year: number;
  level: Level;
  series: Series;
  subjectId: SubjectId;
  title: string;
  examType?: 'BAC' | 'BEPC';
  pdfUrl?: string;
  paperText: string;
  correctionText: string;
  difficulty: Difficulty;
  isDownloaded?: boolean;
}

export type ExamPaper = BacPaper;

export type TeacherContentType = 'cours' | 'fiche' | 'exercice' | 'quiz' | 'devoir' | 'annale';

export interface TeacherDraft {
  id: string;
  type: TeacherContentType;
  level: Level;
  series: Series;
  subjectId: SubjectId;
  chapterTitle: string;
  title: string;
  content: string;
  summary?: string;
  question?: string;
  correction?: string;
  quizQuestions?: QuizQuestion[];
  quizDurationMinutes?: number;
  difficulty?: Difficulty;
  savedAt: string;
}

export interface MenArticle {
  id: string;
  title: string;
  titleFr: string;
  date: string;
  category: string;
  summary: string;
  summaryFr: string;
  source: string;
  originalUrl: string;
  isOfficial: boolean;
}

export interface RevisionTask {
  id: string;
  date: string; // YYYY-MM-DD
  dayName: string;
  subjectId: SubjectId;
  topic: string;
  durationMinutes: number;
  isCompleted: boolean;
}

export interface RevisionPlan {
  examDate: string;
  level: Level;
  series: Series;
  dailyHours: number;
  tasks: RevisionTask[];
}

export interface DownloadedItem {
  id: string;
  type: 'lesson' | 'bac' | 'quiz' | 'pdf';
  title: string;
  subjectId: SubjectId;
  sizeKb: number;
  downloadedAt: string;
  data: any;
}

export interface GamificationBadge {
  id: string;
  titleMg: string;
  titleFr: string;
  descriptionMg: string;
  descriptionFr: string;
  icon: string;
  unlocked: boolean;
}

export type OnlineCourseCategory =
  | 'all'
  | 'langues'
  | 'scolaires'
  | 'professionnel'
  | 'personnel'
  | 'informatique'
  | 'entrepreneuriat'
  | 'autres';

export type OnlineCourseType = 'live' | 'recorded' | 'hybrid';

export interface OnlineCourseChapter {
  id: string;
  title: string;
  duration?: string;
  description?: string;
  resourceUrl?: string;
}

export interface LiveScheduleInfo {
  date: string;
  startTime: string;
  endTime: string;
  maxParticipants?: number;
  meetingUrl?: string;
  platform?: 'google_meet' | 'zoom' | 'other';
}

export interface OnlineCourse {
  id: string;
  title: string;
  titleFr?: string;
  description: string;
  teacherId: string;
  teacherName: string;
  teacherPhoto?: string;
  teacherRole?: string;
  category: OnlineCourseCategory;
  subject?: string;
  level: string; // e.g. 'Débutant', 'Intermédiaire', 'Avancé', '3e', 'Terminale', 'Tous niveaux'
  series?: string; // e.g. 'OSE', 'S', 'L', 'Toutes'
  language: string; // e.g. 'Anglais', 'Français', 'Malagasy', 'Allemand', 'Espagnol', 'Russe'
  courseType: OnlineCourseType;
  isPaid: boolean;
  priceAriary?: number;
  currency?: string; // 'MGA'
  duration: string;
  maxStudents?: number;
  studentsCount: number;
  coverImage?: string;
  chapters: OnlineCourseChapter[];
  topics?: string[];
  externalMeetingUrl?: string;
  liveSchedule?: LiveScheduleInfo;
  rating?: number;
  ratingCount?: number;
  isTeacherCreated: boolean;
  createdAt: string;
  status: 'published' | 'draft' | 'archived';
  pdfUrl?: string;
}

export interface TeacherProfile {
  id: string;
  name: string;
  photo?: string;
  biography: string;
  subjects: string[];
  languages: string[];
  experience: string;
  coursesCount: number;
  studentsCount: number;
  rating?: number;
  contactEmail?: string;
  contactPhone?: string;
}

export interface CourseEnrollment {
  id: string;
  courseId: string;
  courseTitle: string;
  teacherId: string;
  teacherName: string;
  studentId: string;
  studentName: string;
  status: 'enrolled' | 'in_progress' | 'completed' | 'cancelled';
  isPaid: boolean;
  priceAriary?: number;
  progressPercent: number;
  enrolledAt: string;
}

export interface CourseReservation {
  id: string;
  courseId: string;
  courseTitle: string;
  teacherId: string;
  teacherName: string;
  studentId: string;
  studentName: string;
  date: string;
  timeSlot: string;
  meetingUrl?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
}

export interface DirectMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  receiverId: string;
  receiverName: string;
  courseId?: string;
  courseTitle?: string;
  content: string;
  sentAt: string;
  read: boolean;
}

export interface AppNotification {
  id: string;
  type: 'new_course' | 'course_confirmed' | 'course_reminder' | 'cancellation' | 'teacher_message';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  linkTab?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  level: Level;
  series: Series;
  language: Language;
  streakDays: number;
  isOfflineOverride: boolean;
}

// Educational Stories & Social Feed
export type StoryMediaType = 'image' | 'video' | 'gradient';

export interface EducationalStory {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  authorAvatar: string;
  authorBadge?: string;
  mediaType: StoryMediaType;
  mediaUrl?: string;
  bgGradient?: string;
  title: string;
  subtitle?: string;
  tag?: string;
  actionText?: string;
  actionTab?: string;
  actionUrl?: string;
  createdAt: string;
  likesCount: number;
  isViewed?: boolean;
}

export type FeedPostType =
  | 'course_ad'         // Tolotra Cours & Fampianarana (Mpampianatra / Prof)
  | 'student_request'   // Fikarohana cours / Fanontaniana (Mpianatra)
  | 'news_local'        // Vaovao fanabeazana Madagasikara (MEN, BACC, BEPC, Concours)
  | 'news_international'// Vaovao fanabeazana Iraisam-pirenena (Bourses, Campus, Teknolojia)
  | 'tip'               // Toro-hevitra & Lesona fohy (Astuces, Résumés)
  | 'video';            // Horonantsary fampianarana & Tuto

export type FeedCategory =
  | 'all'
  | 'courses'
  | 'news'
  | 'videos'
  | 'tips'
  | 'requests';

export interface FeedComment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  authorAvatar?: string;
  content: string;
  likesCount: number;
  createdAt: string;
}

export interface FeedPost {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  authorAvatar: string;
  authorBadge?: string;
  type: FeedPostType;
  category: FeedCategory;
  title?: string;
  content: string;
  tags: string[];
  mediaType?: 'image' | 'video' | 'none';
  mediaUrl?: string;
  videoDuration?: string;
  sourceName?: string;
  sourceUrl?: string;
  targetLevel?: Level | 'Toutes';
  targetSeries?: Series | 'Toutes';
  targetSubject?: SubjectId | 'general';
  courseInfo?: {
    courseId?: string;
    isPaid: boolean;
    priceAriary?: number;
    scheduleDate?: string;
    scheduleTime?: string;
    contactPhone?: string;
    contactEmail?: string;
    meetingUrl?: string;
    actionLabel?: string;
  };
  reactions: {
    like: number;    // 👍 / ❤️
    idea: number;    // 💡
    applause: number;// 👏
    fire: number;    // 🔥
  };
  userReaction?: 'like' | 'idea' | 'applause' | 'fire' | null;
  commentsCount: number;
  sharesCount: number;
  comments: FeedComment[];
  isPinned?: boolean;
  isOfficial?: boolean;
  createdAt: string;
}
