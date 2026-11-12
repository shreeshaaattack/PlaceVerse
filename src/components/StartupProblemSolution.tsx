import React from 'react';
import { 
  AlertOctagon, 
  CheckCircle, 
  Clock, 
  TrendingDown, 
  ShieldCheck
} from 'lucide-react';
import { STARTUP_PROBLEM_ITEMS, STARTUP_SOLUTION_ITEMS } from '../data/startupPitchData';

interface StartupProblemSolutionProps {
  onExplorePlaces: () => void;
  onOpenPitchDeck: () => void;
}

export const StartupProblemSolution: React.FC<StartupProblemSolutionProps> = ({
  onExplorePlaces,
  onOpenPitchDeck,
}) => {
  return (
    <section id="problem-solution" className="py-20 bg-slate-900 border-t border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-teal-400 mb-2">
            The Travel-Tech Narrative
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Why India's Travel Discovery is Broken &amp; How PlaceVerse Fixes It
          </h2>
          <p className="mt-4 text-slate-300 text-base leading-relaxed">
            Travel information is often spread across blogs, maps, review sites and booking platforms, making it difficult to discover lesser-known destinations and plan a trip in one place.
          </p>
        </div>

        {/* Problem vs Solution Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* THE PROBLEM PANEL */}
          <div className="bg-slate-950/80 border border-rose-900/40 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-rose-950 border border-rose-800/80 flex items-center justify-center text-rose-400">
                  <AlertOctagon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-400">The Problem</span>
                  <h3 className="text-xl font-bold text-white">The Overtourism &amp; SEO Trap</h3>
                </div>
              </div>

              <div className="space-y-6">
                {STARTUP_PROBLEM_ITEMS.map((item, idx) => (
                  <div key={idx} className="border-l-2 border-rose-800/60 pl-4 py-1">
                    <h4 className="text-sm font-bold text-rose-200">{item.title}</h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{item.problem}</p>
                    <div className="text-[11px] text-rose-300/80 mt-1.5 flex items-center gap-1.5">
                      <TrendingDown className="w-3.5 h-3.5 shrink-0" />
                      <span>{item.impact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800/80 bg-rose-950/20 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-6 rounded-b-2xl">
              <div className="text-xs font-medium text-rose-300 flex items-center gap-2">
                <Clock className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Result: Planning can involve switching between multiple websites, maps and notes.</span>
              </div>
            </div>
          </div>

          {/* THE PLACEVERSE SOLUTION PANEL */}
          <div className="bg-slate-950/80 border border-teal-800/50 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-teal-950 border border-teal-700/80 flex items-center justify-center text-teal-400">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-400">The Solution</span>
                  <h3 className="text-xl font-bold text-white">Destination Discovery &amp; Smart Trips</h3>
                </div>
              </div>

              <div className="space-y-6">
                {STARTUP_SOLUTION_ITEMS.map((item, idx) => (
                  <div key={idx} className="border-l-2 border-teal-500/80 pl-4 py-1">
                    <h4 className="text-sm font-bold text-teal-200">{item.title}</h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800/80 bg-teal-950/20 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-6 rounded-b-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs font-medium text-teal-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Outcome: A simpler journey from destination discovery to a sample trip plan.</span>
              </div>
              <button
                onClick={onExplorePlaces}
                className="px-4 py-2 text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg transition-colors cursor-pointer shrink-0"
              >
                Explore Solution
              </button>
            </div>
          </div>
        </div>

        {/* Startup Differentiators 4-Column Bar */}
        <div className="mt-16 bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">Unfair Advantages</span>
            <h3 className="text-xl font-bold text-white mt-1">Key PlaceVerse Differentiators</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="w-8 h-8 rounded-lg bg-teal-950 border border-teal-800 text-teal-400 flex items-center justify-center font-bold text-sm mb-3">
                01
              </div>
              <h4 className="text-sm font-bold text-white">Authentic Etiquette Intel</h4>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Crucial local rules, village chieftain protocols, photography restrictions, and sacred decorum that mainstream sites omit.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="w-8 h-8 rounded-lg bg-teal-950 border border-teal-800 text-teal-400 flex items-center justify-center font-bold text-sm mb-3">
                02
              </div>
              <h4 className="text-sm font-bold text-white">Side-by-Side Matrix</h4>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Objective comparative engine benchmarking travel seasons, crowd indices, and realistic day-by-day budget estimates.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="w-8 h-8 rounded-lg bg-teal-950 border border-teal-800 text-teal-400 flex items-center justify-center font-bold text-sm mb-3">
                03
              </div>
              <h4 className="text-sm font-bold text-white">Executable Day-by-Day Trips</h4>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Not just pins on a map: dynamic multi-day scheduling with automatic gear checklists tailored to region and climate.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="w-8 h-8 rounded-lg bg-teal-950 border border-teal-800 text-teal-400 flex items-center justify-center font-bold text-sm mb-3">
                04
              </div>
              <h4 className="text-sm font-bold text-white">Dual-Gated Community Curation</h4>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Explorers submit discoveries; an Admin moderation pipeline filters fake spam before publication.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
