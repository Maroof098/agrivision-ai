import { 
  MarketPrice, 
  GovernmentScheme, 
  CalendarEvent, 
  Expert, 
  AlertNotification,
  WeatherData
} from './types';

// Clickable leaf disease presets for demonstration
export interface DiseasePreset {
  id: string;
  crop: string;
  diseaseName: string;
  part: 'leaf' | 'fruit' | 'stem';
  thumbnailColor: string; // Tailwind bg color
  imageUrl: string; // Placeholder illustration path
  analysis: {
    diseaseName: string;
    confidence: number;
    affectedArea: string;
    severity: 'Low' | 'Medium' | 'High' | 'Critical';
    suggestedTreatment: string;
    recommendedMedicine: string;
    organicSolution: string;
    chemicalSolution: string;
    recoveryTime: string;
  };
}

export const DISEASE_PRESETS: DiseasePreset[] = [
  {
    id: 'preset-tomato-blight',
    crop: 'Tomato',
    diseaseName: 'Late Blight (Phytophthora infestans)',
    part: 'leaf',
    thumbnailColor: 'bg-amber-100 border-amber-400 text-amber-800',
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=600', // Tomato leaf
    analysis: {
      diseaseName: 'Tomato Late Blight',
      confidence: 94.5,
      affectedArea: '25% of lower canopy foliage',
      severity: 'High',
      suggestedTreatment: 'Remove affected leaves immediately, ensure spacing to allow air circulation, and avoid overhead irrigation to keep foliage dry.',
      recommendedMedicine: 'Copper-based fungicides or Chlorothalonil.',
      organicSolution: 'Apply Neem oil spray, compost tea, or liquid copper soaps. Increase spacing to decrease humidity.',
      chemicalSolution: 'Spray metalaxyl-M, chlorothalonil, or mancozeb as soon as weather conditions favour disease spread (cool, moist periods).',
      recoveryTime: '12 - 15 Days'
    }
  },
  {
    id: 'preset-rice-blast',
    crop: 'Rice',
    diseaseName: 'Rice Blast (Magnaporthe oryzae)',
    part: 'leaf',
    thumbnailColor: 'bg-lime-100 border-lime-400 text-lime-800',
    imageUrl: 'https://images.unsplash.com/photo-1536630590250-9858371c633a?auto=format&fit=crop&q=80&w=600', // Rice crop
    analysis: {
      diseaseName: 'Rice Blast',
      confidence: 89.2,
      affectedArea: '15% of the leaf blades (spindle-shaped lesions)',
      severity: 'Medium',
      suggestedTreatment: 'Avoid excessive nitrogen fertilization, maintain proper water levels in the paddy, and use blast-resistant cultivars in future cycles.',
      recommendedMedicine: 'Tricyclazole 75% WP or Azoxystrobin.',
      organicSolution: 'Spray Pseudomonas fluorescens formulation or seed treatment with Trichoderma viride. Maintain clean field borders.',
      chemicalSolution: 'Apply Tricyclazole (0.6 g/L of water) or Isoprothiolane 40% EC at the first sign of leaf lesions.',
      recoveryTime: '14 - 18 Days'
    }
  },
  {
    id: 'preset-corn-rust',
    crop: 'Corn',
    diseaseName: 'Common Rust (Puccinia sorghi)',
    part: 'leaf',
    thumbnailColor: 'bg-yellow-100 border-yellow-400 text-yellow-800',
    imageUrl: 'https://images.unsplash.com/photo-1551749005-ee7755164402?auto=format&fit=crop&q=80&w=600', // Corn field leaf
    analysis: {
      diseaseName: 'Corn Common Rust',
      confidence: 91.8,
      affectedArea: '10% of mid-tier leaves covered in cinnamon-brown pustules',
      severity: 'Low',
      suggestedTreatment: 'Ensure high sunlight penetration, apply balanced potassium fertilizer to improve immunity, and till infected crop debris into soil post-harvest.',
      recommendedMedicine: 'Pyraclostrobin or Propiconazole.',
      organicSolution: 'Apply sulfur sprays or potassium bicarbonate mixture. Ensure rotation with non-cereal crops.',
      chemicalSolution: 'Apply propiconazole or tebuconazole if rust pustules appear before silking and forecast predicts high humidity.',
      recoveryTime: '8 - 10 Days'
    }
  },
  {
    id: 'preset-potato-scab',
    crop: 'Potato',
    diseaseName: 'Common Scab (Streptomyces scabies)',
    part: 'fruit', // tuber
    thumbnailColor: 'bg-orange-100 border-orange-400 text-orange-800',
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=600', // Potato
    analysis: {
      diseaseName: 'Potato Common Scab',
      confidence: 88.0,
      affectedArea: 'Skin lesions covering 30% of the tuber surface',
      severity: 'Medium',
      suggestedTreatment: 'Maintain high soil moisture during early tuber development (weeks 4-6). Keep soil pH below 5.2 if possible. Rotate with rye or oats.',
      recommendedMedicine: 'Soil treatment with Mancozeb or Seed treatment with Fludioxonil.',
      organicSolution: 'Incorporate green manures (alfalfa, mustard) before planting. Avoid animal manure which increases alkaline conditions.',
      chemicalSolution: 'Use seed treatments such as fludioxonil or sulfur dusting of cut seed pieces. Apply soil-applied sulfur to lower pH.',
      recoveryTime: 'N/A (Tuber damage is permanent, preventative for next yield)'
    }
  }
];

