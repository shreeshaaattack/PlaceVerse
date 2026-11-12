import React, { useState, useMemo } from 'react';
import { 
  X, 
  Calendar, 
  MapPin, 
  Trash2, 
  Plus, 
  CheckSquare, 
  Square, 
  Share2, 
  Users, 
  Check
} from 'lucide-react';
import { Place } from '../types/place';

interface TripPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  tripPlaces: Place[];
  allPlaces: Place[];
  onRemoveFromTrip: (placeId: string) => void;
  onAddPlaceToTrip: (placeId: string) => void;
}

export const TripPlannerModal: React.FC<TripPlannerModalProps> = ({
  isOpen,
  onClose,
  tripPlaces,
  allPlaces,
  onRemoveFromTrip,
  onAddPlaceToTrip,
}) => {
  const [tripTitle, setTripTitle] = useState('Epic Indian Heritage & Solitude Trail');
  const [startDate, setStartDate] = useState('2026-11-15');
  const [numberOfDays, setNumberOfDays] = useState(4);
  const [travelersCount, setTravelersCount] = useState(2);
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Day assignments map: dayNumber -> placeIds array
  const [dayAssignments, setDayAssignments] = useState<Record<number, string[]>>({
    1: tripPlaces.slice(0, 1).map(p => p.id),
    2: tripPlaces.slice(1, 2).map(p => p.id),
    3: tripPlaces.slice(2, 3).map(p => p.id),
    4: tripPlaces.slice(3, 4).map(p => p.id),
  });

  // Dynamic Packing & Prep checklist state
  const [packingList, setPackingList] = useState<{ id: string; label: string; checked: boolean }[]>([
    { id: '1', label: 'Original Government Photo ID (Aadhaar / Passport)', checked: true },
    { id: '2', label: 'Cash in small denominations (rural ATMs can be offline)', checked: true },
    { id: '3', label: 'Offline downloaded GPS route maps & trail tracks', checked: false },
    { id: '4', label: 'Reusable water bottle with filter & zero-waste bag', checked: false },
    { id: '5', label: 'Modest temple attire (covering shoulders & knees)', checked: false },
    { id: '6', label: 'Inner-Line Permit (ILP) printout for North-East zones', checked: false },
    { id: '7', label: 'Sturdy ankle-support hiking boots or water sandals', checked: false },
    { id: '8', label: 'First aid kit with Diamox (for high-altitude Spiti/Chopta)', checked: false },
  ]);

  const togglePackingItem = (id: string) => {
    setPackingList(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  // Assign a place to a specific day
  const assignPlaceToDay = (placeId: string, dayNum: number) => {
    setDayAssignments(prev => {
      const current = prev[dayNum] || [];
      if (current.includes(placeId)) return prev;
      return {
        ...prev,
        [dayNum]: [...current, placeId]
      };
    });
  };

  const removePlaceFromDay = (placeId: string, dayNum: number) => {
    setDayAssignments(prev => {
      const current = prev[dayNum] || [];
      return {
        ...prev,
        [dayNum]: current.filter(id => id !== placeId)
      };
    });
  };

  // Real Budget Calculations based on selected places and days
  const budgetBreakdown = useMemo(() => {
    const hasPlaces = tripPlaces.length > 0;
    const avgDailyRate = hasPlaces 
      ? tripPlaces.reduce((sum, p) => sum + p.estimatedDailyCostInr, 0) / tripPlaces.length
      : 0;

    const totalEntryFees = tripPlaces.reduce((sum, p) => sum + (p.entryFeeInr * travelersCount), 0);
    const stayCost = hasPlaces ? Math.round(avgDailyRate * 0.45 * numberOfDays * Math.ceil(travelersCount / 2)) : 0;
    const foodCost = hasPlaces ? Math.round(avgDailyRate * 0.30 * numberOfDays * travelersCount) : 0;
    const transitCost = hasPlaces ? Math.round(avgDailyRate * 0.25 * numberOfDays * travelersCount) : 0;
    const total = stayCost + foodCost + transitCost + totalEntryFees;

    return {
      hasPlaces,
      stayCost,
      foodCost,
      transitCost,
      totalEntryFees,
      total,
      perPerson: Math.round(total / (travelersCount || 1))
    };
  }, [tripPlaces, numberOfDays, travelersCount]);

  // Export / Copy Itinerary text
  const copyItineraryText = () => {
    const lines = [
      `PlaceVerse Trip Plan: ${tripTitle}`,
      `Start Date: ${startDate} · Duration: ${numberOfDays} Days · Travelers: ${travelersCount}`,
      `Estimated Budget: ₹${budgetBreakdown.total.toLocaleString('en-IN')} (₹${budgetBreakdown.perPerson.toLocaleString('en-IN')}/person)`,
      '',
      '--- DAY-BY-DAY ITINERARY ---',
    ];

    for (let d = 1; d <= numberOfDays; d++) {
      const pIds = dayAssignments[d] || [];
      const assigned = pIds.map(id => tripPlaces.find(p => p.id === id)?.name).filter(Boolean);
      lines.push(`Day ${d}: ${assigned.length > 0 ? assigned.join(' + ') : 'Open exploration / transit'}`);
    }

    lines.push('');
    lines.push('--- INCLUDED DESTINATIONS ---');
    tripPlaces.forEach(p => {
      lines.push(`• ${p.name} (${p.state}): ${p.tagline} | Best season: ${p.bestMonths.slice(0, 3).join(', ')}`);
    });

    lines.push('');
    lines.push('Generated via PlaceVerse — Discover India Beyond the Ordinary');

    navigator.clipboard.writeText(lines.join('\n'));
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl text-white my-8 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500 text-slate-950 flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Smart Multi-Day Trip Planner</h2>
              <p className="text-xs text-slate-400">
                Organize stops, auto-calculate regional budgets, and generate packing checklists.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyItineraryText}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-teal-300 border border-slate-700 cursor-pointer"
            >
              {copiedNotification ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedNotification ? 'Copied!' : 'Copy Itinerary'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Trip Configuration Parameters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">Trip Name</label>
              <input
                type="text"
                value={tripTitle}
                onChange={(e) => setTripTitle(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">Duration &amp; Start Date</label>
              <div className="flex items-center gap-2">
                <select
                  value={numberOfDays}
                  onChange={(e) => setNumberOfDays(Number(e.target.value))}
                  className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-teal-300 focus:outline-none cursor-pointer"
                >
                  {[2, 3, 4, 5, 6, 7, 8, 10].map(d => (
                    <option key={d} value={d}>{d} Days</option>
                  ))}
                </select>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">Travelers</label>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-slate-400 shrink-0" />
                <select
                  value={travelersCount}
                  onChange={(e) => setTravelersCount(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none cursor-pointer"
                >
                  {[1, 2, 3, 4, 5, 6, 8].map(n => (
                    <option key={n} value={n}>{n} {n === 1 ? 'Solo Traveler' : 'Travelers'}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Real Budget Forecasting Calculator */}
          <div className="bg-gradient-to-r from-teal-950/60 to-slate-950 p-5 rounded-2xl border border-teal-800/60">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400">
                  Automated Cost Model
                </span>
                <h3 className="text-base font-bold text-white">Estimated Trip Budget</h3>
              </div>
              <div className="text-right">
                <span className="text-2xl font-extrabold text-teal-300 font-mono">
                  ₹{budgetBreakdown.total.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-slate-400 block">
                  {budgetBreakdown.hasPlaces
                    ? `(₹${budgetBreakdown.perPerson.toLocaleString('en-IN')} / person for ${numberOfDays} days)`
                    : '(Add destinations below to calculate realistic stay & transit costs)'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <div className="text-slate-400 text-[11px]">Boutique Stay &amp; Homestay</div>
                <div className="text-white font-mono font-bold mt-1">₹{budgetBreakdown.stayCost.toLocaleString('en-IN')}</div>
              </div>

              <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <div className="text-slate-400 text-[11px]">Regional Transit / Cab</div>
                <div className="text-white font-mono font-bold mt-1">₹{budgetBreakdown.transitCost.toLocaleString('en-IN')}</div>
              </div>

              <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <div className="text-slate-400 text-[11px]">Local Dining &amp; Food</div>
                <div className="text-white font-mono font-bold mt-1">₹{budgetBreakdown.foodCost.toLocaleString('en-IN')}</div>
              </div>

              <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <div className="text-slate-400 text-[11px]">ASI / Eco Entry Fees</div>
                <div className="text-white font-mono font-bold mt-1">₹{budgetBreakdown.totalEntryFees.toLocaleString('en-IN')}</div>
              </div>
            </div>
          </div>

          {/* Included Places Bucket */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Selected Trip Destinations ({tripPlaces.length})</span>
              </h3>
              {tripPlaces.length === 0 && (
                <span className="text-xs text-amber-300">Add destinations from the discovery catalogue</span>
              )}
            </div>

            {tripPlaces.length === 0 ? (
              <div className="p-8 rounded-2xl border border-dashed border-slate-800 bg-slate-950/40 text-center">
                <Calendar className="w-8 h-8 text-teal-400/60 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-white">Your Trip Plan is Empty</h4>
                <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                  Build your custom Indian itinerary! Click any starting anchor below or use "Add to Trip" from the discovery catalogue.
                </p>
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  {allPlaces.slice(0, 4).map(p => (
                    <button
                      key={p.id}
                      onClick={() => onAddPlaceToTrip(p.id)}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-teal-500/50 text-xs text-teal-300 cursor-pointer flex items-center gap-1.5 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5 text-teal-400" />
                      <span>{p.name} ({p.state})</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tripPlaces.map((place) => (
                  <div key={place.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="flex items-center gap-3">
                      <img src={place.thumbnailUrl} alt={place.name} className="w-12 h-12 rounded-lg object-cover" />
                      <div>
                        <div className="text-xs font-bold text-white">{place.name}</div>
                        <div className="text-[11px] text-teal-400">{place.state} · {place.category}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => onRemoveFromTrip(place.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 rounded cursor-pointer"
                      title="Remove from trip"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Day-by-Day Schedule Timeline */}
          <div>
            <h3 className="text-sm font-bold text-white mb-3">
              Day-by-Day Itinerary Schedule
            </h3>
            <div className="space-y-3">
              {Array.from({ length: numberOfDays }, (_, idx) => idx + 1).map((dayNum) => {
                const assignedIds = dayAssignments[dayNum] || [];
                const assignedPlaces = assignedIds.map(id => tripPlaces.find(p => p.id === id)).filter(Boolean) as Place[];

                return (
                  <div key={dayNum} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-md bg-teal-950 border border-teal-800 text-teal-400 font-bold text-xs flex items-center justify-center font-mono">
                          D{dayNum}
                        </span>
                        <span className="text-xs font-bold text-white">Day {dayNum} Program</span>
                      </div>

                      {/* Dropdown to assign an unassigned place to this day */}
                      <select
                        onChange={(e) => {
                          if (e.target.value) assignPlaceToDay(e.target.value, dayNum);
                        }}
                        defaultValue=""
                        className="bg-slate-900 border border-slate-800 text-slate-300 rounded px-2 py-1 text-[11px] cursor-pointer"
                      >
                        <option value="" disabled>+ Assign Destination</option>
                        {tripPlaces.map(p => (
                          <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                      </select>
                    </div>

                    {assignedPlaces.length === 0 ? (
                      <p className="text-[11px] text-slate-400 italic">
                        No fixed stop assigned — scheduled for road transit, local walks, or leisure.
                      </p>
                    ) : (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {assignedPlaces.map(p => (
                          <div key={p.id} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-teal-900 text-xs text-teal-200">
                            <MapPin className="w-3 h-3 text-teal-400" />
                            <span>{p.name}</span>
                            <button
                              onClick={() => removePlaceFromDay(p.id, dayNum)}
                              className="text-slate-400 hover:text-rose-400 ml-1 cursor-pointer"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Smart Packing & Permitting Checklist */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Trip Preparation &amp; Documents Checklist</span>
              </h3>
              <span className="text-[11px] text-teal-400 font-mono">
                {packingList.filter(i => i.checked).length} of {packingList.length} ready
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {packingList.map((item) => (
                <div
                  key={item.id}
                  onClick={() => togglePackingItem(item.id)}
                  className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                    item.checked
                      ? 'bg-teal-950/30 border-teal-800/80 text-teal-200 line-through opacity-85'
                      : 'bg-slate-950/50 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {item.checked ? (
                    <CheckSquare className="w-4 h-4 text-teal-400 shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-400 hidden sm:block">
            {tripPlaces.length} destinations · {numberOfDays} days · {travelersCount} travelers
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={copyItineraryText}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-teal-300 bg-slate-900 hover:bg-slate-800 border border-slate-700 cursor-pointer flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedNotification ? 'Copied!' : 'Share Plan'}</span>
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 cursor-pointer shadow-md shadow-teal-950"
            >
              Done Planning
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
