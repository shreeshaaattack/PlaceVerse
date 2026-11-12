import { PitchSlide } from '../types/place';

export const PITCH_SLIDES: PitchSlide[] = [
  {
    id: 1,
    title: 'The Hook & Vision',
    subtitle: 'PlaceVerse: Discover India Beyond the Ordinary',
    category: 'Hook',
    headline: 'India has a wide range of cultural, natural and heritage destinations, but lesser-known places can be harder for travelers to discover.',
    keyPoints: [
      'Popular destinations can experience high visitor pressure while lesser-known places receive less visibility.',
      'Travelers may need to consult several sources to find local experiences and practical destination information.',
      'PlaceVerse is the intelligent discovery and smart itinerary platform dedicated to authentic Indian exploration.'
    ],
    metrics: [
      { label: 'Destination Catalogue', value: '16+', note: 'Destinations currently included in this prototype' },
      { label: 'Core Features', value: '6+', note: 'Discovery, map, save, compare, planning and contribution tools' },
      { label: 'Current Data Mode', value: 'Local', note: 'Prototype data is stored in the browser' }
    ],
    sharkTankTakeaway: 'We are unlocking the other 80% of India for a generation that values stories over selfies.'
  },
  {
    id: 2,
    title: 'The Travel-Discovery Problem',
    subtitle: 'Why Discovering Authentic India is Broken Today',
    category: 'Problem',
    headline: 'Current travel discovery is plagued by outdated blogs, fake sponsored reviews, and fragmented itinerary planning.',
    keyPoints: [
      'Problem 1: SEO Spam & Superficial Listicles — Search results repeat the same commercial spots without seasonal or cultural accuracy.',
      'Problem 2: Information Blackhole — Crucial details like permit requirements, photography restrictions, best local cuisine, and transit are scattered across 10 different tabs.',
      'Problem 3: Fragmented Planning — Travelers jump between blog posts, Google Maps, notes apps, and spreadsheets to plan a 3-day weekend escape.'
    ],
    sharkTankTakeaway: 'Travelers may need to cross-check several sources for seasonal suitability, local rules and transport information.'
  },
  {
    id: 3,
    title: 'The PlaceVerse Solution',
    subtitle: 'Curated Heritage + Hyper-Local Intel + Smart Itinerary Engine',
    category: 'Solution',
    headline: 'A travel discovery prototype that brings destination information, comparison and sample itinerary planning into one interface.',
    keyPoints: [
      '1. Curated Catalogue: A destination dataset with coordinates, nearby transit information and available cultural notes.',
      '2. Planning Context: Destination categories, indicative budget information and seasonal notes where available.',
      '3. Sample Trip Planner: Build a multi-day plan and review indicative budget estimates and a packing checklist.',
      '4. Contribution Demo: Submit destination suggestions and review them through a prototype admin interface.'
    ],
    sharkTankTakeaway: 'We take travelers from discovery to a ready-to-execute itinerary in under 3 minutes.'
  },
  {
    id: 4,
    title: 'Live Product Architecture & Demo',
    subtitle: 'Working Platform with Zero Fluff',
    category: 'Product Demo',
    headline: 'A frontend prototype for destination exploration, visual mapping and side-by-side comparison.',
    keyPoints: [
      'Interactive India Zone & State Matrix with real geo-coordinates.',
      'Side-by-side Place Comparison engine evaluating cost, crowd levels, and seasonal suitability.',
      'Multi-day dynamic Trip Planner with automated cost breakdown and gear checklists.',
      'Explorer interface and a demonstration admin moderation screen.'
    ],
    sharkTankTakeaway: 'The current prototype demonstrates destination data, filters and a browser-based trip planner.'
  },
  {
    id: 5,
    title: 'Target Customers & Personas',
    subtitle: 'Who Are We Building For?',
    category: 'Market & TAM',
    headline: 'Capturing India’s burgeoning cohort of independent, high-intent travel enthusiasts.',
    keyPoints: [
      '1. The Weekend Escape Seeker (Gen Z / Young Professionals in Bengaluru, Mumbai, NCR): Need quick 2–4 day road-trip ideas, destination details and indicative budgets.',
      '2. The Cultural & Heritage Deep-Diver: Photographers, history buffs, and solo travelers wanting architectural blueprints and monastic histories.',
      '3. The Sustainable & Offbeat Backpacker: Conscious travelers seeking eco-villages, zero-waste destinations, and community-run stays.'
    ],
    metrics: [
      { label: 'India Travel Market by 2030', value: '$125B', note: 'Fastest-growing domestic tourism economy' },
      { label: 'Target Early Adopter Cohort', value: '38M', note: 'Frequent independent domestic road-trippers' },
      { label: 'Average Spend Per 3-Day Trip', value: '₹9,500', note: 'Tier-1/Tier-2 city millennial average' }
    ],
    sharkTankTakeaway: 'Our early adopters are high-frequency, digital-native weekenders who spend on experiences.'
  },
  {
    id: 6,
    title: 'Proposed Business Model (Shark Tank Pitch)',
    subtitle: 'Clear, Sustainable Revenue Streams — Proposed Roadmap',
    category: 'Business Model',
    headline: 'Multiple monetization flywheels that align with sustainable, regional tourism without obnoxious banner ads.',
    keyPoints: [
      'Proposal 1: PlaceVerse Curated Heritage Experiences (12–15% take rate on certified local master guides, craft workshops, and tribal culinary tours).',
      'Proposal 2: State Tourism & Regional Board SaaS Portal (B2G/B2B insights on dispersal analytics and regional tourist promotion).',
      'Proposal 3: Verified Eco-Stay & Homestay Partner Subscriptions (Flat annual listing fee for certified sustainable accommodations; zero booking commission).',
      'Proposal 4: PlaceVerse Pro Itinerary Concierge (₹299/trip custom offline smart guide with emergency SOS coordinates & audio snippets).'
    ],
    sharkTankTakeaway: 'We monetize high-value discovery and hyper-local experiences, keeping the consumer interface uncluttered and trusted.'
  },
  {
    id: 7,
    title: 'Future Roadmap & College Demo Ask',
    subtitle: 'Our Phased Growth Strategy & Pitch Conclusion',
    category: 'Roadmap & Ask',
    headline: 'Growing the prototype into a broader platform for discovering offbeat destinations in India.',
    keyPoints: [
      'Phase 1 (Current Prototype): Curated destination catalogue, interactive map, comparison view, multi-day trip planner and explorer/admin demonstration workflow.',
      'Phase 2 (Q2-Q3 Next Year): Offline PWA field maps, crowdsourced audio guide snippets, multilingual local languages (Hindi, Tamil, Kannada, Bengali).',
      'Phase 3 (Expansion): Direct hyper-local guide dispatch, live seasonal crowd telemetry, partner homestay bookings.',
      'Our Pitch Ask: Seeking feedback, mentorship and potential tourism partnerships to validate and improve the concept.'
    ],
    sharkTankTakeaway: "PlaceVerse aims to make discovering India's diverse destinations easier."
  }
];