export const INITIAL_WEATHER: WeatherData = {
  temp: 29.4,
  feelsLike: 32.1,
  humidity: 74,
  rainfall: 12.5, // mm
  windSpeed: 14.8, // km/h
  uvIndex: 8.5, // Very High
  aqi: 42, // Good
  condition: 'Scattered Showers',
  recommendation: 'A moderate rainfall of 12.5mm is expected. Irrigation can be skipped today. Delay fertilizer spraying by 24 hours to prevent runoff.',
  forecast: [
    { day: 'Today', temp: 29, rainfall: 12.5, condition: 'Rain Showers' },
    { day: 'Mon', temp: 31, rainfall: 2.0, condition: 'Partly Cloudy' },
    { day: 'Tue', temp: 32, rainfall: 0.0, condition: 'Sunny' },
    { day: 'Wed', temp: 33, rainfall: 0.0, condition: 'Sunny' },
    { day: 'Thu', temp: 28, rainfall: 18.2, condition: 'Thunderstorms' },
    { day: 'Fri', temp: 29, rainfall: 8.4, condition: 'Light Rain' },
    { day: 'Sat', temp: 30, rainfall: 0.0, condition: 'Mostly Sunny' }
  ]
};

export const MARKET_PRICES: MarketPrice[] = [
  {
    id: 'm-1',
    crop: 'Basmati Rice',
    currentPrice: 4200,
    previousPrice: 3950,
    currency: 'INR',
    marketName: 'Karnal Grain Market, Haryana',
    demandTrend: 'High',
    pricePrediction: 'Expected to rise by 4-6% over the next 15 days due to export demands.',
    history: [
      { month: 'Feb', price: 3700 },
      { month: 'Mar', price: 3800 },
      { month: 'Apr', price: 3750 },
      { month: 'May', price: 3900 },
      { month: 'Jun', price: 3950 },
      { month: 'Jul', price: 4200 }
    ]
  },
  {
    id: 'm-2',
    crop: 'Wheat (Sonalika)',
    currentPrice: 2450,
    previousPrice: 2500,
    currency: 'INR',
    marketName: 'Indore Mandi, Madhya Pradesh',
    demandTrend: 'Medium',
    pricePrediction: 'Prices will stabilize with a minor dip (-1%) due to buffer stock arrivals.',
    history: [
      { month: 'Feb', price: 2300 },
      { month: 'Mar', price: 2420 },
      { month: 'Apr', price: 2600 },
      { month: 'May', price: 2550 },
      { month: 'Jun', price: 2500 },
      { month: 'Jul', price: 2450 }
    ]
  },
  {
    id: 'm-3',
    crop: 'Cotton (Long Staple)',
    currentPrice: 7100,
    previousPrice: 6800,
    currency: 'INR',
    marketName: 'Adoni Mandi, Andhra Pradesh',
    demandTrend: 'High',
    pricePrediction: 'Strong textile factory demand signals a further increase of 3% next week.',
    history: [
      { month: 'Feb', price: 6200 },
      { month: 'Mar', price: 6400 },
      { month: 'Apr', price: 6500 },
      { month: 'May', price: 6750 },
      { month: 'Jun', price: 6800 },
      { month: 'Jul', price: 7100 }
    ]
  },
  {
    id: 'm-4',
    crop: 'Desi Tomato',
    currentPrice: 3500,
    previousPrice: 4800,
    currency: 'INR',
    marketName: 'Kolar Mandi, Karnataka',
    demandTrend: 'Low',
    pricePrediction: 'Prices dropping sharply as local monsoon supply peaks. Expect prices to level off at 3000.',
    history: [
      { month: 'Feb', price: 1800 },
      { month: 'Mar', price: 2000 },
      { month: 'Apr', price: 2800 },
      { month: 'May', price: 4200 },
      { month: 'Jun', price: 4800 },
      { month: 'Jul', price: 3500 }
    ]
  },
  {
    id: 'm-5',
    crop: 'Potatoes (Jyoti)',
    currentPrice: 1650,
    previousPrice: 1600,
    currency: 'INR',
    marketName: 'Agra Mandi, Uttar Pradesh',
    demandTrend: 'Medium',
    pricePrediction: 'Stable market conditions; potato prices are predicted to hold at current ranges.',
    history: [
      { month: 'Feb', price: 1400 },
      { month: 'Mar', price: 1450 },
      { month: 'Apr', price: 1550 },
      { month: 'May', price: 1580 },
      { month: 'Jun', price: 1600 },
      { month: 'Jul', price: 1650 }
    ]
  }
];

