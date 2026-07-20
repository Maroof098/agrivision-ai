/**
 * AgriVision AI - TypeScript Types and Interfaces
 */

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'farmer' | 'admin' | 'expert';
  farmLocation: string;
  farmSize: number; // in acres
  primaryCrops: string[];
  language: 'en' | 'hi' | 'te';
  theme: 'light' | 'dark';
  profilePic?: string;
  createdAt: string;
}

export interface WeatherData {
  temp: number;
  feelsLike: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  uvIndex: number;
  aqi: number;
  condition: string;
  recommendation: string;
  forecast: {
    day: string;
    temp: number;
    rainfall: number;
    condition: string;
  }[];
}

export interface DiseaseAnalysis {
  id: string;
  imageUrl: string;
  diseaseName: string;
  confidence: number; // 0 to 100
  affectedArea: string; // e.g., "15% of total foliage"
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  suggestedTreatment: string;
  recommendedMedicine: string;
  organicSolution: string;
  chemicalSolution: string;
  recoveryTime: string; // e.g., "10-14 days"
  timestamp: string;
  part: 'leaf' | 'fruit' | 'stem';
  crop: string;
}

export interface FertilizerRecommendation {
  crop: string;
  soilType: string;
  ph: number;
  n: number;
  p: number;
  k: number;
  bestFertilizer: string;
  quantity: string; // e.g. "50 kg/acre"
  applicationSchedule: string[];
  organicAlternatives: string[];
  expectedYieldImprovement: string; // e.g. "+25%"
}

export interface SoilAnalysis {
  bestCrops: string[];
  fertilizerRequired: string;
  productivityScore: number; // 0 to 100
  waterRequirement: string; // e.g., "Medium (300-400mm)"
  yieldPotential: string; // e.g., "High (2.5 tons/acre)"
  details: string;
}

export interface YieldPrediction {
  expectedProduction: number; // in tons
  profit: number; // in USD or INR
  loss: number; // in USD or INR
  riskLevel: 'Low' | 'Medium' | 'High';
  riskFactors: string[];
  recommendations: string[];
}

export interface MarketPrice {
  id: string;
  crop: string;
  currentPrice: number; // price per quintal (100 kg)
  previousPrice: number;
  currency: string; // e.g., "INR" or "USD"
  marketName: string;
  demandTrend: 'High' | 'Medium' | 'Low';
  pricePrediction: string; // e.g. "Expected to rise by 5% next week"
  history: { month: string; price: number }[];
}

export interface GovernmentScheme {
  id: string;
  name: string;
  title?: string;
  tagline: string;
  description?: string;
  benefits: string;
  benefitAmount?: string;
  eligibility: string[];
  documentsRequired: string[];
  requiredDocuments?: string[];
  applicationLink: string;
  applyUrl?: string;
  category: 'Subsidy' | 'Insurance' | 'Loan' | 'Direct Benefit';
  ministry?: string;
}

export interface CalendarEvent {
  id: string;
  crop: string;
  stage: string; // "Sowing" | "Fertilizing" | "Watering" | "Pesticide" | "Harvesting"
  date: string;
  notes: string;
  completed: boolean;
}

export interface Expert {
  id: string;
  name: string;
  specialization: string;
  specialty?: string;
  experience: number; // years
  rating: number;
  availableDays: string[];
  consultationFee: number;
  profilePic: string;
  avatarUrl?: string;
  approved: boolean;
  institution?: string;
}

export interface Consultation {
  id: string;
  farmerId: string;
  expertId: string;
  expertName: string;
  dateTime: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  reportsUrl?: string;
  prescription?: string;
  chatHistory: { sender: 'farmer' | 'expert'; text: string; time: string }[];
}

export interface AlertNotification {
  id: string;
  title: string;
  message: string;
  type: 'weather' | 'disease' | 'fertilizer' | 'market' | 'calendar';
  timestamp: string;
  read: boolean;
}

export interface AdminLog {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  status: 'success' | 'warning' | 'error';
}
