import React, { useState, useMemo } from 'react';
import { 
  Search, 
  RotateCcw, 
  Scale, 
  LayoutGrid, 
  List, 
  Sparkles,
  ArrowUpDown,
  X
} from 'lucide-react';
import { Place, IndianZone, PlaceCategory, CrowdLevel } from '../types/place';
import { PlaceCard } from './PlaceCard';

interface PlaceDiscoveryProps {
  places: Place[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  savedPlaceIds: Set<string>;
  onToggleSave: (id: string) => void;
  tripPlaceIds: Set<string>;
  onToggleTrip: (id: string) => void;
  comparedPlaceIds: Set<string>;
  onToggleCompare: (id: string) => void;
  onOpenCompare: () => void;
  onClearCompare: () => void;
  onViewDetails: (place: Place) => void;
}

const ZONES: (IndianZone | 'All')[] = ['All', 'North', 'South', 'East', 'West', 'Central', 'North-East'];

const CATEGORIES: (PlaceCategory | 'All')[] = [
  'All',
  'Heritage & Architecture',
  'Spiritual & Peaceful',
  'Offbeat Nature',
  'High Altitude & Treks',
  'Coastal & Backwaters',
  'Culinary & Culture',
];

export const PlaceDiscovery: React.FC<PlaceDiscoveryProps> = ({
  places,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  savedPlaceIds,
  onToggleSave,
  tripPlaceIds,
  onToggleTrip,
  comparedPlaceIds,
  onToggleCompare,
  onOpenCompare,
  onClearCompare,
  onViewDetails,
}) => {
  const [selectedZone, setSelectedZone] = useState<IndianZone | 'All'>('All');
  const [selectedCrowd, setSelectedCrowd] = useState<CrowdLevel | 'All'>('All');
  const [selectedBudgetMax, setSelectedBudgetMax] = useState<number | 'All'>('All');
  const [sortBy, setSortBy] = useState<'recommended' | 'rating' | 'costAsc' | 'duration'>('recommended');
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');

  // Multi-factor filtering
  const filteredPlaces = useMemo(() => {
    return places.filter((place) => {
      // 1. Status check: only published places
      if (place.status !== 'published') return false;

      // 2. Search query check
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = place.name.toLowerCase().includes(q);
        const matchesState = place.state.toLowerCase().includes(q);
        const matchesTagline = place.tagline.toLowerCase().includes(q);
        const matchesDesc = place.description.toLowerCase().includes(q);
        const matchesCategory = place.category.toLowerCase().includes(q);
        const matchesHighlights = place.highlights.some(h => h.toLowerCase().includes(q));
        const matchesFood = place.localFood.some(f => f.toLowerCase().includes(q));
        if (!matchesName && !matchesState && !matchesTagline && !matchesDesc && !matchesCategory && !matchesHighlights && !matchesFood) {
          return false;
        }
      }

      // 3. Zone filter
      if (selectedZone !== 'All' && place.zone !== selectedZone) {
        return false;
      }

      // 4. Category filter
      if (selectedCategory !== 'All' && place.category !== selectedCategory) {
        return false;
      }

      // 5. Crowd level filter
      if (selectedCrowd !== 'All' && place.crowdLevel !== selectedCrowd) {
        return false;
      }

      // 6. Budget filter
      if (selectedBudgetMax !== 'All' && place.estimatedDailyCostInr > selectedBudgetMax) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'costAsc') return a.estimatedDailyCostInr - b.estimatedDailyCostInr;
      if (sortBy === 'duration') return b.idealDurationDays - a.idealDurationDays;
      // Default: recommended (offbeat boost + rating)
      const aScore = a.rating + (a.isOffbeat ? 0.3 : 0);
      const bScore = b.rating + (b.isOffbeat ? 0.3 : 0);
      return bScore - aScore;
    });
  }, [places, searchQuery, selectedZone, selectedCategory, selectedCrowd, selectedBudgetMax, sortBy]);

  // Active filters count
  const activeFiltersCount = 
    (selectedZone !== 'All' ? 1 : 0) +
    (selectedCategory !== 'All' ? 1 : 0) +
    (selectedCrowd !== 'All' ? 1 : 0) +
    (selectedBudgetMax !== 'All' ? 1 : 0) +
    (searchQuery ? 1 : 0);

  const resetAllFilters = () => {
    onSearchChange('');
    setSelectedZone('All');
    onSelectCategory('All');
    setSelectedCrowd('All');
    setSelectedBudgetMax('All');
    setSortBy('recommended');
  };

  return (
    <section id="discovery" className="py-16 bg-slate-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-400">
              <Sparkles className="w-4 h-4" />
              <span>Real Verified Catalogue</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight mt-1">
              Explore Authentic Indian Destinations
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Filter by geographical zone, crowd index, cultural style, and daily budget.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded text-xs transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-slate-800 text-teal-300' : 'text-slate-400 hover:text-white'
                }`}
                title="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('compact')}
                className={`p-1.5 rounded text-xs transition-colors cursor-pointer ${
                  viewMode === 'compact' ? 'bg-slate-800 text-teal-300' : 'text-slate-400 hover:text-white'
                }`}
                title="Compact view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300">
              <ArrowUpDown className="w-3.5 h-3.5 text-teal-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-white focus:outline-none cursor-pointer text-xs font-medium"
              >
                <option value="recommended" className="bg-slate-900">Recommended</option>
                <option value="rating" className="bg-slate-900">Highest Rated</option>
                <option value="costAsc" className="bg-slate-900">Budget: Low to High</option>
                <option value="duration" className="bg-slate-900">Duration (Days)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Floating Compare Banner when destinations are selected */}
        {comparedPlaceIds.size > 0 && (
          <div className="sticky top-20 z-30 mb-6 p-3 sm:p-4 rounded-xl bg-teal-950/95 border border-teal-700/80 shadow-2xl backdrop-blur-md flex flex-wrap items-center justify-between gap-3 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-teal-500 text-slate-950 flex items-center justify-center font-bold text-xs">
                {comparedPlaceIds.size}
              </div>
              <div>
                <span className="text-xs font-bold text-teal-200">
                  {comparedPlaceIds.size} {comparedPlaceIds.size === 1 ? 'Destination' : 'Destinations'} Selected for Comparison
                </span>
                <span className="text-[11px] text-teal-400/80 block">
                  Compare climate, daily budgets, photography rules &amp; ideal duration
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onClearCompare}
                className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900/60 rounded-lg cursor-pointer"
              >
                Clear
              </button>
              <button
                onClick={onOpenCompare}
                className="px-4 py-1.5 text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg transition-colors cursor-pointer shadow-md flex items-center gap-1.5"
              >
                <Scale className="w-3.5 h-3.5" />
                <span>Compare Now</span>
              </button>
            </div>
          </div>
        )}

        {/* Filter Controls Bar */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 sm:p-5 mb-8 space-y-4">
          {/* Row 1: Search & Secondary Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by state, title, cuisine..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/80"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Crowd Level Filter */}
            <div>
              <select
                value={selectedCrowd}
                onChange={(e) => setSelectedCrowd(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-teal-500/80 cursor-pointer"
              >
                <option value="All" className="bg-slate-900">All Crowd Levels</option>
                <option value="Low" className="bg-slate-900">Low Crowd (Peaceful &amp; Offbeat)</option>
                <option value="Moderate" className="bg-slate-900">Moderate Crowd</option>
                <option value="High" className="bg-slate-900">Popular / High Footfall</option>
              </select>
            </div>

            {/* Budget Filter */}
            <div>
              <select
                value={selectedBudgetMax === 'All' ? 'All' : selectedBudgetMax.toString()}
                onChange={(e) => setSelectedBudgetMax(e.target.value === 'All' ? 'All' : Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-teal-500/80 cursor-pointer"
              >
                <option value="All" className="bg-slate-900">Any Daily Budget</option>
                <option value="2000" className="bg-slate-900">Under ₹2,000 / day</option>
                <option value="3000" className="bg-slate-900">Under ₹3,000 / day</option>
                <option value="4000" className="bg-slate-900">Under ₹4,000 / day</option>
              </select>
            </div>

            {/* Reset Filters button */}
            <div className="flex items-center justify-between sm:justify-end gap-2">
              <span className="text-xs text-slate-400 font-mono">
                Showing {filteredPlaces.length} of {places.length}
              </span>
              {activeFiltersCount > 0 && (
                <button
                  onClick={resetAllFilters}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-rose-300 bg-rose-950/60 border border-rose-800/60 hover:bg-rose-900/60 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Row 2: Zone Segmented Controls (BUTTONS) */}
          <div className="pt-2 border-t border-slate-800/80">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Geographical Zone:
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
              {ZONES.map((zone) => (
                <button
                  key={zone}
                  onClick={() => setSelectedZone(zone)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 transition-all cursor-pointer ${
                    selectedZone === zone
                      ? 'bg-teal-500 text-slate-950 font-bold shadow-md shadow-teal-950'
                      : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {zone === 'All' ? 'All of India' : `${zone} India`}
                </button>
              ))}
            </div>
          </div>

          {/* Row 3: Category Interactive Filters (BUTTONS) */}
          <div className="pt-2 border-t border-slate-800/80">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Travel Theme:
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-teal-900 text-teal-200 border border-teal-600 font-semibold'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {cat === 'All' ? 'All Themes' : cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Grid / Empty State */}
        {filteredPlaces.length === 0 ? (
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-12 text-center max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">No destinations match your filters</h3>
            <p className="text-xs text-slate-400 mt-2">
              Try relaxing your budget, zone, or theme filters to see more destinations.
            </p>
            <button
              onClick={resetAllFilters}
              className="mt-6 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1 md:grid-cols-2'
          }`}>
            {filteredPlaces.map((place) => (
              <PlaceCard
                key={place.id}
                place={place}
                isSaved={savedPlaceIds.has(place.id)}
                onToggleSave={onToggleSave}
                isInTrip={tripPlaceIds.has(place.id)}
                onToggleTrip={onToggleTrip}
                isCompared={comparedPlaceIds.has(place.id)}
                onToggleCompare={onToggleCompare}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
