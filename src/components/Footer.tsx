import React, { useState } from 'react';
import { 
  Compass, 
  Presentation, 
  Check, 
  Info
} from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenPitchDeck: () => void;
  onOpenContribute: () => void;
  onOpenTripPlanner: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateSection,
  onOpenPitchDeck,
  onOpenContribute,
  onOpenTripPlanner,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setNewsletterEmail('');
    }, 3000);
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-white pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center text-slate-950 shadow-lg shadow-teal-500/20">
                <Compass className="w-5 h-5" strokeWidth={2.5} />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-teal-200 bg-clip-text text-transparent">
                  PlaceVerse India
                </span>
                <p className="text-xs text-slate-400">Beyond the Ordinary</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              PlaceVerse is an independent travel-tech discovery platform dedicated to uncovering India's authentic cultural heritage, offbeat landscapes, and sustainable regional journeys with zero commercial listicles.
            </p>

            {/* Academic & Pitch Prototype Disclaimer Notice */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
              <Info className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <span>
                <strong>Startup Pitch &amp; College Project Demonstration:</strong> All market figures, business models, and monetization plans presented are strategic proposals for Shark Tank and institutional evaluation.
              </span>
            </div>
          </div>

          {/* Col 3: Platform Discovery */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-4">
              Discovery Engine
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => onNavigateSection('discovery')}
                  className="hover:text-teal-300 transition-colors cursor-pointer text-left"
                >
                  Verified Offbeat Catalogue
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('interactive-map')}
                  className="hover:text-teal-300 transition-colors cursor-pointer text-left"
                >
                  Interactive India Map
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTripPlanner}
                  className="hover:text-teal-300 transition-colors cursor-pointer text-left"
                >
                  Multi-Day Trip Planner
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContribute}
                  className="hover:text-teal-300 transition-colors cursor-pointer text-left"
                >
                  Contribute Hidden Gem
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Startup Deck & Governance */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-4">
              Startup Pitch
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={onOpenPitchDeck}
                  className="hover:text-amber-300 text-amber-400/90 font-medium transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <Presentation className="w-3.5 h-3.5" />
                  <span>2-Min Shark Tank Deck</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('problem-solution')}
                  className="hover:text-teal-300 transition-colors cursor-pointer text-left"
                >
                  The Discovery Problem
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('business-model')}
                  className="hover:text-teal-300 transition-colors cursor-pointer text-left"
                >
                  Proposed Unit Economics
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('business-model')}
                  className="hover:text-teal-300 transition-colors cursor-pointer text-left"
                >
                  Phased Product Roadmap
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Field Dispatch Newsletter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-4">
              Curated Field Intel
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Monthly offbeat dispatch of seasonal bloomings, tribal festivals, and road condition updates.
            </p>

            {subscribed ? (
              <div className="p-2.5 rounded-xl bg-teal-950/60 border border-teal-800 text-teal-300 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Subscribed to PlaceVerse Field Notes!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="explorer@domain.com"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 rounded-xl text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 transition-colors cursor-pointer"
                >
                  Get Offbeat Dispatches
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Student Project Credit */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} PlaceVerse Technologies India. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-slate-400">Crafted for travel explorers across India</span>
            <span>·</span>
            <span className="text-teal-400">Zero Commercial Ads</span>
            <span>·</span>
            <span className="text-amber-400">Shark Tank Pitch Candidate</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
