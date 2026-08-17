import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { NavigationDrawer } from './components/NavigationDrawer';
import { HomeDashboard } from './components/HomeDashboard';
import { LessonSystem } from './components/LessonSystem';
import { OnlineCourses } from './components/OnlineCourses';
import { ExerciseEngine } from './components/ExerciseEngine';
import { QuizSystem } from './components/QuizSystem';
import { AiTafita } from './components/AiTafita';
import { BacTraining } from './components/BacTraining';
import { RevisionPlanner } from './components/RevisionPlanner';
import { ProgressDashboard } from './components/ProgressDashboard';
import { OfflineDownloads } from './components/OfflineDownloads';
import { MenNewsSection } from './components/MenNewsSection';
import { TeacherPortal } from './components/TeacherPortal';
import { AdminDashboard } from './components/AdminDashboard';
import { StudentProfileView } from './components/StudentProfileView';
import { AndroidExportModal } from './components/AndroidExportModal';
import { DerivativeAppModule } from './components/DerivativeAppModule';

const AppContent: React.FC = () => {
  const { currentTab, setCurrentTab } = useApp();
  const [isAndroidModalOpen, setIsAndroidModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Top Application Header */}
      <Header
        onOpenProfile={() => setCurrentTab('profile')}
        onOpenMenu={() => setIsMenuOpen(true)}
      />

      {/* Main Content Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
        {currentTab === 'home' && (
          <HomeDashboard
            onOpenAndroidModal={() => setIsAndroidModalOpen(true)}
            onOpenMenu={() => setIsMenuOpen(true)}
          />
        )}
        {currentTab === 'lessons' && <LessonSystem />}
        {currentTab === 'online-courses' && <OnlineCourses />}
        {currentTab === 'exercises' && <ExerciseEngine />}
        {currentTab === 'quizzes' && <QuizSystem />}
        {currentTab === 'ai' && <AiTafita />}
        {currentTab === 'bac' && <BacTraining defaultExamType="BAC" />}
        {currentTab === 'bepc' && <BacTraining defaultExamType="BEPC" />}
        {currentTab === 'news' && <MenNewsSection />}
        {currentTab === 'revision' && <RevisionPlanner />}
        {currentTab === 'progress' && <ProgressDashboard />}
        {currentTab === 'downloads' && <OfflineDownloads />}
        {currentTab === 'teacher' && <TeacherPortal />}
        {currentTab === 'admin' && <AdminDashboard />}
        {currentTab === 'profile' && <StudentProfileView />}
        {currentTab === 'derivative' && <DerivativeAppModule />}
      </main>

      {/* Bottom Sticky Mobile Navigation */}
      <BottomNav
        onOpenProfile={() => setCurrentTab('profile')}
        onOpenMenu={() => setIsMenuOpen(true)}
      />

      {/* Slide-over Navigation Drawer / Full Menu */}
      <NavigationDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOpenAndroidModal={() => setIsAndroidModalOpen(true)}
      />

      {/* Android APK & GitHub Actions Export Modal */}
      <AndroidExportModal
        isOpen={isAndroidModalOpen}
        onClose={() => setIsAndroidModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
