import React from 'react';
import { 
  X, 
  Scale, 
  Check, 
  Plus, 
  Trash2
} from 'lucide-react';
import { Place } from '../types/place';

interface PlaceComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  comparedPlaces: Place[];
  onRemoveFromCompare: (placeId: string) => void;
  tripPlaceIds: Set<string>;
  onToggleTrip: (placeId: string) => void;
  onClearAll: () => void;
  allPlaces: Place[];
  onAddPlaceToCompare: (placeId: string) => void;
}

export const PlaceComparisonModal: React.FC<PlaceComparisonModalProps> = ({
  isOpen,
  onClose,
  comparedPlaces,
  onRemoveFromCompare,
  tripPlaceIds,
  onToggleTrip,
  onClearAll,
  allPlaces,
  onAddPlaceToCompare,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div 
        className="relative w-full max-w-5xl bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl text-white my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-950 border border-teal-800 flex items-center justify-center text-teal-400">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Side-by-Side Place Comparison</h2>
              <p className="text-xs text-slate-400">
                Compare budget requirements, crowd indices, connectivity, and seasonal suitability.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {comparedPlaces.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs text-rose-400 hover:text-rose-300 font-medium px-3 py-1.5 rounded-lg bg-rose-950/40 border border-rose-900/60 cursor-pointer"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {comparedPlaces.length === 0 ? (
            <div className="py-16 text-center max-w-md mx-auto">
              <Scale className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white">No places selected for comparison</h3>
              <p className="text-xs text-slate-400 mt-2 mb-6">
                Click the scale icon on any place card or pick from the list below to evaluate options side-by-side.
              </p>
              <div className="text-xs text-left font-semibold text-teal-400 mb-2">Suggested to add:</div>
              <div className="flex flex-wrap gap-2 justify-center">
                {allPlaces.slice(0, 4).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => onAddPlaceToCompare(p.id)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 cursor-pointer flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5 text-teal-400" />
                    <span>{p.name} ({p.state})</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="p-4 w-44 font-semibold text-slate-400 uppercase tracking-wider text-[11px] bg-slate-950/40">
                      Metric / Attribute
                    </th>
                    {comparedPlaces.map((place) => (
                      <th key={place.id} className="p-4 min-w-[240px] bg-slate-950/20 align-top">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <span className="font-bold text-sm text-white block">{place.name}</span>
                            <span className="text-[11px] text-teal-300">{place.state}</span>
                          </div>
                          <button
                            onClick={() => onRemoveFromCompare(place.id)}
                            className="p-1 text-slate-500 hover:text-rose-400 rounded cursor-pointer"
                            title="Remove from comparison"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="relative aspect-video rounded-xl overflow-hidden mb-3 bg-slate-950">
                          <img src={place.thumbnailUrl} alt={place.name} className="w-full h-full object-cover" />
                        </div>

                        <button
                          onClick={() => onToggleTrip(place.id)}
                          className={`w-full py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                            tripPlaceIds.has(place.id)
                              ? 'bg-teal-900 text-teal-200 border border-teal-600'
                              : 'bg-teal-500 hover:bg-teal-400 text-slate-950'
                          }`}
                        >
                          {tripPlaceIds.has(place.id) ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>In Trip</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add to Trip</span>
                            </>
                          )}
                        </button>
                      </th>
                    ))}
                    {comparedPlaces.length < 3 && (
                      <th className="p-4 min-w-[200px] border border-dashed border-slate-800 rounded-2xl text-center align-middle bg-slate-950/10">
                        <div className="text-slate-400 text-xs mb-2">Compare another spot:</div>
                        <select
                          onChange={(e) => {
                            if (e.target.value) onAddPlaceToCompare(e.target.value);
                          }}
                          defaultValue=""
                          className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg p-2 text-xs focus:outline-none"
                        >
                          <option value="" disabled>Select destination...</option>
                          {allPlaces
                            .filter((p) => !comparedPlaces.some((cp) => cp.id === p.id))
                            .map((p) => (
                              <option key={p.id} value={p.id}>
                                {p.name} ({p.state})
                              </option>
                            ))}
                        </select>
                      </th>
                    )}
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-800/80">
                  {/* Category */}
                  <tr>
                    <td className="p-4 font-medium text-slate-400 bg-slate-950/40">Category / Theme</td>
                    {comparedPlaces.map((p) => (
                      <td key={p.id} className="p-4 text-teal-300 font-semibold">{p.category}</td>
                    ))}
                    {comparedPlaces.length < 3 && <td />}
                  </tr>

                  {/* Daily Cost */}
                  <tr>
                    <td className="p-4 font-medium text-slate-400 bg-slate-950/40">Daily Est. Budget</td>
                    {comparedPlaces.map((p) => (
                      <td key={p.id} className="p-4 font-mono font-bold text-amber-300">
                        ₹{p.estimatedDailyCostInr.toLocaleString('en-IN')}/day
                        <span className="block text-[10px] text-slate-400 font-sans font-normal mt-0.5">
                          {p.budgetTier.split(' ')[0]} tier
                        </span>
                      </td>
                    ))}
                    {comparedPlaces.length < 3 && <td />}
                  </tr>

                  {/* Crowd Level */}
                  <tr>
                    <td className="p-4 font-medium text-slate-400 bg-slate-950/40">Crowd Density</td>
                    {comparedPlaces.map((p) => (
                      <td key={p.id} className="p-4">
                        <span className={`font-bold ${
                          p.crowdLevel === 'Low' ? 'text-emerald-400' : 'text-amber-300'
                        }`}>
                          {p.crowdLevel}
                        </span>
                        <span className="block text-[11px] text-slate-400 mt-0.5">
                          {p.crowdLevel === 'Low' ? 'Great for solitude & photography' : 'Moderate footfall'}
                        </span>
                      </td>
                    ))}
                    {comparedPlaces.length < 3 && <td />}
                  </tr>

                  {/* Ideal Duration */}
                  <tr>
                    <td className="p-4 font-medium text-slate-400 bg-slate-950/40">Recommended Duration</td>
                    {comparedPlaces.map((p) => (
                      <td key={p.id} className="p-4 text-white font-medium">
                        {p.idealDurationDays} Days minimum
                      </td>
                    ))}
                    {comparedPlaces.length < 3 && <td />}
                  </tr>

                  {/* Best Visiting Months */}
                  <tr>
                    <td className="p-4 font-medium text-slate-400 bg-slate-950/40">Prime Weather Season</td>
                    {comparedPlaces.map((p) => (
                      <td key={p.id} className="p-4 text-slate-300">
                        {p.bestMonths.join(', ')}
                      </td>
                    ))}
                    {comparedPlaces.length < 3 && <td />}
                  </tr>

                  {/* Nearest Transit Hub */}
                  <tr>
                    <td className="p-4 font-medium text-slate-400 bg-slate-950/40">Transit Connectivity</td>
                    {comparedPlaces.map((p) => (
                      <td key={p.id} className="p-4 text-slate-300 space-y-1">
                        <div><strong className="text-slate-400">Air:</strong> {p.nearestAirport}</div>
                        <div><strong className="text-slate-400">Rail:</strong> {p.nearestRailway}</div>
                      </td>
                    ))}
                    {comparedPlaces.length < 3 && <td />}
                  </tr>

                  {/* Photography & Entry Fees */}
                  <tr>
                    <td className="p-4 font-medium text-slate-400 bg-slate-950/40">Entry Fees &amp; Rules</td>
                    {comparedPlaces.map((p) => (
                      <td key={p.id} className="p-4 text-slate-300 space-y-1">
                        <div><strong className="text-slate-400">Fee:</strong> {p.entryFeeInr > 0 ? `₹${p.entryFeeInr}` : 'Free'}</div>
                        <div className="text-[11px] text-slate-400">{p.photographyRules}</div>
                      </td>
                    ))}
                    {comparedPlaces.length < 3 && <td />}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 cursor-pointer"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
