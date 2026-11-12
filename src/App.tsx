/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Place, PlaceContribution, UserRole } from './types/place';
import { INITIAL_PLACES } from './data/placesData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StartupProblemSolution } from './components/StartupProblemSolution';
import { PlaceDiscovery } from './components/PlaceDiscovery';
import { InteractiveMap } from './components/InteractiveMap';
import { BusinessModelAndRoadmap } from './components/BusinessModelAndRoadmap';
import { PlaceDetailModal } from './components/PlaceDetailModal';
import { PlaceComparisonModal } from './components/PlaceComparisonModal';
import { TripPlannerModal } from './components/TripPlannerModal';
import { SavedPlacesDrawer } from './components/SavedPlacesDrawer';
import { CommunityContributeModal } from './components/CommunityContributeModal';
import { AdminModerationModal } from './components/AdminModerationModal';
import { PitchDeckModal } from './components/PitchDeckModal';
import { Footer } from './components/Footer';
import { CheckCircle2 } from 'lucide-react';

const STORAGE_KEYS = {
  PLACES: 'placeverse_places_v2',
  SAVED: 'placeverse_saved_v2',
  TRIP: 'placeverse_trip_v2',
  CONTRIBUTIONS: 'placeverse_contribs_v2',
  ROLE: 'placeverse_role_v2',
};

