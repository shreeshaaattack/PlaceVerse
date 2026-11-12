import React, { useEffect } from 'react';
import { 
  X, 
  Star, 
  Plane, 
  Train, 
  Camera, 
  Utensils, 
  ShieldAlert, 
  ExternalLink,
  Plus,
  Check,
  Bookmark,
  Scale
} from 'lucide-react';
import { Place } from '../types/place';

interface PlaceDetailModalProps {
  place: Place | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  isInTrip: boolean;
  onToggleTrip: (id: string) => void;
  isCompared: boolean;
  onToggleCompare: (id: string) => void;
}

export const PlaceDetailModal: React.FC<PlaceDetailModalProps> = ({
  place,
  onClose,
  isSaved,
  onToggleSave,
  isInTrip,
  onToggleTrip,
  isCompared,
  onToggleCompare,
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!place) return null;

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${place.name}, ${place.state}, India`
  )}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div 
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl text-white my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image Hero */}
        <div className="relative h-64 sm:h-80 w-full shrink-0 bg-slate-950">
          <img
            src={place.imageUrl}
            alt={place.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/70 hover:bg-slate-900 text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700/60 z-10"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Overlay info */}
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-2 text-xs text-teal-300 font-medium mb-1 drop-shadow">
              <span>{place.category}</span>
              <span>·</span>
              <span>{place.state}</span>
              <span>·</span>
              <span>{place.zone} India</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-md">
              {place.name}
            </h2>
            <p className="text-sm text-teal-200 drop-shadow mt-0.5">
              {place.tagline}
            </p>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800">
            <div>
              <div className="text-[11px] text-slate-400">Rating</div>
              <div className="text-sm font-bold text-amber-300 flex items-center gap-1 mt-0.5">
                <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
                <span>{place.rating.toFixed(1)} / 5.0</span>
              </div>
            </div>

            <div>
              <div className="text-[11px] text-slate-400">Crowd Index</div>
              <div className={`text-sm font-bold mt-0.5 ${
                place.crowdLevel === 'Low' ? 'text-emerald-400' : 'text-amber-300'
              }`}>
                {place.crowdLevel} Density
              </div>
            </div>

            <div>
              <div className="text-[11px] text-slate-400">Est. Daily Budget</div>
              <div className="text-sm font-bold text-teal-300 font-mono mt-0.5">
                ₹{place.estimatedDailyCostInr.toLocaleString('en-IN')}
              </div>
            </div>

            <div>
              <div className="text-[11px] text-slate-400">Ideal Duration</div>
              <div className="text-sm font-bold text-white mt-0.5">
                {place.idealDurationDays} Days
              </div>
            </div>
          </div>

          {/* Detailed Overview */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-teal-400 mb-2">
              About This Destination
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {place.description}
            </p>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-teal-400 mb-2">
              Key Experiences &amp; Highlights
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {place.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-950/50 border border-slate-800 text-xs text-slate-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0 mt-1.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Logistics & Connectivity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <Plane className="w-4 h-4 text-teal-400" />
                <span>Nearest Airport:</span>
              </div>
              <div className="text-xs text-slate-300">{place.nearestAirport}</div>

              <div className="text-xs font-bold text-white flex items-center gap-1.5 pt-2 border-t border-slate-800">
                <Train className="w-4 h-4 text-teal-400" />
                <span>Nearest Railway:</span>
              </div>
              <div className="text-xs text-slate-300">{place.nearestRailway}</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-teal-400" />
                <span>Photography Regulations:</span>
              </div>
              <div className="text-xs text-slate-300">{place.photographyRules}</div>

              <div className="text-xs font-bold text-white flex items-center gap-1.5 pt-2 border-t border-slate-800">
                <span>Entry &amp; ASI Fees:</span>
              </div>
              <div className="text-xs text-slate-300">
                {place.entryFeeInr > 0 ? `₹${place.entryFeeInr} per person` : 'Free public access'}
              </div>
            </div>
          </div>

          {/* Cultural Etiquette Notice */}
          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/50">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300 mb-1">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>Cultural Etiquette &amp; Local Protocol</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {place.culturalEtiquette}
            </p>
          </div>

          {/* Local Food Specialties */}
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-400 mb-2">
              <Utensils className="w-4 h-4" />
              <span>Recommended Local Cuisine</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {place.localFood.map((dish, idx) => (
                <div key={idx} className="text-xs bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-lg text-slate-200">
                  {dish}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Sticky Footer Actions */}
        <div className="p-4 sm:p-6 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {/* External Google Maps Link */}
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open in Maps</span>
            </a>

            {/* Compare Toggle */}
            <button
              onClick={() => onToggleCompare(place.id)}
              className={`px-3 py-2 text-xs font-medium rounded-xl flex items-center gap-1.5 cursor-pointer ${
                isCompared
                  ? 'bg-teal-900/60 text-teal-300 border border-teal-700/60'
                  : 'text-slate-300 hover:text-white bg-slate-900 border border-slate-800'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>{isCompared ? 'In Compare' : 'Add to Compare'}</span>
            </button>

            {/* Save Toggle */}
            <button
              onClick={() => onToggleSave(place.id)}
              className={`p-2 text-xs font-medium rounded-xl flex items-center justify-center cursor-pointer ${
                isSaved
                  ? 'bg-amber-500 text-slate-950'
                  : 'text-slate-300 hover:text-white bg-slate-900 border border-slate-800'
              }`}
              title={isSaved ? 'Remove Bookmark' : 'Bookmark Destination'}
            >
              <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Add to Trip / Close */}
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white cursor-pointer"
            >
              Close
            </button>

            <button
              onClick={() => onToggleTrip(place.id)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                isInTrip
                  ? 'bg-teal-900 text-teal-200 border border-teal-600'
                  : 'bg-teal-400 hover:bg-teal-300 text-slate-950 shadow-md shadow-teal-950'
              }`}
            >
              {isInTrip ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Trip Planner</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add to Trip Planner</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
