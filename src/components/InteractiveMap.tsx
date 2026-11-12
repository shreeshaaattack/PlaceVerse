import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  Navigation, 
  Eye, 
  Plus, 
  Check, 
  Info
} from 'lucide-react';
import { Place, IndianZone } from '../types/place';

interface InteractiveMapProps {
  places: Place[];
  onViewDetails: (place: Place) => void;
  onToggleTrip: (placeId: string) => void;
  tripPlaceIds: Set<string>;
}

// Major departure metro cities in India with their coordinates
const METRO_CITIES: { name: string; lat: number; lng: number }[] = [
  { name: 'Bengaluru', lat: 12.9716, lng: 77.5946 },
  { name: 'Mumbai', lat: 19.0760, lng: 72.8777 },
  { name: 'Delhi NCR', lat: 28.6139, lng: 77.2090 },
  { name: 'Kolkata', lat: 22.5726, lng: 88.3639 },
  { name: 'Chennai', lat: 13.0827, lng: 80.2707 },
  { name: 'Hyderabad', lat: 17.3850, lng: 78.4867 },
];

// Helper to calculate great circle distance (Haversine formula in km)
function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  places,
  onViewDetails,
  onToggleTrip,
  tripPlaceIds,
}) => {
  const [selectedPlaceId, setSelectedPlaceId] = useState<string>(places[0]?.id || '');
  const [originCity, setOriginCity] = useState<string>('Bengaluru');
  const [activeZone, setActiveZone] = useState<IndianZone | 'All'>('All');

  const selectedPlace = useMemo(() => {
    return places.find((p) => p.id === selectedPlaceId) || places[0];
  }, [places, selectedPlaceId]);

  const originCoords = useMemo(() => {
    return METRO_CITIES.find((c) => c.name === originCity) || METRO_CITIES[0];
  }, [originCity]);

  const distanceKm = useMemo(() => {
    if (!selectedPlace) return 0;
    return calculateDistanceKm(
      originCoords.lat,
      originCoords.lng,
      selectedPlace.coordinates.lat,
      selectedPlace.coordinates.lng
    );
  }, [originCoords, selectedPlace]);

  // Normalized map coordinates for India projection:
  // Lat bounds roughly 8°N to 36°N (span 28)
  // Lng bounds roughly 68°E to 98°E (span 30)
  const getMapPosition = (lat: number, lng: number) => {
    const minLat = 7.5;
    const maxLat = 36.5;
    const minLng = 67.5;
    const maxLng = 97.5;

    // Invert Y because SVG coordinates go down from top
    const yPct = ((maxLat - lat) / (maxLat - minLat)) * 100;
    const xPct = ((lng - minLng) / (maxLng - minLng)) * 100;

    return {
      top: `${Math.max(5, Math.min(95, yPct))}%`,
      left: `${Math.max(5, Math.min(95, xPct))}%`,
    };
  };

  const filteredPins = useMemo(() => {
    if (activeZone === 'All') return places;
    return places.filter((p) => p.zone === activeZone);
  }, [places, activeZone]);

  return (
    <section id="interactive-map" className="py-20 bg-slate-900 border-t border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-400">
              <Navigation className="w-4 h-4" />
              <span>Geospatial Exploration Engine</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight mt-1">
              Interactive India Discovery Map
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Click any geo-pin across India’s terrain to inspect transit corridors, distances, and cultural highlights.
            </p>
          </div>

          {/* Departure City Selector */}
          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs">
            <span className="text-slate-400">Your Base Metro:</span>
            <select
              value={originCity}
              onChange={(e) => setOriginCity(e.target.value)}
              className="bg-transparent text-teal-300 font-bold focus:outline-none cursor-pointer"
            >
              {METRO_CITIES.map((city) => (
                <option key={city.name} value={city.name} className="bg-slate-900 text-white">
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Map Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left/Main Map Canvas */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-3xl p-6 relative overflow-hidden shadow-2xl">
            {/* Zone Filter Segmented Controls */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-3 mb-4 border-b border-slate-800/80">
              {(['All', 'North', 'South', 'East', 'West', 'Central', 'North-East'] as const).map((zone) => (
                <button
                  key={zone}
                  onClick={() => setActiveZone(zone)}
                  className={`px-2.5 py-1 text-xs rounded-md font-medium cursor-pointer transition-colors shrink-0 ${
                    activeZone === zone
                      ? 'bg-teal-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  {zone}
                </button>
              ))}
            </div>

            {/* Simulated Indian Subcontinent Geo-Surface with SVG Contour Lines */}
            <div className="relative w-full aspect-[4/3] bg-slate-900/60 rounded-2xl border border-slate-800/60 overflow-hidden flex items-center justify-center">
              {/* Atmospheric background topography lines */}
              <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-teal-500" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                {/* Stylized India border silhouette outline */}
                <path
                  d="M 180,60 Q 220,40 260,70 T 320,110 T 380,130 T 420,160 Q 400,200 360,220 T 340,280 T 320,340 T 280,390 T 250,440 Q 230,420 210,380 T 180,320 T 160,260 T 140,200 Q 150,140 180,60 Z"
                  fill="none"
                  stroke="rgba(20, 184, 166, 0.4)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  transform="scale(1.1) translate(20, -10)"
                />
              </svg>

              {/* Geographic Region Watermarks */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-slate-400 font-mono pointer-events-none">
                Himalayan North
              </div>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-slate-400 font-mono pointer-events-none">
                Indian Ocean / Deccan South
              </div>
              <div className="absolute top-1/4 right-6 text-[10px] uppercase tracking-widest text-slate-400 font-mono pointer-events-none">
                North-East
              </div>
              <div className="absolute top-1/2 left-6 text-[10px] uppercase tracking-widest text-slate-400 font-mono pointer-events-none">
                Thar / West
              </div>

              {/* Destination Pins on Canvas */}
              {filteredPins.map((place) => {
                const pos = getMapPosition(place.coordinates.lat, place.coordinates.lng);
                const isSelected = selectedPlace?.id === place.id;
                return (
                  <button
                    key={place.id}
                    onClick={() => setSelectedPlaceId(place.id)}
                    style={{ top: pos.top, left: pos.left }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-all duration-300 z-20 ${
                      isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                    }`}
                    title={`${place.name} (${place.state})`}
                  >
                    <div className="relative">
                      {isSelected && (
                        <div className="absolute -inset-2 rounded-full bg-teal-400/30 animate-ping pointer-events-none" />
                      )}
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shadow-lg border transition-all ${
                          isSelected
                            ? 'bg-teal-400 border-white text-slate-950 font-bold scale-110'
                            : 'bg-slate-950/90 border-teal-500/80 text-teal-300 hover:border-white'
                        }`}
                      >
                        <MapPin className="w-4 h-4 fill-current" />
                      </div>

                      {/* Tooltip on hover */}
                      <div className="hidden group-hover:block absolute bottom-8 left-1/2 -translate-x-1/2 bg-slate-950 text-white text-[10px] font-semibold py-1 px-2 rounded border border-slate-700 whitespace-nowrap z-40 shadow-xl">
                        {place.name} · {place.state}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-400 inline-block" /> Selected Pin
              </span>
              <span>Showing {filteredPins.length} geo-anchors</span>
            </div>
          </div>

          {/* Right Destination Detail Inspector */}
          {selectedPlace && (
            <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col justify-between">
              <div>
                {/* Image & State Header */}
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 bg-slate-900">
                  <img
                    src={selectedPlace.thumbnailUrl}
                    alt={selectedPlace.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                    <span className="font-semibold text-teal-300 drop-shadow">{selectedPlace.state}</span>
                    <span className="font-mono text-[11px] bg-slate-950/80 px-2 py-0.5 rounded border border-slate-700">
                      {selectedPlace.zone} India
                    </span>
                  </div>
                </div>

                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedPlace.name}</h3>
                    <p className="text-xs text-teal-300 font-medium mt-0.5">{selectedPlace.tagline}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono font-bold text-amber-400">
                      ₹{selectedPlace.estimatedDailyCostInr.toLocaleString('en-IN')}/day
                    </div>
                    <div className="text-[10px] text-slate-400">{selectedPlace.budgetTier.split(' ')[0]} tier</div>
                  </div>
                </div>

                {/* Distance & Transit Intelligence Box */}
                <div className="mt-4 p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Navigation className="w-3.5 h-3.5 text-teal-400" />
                      <span>Distance from {originCity}:</span>
                    </span>
                    <span className="text-white font-mono font-bold text-sm">
                      ~{distanceKm.toLocaleString('en-IN')} km
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-300 border-t border-slate-800/80 pt-2 flex items-center gap-2">
                    <span className="text-slate-400">Nearest Rail:</span>
                    <span className="font-medium text-slate-200 truncate">{selectedPlace.nearestRailway}</span>
                  </div>

                  <div className="text-[11px] text-slate-300 flex items-center gap-2">
                    <span className="text-slate-400">Nearest Air:</span>
                    <span className="font-medium text-slate-200 truncate">{selectedPlace.nearestAirport}</span>
                  </div>
                </div>

                {/* Cultural Etiquette Snapshot */}
                <div className="mt-4 p-3 rounded-xl bg-teal-950/40 border border-teal-800/50">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-teal-300 mb-1">
                    <Info className="w-3.5 h-3.5" />
                    <span>Cultural Etiquette &amp; Entry</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedPlace.culturalEtiquette}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-3">
                <button
                  onClick={() => onViewDetails(selectedPlace)}
                  className="flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Full Guide</span>
                </button>

                <button
                  onClick={() => onToggleTrip(selectedPlace.id)}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    tripPlaceIds.has(selectedPlace.id)
                      ? 'bg-teal-900 text-teal-200 border border-teal-600'
                      : 'bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-md shadow-teal-950'
                  }`}
                >
                  {tripPlaceIds.has(selectedPlace.id) ? (
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
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
