import React, { useState } from 'react';
import { 
  Compass, 
  Bookmark, 
  Calendar, 
  Scale, 
  PlusCircle, 
  ShieldCheck, 
  Presentation, 
  Menu, 
  X
} from 'lucide-react';
import { UserRole } from '../types/place';

interface NavbarProps {
  userRole: UserRole;
  onToggleRole: () => void;
  savedCount: number;
  onOpenSaved: () => void;
  tripPlacesCount: number;
  onOpenTripPlanner: () => void;
  compareCount: number;
  onOpenCompare: () => void;
  onOpenContribute: () => void;
  onOpenAdmin: () => void;
  onOpenPitchDeck: () => void;
  pendingContributionsCount: number;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  userRole,
  onToggleRole,
  savedCount,
  onOpenSaved,
  tripPlacesCount,
  onOpenTripPlanner,
  compareCount,
  onOpenCompare,
  onOpenContribute,
  onOpenAdmin,
  onOpenPitchDeck,
  pendingContributionsCount,
  onNavigateSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    onNavigateSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 text-white transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Identity */}
          <div 
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 via-teal-600 to-emerald-700 flex items-center justify-center shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5 text-slate-950" strokeWidth={2.5} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-teal-200 bg-clip-text text-transparent">
                  PlaceVerse
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-teal-400 bg-teal-950/80 border border-teal-800/60 px-1.5 py-0.5 rounded">
                  India
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                Beyond the Ordinary
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
            <button
              onClick={() => handleNavClick('discovery')}
              className="hover:text-teal-400 transition-colors cursor-pointer"
            >
              Discover Places
            </button>
            <button
              onClick={() => handleNavClick('interactive-map')}
              className="hover:text-teal-400 transition-colors cursor-pointer"
            >
              Interactive Map
            </button>
            <button
              onClick={() => handleNavClick('problem-solution')}
              className="hover:text-teal-400 transition-colors cursor-pointer"
            >
              Why PlaceVerse
            </button>
            <button
              onClick={() => handleNavClick('business-model')}
              className="hover:text-teal-400 transition-colors cursor-pointer"
            >
              Startup Model
            </button>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Shark Tank Pitch Deck Trigger */}
            <button
              onClick={onOpenPitchDeck}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-amber-500/20 to-amber-600/30 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-all cursor-pointer shadow-sm hover:scale-[1.02]"
              title="Launch 2-3 minute Shark Tank pitch presenter deck"
            >
              <Presentation className="w-3.5 h-3.5" />
              <span>Pitch Deck</span>
            </button>

            {/* Compare trigger */}
            <button
              onClick={onOpenCompare}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                compareCount > 0 
                  ? 'bg-teal-900/60 text-teal-300 border border-teal-700/60' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
              title="Compare destinations side by side"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Compare</span>
              {compareCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-teal-500 text-slate-950 font-bold text-[10px] flex items-center justify-center">
                  {compareCount}
                </span>
              )}
            </button>

            {/* Saved Places */}
            <button
              onClick={onOpenSaved}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer"
              title="View saved destinations"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Saved</span>
              {savedCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Trip Planner */}
            <button
              onClick={onOpenTripPlanner}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-teal-600 hover:bg-teal-500 text-slate-950 transition-all cursor-pointer shadow-md shadow-teal-950 hover:shadow-teal-600/20"
              title="Open multi-day Trip Planner"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Trip Plan</span>
              {tripPlacesCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-slate-950 text-teal-300 font-bold text-[10px] flex items-center justify-center">
                  {tripPlacesCount}
                </span>
              )}
            </button>

            {/* Role Switcher (Explorer vs Admin) */}
            <div className="flex items-center border border-slate-800 bg-slate-900 rounded-lg p-0.5 ml-1">
              <button
                onClick={onToggleRole}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  userRole === 'admin' 
                    ? 'bg-rose-950/80 text-rose-300 border border-rose-800/50' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title={`Switch Role: currently in ${userRole.toUpperCase()} mode`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="capitalize">{userRole}</span>
                {userRole === 'admin' && pendingContributionsCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-rose-500 text-white font-bold text-[10px] flex items-center justify-center">
                    {pendingContributionsCount}
                  </span>
                )}
              </button>

              {userRole === 'admin' ? (
                <button
                  onClick={onOpenAdmin}
                  className="px-2 py-1 text-xs font-medium text-rose-400 hover:text-rose-200 underline cursor-pointer"
                  title="Open Admin Moderation Panel"
                >
                  Panel
                </button>
              ) : (
                <button
                  onClick={onOpenContribute}
                  className="px-2 py-1 text-xs font-medium text-teal-400 hover:text-teal-200 cursor-pointer"
                  title="Contribute an offbeat gem"
                >
                  + Add
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenPitchDeck}
              className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold"
            >
              Pitch
            </button>
            <button
              onClick={onOpenTripPlanner}
              className="p-1.5 rounded-lg bg-teal-600 text-slate-950 font-bold text-xs"
            >
              Trip ({tripPlacesCount})
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-800 bg-slate-950 px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-800">
            <button
              onClick={() => handleNavClick('discovery')}
              className="text-left py-2 px-3 text-sm text-slate-300 hover:text-teal-400"
            >
              Discover Places
            </button>
            <button
              onClick={() => handleNavClick('interactive-map')}
              className="text-left py-2 px-3 text-sm text-slate-300 hover:text-teal-400"
            >
              Interactive Map
            </button>
            <button
              onClick={() => handleNavClick('problem-solution')}
              className="text-left py-2 px-3 text-sm text-slate-300 hover:text-teal-400"
            >
              Problem & Solution
            </button>
            <button
              onClick={() => handleNavClick('business-model')}
              className="text-left py-2 px-3 text-sm text-slate-300 hover:text-teal-400"
            >
              Business Model
            </button>
          </div>

          <div className="flex flex-col gap-2 pt-1">
            <button
              onClick={() => { onOpenSaved(); setMobileMenuOpen(false); }}
              className="flex items-center justify-between py-2 px-3 rounded-lg bg-slate-900 text-sm text-slate-200"
            >
              <span className="flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-amber-400" /> Saved Places
              </span>
              <span className="text-xs bg-slate-800 px-2 py-0.5 rounded text-amber-300 font-semibold">{savedCount}</span>
            </button>

            <button
              onClick={() => { onOpenCompare(); setMobileMenuOpen(false); }}
              className="flex items-center justify-between py-2 px-3 rounded-lg bg-slate-900 text-sm text-slate-200"
            >
              <span className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-teal-400" /> Compare Places
              </span>
              <span className="text-xs bg-slate-800 px-2 py-0.5 rounded text-teal-300 font-semibold">{compareCount}</span>
            </button>

            <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-slate-900 text-sm text-slate-200">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-400" /> Active Role: <strong className="capitalize">{userRole}</strong>
              </span>
              <button
                onClick={onToggleRole}
                className="text-xs text-teal-400 underline"
              >
                Switch to {userRole === 'explorer' ? 'Admin' : 'Explorer'}
              </button>
            </div>

            {userRole === 'admin' ? (
              <button
                onClick={() => { onOpenAdmin(); setMobileMenuOpen(false); }}
                className="w-full py-2 px-3 rounded-lg bg-rose-950/80 border border-rose-800 text-rose-300 text-sm font-semibold flex items-center justify-center gap-2"
              >
                Admin Moderation Dashboard ({pendingContributionsCount})
              </button>
            ) : (
              <button
                onClick={() => { onOpenContribute(); setMobileMenuOpen(false); }}
                className="w-full py-2 px-3 rounded-lg bg-slate-800 text-teal-300 text-sm font-medium flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4" /> Contribute New Destination
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