export const GOVERNMENT_SCHEMES: GovernmentScheme[] = [
  {
    id: 'g-1',
    name: 'PM-Kisan Samman Nidhi',
    tagline: 'Direct income support of ₹6,000 per year to all landholding farmer families.',
    benefits: '₹6,000 is transferred annually in three equal installments of ₹2,000 directly into the bank accounts of farmers.',
    eligibility: [
      'Small and marginal farmer families',
      'Must own cultivable agricultural land in their name',
      'Institutional landholders and taxpayers are excluded'
    ],
    documentsRequired: [
      'Aadhaar Card (Mandatory)',
      'Land Ownership Papers (Jamabandi/RoR)',
      'Bank Account Passbook',
      'Mobile Number linked to Aadhaar'
    ],
    applicationLink: 'https://pmkisan.gov.in/',
    category: 'Direct Benefit'
  },
  {
    id: 'g-2',
    name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    tagline: 'Comprehensive crop insurance coverage against non-preventable natural risks.',
    benefits: 'Extremely low premium of 2.0% for Kharif, 1.5% for Rabi, and 5% for horticultural crops. Full financial claim support for crop failures caused by droughts, floods, pests, or post-harvest losses.',
    eligibility: [
      'All farmers growing notified crops in notified areas',
      'Tenant farmers and sharecroppers are also eligible'
    ],
    documentsRequired: [
      'Land Records (Khasra/Khatauni)',
      'Sowing Certificate / Self-Declaration',
      'ID and Address Proof (Aadhaar/Voter Card)',
      'Cancelled Cheque / Bank details'
    ],
    applicationLink: 'https://pmfby.gov.in/',
    category: 'Insurance'
  },
  {
    id: 'g-3',
    name: 'Agriculture Infrastructure Fund (AIF)',
    tagline: 'Medium-to-long term debt financing facility for post-harvest infrastructure projects.',
    benefits: 'Interest subvention of 3% per annum on loans up to ₹2 Crores for up to 7 years. Credit guarantee coverage under CGTMSE for loans up to ₹2 Crores.',
    eligibility: [
      'Primary Agricultural Credit Societies (PACS)',
      'Farmer Producer Organizations (FPOs)',
      'Agri-entrepreneurs, Startups, and Individual Farmers'
    ],
    documentsRequired: [
      'Detailed Project Report (DPR)',
      'Land Documents (Lease or Ownership)',
      'PAN and KYC of Applicants',
      'Balance Sheet / Financial History of last 3 years (for societies)'
    ],
    applicationLink: 'https://agriinfra.dac.gov.in/',
    category: 'Loan'
  },
  {
    id: 'g-4',
    name: 'Sub-Mission on Agricultural Mechanization (SMAM)',
    tagline: 'Financial assistance of up to 40% to 50% for purchasing farm implements and tractors.',
    benefits: 'Subsidies on purchase of Tractors, Power Tillers, Rotavators, Laser Land Levelers, Drone sprayers, and Harvesters.',
    eligibility: [
      'Small, marginal, SC/ST, and women farmers are given priority',
      'Individual farmers or cooperative societies'
    ],
    documentsRequired: [
      'Aadhaar Card',
      'Land ownership records (RoR)',
      'Bank Account copy',
      'Category Certificate (SC/ST, if applicable)',
      'Quotations of equipment from approved dealer'
    ],
    applicationLink: 'https://agrimachinery.nic.in/',
    category: 'Subsidy'
  }
];