export const STARTUP_PROBLEM_ITEMS = [
  {
    title: 'Overtourism & Generic Listicles',
    icon: 'Compass',
    problem: 'Every search engine returns the exact same 10 crowded spots, ignoring 90% of India’s living cultural majesty.',
    impact: 'Travelers end up in congested traffic jams in Manali or crowded beaches in North Goa rather than discovering serene wonders.'
  },
  {
    title: 'Scattered, Outdated Logistics',
    icon: 'AlertTriangle',
    problem: 'Key travel intel—seasonal timing, permit rules, photography bans, nearest railheads—is buried across defunct forums.',
    impact: 'Travelers arrive during monsoon closures or without mandatory inner-line permits, ruining entire journeys.'
  },
  {
    title: 'Disconnected Planning Tools',
    icon: 'Split',
    problem: 'Travelers juggle notes, Google Maps, budget spreadsheets, and WhatsApp groups just to organize a simple 3-day itinerary.',
    impact: 'High planning fatigue, miscalculated budgets, and disorganized itineraries without structured day-by-day flows.'
  }
];

export const STARTUP_SOLUTION_ITEMS = [
  {
    title: 'Curated Offbeat Catalogue',
    icon: 'ShieldCheck',
    detail: 'A curated destination list with geographical zones, indicative crowd levels, entry-fee information and cultural notes where available.'
  },
  {
    title: 'Side-by-Side Destination Comparison',
    icon: 'Scale',
    detail: 'Compare budget tiers, best seasons, ideal duration, and travel logistics before committing time and money.'
  },
  {
    title: 'Dynamic Multi-Day Trip Engine',
    icon: 'Calendar',
    detail: 'Build day-by-day sample travel schedules with indicative estimates for stays, meals, transport and entry fees, plus a packing checklist.'
  },
  {
    title: 'Community Contributions & Admin Demo',
    icon: 'Users',
    detail: 'Explorers can submit destination suggestions for review in the browser-based moderation prototype.'
  }
];

