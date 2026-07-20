import { db } from './index.ts';
import { governmentSchemes, marketPrices, experts } from './schema.ts';
import { sql } from 'drizzle-orm';

async function seed() {
  console.log("Starting database verification and seeding...");

  // 1. Verify schema tables by running a basic count or info query
  try {
    const tableCheck = await db.execute(sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log("Verified tables in public schema:");
    console.log(tableCheck.rows.map(r => r.table_name));
  } catch (error) {
    console.error("Failed to query information_schema:", error);
    process.exit(1);
  }

  // 2. Seed Government Schemes
  console.log("Seeding Government Schemes...");
  const schemesData = [
    {
      id: "pm-kisan",
      name: "PM-KISAN",
      tagline: "Direct income support of ₹6,000 per year to all landholding farmer families.",
      benefits: "₹6,000 per year paid in three equal installments of ₹2,000 directly into bank accounts.",
      eligibility: ["All landholding farmer families", "Must have cultivable land holding"],
      documentsRequired: ["Aadhaar Card", "Land Holding Documents", "Bank Account Details"],
      applicationLink: "https://pmkisan.gov.in/",
      category: "Direct Benefit" as const,
      ministry: "Ministry of Agriculture & Farmers Welfare"
    },
    {
      id: "pmfby",
      name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
      tagline: "Financial support to farmers suffering crop loss/damage arising out of unforeseen events.",
      benefits: "Low premium rates (1.5% to 2% for foodcrops, 5% for horticultural crops) with full sum insured coverage for damage.",
      eligibility: ["All farmers including sharecroppers and tenant farmers growing notified crops"],
      documentsRequired: ["Land record (7/12 or khata)", "Sowing certificate", "Aadhaar card", "Bank passbook"],
      applicationLink: "https://pmfby.gov.in/",
      category: "Insurance" as const,
      ministry: "Ministry of Agriculture & Farmers Welfare"
    },
    {
      id: "kcc",
      name: "Kisan Credit Card (KCC)",
      tagline: "Sufficient and timely credit support from the banking system for agricultural needs.",
      benefits: "Loans up to ₹3 Lakhs at low interest rate (effective rate 4% after subvention), flexible repayment.",
      eligibility: ["All farmers (individuals/joint)", "Tenant farmers", "Sharecroppers", "Self Help Groups"],
      documentsRequired: ["Duly filled application form", "Identity proof", "Address proof", "Land cultivation document"],
      applicationLink: "https://www.myscheme.gov.in/schemes/kcc",
      category: "Loan" as const,
      ministry: "Department of Agriculture, Cooperation & Farmers Welfare"
    }
  ];

  for (const scheme of schemesData) {
    try {
      await db.insert(governmentSchemes)
        .values(scheme)
        .onConflictDoUpdate({
          target: governmentSchemes.id,
          set: {
            name: scheme.name,
            tagline: scheme.tagline,
            benefits: scheme.benefits,
            eligibility: scheme.eligibility,
            documentsRequired: scheme.documentsRequired,
            applicationLink: scheme.applicationLink,
            category: scheme.category,
            ministry: scheme.ministry
          }
        });
    } catch (e) {
      console.error(`Error inserting scheme ${scheme.id}:`, e);
    }
  }

  // 3. Seed Market Prices
  console.log("Seeding Market Prices...");
  const pricesData = [
    {
      id: "crop-rice",
      crop: "Rice (Paddy)",
      currentPrice: 2183,
      previousPrice: 2040,
      currency: "INR",
      marketName: "Kurnool APMC Market",
      demandTrend: "High" as const,
      pricePrediction: "Expected to rise by 3-5% next month due to increased export demand.",
      history: [
        { month: "Jan", price: 1980 },
        { month: "Feb", price: 2010 },
        { month: "Mar", price: 2040 },
        { month: "Apr", price: 2060 },
        { month: "May", price: 2100 },
        { month: "Jun", price: 2150 },
        { month: "Jul", price: 2183 }
      ]
    },
    {
      id: "crop-wheat",
      crop: "Wheat",
      currentPrice: 2275,
      previousPrice: 2125,
      currency: "INR",
      marketName: "Indore Mandi",
      demandTrend: "Medium" as const,
      pricePrediction: "Steady trend likely due to adequate government buffers.",
      history: [
        { month: "Jan", price: 2100 },
        { month: "Feb", price: 2125 },
        { month: "Mar", price: 2150 },
        { month: "Apr", price: 2200 },
        { month: "May", price: 2225 },
        { month: "Jun", price: 2250 },
        { month: "Jul", price: 2275 }
      ]
    },
    {
      id: "crop-cotton",
      crop: "Cotton (Kapas)",
      currentPrice: 7020,
      previousPrice: 7250,
      currency: "INR",
      marketName: "Adoni APMC Market",
      demandTrend: "Low" as const,
      pricePrediction: "A temporary correction expected due to fresh arrivals, then recovery.",
      history: [
        { month: "Jan", price: 7400 },
        { month: "Feb", price: 7350 },
        { month: "Mar", price: 7300 },
        { month: "Apr", price: 7250 },
        { month: "May", price: 7150 },
        { month: "Jun", price: 7080 },
        { month: "Jul", price: 7020 }
      ]
    }
  ];

  for (const price of pricesData) {
    try {
      await db.insert(marketPrices)
        .values(price)
        .onConflictDoUpdate({
          target: marketPrices.id,
          set: {
            currentPrice: price.currentPrice,
            previousPrice: price.previousPrice,
            demandTrend: price.demandTrend,
            pricePrediction: price.pricePrediction,
            history: price.history
          }
        });
    } catch (e) {
      console.error(`Error inserting price ${price.id}:`, e);
    }
  }

  // 4. Seed Experts
  console.log("Seeding Experts...");
  const expertsData = [
    {
      id: "expert-1",
      name: "Dr. Ramesh Chandra",
      specialization: "Plant Pathology & Rice Diseases",
      experience: 15,
      rating: 4.9,
      availableDays: ["Monday", "Wednesday", "Friday"],
      consultationFee: 150,
      profilePic: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200",
      approved: true,
      institution: "Indian Agricultural Research Institute (IARI)"
    },
    {
      id: "expert-2",
      name: "Dr. Priya Ananth",
      specialization: "Soil Chemistry & Nutrient Management",
      experience: 12,
      rating: 4.8,
      availableDays: ["Tuesday", "Thursday", "Saturday"],
      consultationFee: 200,
      profilePic: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=200",
      approved: true,
      institution: "Tamil Nadu Agricultural University"
    }
  ];

  for (const expert of expertsData) {
    try {
      await db.insert(experts)
        .values(expert)
        .onConflictDoUpdate({
          target: experts.id,
          set: {
            name: expert.name,
            specialization: expert.specialization,
            experience: expert.experience,
            rating: expert.rating,
            availableDays: expert.availableDays,
            consultationFee: expert.consultationFee,
            profilePic: expert.profilePic,
            approved: expert.approved,
            institution: expert.institution
          }
        });
    } catch (e) {
      console.error(`Error inserting expert ${expert.id}:`, e);
    }
  }

  console.log("Seeding and validation completed successfully.");
  process.exit(0);
}

seed().catch(err => {
  console.error("Unhandled error during seeding:", err);
  process.exit(1);
});
