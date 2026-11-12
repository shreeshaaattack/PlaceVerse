export type IndianZone = 'North' | 'South' | 'East' | 'West' | 'Central' | 'North-East';

export type PlaceCategory = 
  | 'Heritage & Architecture'
  | 'Spiritual & Peaceful'
  | 'Offbeat Nature'
  | 'High Altitude & Treks'
  | 'Coastal & Backwaters'
  | 'Culinary & Culture';

export type CrowdLevel = 'Low' | 'Moderate' | 'High';

export type BudgetTier = 'Budget (₹1,500/day)' | 'Moderate (₹3,500/day)' | 'Premium (₹7,500/day)';

export interface Place {
  id: string;
  name: string;
  state: string;
  zone: IndianZone;
  district?: string;
  tagline: string;
  description: string;
  category: PlaceCategory;
  coordinates: {
    lat: number;
    lng: number;
  };
  imageUrl: string;
  thumbnailUrl: string;
  fallbackColor?: string;
  rating: number;
  reviewsCount: number;
  bestMonths: string[];
  idealDurationDays: number;
  budgetTier: BudgetTier;
  estimatedDailyCostInr: number;
  crowdLevel: CrowdLevel;
  nearestAirport: string;
  nearestRailway: string;
  highlights: string[];
  localFood: string[];
  culturalEtiquette: string;
  photographyRules: string;
  entryFeeInr: number;
  isOffbeat: boolean;
  status: 'published' | 'pending' | 'rejected';
  submittedBy?: string;
}

export interface TripDay {
  dayNumber: number;
  title: string;
  placeIds: string[];
  notes?: string;
}

export interface TripPlan {
  id: string;
  tripTitle: string;
  startDate: string;
  numberOfDays: number;
  days: TripDay[];
  travelersCount: number;
  estimatedBudget: {
    stayInr: number;
    travelInr: number;
    foodInr: number;
    entryFeesInr: number;
    totalInr: number;
  };
  packingItems: { item: string; packed: boolean; category: 'Documents' | 'Clothing' | 'Gear' | 'Health' }[];
}

export interface PlaceContribution {
  id: string;
  name: string;
  state: string;
  zone: IndianZone;
  tagline: string;
  description: string;
  category: PlaceCategory;
  coordinates: { lat: number; lng: number };
  imageUrl: string;
  contributorName: string;
  contributorEmail: string;
  bestMonths: string[];
  budgetTier: BudgetTier;
  estimatedDailyCostInr: number;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  moderatorNotes?: string;
}

export type UserRole = 'explorer' | 'admin';

export interface PitchSlide {
  id: number;
  title: string;
  subtitle: string;
  category: 'Hook' | 'Problem' | 'Solution' | 'Product Demo' | 'Market & TAM' | 'Business Model' | 'Roadmap & Ask';
  headline: string;
  keyPoints: string[];
  metrics?: { label: string; value: string; note: string }[];
  sharkTankTakeaway: string;
}
