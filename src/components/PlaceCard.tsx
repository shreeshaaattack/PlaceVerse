import React, { useState } from 'react';
import { 
  Bookmark, 
  Plus, 
  Check, 
  MapPin, 
  Scale, 
  Star, 
  Eye
} from 'lucide-react';
import { Place } from '../types/place';

interface PlaceCardProps {
  place: Place;
  isSaved: boolean;
  onToggleSave: (placeId: string) => void;
  isInTrip: boolean;
  onToggleTrip: (placeId: string) => void;
  isCompared: boolean;
  onToggleCompare: (placeId: string) => void;
  onViewDetails: (place: Place) => void;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({
  place,
  isSaved,
  onToggleSave,
  isInTrip,
  onToggleTrip,
  isCompared,
  onToggleCompare,
  onViewDetails,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <article className="group relative bg-slate-900/80 border border-slate-800 hover:border-teal-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-teal-950/40 flex flex-col justify-between">
      {/* Top Image Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-slate-800 animate-pulse" />
        )}

        {imageError ? (
          <div 
            className="w-full h-full flex flex-col items-center justify-center p-4 text-center"
            style={{ backgroundColor: place.fallbackColor || '#0f172a' }}
          >
            <MapPin className="w-8 h-8 text-teal-400 mb-2 opacity-80" />
            <span className="text-xs font-semibold text-white/90">{place.name}</span>
            <span className="text-[11px] text-teal-300">{place.state}</span>
          </div>
        ) : (
          <img
            src={place.imageUrl}
            alt={place.name}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Gradient overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />

        {/* Corner Quick Actions */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          {/* Compare toggle button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleCompare(place.id);
            }}
            className={`p-2 rounded-lg text-xs font-medium transition-colors backdrop-blur-md cursor-pointer ${
              isCompared
                ? 'bg-teal-500 text-slate-950 font-bold shadow-md'
                : 'bg-slate-950/70 text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-700/60'
            }`}
            title={isCompared ? 'Remove from compare' : 'Add to comparison'}
            aria-label="Compare destination"
          >
            <Scale className="w-3.5 h-3.5" />
          </button>

          {/* Bookmark / Save button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(place.id);
            }}
            className={`p-2 rounded-lg text-xs font-medium transition-colors backdrop-blur-md cursor-pointer ${
              isSaved
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                : 'bg-slate-950/70 text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-700/60'
            }`}
            title={isSaved ? 'Saved to bookmarks' : 'Save to bookmarks'}
            aria-label="Save destination"
          >
            <Bookmark className="w-3.5 h-3.5" fill={isSaved ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Bottom image overlay metadata: State & Duration */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-200 z-10 pointer-events-none">
          <div className="flex items-center gap-1 font-medium drop-shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-teal-400" />
            <span>{place.state}</span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-300">{place.zone} India</span>
          </div>
          <div className="text-[11px] text-teal-300 font-mono font-medium drop-shadow-sm">
            {place.idealDurationDays} Days Ideal
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Zero-Pill Metadata Line: Category · Budget · Crowd */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2 font-medium">
            <span className="text-teal-400">{place.category}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>₹{place.estimatedDailyCostInr.toLocaleString('en-IN')}/day</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className={place.crowdLevel === 'Low' ? 'text-emerald-400' : 'text-amber-300'}>
              {place.crowdLevel} crowd
            </span>
          </div>

          {/* Place Title & Rating */}
          <div className="flex items-start justify-between gap-2">
            <h3 
              onClick={() => onViewDetails(place)}
              className="text-lg font-bold text-white group-hover:text-teal-300 transition-colors cursor-pointer"
            >
              {place.name}
            </h3>
            <div className="flex items-center gap-1 text-xs text-amber-300 font-bold shrink-0 pt-0.5">
              <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
              <span>{place.rating.toFixed(1)}</span>
            </div>
          </div>

          <p className="text-xs text-teal-200/90 font-medium mt-1 line-clamp-1">
            {place.tagline}
          </p>

          <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
            {place.description}
          </p>

          {/* Best Time To Visit text */}
          <div className="mt-3 text-[11px] text-slate-400">
            <span className="text-slate-500">Best season:</span>{' '}
            <span className="text-slate-300 font-medium">
              {place.bestMonths.slice(0, 3).join(', ')}
              {place.bestMonths.length > 3 ? ` +${place.bestMonths.length - 3}` : ''}
            </span>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center gap-2">
          {/* View Details */}
          <button
            onClick={() => onViewDetails(place)}
            className="flex-1 py-2 px-3 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700/80 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Details</span>
          </button>

          {/* Add to Trip */}
          <button
            onClick={() => onToggleTrip(place.id)}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              isInTrip
                ? 'bg-teal-900/60 text-teal-300 border border-teal-700/60 hover:bg-teal-900'
                : 'bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold shadow-sm shadow-teal-950'
            }`}
          >
            {isInTrip ? (
              <>
                <Check className="w-3.5 h-3.5 text-teal-400" />
                <span>In Trip</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add to Trip</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