export const INITIAL_CROP_CALENDAR: CalendarEvent[] = [
  {
    id: 'c-1',
    crop: 'Rice',
    stage: 'Sowing & Nursery',
    date: '2026-06-15',
    notes: 'Prepare the nursery bed. Treat seeds with Trichoderma before sowing.',
    completed: true
  },
  {
    id: 'c-2',
    crop: 'Rice',
    stage: 'Transplanting',
    date: '2026-07-10',
    notes: 'Transplant 25-30 days old seedlings. Maintain 2-3 cm of standing water in paddy fields.',
    completed: true
  },
  {
    id: 'c-3',
    crop: 'Rice',
    stage: 'Fertilizing (1st Split)',
    date: '2026-07-25',
    notes: 'Apply first split of Nitrogen (Urea @ 30kg/acre) along with Neem cake powder.',
    completed: false
  },
  {
    id: 'c-4',
    crop: 'Tomato',
    stage: 'Sowing',
    date: '2026-07-20',
    notes: 'Sow tomato seeds in trays containing cocopeat and vermicompost.',
    completed: false
  },
  {
    id: 'c-5',
    crop: 'Rice',
    stage: 'Weeding & Water Control',
    date: '2026-08-05',
    notes: 'Perform manual weeding or apply post-emergence herbicide if weed density is high.',
    completed: false
  },
  {
    id: 'c-6',
    crop: 'Tomato',
    stage: 'Transplanting',
    date: '2026-08-15',
    notes: 'Transplant tomato seedlings to ridges with 60cm distance. Setup support stakes.',
    completed: false
  },
  {
    id: 'c-7',
    crop: 'Rice',
    stage: 'Harvesting',
    date: '2026-10-20',
    notes: 'Drain field water 10 days before harvest. Cut plants when grains turn 85% golden.',
    completed: false
  }
];

export const EXPERTS: Expert[] = [
  {
    id: 'e-1',
    name: 'Dr. Ramesh Chandra',
    specialization: 'Plant Pathology & Fungal Diseases',
    experience: 18,
    rating: 4.9,
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    consultationFee: 300, // INR
    profilePic: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300',
    approved: true
  },
  {
    id: 'e-2',
    name: 'Er. Sunitha Reddy',
    specialization: 'Soil Sciences & Drip Irrigation',
    experience: 12,
    rating: 4.8,
    availableDays: ['Tuesday', 'Thursday'],
    consultationFee: 250, // INR
    profilePic: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=300',
    approved: true
  },
  {
    id: 'e-3',
    name: 'Prof. Amit Sharma',
    specialization: 'Precision Agronomy & Yield Optimization',
    experience: 22,
    rating: 5.0,
    availableDays: ['Saturday', 'Sunday'],
    consultationFee: 400, // INR
    profilePic: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300',
    approved: true
  },
  {
    id: 'e-4',
    name: 'Dr. Vivek Anand',
    specialization: 'Organic Pest Management',
    experience: 8,
    rating: 4.6,
    availableDays: ['Monday', 'Tuesday', 'Wednesday'],
    consultationFee: 200, // INR
    profilePic: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300',
    approved: false // Needs admin approval!
  }
];

export const INITIAL_NOTIFICATIONS: AlertNotification[] = [
  {
    id: 'n-1',
    title: 'Rain Shower Alert',
    message: 'Rain expected in your farm area this afternoon (12.5mm). skip watering today.',
    type: 'weather',
    timestamp: '2026-07-19T08:30:00Z',
    read: false
  },
  {
    id: 'n-2',
    title: 'Late Blight Risk elevated',
    message: 'High humidity (74%) and warm temperatures are favorable for Tomato Late Blight. Monitor crops closely.',
    type: 'disease',
    timestamp: '2026-07-18T14:15:00Z',
    read: false
  },
  {
    id: 'n-3',
    title: 'Market Surge for Basmati',
    message: 'Basmati Rice prices reached ₹4,200/quintal today (+₹250). Consider booking sales.',
    type: 'market',
    timestamp: '2026-07-19T06:00:00Z',
    read: true
  },
  {
    id: 'n-4',
    title: 'Fertilizer Split Reminder',
    message: 'Your Rice calendar event: "Fertilizing (1st Split)" is scheduled for tomorrow. Urea ready?',
    type: 'calendar',
    timestamp: '2026-07-18T18:00:00Z',
    read: true
  }
];