export default function App() {
  // Places state with fallback to INITIAL_PLACES
  const [places, setPlaces] = useState<Place[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PLACES);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse stored places', e);
    }
    return INITIAL_PLACES;
  });

  // Saved place IDs - Clean first-time experience
  const [savedPlaceIds, setSavedPlaceIds] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SAVED);
      if (stored) return new Set(JSON.parse(stored));
    } catch (e) {}
    return new Set<string>();
  });

  // Trip place IDs - Clean first-time experience
  const [tripPlaceIds, setTripPlaceIds] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.TRIP);
      if (stored) return new Set(JSON.parse(stored));
    } catch (e) {}
    return new Set<string>();
  });

  // Comparison place IDs (max 3) - Clean first-time experience
  const [comparedPlaceIds, setComparedPlaceIds] = useState<Set<string>>(
    new Set<string>()
  );

  // User Role (Explorer vs Prototype Admin)
  const [userRole, setUserRole] = useState<UserRole>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ROLE);
      if (stored === 'admin' || stored === 'explorer') return stored;
    } catch (e) {}
    return 'explorer';
  });

  // Pending community contributions - Clean initial state
  const [pendingContributions, setPendingContributions] = useState<PlaceContribution[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CONTRIBUTIONS);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return [];
  });

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Modal & Drawer visibility
  const [activeDetailPlace, setActiveDetailPlace] = useState<Place | null>(null);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [isTripPlannerOpen, setIsTripPlannerOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isContributeModalOpen, setIsContributeModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isPitchDeckOpen, setIsPitchDeckOpen] = useState(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
  }, []);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PLACES, JSON.stringify(places));
    } catch (e) {}
  }, [places]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SAVED, JSON.stringify(Array.from(savedPlaceIds)));
    } catch (e) {}
  }, [savedPlaceIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TRIP, JSON.stringify(Array.from(tripPlaceIds)));
    } catch (e) {}
  }, [tripPlaceIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ROLE, userRole);
    } catch (e) {}
  }, [userRole]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CONTRIBUTIONS, JSON.stringify(pendingContributions));
    } catch (e) {}
  }, [pendingContributions]);

  // Handler: Toggle Bookmark / Save
  const handleToggleSave = useCallback((placeId: string) => {
    const place = places.find((p) => p.id === placeId);
    setSavedPlaceIds((prev) => {
      const next = new Set(prev);
      if (next.has(placeId)) {
        next.delete(placeId);
        showToast(`Removed ${place?.name || 'place'} from Saved`);
      } else {
        next.add(placeId);
        showToast(`Saved ${place?.name || 'place'} to Bucket List`);
      }
      return next;
    });
  }, [places, showToast]);

  // Handler: Toggle Trip Planner
  const handleToggleTrip = useCallback((placeId: string) => {
    const place = places.find((p) => p.id === placeId);
    setTripPlaceIds((prev) => {
      const next = new Set(prev);
      if (next.has(placeId)) {
        next.delete(placeId);
        showToast(`Removed ${place?.name || 'place'} from Trip Plan`);
      } else {
        next.add(placeId);
        showToast(`Added ${place?.name || 'place'} to Trip Itinerary!`);
      }
      return next;
    });
  }, [places, showToast]);

  // Handler: Toggle Compare
  const handleToggleCompare = useCallback((placeId: string) => {
    const place = places.find((p) => p.id === placeId);
    setComparedPlaceIds((prev) => {
      const next = new Set(prev);
      if (next.has(placeId)) {
        next.delete(placeId);
        showToast(`Removed ${place?.name || 'place'} from Compare`);
      } else {
        if (next.size >= 3) {
          showToast('Comparison limit: maximum 3 destinations at once.');
          return prev;
        }
        next.add(placeId);
        showToast(`Added ${place?.name || 'place'} to Compare table`);
      }
      return next;
    });
  }, [places, showToast]);

  // Clear compare
  const handleClearCompare = useCallback(() => {
    setComparedPlaceIds(new Set());
    showToast('Comparison cleared');
  }, [showToast]);

  // Toggle user role (Prototype simulation)
  const handleToggleRole = useCallback(() => {
    setUserRole((current) => {
      const nextRole: UserRole = current === 'explorer' ? 'admin' : 'explorer';
      showToast(
        nextRole === 'admin'
          ? 'Switched to Admin Portal (Prototype Simulation · Local Session)'
          : 'Switched to Explorer Mode'
      );
      if (nextRole === 'admin') {
        setIsAdminModalOpen(true);
      }
      return nextRole;
    });
  }, [showToast]);

  // Submit contribution (Explorer)
  const handleSubmitContribution = useCallback((newContribution: PlaceContribution) => {
    setPendingContributions((prev) => [newContribution, ...prev]);
    showToast('Destination submitted! Admin review pending.');
  }, [showToast]);

  // Approve contribution (Admin)
  const handleApproveContribution = useCallback((contribution: PlaceContribution) => {
    const newPlace: Place = {
      id: `pv-${Date.now()}`,
      name: contribution.name,
      state: contribution.state,
      zone: contribution.zone,
      tagline: contribution.tagline,
      description: contribution.description,
      category: contribution.category,
      coordinates: contribution.coordinates,
      imageUrl: contribution.imageUrl,
      thumbnailUrl: contribution.imageUrl,
      rating: 4.8,
      reviewsCount: 1,
      bestMonths: contribution.bestMonths,
      idealDurationDays: 3,
      budgetTier: contribution.budgetTier,
      estimatedDailyCostInr: contribution.estimatedDailyCostInr,
      crowdLevel: 'Low',
      nearestAirport: 'Regional Airport (within 100km)',
      nearestRailway: 'State Junction (within 50km)',
      highlights: [
        'Verified offbeat community discovery',
        'Traditional local cultural hospitality',
        'Scenic uncrowded viewpoints and trail paths'
      ],
      localFood: ['Regional organic village preparations'],
      culturalEtiquette: 'Respect village elder privacy and remove footwear in sanctums.',
      photographyRules: 'Permitted; ask permission prior to portraits.',
      entryFeeInr: 0,
      isOffbeat: true,
      status: 'published',
      submittedBy: contribution.contributorName,
    };

    setPlaces((prev) => [newPlace, ...prev]);
    setPendingContributions((prev) => prev.filter((c) => c.id !== contribution.id));
    showToast(`Approved "${contribution.name}"! Added to this browser's catalogue.`);
  }, [showToast]);

  // Reject contribution (Admin)
  const handleRejectContribution = useCallback((id: string, notes: string) => {
    setPendingContributions((prev) => prev.filter((c) => c.id !== id));
    showToast('Submission rejected and archived.');
  }, [showToast]);

  // Delete place from catalogue (Admin)
  const handleDeletePlace = useCallback((placeId: string) => {
    setPlaces((prev) => prev.filter((p) => p.id !== placeId));
    setSavedPlaceIds((prev) => {
      const next = new Set(prev);
      next.delete(placeId);
      return next;
    });
    setTripPlaceIds((prev) => {
      const next = new Set(prev);
      next.delete(placeId);
      return next;
    });
    showToast('Destination deleted from catalogue');
  }, [showToast]);

  // Smooth navigation to anchors
  const handleNavigateSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Filtered array of places currently in trip planner
  const tripPlaces = places.filter((p) => tripPlaceIds.has(p.id));

  // Filtered array of places currently saved
  const savedPlaces = places.filter((p) => savedPlaceIds.has(p.id));

  // Filtered array of places currently compared
  const comparedPlaces = places.filter((p) => comparedPlaceIds.has(p.id));

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-teal-500 selection:text-slate-950">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-teal-500/80 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 backdrop-blur-md animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        userRole={userRole}
        onToggleRole={handleToggleRole}
        savedCount={savedPlaceIds.size}
        onOpenSaved={() => setIsSavedDrawerOpen(true)}
        tripPlacesCount={tripPlaceIds.size}
        onOpenTripPlanner={() => setIsTripPlannerOpen(true)}
        compareCount={comparedPlaceIds.size}
        onOpenCompare={() => setIsCompareModalOpen(true)}
        onOpenContribute={() => setIsContributeModalOpen(true)}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        onOpenPitchDeck={() => setIsPitchDeckOpen(true)}
        pendingContributionsCount={pendingContributions.length}
        onNavigateSection={handleNavigateSection}
      />

      {/* Main Content Flow */}
      <main>
        {/* 1. Startup Pitch Hero */}
        <Hero
          totalPlaces={places.length}
          onExplorePlaces={() => handleNavigateSection('discovery')}
          onPlanTrip={() => setIsTripPlannerOpen(true)}
          onOpenPitchDeck={() => setIsPitchDeckOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            handleNavigateSection('discovery');
          }}
        />

        {/* 2. Startup Travel-Discovery Problem vs PlaceVerse Solution */}
        <StartupProblemSolution
          onExplorePlaces={() => handleNavigateSection('discovery')}
          onOpenPitchDeck={() => setIsPitchDeckOpen(true)}
        />

        {/* 3. Real Product Catalogue Discovery with Working Filters */}
        <PlaceDiscovery
          places={places}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          savedPlaceIds={savedPlaceIds}
          onToggleSave={handleToggleSave}
          tripPlaceIds={tripPlaceIds}
          onToggleTrip={handleToggleTrip}
          comparedPlaceIds={comparedPlaceIds}
          onToggleCompare={handleToggleCompare}
          onOpenCompare={() => setIsCompareModalOpen(true)}
          onClearCompare={handleClearCompare}
          onViewDetails={setActiveDetailPlace}
        />

        {/* 4. Interactive India Map Exploration */}
        <InteractiveMap
          places={places}
          onViewDetails={setActiveDetailPlace}
          onToggleTrip={handleToggleTrip}
          tripPlaceIds={tripPlaceIds}
        />

        {/* 5. Business Model Proposals, Target Personas & Future Roadmap */}
        <BusinessModelAndRoadmap
          onExplorePlaces={() => handleNavigateSection('discovery')}
          onPlanTrip={() => setIsTripPlannerOpen(true)}
          onOpenPitchDeck={() => setIsPitchDeckOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onNavigateSection={handleNavigateSection}
        onOpenPitchDeck={() => setIsPitchDeckOpen(true)}
        onOpenContribute={() => setIsContributeModalOpen(true)}
        onOpenTripPlanner={() => setIsTripPlannerOpen(true)}
      />

      {/* --- Interactive Modals & Slide-Overs --- */}

      {/* Place Detail Inspector Modal */}
      <PlaceDetailModal
        place={activeDetailPlace}
        onClose={() => setActiveDetailPlace(null)}
        isSaved={activeDetailPlace ? savedPlaceIds.has(activeDetailPlace.id) : false}
        onToggleSave={handleToggleSave}
        isInTrip={activeDetailPlace ? tripPlaceIds.has(activeDetailPlace.id) : false}
        onToggleTrip={handleToggleTrip}
        isCompared={activeDetailPlace ? comparedPlaceIds.has(activeDetailPlace.id) : false}
        onToggleCompare={handleToggleCompare}
      />

      {/* Side-by-Side Comparison Modal */}
      <PlaceComparisonModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        comparedPlaces={comparedPlaces}
        onRemoveFromCompare={handleToggleCompare}
        tripPlaceIds={tripPlaceIds}
        onToggleTrip={handleToggleTrip}
        onClearAll={handleClearCompare}
        allPlaces={places}
        onAddPlaceToCompare={handleToggleCompare}
      />

      {/* Dynamic Multi-Day Trip Planner Modal */}
      <TripPlannerModal
        isOpen={isTripPlannerOpen}
        onClose={() => setIsTripPlannerOpen(false)}
        tripPlaces={tripPlaces}
        allPlaces={places}
        onRemoveFromTrip={handleToggleTrip}
        onAddPlaceToTrip={handleToggleTrip}
      />

      {/* Saved Places Drawer */}
      <SavedPlacesDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedPlaces={savedPlaces}
        onRemoveSaved={handleToggleSave}
        onClearAllSaved={() => setSavedPlaceIds(new Set())}
        onViewDetails={setActiveDetailPlace}
        tripPlaceIds={tripPlaceIds}
        onToggleTrip={handleToggleTrip}
        onExploreMore={() => handleNavigateSection('discovery')}
      />

      {/* Community Contribution Modal (Explorer Mode) */}
      <CommunityContributeModal
        isOpen={isContributeModalOpen}
        onClose={() => setIsContributeModalOpen(false)}
        onSubmitContribution={handleSubmitContribution}
      />

      {/* Admin Moderation Modal (Admin Mode) */}
      <AdminModerationModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        pendingContributions={pendingContributions}
        onApproveContribution={handleApproveContribution}
        onRejectContribution={handleRejectContribution}
        totalCataloguePlaces={places}
        onDeletePlace={handleDeletePlace}
      />

      {/* Shark Tank 2-3 Minute Pitch Presenter Deck */}
      <PitchDeckModal
        isOpen={isPitchDeckOpen}
        onClose={() => setIsPitchDeckOpen(false)}
        onJumpToLiveDemo={() => handleNavigateSection('discovery')}
      />
    </div>
  );
}
