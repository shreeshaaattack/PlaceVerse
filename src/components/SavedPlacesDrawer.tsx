import React from 'react';
import { 
  X, 
  Bookmark, 
  Trash2, 
  Plus, 
  Check, 
  Eye, 
  ArrowRight
} from 'lucide-react';
import { Place } from '../types/place';

interface SavedPlacesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedPlaces: Place[];
  onRemoveSaved: (placeId: string) => void;
  onClearAllSaved: () => void;
  onViewDetails: (place: Place) => void;
  tripPlaceIds: Set<string>;
  onToggleTrip: (placeId: string) => void;
  onExploreMore: () => void;
}

export const SavedPlacesDrawer: React.FC<SavedPlacesDrawerProps> = ({
  isOpen,
  onClose,
  savedPlaces,
  onRemoveSaved,
  onClearAllSaved,
  onViewDetails,
  tripPlaceIds,
  onToggleTrip,
  onExploreMore,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm flex justify-end animate-fade-in">
      <div 
        className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full flex flex-col justify-between shadow-2xl text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <Bookmark className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Saved Bucket List</h2>
              <span className="text-[11px] text-slate-400">{savedPlaces.length} destinations saved</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {savedPlaces.length > 0 && (
              <button
                onClick={onClearAllSaved}
                className="text-[11px] text-slate-400 hover:text-rose-400 cursor-pointer"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* List of Saved Places */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3">
          {savedPlaces.length === 0 ? (
            <div className="py-16 text-center">
              <Bookmark className="w-10 h-10 text-slate-700 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-white">Your bucket list is empty</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                Click the bookmark icon on any destination card to save it for future trips.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onExploreMore();
                }}
                className="mt-5 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 transition-colors cursor-pointer"
              >
                Explore Destinations
              </button>
            </div>
          ) : (
            savedPlaces.map((place) => (
              <div 
                key={place.id}
                className="bg-slate-950/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-3 flex gap-3 transition-colors"
              >
                <img
                  src={place.thumbnailUrl}
                  alt={place.name}
                  className="w-20 h-20 rounded-xl object-cover shrink-0 cursor-pointer"
                  onClick={() => onViewDetails(place)}
                />

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 
                        onClick={() => onViewDetails(place)}
                        className="text-xs font-bold text-white hover:text-teal-300 cursor-pointer truncate"
                      >
                        {place.name}
                      </h4>
                      <button
                        onClick={() => onRemoveSaved(place.id)}
                        className="text-slate-500 hover:text-rose-400 p-0.5 cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[10px] text-teal-400 font-medium">
                      {place.state} · {place.zone} India
                    </div>

                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                      ₹{place.estimatedDailyCostInr.toLocaleString('en-IN')}/day
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 mt-2">
                    <button
                      onClick={() => onViewDetails(place)}
                      className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-[10px] font-medium text-slate-300 cursor-pointer"
                    >
                      Details
                    </button>

                    <button
                      onClick={() => onToggleTrip(place.id)}
                      className={`px-2 py-1 rounded text-[10px] font-bold cursor-pointer flex items-center gap-1 ${
                        tripPlaceIds.has(place.id)
                          ? 'bg-teal-900 text-teal-200 border border-teal-700'
                          : 'bg-teal-500 hover:bg-teal-400 text-slate-950'
                      }`}
                    >
                      {tripPlaceIds.has(place.id) ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>In Trip</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3 h-3" />
                          <span>Add to Trip</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800">
          <button
            onClick={() => {
              onClose();
              onExploreMore();
            }}
            className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Continue Exploring Places</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
