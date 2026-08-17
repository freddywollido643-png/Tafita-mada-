import React from 'react';
import { useApp, AppTab } from '../context/AppContext';
import { Home, BookOpen, FileText, Bot, Menu, Sparkles } from 'lucide-react';

export const BottomNav: React.FC<{
  onOpenProfile: () => void;
  onOpenMenu: () => void;
}> = ({ onOpenProfile, onOpenMenu }) => {
  const { currentTab, setCurrentTab, userProfile } = useApp();
  const isTeacher = userProfile.role === 'teacher' || userProfile.role === 'admin';

  const primaryTabs: { id: AppTab | 'menu'; labelMg: string; labelFr: string; icon: any }[] = [
    { id: 'home', labelMg: 'Accueil', labelFr: 'Accueil', icon: Home },
    { id: 'lessons', labelMg: 'Cours', labelFr: 'Cours', icon: BookOpen },
    { id: 'exercises', labelMg: 'Exercices', labelFr: 'Exercices', icon: FileText },
    { id: 'ai', labelMg: 'AI TAFITA', labelFr: 'AI TAFITA', icon: Bot },
    { id: 'menu', labelMg: 'Menu ☰', labelFr: 'Menu ☰', icon: Menu }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 text-slate-300 shadow-2xl">
      <div className="max-w-md mx-auto flex items-center justify-around px-2 py-2">
        {primaryTabs.map(tab => {
          const Icon = tab.icon;
          const isActive = tab.id === 'menu' ? false : currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.id === 'menu') {
                  onOpenMenu();
                } else {
                  setCurrentTab(tab.id as AppTab);
                }
              }}
              className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all relative ${
                isActive
                  ? 'text-amber-400 font-bold bg-slate-800/80 scale-105'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'text-amber-400' : ''}`} />
                {tab.id === 'menu' && isTeacher && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400" />
                )}
              </div>
              <span className="text-[10px] mt-1 font-medium">
                {userProfile.language === 'mg' ? tab.labelMg : tab.labelFr}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
