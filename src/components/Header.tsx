import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Wifi,
  WifiOff,
  Search,
  Globe,
  User,
  Menu,
  Sparkles
} from 'lucide-react';

export const Header: React.FC<{
  onOpenProfile: () => void;
  onOpenMenu: () => void;
}> = ({ onOpenProfile, onOpenMenu }) => {
  const {
    userProfile,
    updateUserProfile,
    effectiveIsOnline,
    isOfflineOverride,
    setIsOfflineOverride,
    setIsSearchModalOpen,
    setCurrentTab
  } = useApp();

  const isTeacher = userProfile.role === 'teacher' || userProfile.role === 'admin';

  return (
    <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        
        {/* Brand Logo & Motto */}
        <div
          onClick={() => setCurrentTab('home')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-500 flex items-center justify-center font-black text-xl shadow-md group-hover:scale-105 transition-transform">
            T
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white">
                TAFITA MADA
              </span>
              <span className="text-xs bg-amber-500/20 text-amber-300 font-semibold px-2 py-0.5 rounded-full border border-amber-500/30">
                V1.0
              </span>
            </div>
            <p className="text-[11px] text-slate-400 italic hidden sm:block">
              “Mianara anio, tafita rahampitso.”
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Online / Offline Status Badge & Toggle */}
          <button
            onClick={() => setIsOfflineOverride(!isOfflineOverride)}
            title={
              effectiveIsOnline
                ? 'ONLINE: Kitiho mba hampiasana ny mode OFFLINE (Kitiho hanao simulation)'
                : 'OFFLINE: Kitiho mba hamerenana ny ONLINE'
            }
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all ${
              effectiveIsOnline
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                : 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                effectiveIsOnline ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
              }`}
            />
            {effectiveIsOnline ? (
              <>
                <Wifi className="w-3.5 h-3.5" />
                <span className="hidden md:inline">ONLINE</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3.5 h-3.5" />
                <span>OFFLINE</span>
              </>
            )}
          </button>

          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchModalOpen(true)}
            className="p-2 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors border border-slate-750"
            title="Hikaroka (Recherche)"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Language Selector Toggle */}
          <button
            onClick={() =>
              updateUserProfile({
                language: userProfile.language === 'mg' ? 'fr' : 'mg'
              })
            }
            className="flex items-center space-x-1 text-xs font-medium px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 transition-colors border border-slate-750"
            title="Fiovana Teny (Langue)"
          >
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <span className="uppercase font-bold text-amber-400">
              {userProfile.language}
            </span>
          </button>

          {/* User Profile Trigger */}
          <button
            onClick={onOpenProfile}
            className="flex items-center space-x-2 p-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all"
            title="Mon Profil"
          >
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
              {userProfile.name.charAt(0).toUpperCase()}
            </div>
            <div className="text-left hidden lg:block pr-1">
              <div className="text-xs font-semibold text-white leading-tight">
                {userProfile.name}
              </div>
              <div className="text-[10px] text-amber-400 font-medium">
                {userProfile.level} - {userProfile.series}
              </div>
            </div>
          </button>

          {/* ☰ Prominent Menu Button (Social platform style main drawer trigger) */}
          <button
            onClick={onOpenMenu}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all active:scale-95 border border-amber-400/50"
            title="Sokafy ny Menu & Fitaovana rehetra"
          >
            <Menu className="w-4 h-4" />
            <span className="hidden sm:inline">Menu</span>
            {isTeacher && (
              <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping" />
            )}
          </button>

        </div>
      </div>
    </header>
  );
};