export const BUSINESS_MODEL_PROPOSALS = [
  {
    title: 'Hyper-Local Experience Commission',
    tag: 'B2C Marketplace Model',
    projection: '12% – 15% booking take rate',
    description: 'Potential partnerships with local heritage guides, artisans and community-led experiences, subject to future verification.',
    status: 'Proposed Revenue Stream'
  },
  {
    title: 'Verified Eco-Stay Partner Badging',
    tag: 'B2B Annual Subscription',
    projection: '₹12,000 / year per homestay',
    description: 'Potential listings for sustainable homestays and heritage stays, subject to future partner checks and clearly defined standards.',
    status: 'Proposed Revenue Stream'
  },
  {
    title: 'State Tourism Board Data Analytics',
    tag: 'B2G / Enterprise SaaS',
    projection: 'Custom institutional tier',
    description: 'Providing regional tourism boards with visitor dispersal telemetry, identifying under-visited heritage corridors to prevent overtourism.',
    status: 'Proposed Expansion'
  },
  {
    title: 'PlaceVerse Pro Offline Field Concierge',
    tag: 'Micro-Transaction / Premium',
    projection: '₹299 per downloadable trip bundle',
    description: 'Offline GPS route maps, downloadable cultural audio guides, emergency medical SOS coordinates, and offline transit schedules.',
    status: 'Proposed Feature'
  }
];

export const ROADMAP_PHASES = [
  {
    phase: 'Phase 1 · Working MVP',
    status: 'Completed / Live Demo',
    badge: 'Current Version',
    items: [
      'Curated catalogue across all 6 Indian geographical zones',
      'Instant search, multi-factor filters, and state selector',
      'Side-by-side 3-place comparison engine',
      'Dynamic day-by-day trip itinerary builder with budget calculator',
      'Explorer submission and Admin moderation workflow'
    ]
  },
  {
    phase: 'Phase 2 · Mobile & Offline',
    status: 'Planned for Q2 Next Year',
    badge: 'Proposal',
    items: [
      'Progressive Web App (PWA) with offline geo-caching',
      'Audio snippet guides recorded by native local historians',
      'Vernacular language integration (Hindi, Tamil, Marathi, Bengali)',
      'Community photo validation and photo-license attribution'
    ]
  },
  {
    phase: 'Phase 3 · Commercial Scale',
    status: 'Planned for Q4 Next Year',
    badge: 'Proposal',
    items: [
      'Direct dispatch of certified hyper-local guides and craft masters',
      'Seasonal crowd insights based on future visitor check-ins',
      'Carbon-offset calculator for domestic overland travel routes'
    ]
  }
];
