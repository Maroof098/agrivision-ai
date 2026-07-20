import { pgTable, text, integer, doublePrecision, boolean, timestamp, jsonb, serial } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// 1. Users Table (using Firebase Auth UID as primary key id)
export const users = pgTable('users', {
  id: text('id').primaryKey(), // Firebase Auth UID or custom UID
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  role: text('role').$type<'farmer' | 'admin' | 'expert'>().notNull().default('farmer'),
  farmLocation: text('farm_location').notNull().default(''),
  farmSize: doublePrecision('farm_size').notNull().default(0), // in acres
  primaryCrops: jsonb('primary_crops').$type<string[]>().notNull().default([]),
  language: text('language').$type<'en' | 'hi' | 'te'>().notNull().default('en'),
  theme: text('theme').$type<'light' | 'dark'>().notNull().default('light'),
  profilePic: text('profile_pic'),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

// 2. Disease Detections / Uploads Table
export const diseaseDetections = pgTable('disease_detections', {
  id: text('id').primaryKey(), // unique UUID string
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  imageUrl: text('image_url').notNull(),
  diseaseName: text('disease_name').notNull(),
  confidence: doublePrecision('confidence').notNull(), // 0 to 100
  affectedArea: text('affected_area').notNull(), // e.g. "15% of foliage"
  severity: text('severity').$type<'Low' | 'Medium' | 'High' | 'Critical'>().notNull(),
  suggestedTreatment: text('suggested_treatment').notNull(),
  recommendedMedicine: text('recommended_medicine').notNull(),
  organicSolution: text('organic_solution').notNull(),
  chemicalSolution: text('chemical_solution').notNull(),
  recoveryTime: text('recovery_time').notNull(), // e.g. "10-14 days"
  timestamp: timestamp('timestamp').defaultNow().notNull(),
  part: text('part').$type<'leaf' | 'fruit' | 'stem'>().notNull(),
  crop: text('crop').notNull()
});

// 3. Fertilizer Recommendations Table
export const fertilizerRecommendations = pgTable('fertilizer_recommendations', {
  id: serial('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  crop: text('crop').notNull(),
  soilType: text('soil_type').notNull(),
  ph: doublePrecision('ph').notNull(),
  n: doublePrecision('n').notNull(),
  p: doublePrecision('p').notNull(),
  k: doublePrecision('k').notNull(),
  bestFertilizer: text('best_fertilizer').notNull(),
  quantity: text('quantity').notNull(), // e.g. "50 kg/acre"
  applicationSchedule: jsonb('application_schedule').$type<string[]>().notNull().default([]),
  organicAlternatives: jsonb('organic_alternatives').$type<string[]>().notNull().default([]),
  expectedYieldImprovement: text('expected_yield_improvement').notNull(), // e.g. "+25%"
  createdAt: timestamp('created_at').defaultNow().notNull()
});

// 4. Soil Analysis Table
export const soilAnalysis = pgTable('soil_analysis', {
  id: serial('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  soilType: text('soil_type').notNull(),
  ph: doublePrecision('ph').notNull(),
  n: doublePrecision('n').notNull(),
  p: doublePrecision('p').notNull(),
  k: doublePrecision('k').notNull(),
  bestCrops: jsonb('best_crops').$type<string[]>().notNull().default([]),
  fertilizerRequired: text('fertilizer_required').notNull(),
  productivityScore: doublePrecision('productivity_score').notNull(), // 0 to 100
  waterRequirement: text('water_requirement').notNull(),
  yieldPotential: text('yield_potential').notNull(),
  details: text('details').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

// 5. Yield Predictions Table
export const yieldPredictions = pgTable('yield_predictions', {
  id: serial('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  crop: text('crop').notNull(),
  area: doublePrecision('area').notNull(), // in acres
  expectedProduction: doublePrecision('expected_production').notNull(), // in tons
  profit: doublePrecision('profit').notNull(),
  loss: doublePrecision('loss').notNull(),
  riskLevel: text('risk_level').$type<'Low' | 'Medium' | 'High'>().notNull(),
  riskFactors: jsonb('risk_factors').$type<string[]>().notNull().default([]),
  recommendations: jsonb('recommendations').$type<string[]>().notNull().default([]),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

// 6. Market Prices Table
export const marketPrices = pgTable('market_prices', {
  id: text('id').primaryKey(), // UUID or string
  crop: text('crop').notNull(),
  currentPrice: doublePrecision('current_price').notNull(), // price per quintal
  previousPrice: doublePrecision('previous_price').notNull(),
  currency: text('currency').notNull().default('INR'),
  marketName: text('market_name').notNull(),
  demandTrend: text('demand_trend').$type<'High' | 'Medium' | 'Low'>().notNull(),
  pricePrediction: text('price_prediction').notNull(), // text description
  history: jsonb('history').$type<{ month: string; price: number }[]>().notNull().default([]),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

// 7. Government Schemes Table
export const governmentSchemes = pgTable('government_schemes', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  tagline: text('tagline').notNull(),
  benefits: text('benefits').notNull(),
  eligibility: jsonb('eligibility').$type<string[]>().notNull().default([]),
  documentsRequired: jsonb('documents_required').$type<string[]>().notNull().default([]),
  applicationLink: text('application_link').notNull(),
  category: text('category').$type<'Subsidy' | 'Insurance' | 'Loan' | 'Direct Benefit'>().notNull(),
  ministry: text('ministry').notNull().default('Ministry of Agriculture'),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

// 8. Crop Calendar Events Table
export const calendarEvents = pgTable('calendar_events', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  crop: text('crop').notNull(),
  stage: text('stage').notNull(), // e.g. Sowing, Fertilizing, Harvesting
  date: text('date').notNull(), // YYYY-MM-DD
  notes: text('notes').notNull(),
  completed: boolean('completed').notNull().default(false)
});

// 9. Experts Table
export const experts = pgTable('experts', {
  id: text('id').primaryKey(), // User ID if expert, or independent
  name: text('name').notNull(),
  specialization: text('specialization').notNull(),
  experience: integer('experience').notNull(), // years
  rating: doublePrecision('rating').notNull().default(5.0),
  availableDays: jsonb('available_days').$type<string[]>().notNull().default([]),
  consultationFee: doublePrecision('consultation_fee').notNull().default(0),
  profilePic: text('profile_pic').notNull(),
  approved: boolean('approved').notNull().default(false),
  institution: text('institution').notNull().default('Agricultural University'),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

// 10. Expert Consultations Table
export const consultations = pgTable('consultations', {
  id: text('id').primaryKey(),
  farmerId: text('farmer_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  expertId: text('expert_id').references(() => experts.id, { onDelete: 'cascade' }).notNull(),
  expertName: text('expert_name').notNull(),
  dateTime: text('date_time').notNull(),
  status: text('status').$type<'pending' | 'confirmed' | 'completed' | 'cancelled'>().notNull().default('pending'),
  reportsUrl: text('reports_url'),
  prescription: text('prescription'),
  chatHistory: jsonb('chat_history').$type<{ sender: 'farmer' | 'expert'; text: string; time: string }[]>().notNull().default([])
});

// 11. Notifications Table
export const notifications = pgTable('notifications', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  title: text('title').notNull(),
  message: text('message').notNull(),
  type: text('type').$type<'weather' | 'disease' | 'fertilizer' | 'market' | 'calendar'>().notNull(),
  timestamp: text('timestamp').notNull(), // timestamp or ISO string
  read: boolean('read').notNull().default(false)
});

// 12. Admin Logs Table
export const adminLogs = pgTable('admin_logs', {
  id: text('id').primaryKey(),
  action: text('action').notNull(),
  user: text('user').notNull(), // user email or name
  timestamp: text('timestamp').notNull(),
  status: text('status').$type<'success' | 'warning' | 'error'>().notNull()
});

// 13. General AI Chatbot History Table
export const chatbotMessages = pgTable('chatbot_messages', {
  id: serial('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  role: text('role').$type<'user' | 'model'>().notNull(),
  text: text('text').notNull(),
  lang: text('lang').$type<'en' | 'hi' | 'te'>().notNull().default('en'),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

// 14. Weather History / Cache Cache
export const weatherCache = pgTable('weather_cache', {
  id: serial('id').primaryKey(),
  location: text('location').notNull().unique(),
  data: jsonb('data').notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

// Defining Relations for easier querying using Drizzle Relations API if desired

export const usersRelations = relations(users, ({ many }) => ({
  diseaseDetections: many(diseaseDetections),
  fertilizerRecommendations: many(fertilizerRecommendations),
  soilAnalysis: many(soilAnalysis),
  yieldPredictions: many(yieldPredictions),
  calendarEvents: many(calendarEvents),
  consultations: many(consultations),
  notifications: many(notifications),
  chatbotMessages: many(chatbotMessages)
}));

export const diseaseDetectionsRelations = relations(diseaseDetections, ({ one }) => ({
  user: one(users, {
    fields: [diseaseDetections.userId],
    references: [users.id]
  })
}));

export const fertilizerRecommendationsRelations = relations(fertilizerRecommendations, ({ one }) => ({
  user: one(users, {
    fields: [fertilizerRecommendations.userId],
    references: [users.id]
  })
}));

export const soilAnalysisRelations = relations(soilAnalysis, ({ one }) => ({
  user: one(users, {
    fields: [soilAnalysis.userId],
    references: [users.id]
  })
}));

export const yieldPredictionsRelations = relations(yieldPredictions, ({ one }) => ({
  user: one(users, {
    fields: [yieldPredictions.userId],
    references: [users.id]
  })
}));

export const calendarEventsRelations = relations(calendarEvents, ({ one }) => ({
  user: one(users, {
    fields: [calendarEvents.userId],
    references: [users.id]
  })
}));

export const consultationsRelations = relations(consultations, ({ one }) => ({
  farmer: one(users, {
    fields: [consultations.farmerId],
    references: [users.id]
  }),
  expert: one(experts, {
    fields: [consultations.expertId],
    references: [experts.id]
  })
}));

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id]
  })
}));

export const chatbotMessagesRelations = relations(chatbotMessages, ({ one }) => ({
  user: one(users, {
    fields: [chatbotMessages.userId],
    references: [users.id]
  })
}));
