import React from 'react';
import { 
  ArrowRight, 
  Compass, 
  Presentation, 
  Calendar, 
  Search
} from 'lucide-react';

interface HeroProps {
  totalPlaces: number;
  onExplorePlaces: () => void;
  onPlanTrip: () => void;
  onOpenPitchDeck: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectCategory: (category: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  totalPlaces,
  onExplorePlaces,
  onPlanTrip,
  onOpenPitchDeck,
  searchQuery,
  onSearchChange,
  onSelectCategory,
}) => {
  return (
    <section id="hero" className="relative overflow-hidden bg-slate-950 text-white pt-10 pb-20 lg:pt-16 lg:pb-28">
      {/* Subtle ambient background glow & grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(13,148,136,0.18),rgba(15,23,42,0))] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0a_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Startup Pitch Pill & Shark Tank Callout */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-teal-300 bg-teal-950/70 border border-teal-800/80 rounded-full">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span>Travel-Tech Startup Pitch & Working Prototype</span>
          </div>

          <button
            onClick={onOpenPitchDeck}
            className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-amber-300 bg-amber-950/60 border border-amber-700/60 rounded-full hover:bg-amber-900/40 transition-colors cursor-pointer"
          >
            <Presentation className="w-3.5 h-3.5" />
            <span>Launch 2-Min Shark Tank Deck</span>
          </button>
        </div>

        {/* Main Hero Headline & Subtitle */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white">
            Discover India <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-teal-400 via-emerald-300 to-amber-300 bg-clip-text text-transparent">
              Beyond the Ordinary.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto font-normal">
            PlaceVerse is India’s premier travel-tech discovery engine curating authentic, uncrowded cultural heritage, living tribal traditions, and high-altitude sanctuaries with instant multi-day smart itinerary planning.
          </p>

          {/* Primary Call to Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onExplorePlaces}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 transition-all shadow-lg shadow-teal-500/25 flex items-center justify-center gap-2 cursor-pointer group hover:scale-[1.02]"
            >
              <Compass className="w-5 h-5 group-hover:rotate-45 transition-transform" />
              <span>Explore Places</span>
              <ArrowRight className="w-4 h-4 ml-0.5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onPlanTrip}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-teal-500/60 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
            >
              <Calendar className="w-5 h-5 text-teal-400" />
              <span>Plan Your Trip</span>
            </button>
          </div>
        </div>

        {/* Fast Interactive Search Bar */}
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-2 shadow-2xl shadow-slate-950/60 backdrop-blur-md">
            <div className="flex items-center gap-3 px-3 py-1.5">
              <Search className="w-5 h-5 text-teal-400 shrink-0" />
              <input
                type="text"
                placeholder="Search Spiti, Hampi, living root bridges, Chettinad, trekking..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-transparent text-white placeholder-slate-400 focus:outline-none text-sm sm:text-base font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800"
                >
                  Clear
                </button>
              )}
              <button
                onClick={onExplorePlaces}
                className="hidden sm:inline-flex px-4 py-2 bg-teal-600 hover:bg-teal-500 text-slate-950 font-semibold rounded-xl text-xs shrink-0 cursor-pointer"
              >
                Find Gems
              </button>
            </div>

            {/* Quick Filter Prompts */}
            <div className="pt-2.5 pb-1 px-3 border-t border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
              <span className="text-slate-400 font-medium shrink-0">Popular:</span>
              <button
                onClick={() => onSelectCategory('Heritage & Architecture')}
                className="text-slate-300 hover:text-teal-300 hover:underline shrink-0 cursor-pointer"
              >
                Monuments & Ruins
              </button>
              <span className="text-slate-600">·</span>
              <button
                onClick={() => onSelectCategory('High Altitude & Treks')}
                className="text-slate-300 hover:text-teal-300 hover:underline shrink-0 cursor-pointer"
              >
                Himalayan Heights
              </button>
              <span className="text-slate-600">·</span>
              <button
                onClick={() => onSelectCategory('Offbeat Nature')}
                className="text-slate-300 hover:text-teal-300 hover:underline shrink-0 cursor-pointer"
              >
                Living Root Bridges
              </button>
              <span className="text-slate-600">·</span>
              <button
                onClick={() => onSelectCategory('Spiritual & Peaceful')}
                className="text-slate-300 hover:text-teal-300 hover:underline shrink-0 cursor-pointer"
              >
                River Islands & Satras
              </button>
            </div>
          </div>
        </div>

        {/* Real Product Proof & Stat Metrics (Based on real catalogue data) */}
        <div className="mt-14 max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-teal-400 font-mono">
              {totalPlaces}
            </div>
            <div className="text-xs text-slate-300 font-medium mt-1">Verified Destinations</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Across 6 Indian zones</div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              100%
            </div>
            <div className="text-xs text-slate-300 font-medium mt-1">Offbeat Ground Truth</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Zero commercial spam</div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">
              ₹1.5k–₹3.5k
            </div>
            <div className="text-xs text-slate-300 font-medium mt-1">Transparent Daily Budgets</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Stays, food & permits</div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
              3-Click
            </div>
            <div className="text-xs text-slate-300 font-medium mt-1">Smart Trip Builder</div>
            <div className="text-[11px] text-slate-400 mt-0.5">With gear checklist</div>
          </div>
        </div>
      </div>
    </section>
  );
};
