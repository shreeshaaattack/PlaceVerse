import React from 'react';
import { 
  Compass, 
  MapPin, 
  CheckCircle, 
  Sparkles, 
  FileText
} from 'lucide-react';
import { BUSINESS_MODEL_PROPOSALS, ROADMAP_PHASES } from '../data/startupPitchData';

interface BusinessModelAndRoadmapProps {
  onExplorePlaces: () => void;
  onPlanTrip: () => void;
  onOpenPitchDeck: () => void;
}

export const BusinessModelAndRoadmap: React.FC<BusinessModelAndRoadmapProps> = ({
  onExplorePlaces,
  onPlanTrip,
  onOpenPitchDeck,
}) => {
  return (
    <section id="business-model" className="py-20 bg-slate-950 text-white border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section 1: Target Customers */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">
              Customer Segments
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-1">
              Who Uses PlaceVerse?
            </h2>
            <p className="mt-3 text-slate-300 text-sm">
              Designed for high-intent domestic travelers who prioritize depth, regional culture, and authentic discovery over commercial checklists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Persona 1 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-teal-950/80 border border-teal-800 flex items-center justify-center text-teal-400 mb-4">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">The Weekend Escapist</h3>
                <div className="text-xs text-teal-400 font-medium mt-0.5">Metropolitan Gen Z &amp; Tech Workers</div>
                <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                  Living in Bengaluru, Mumbai, NCR, or Hyderabad. Seeks uncrowded 2 to 4-day road trips within 300km. Wants practical road-trip ideas, destination information and indicative budget breakdowns.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-1.5">
                <span className="text-teal-400 font-bold">Key Need:</span>
                <span>Fast, pre-tested itineraries without logistical guesswork</span>
              </div>
            </div>

            {/* Persona 2 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-950/80 border border-amber-800 flex items-center justify-center text-amber-400 mb-4">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">The Heritage &amp; Culture Buff</h3>
                <div className="text-xs text-amber-400 font-medium mt-0.5">Photographers, Historians &amp; Solo Travelers</div>
                <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                  Drawn to 14th-century temple architecture, living tribal weaving practices, ancient rock inscriptions, and monastic sanctuaries. Demands cultural etiquette rules and photography guidelines.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-1.5">
                <span className="text-amber-400 font-bold">Key Need:</span>
                <span>Authentic historical context, local craft workshops &amp; etiquette</span>
              </div>
            </div>

            {/* Persona 3 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-800 flex items-center justify-center text-emerald-400 mb-4">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">The Conscious Backpacker</h3>
                <div className="text-xs text-emerald-400 font-medium mt-0.5">Sustainable &amp; Overland Explorers</div>
                <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                  Passionate about zero-waste villages like Mawlynnong and Khonoma, community-run stilt homestays, and direct economic support to rural village artisans.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-1.5">
                <span className="text-emerald-400 font-bold">Key Need:</span>
                <span>Transparent local transit, homestay contacts, leave-no-trace intel</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Potential Business Model (PROPOSAL LABELING) */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-700/60 text-amber-300 text-xs font-semibold mb-3">
              <FileText className="w-3.5 h-3.5" />
              <span>Shark Tank Pitch Proposal · Projected Revenue Model</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white">
              Sustainable Business Model
            </h2>
            <p className="mt-2 text-slate-300 text-xs sm:text-sm">
              Note: The revenue figures and commissions below represent our strategic pitch proposal for commercial launch, maintaining a strict zero-display-ad commitment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BUSINESS_MODEL_PROPOSALS.map((bm, idx) => (
              <div key={idx} className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-amber-500/10 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-bl border-b border-l border-amber-500/20">
                  {bm.status}
                </div>
                <div>
                  <div className="text-xs font-semibold text-teal-400 mt-1">{bm.tag}</div>
                  <h3 className="text-base font-bold text-white mt-1">{bm.title}</h3>
                  <div className="text-xs font-mono font-bold text-amber-300 mt-2 bg-slate-950/60 px-2 py-1 rounded border border-slate-800 inline-block">
                    {bm.projection}
                  </div>
                  <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                    {bm.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Future Phased Roadmap */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">
              Execution Timeline
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-1">
              PlaceVerse Product Roadmap
            </h2>
            <p className="mt-3 text-slate-300 text-sm">
              Transparent evolution from our working prototype to a full-fledged national travel operating system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ROADMAP_PHASES.map((phase, idx) => (
              <div 
                key={idx} 
                className={`rounded-2xl p-6 border flex flex-col justify-between ${
                  idx === 0 
                    ? 'bg-slate-900/90 border-teal-500/50 shadow-lg shadow-teal-950' 
                    : 'bg-slate-900/40 border-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold text-teal-300">{phase.phase}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                      idx === 0 ? 'bg-teal-900 text-teal-200 border border-teal-700' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {phase.badge}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-slate-400 mb-4">{phase.status}</div>

                  <ul className="space-y-2.5">
                    {phase.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="text-xs text-slate-300 flex items-start gap-2">
                        <CheckCircle className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                          idx === 0 ? 'text-teal-400' : 'text-slate-500'
                        }`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final Shark Tank Call to Action Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-teal-950 via-slate-900 to-indigo-950 border border-teal-800/40 p-8 sm:p-12 text-center max-w-5xl mx-auto shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(13,148,136,0.15),transparent)] pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-teal-300 bg-teal-900/60 px-3 py-1 rounded-full border border-teal-700/60 mb-4">
              Shark Tank Pitch &amp; College Demo
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to Discover India Beyond the Ordinary?
            </h2>
            <p className="mt-4 text-slate-300 text-sm leading-relaxed">
              Explore the destination catalogue, compare places side-by-side, or build a sample multi-day itinerary.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onExplorePlaces}
                className="w-full sm:w-auto px-7 py-3 rounded-xl font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:scale-105"
              >
                <Compass className="w-4 h-4" />
                <span>Explore Live Catalogue</span>
              </button>

              <button
                onClick={onPlanTrip}
                className="w-full sm:w-auto px-7 py-3 rounded-xl font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-600 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-105"
              >
                <span>Launch Trip Planner</span>
              </button>

              <button
                onClick={onOpenPitchDeck}
                className="w-full sm:w-auto px-7 py-3 rounded-xl font-semibold text-amber-300 bg-amber-950/60 hover:bg-amber-900/60 border border-amber-600/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Pitch Presenter Mode</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
