export type RiskLevel = "Low" | "Medium" | "High";

export interface BusinessOption {
  id: string;
  name: string;
  score: number;
  demand: number;
  competition: number;
  investment: "Low" | "Medium" | "High";
  growth: number;
  customerPotential: number;
  revenue: string;
  risk: RiskLevel;
  summary: string;
}

export const DEFAULT_LOCATION = "Gachibowli, Hyderabad";
export const DEFAULT_BUDGET = 2000000;
export const GACHIBOWLI: [number, number] = [17.4401, 78.3489];

export const businessOptions: BusinessOption[] = [
  {
    id: "cloud-kitchen",
    name: "Cloud Kitchen",
    score: 89,
    demand: 94,
    competition: 65,
    investment: "Medium",
    growth: 88,
    customerPotential: 91,
    revenue: "₹4–6 Lakhs",
    risk: "Medium",
    summary:
      "High office density and late working hours drive consistent delivery demand with low real-estate overhead.",
  },
  {
    id: "premium-gym",
    name: "Premium Gym",
    score: 82,
    demand: 86,
    competition: 71,
    investment: "High",
    growth: 79,
    customerPotential: 84,
    revenue: "₹5–8 Lakhs",
    risk: "Medium",
    summary:
      "Affluent young professional base supports premium memberships, but capex and churn need careful planning.",
  },
  {
    id: "cafe",
    name: "Cafe",
    score: 71,
    demand: 74,
    competition: 83,
    investment: "Medium",
    growth: 66,
    customerPotential: 76,
    revenue: "₹2.5–4 Lakhs",
    risk: "High",
    summary: "Strong footfall but saturated with established chains within a 1.5 km radius.",
  },
  {
    id: "supermarket",
    name: "Supermarket",
    score: 68,
    demand: 70,
    competition: 78,
    investment: "High",
    growth: 61,
    customerPotential: 72,
    revenue: "₹6–9 Lakhs",
    risk: "High",
    summary: "Volume driven with thin margins; success depends heavily on rental negotiation.",
  },
  {
    id: "co-working",
    name: "Co-working Space",
    score: 77,
    demand: 81,
    competition: 69,
    investment: "High",
    growth: 84,
    customerPotential: 80,
    revenue: "₹7–11 Lakhs",
    risk: "Medium",
    summary: "Startup inflow into the IT corridor keeps desk occupancy above 70%.",
  },
  {
    id: "pharmacy",
    name: "Pharmacy",
    score: 74,
    demand: 79,
    competition: 62,
    investment: "Low",
    growth: 68,
    customerPotential: 75,
    revenue: "₹2–3.5 Lakhs",
    risk: "Low",
    summary: "Stable, recession-resistant demand near residential clusters and hospitals.",
  },
];

export const recommendedBusiness: BusinessOption = businessOptions[0]!;

export const locationMetrics = [
  {
    label: "Population",
    value: 87,
    detail: "4.2L within 5 km",
    hint: "Dense IT-corridor catchment",
  },
  {
    label: "Business Density",
    value: 76,
    detail: "1,240 registered units",
    hint: "High commercial saturation",
  },
  {
    label: "Competition",
    value: 65,
    detail: "18 direct competitors",
    hint: "Moderate — room for niche play",
  },
  {
    label: "Demand",
    value: 94,
    detail: "Peak 12pm–3pm, 8pm–11pm",
    hint: "Very strong delivery demand",
  },
  {
    label: "Commercial Activity",
    value: 91,
    detail: "₹210 Cr monthly GMV",
    hint: "Top 5% in Hyderabad",
  },
  {
    label: "Growth Potential",
    value: 88,
    detail: "+14% YoY footfall",
    hint: "Continued corporate expansion",
  },
  {
    label: "Accessibility",
    value: 82,
    detail: "Metro 1.8 km, ORR 2.4 km",
    hint: "Excellent road connectivity",
  },
  {
    label: "Customer Potential",
    value: 90,
    detail: "68% aged 22–38",
    hint: "High disposable income",
  },
];

export const mlPredictions = [
  { label: "Demand Prediction", value: "87/100", numeric: 87, note: "Model v1.4 · mock output" },
  { label: "Revenue Prediction", value: "₹4–6 Lakhs", numeric: 78, note: "Monthly, steady state" },
  { label: "Opportunity Score", value: "89/100", numeric: 89, note: "Composite index" },
];

export const keyInsights = [
  {
    title: "Delivery-first demand",
    body: "72% of evening food orders in this pincode are delivery-only — favouring a kitchen without dine-in costs.",
  },
  {
    title: "Rent arbitrage",
    body: "Cloud kitchen rentals are 58% lower than high-street retail within the same 2 km radius.",
  },
  {
    title: "Competition gap",
    body: "Only 3 of 18 competitors offer healthy/high-protein menus despite 41% search interest.",
  },
  {
    title: "Break-even horizon",
    body: "Projected break-even in 7–9 months at 55% capacity utilisation.",
  },
];

export const riskFactors = [
  {
    name: "Market Saturation",
    level: "Medium" as RiskLevel,
    score: 58,
    note: "18 competitors, mostly generic menus.",
  },
  {
    name: "Operating Cost",
    level: "Medium" as RiskLevel,
    score: 54,
    note: "Aggregator commission 18–24%.",
  },
  {
    name: "Regulatory / FSSAI",
    level: "Low" as RiskLevel,
    score: 24,
    note: "Standard licensing, 3–4 weeks.",
  },
  {
    name: "Demand Volatility",
    level: "Low" as RiskLevel,
    score: 31,
    note: "Weekday office demand is stable.",
  },
  {
    name: "Talent Availability",
    level: "High" as RiskLevel,
    score: 72,
    note: "Kitchen staff attrition is ~35%.",
  },
];

export const marketOpportunities = [
  {
    id: "healthy-meal",
    name: "Healthy Meal Service",
    score: 91,
    category: "Food & Beverage",
    investment: "Medium",
    risk: "Low" as RiskLevel,
    growth: "+26% YoY",
    revenue: "₹4–7 Lakhs",
    description: "Subscription-based macro-tracked meals for IT employees and gym-goers.",
  },
  {
    id: "affordable-fitness",
    name: "Affordable Fitness Center",
    score: 86,
    category: "Health & Wellness",
    investment: "High",
    risk: "Medium" as RiskLevel,
    growth: "+19% YoY",
    revenue: "₹3–6 Lakhs",
    description: "Budget 24/7 gym targeting the underserved ₹999/month segment.",
  },
  {
    id: "specialty-grocery",
    name: "Specialty Grocery Store",
    score: 83,
    category: "Retail",
    investment: "Medium",
    risk: "Medium" as RiskLevel,
    growth: "+15% YoY",
    revenue: "₹3.5–5 Lakhs",
    description: "Imported, organic and regional produce for high-income households.",
  },
  {
    id: "daycare",
    name: "Corporate Daycare",
    score: 79,
    category: "Services",
    investment: "High",
    risk: "Medium" as RiskLevel,
    growth: "+22% YoY",
    revenue: "₹2.5–4 Lakhs",
    description: "Tie-ups with tech parks for on-campus childcare during work hours.",
  },
  {
    id: "ev-charging",
    name: "EV Charging Hub",
    score: 76,
    category: "Infrastructure",
    investment: "High",
    risk: "High" as RiskLevel,
    growth: "+38% YoY",
    revenue: "₹1.5–3 Lakhs",
    description: "Fast-charging bays near ORR exits with retail attach.",
  },
  {
    id: "tutoring",
    name: "Premium Tutoring Center",
    score: 72,
    category: "Education",
    investment: "Low",
    risk: "Low" as RiskLevel,
    growth: "+11% YoY",
    revenue: "₹1.5–2.5 Lakhs",
    description: "Competitive-exam coaching for the residential belt around Kondapur.",
  },
];

export const demandTrend = [
  { month: "Jan", demand: 72, competition: 60, revenue: 3.2 },
  { month: "Feb", demand: 75, competition: 61, revenue: 3.5 },
  { month: "Mar", demand: 79, competition: 63, revenue: 3.9 },
  { month: "Apr", demand: 82, competition: 64, revenue: 4.2 },
  { month: "May", demand: 86, competition: 65, revenue: 4.6 },
  { month: "Jun", demand: 88, competition: 65, revenue: 4.9 },
  { month: "Jul", demand: 91, competition: 66, revenue: 5.3 },
  { month: "Aug", demand: 94, competition: 65, revenue: 5.7 },
];

export const revenueForecast = [
  { month: "M1", low: 2.1, expected: 2.8, high: 3.4 },
  { month: "M3", low: 2.9, expected: 3.7, high: 4.5 },
  { month: "M6", low: 3.6, expected: 4.6, high: 5.5 },
  { month: "M9", low: 4.1, expected: 5.2, high: 6.3 },
  { month: "M12", low: 4.6, expected: 5.9, high: 7.1 },
];

export const customerSegments = [
  { name: "IT Professionals", value: 42 },
  { name: "Students", value: 21 },
  { name: "Families", value: 24 },
  { name: "Others", value: 13 },
];

export type MapCategory =
  | "Selected Location"
  | "Competitors"
  | "Restaurants"
  | "Gyms"
  | "Offices"
  | "Schools/Colleges"
  | "Hospitals";

export interface MapPoint {
  id: string;
  name: string;
  category: MapCategory;
  position: [number, number];
  note: string;
}

export const mapPoints: MapPoint[] = [
  {
    id: "sel",
    name: "Selected Location",
    category: "Selected Location",
    position: [17.4401, 78.3489],
    note: "Proposed cloud kitchen site",
  },
  {
    id: "c1",
    name: "SpiceBox Cloud Kitchen",
    category: "Competitors",
    position: [17.4448, 78.3521],
    note: "Direct competitor · 4.1★",
  },
  {
    id: "c2",
    name: "FreshBowl Kitchens",
    category: "Competitors",
    position: [17.4352, 78.3441],
    note: "Direct competitor · 3.9★",
  },
  {
    id: "c3",
    name: "Biryani Junction",
    category: "Competitors",
    position: [17.4423, 78.3405],
    note: "Direct competitor · 4.3★",
  },
  {
    id: "r1",
    name: "Cafe Niloufer",
    category: "Restaurants",
    position: [17.4471, 78.3462],
    note: "Dine-in · high footfall",
  },
  {
    id: "r2",
    name: "Barbeque Nation",
    category: "Restaurants",
    position: [17.4386, 78.3556],
    note: "Dine-in · weekend peak",
  },
  {
    id: "r3",
    name: "Chai Point",
    category: "Restaurants",
    position: [17.4339, 78.3512],
    note: "Quick service",
  },
  {
    id: "g1",
    name: "Cult.fit Gachibowli",
    category: "Gyms",
    position: [17.4437, 78.3568],
    note: "1,200+ members",
  },
  {
    id: "g2",
    name: "Gold's Gym",
    category: "Gyms",
    position: [17.4368, 78.3392],
    note: "Premium segment",
  },
  {
    id: "o1",
    name: "DLF Cyber City",
    category: "Offices",
    position: [17.4482, 78.3809],
    note: "~35,000 employees",
  },
  {
    id: "o2",
    name: "Wipro Campus",
    category: "Offices",
    position: [17.4295, 78.3355],
    note: "~18,000 employees",
  },
  {
    id: "o3",
    name: "RMZ Futura",
    category: "Offices",
    position: [17.4456, 78.3624],
    note: "~9,000 employees",
  },
  {
    id: "s1",
    name: "IIIT Hyderabad",
    category: "Schools/Colleges",
    position: [17.4455, 78.3487],
    note: "3,000 students",
  },
  {
    id: "s2",
    name: "Sreenidhi Junior College",
    category: "Schools/Colleges",
    position: [17.4331, 78.3583],
    note: "1,800 students",
  },
  {
    id: "h1",
    name: "Continental Hospitals",
    category: "Hospitals",
    position: [17.4212, 78.3406],
    note: "750 beds",
  },
  {
    id: "h2",
    name: "AIG Hospitals",
    category: "Hospitals",
    position: [17.4265, 78.3298],
    note: "900 beds",
  },
];

export const mapCategoryColors: Record<MapCategory, string> = {
  "Selected Location": "#60a5fa",
  Competitors: "#f87171",
  Restaurants: "#fbbf24",
  Gyms: "#34d399",
  Offices: "#a78bfa",
  "Schools/Colleges": "#22d3ee",
  Hospitals: "#fb7185",
};

export const advisorSuggestions = [
  "Why did you recommend a cloud kitchen?",
  "What are the major risks?",
  "How can I reduce the risk?",
  "Why is this location suitable?",
];

export const advisorAnswers: { match: string[]; answer: string }[] = [
  {
    match: ["recommend", "cloud kitchen", "why cloud"],
    answer:
      "Cloud Kitchen scored 89/100 because three signals aligned in Gachibowli: demand is 94/100 (driven by ~62,000 office employees within 3 km ordering delivery at lunch and late evening), competition is only 65/100 with just 3 of 18 players offering differentiated menus, and the capital requirement fits your ₹20,00,000 budget — kitchen rentals here run 58% below high-street retail. Projected steady-state revenue is ₹4–6 Lakhs per month with break-even in 7–9 months.",
  },
  {
    match: ["risk", "danger", "downside"],
    answer:
      "Three risks matter most. 1) Talent availability is High (72/100) — kitchen staff attrition in Hyderabad averages ~35%. 2) Operating cost is Medium (54/100) — aggregator commissions of 18–24% compress margins. 3) Market saturation is Medium (58/100) — 18 competitors, though most are undifferentiated. Regulatory and demand-volatility risks are Low.",
  },
  {
    match: ["reduce", "mitigate", "lower the risk", "how can i"],
    answer:
      "Mitigation plan: (a) launch with two virtual brands from one kitchen to spread demand risk; (b) build a direct-ordering channel via WhatsApp/website to move 25–30% of orders off aggregators within 6 months; (c) lock a 3-year rent agreement with a capped escalation; (d) hire on a fixed + per-order incentive model to cut attrition; (e) keep 4 months of operating runway (~₹6,00,000) unallocated.",
  },
  {
    match: ["location", "gachibowli", "suitable", "area"],
    answer:
      "Gachibowli ranks in the top 5% of Hyderabad micro-markets. Population score is 87/100 (4.2 lakh within 5 km), commercial activity 91/100, growth potential 88/100 at +14% YoY footfall, and accessibility 82/100 with the metro 1.8 km away and ORR access at 2.4 km. Customer potential is 90/100 — 68% of the catchment is aged 22–38 with high disposable income.",
  },
  {
    match: ["revenue", "profit", "earn", "income"],
    answer:
      "The model projects ₹2.8 Lakhs in month 1, ₹4.6 Lakhs by month 6 and ₹5.9 Lakhs by month 12 as the expected case, with a ₹4.6–7.1 Lakhs band at month 12. Contribution margin after aggregator commission and food cost is ~28%.",
  },
  {
    match: ["budget", "investment", "capital", "cost"],
    answer:
      "For a ₹20,00,000 budget: ₹6.5L kitchen fit-out and equipment, ₹3L deposits and rent advance, ₹2L licensing, branding and packaging, ₹2.5L initial marketing, and ₹6L working-capital runway. That leaves you compliant with a 4-month buffer even in a slow-ramp scenario.",
  },
];

export function advisorReply(question: string): string {
  const q = question.toLowerCase();
  const hit = advisorAnswers.find((a) => a.match.some((m) => q.includes(m)));
  return (
    hit?.answer ??
    "Based on the current mock analysis for Gachibowli, Hyderabad with a ₹20,00,000 budget, Cloud Kitchen remains the strongest option at 89/100, ahead of Premium Gym (82), Cafe (71) and Supermarket (68). Ask me about the recommendation logic, risks, mitigation, revenue projections or why this location scores highly."
  );
}

export const reportSections = [
  {
    id: "executive-summary",
    title: "Executive Summary",
    body: "This report evaluates business viability for Gachibowli, Hyderabad against a ₹20,00,000 capital budget. Across six candidate models, Cloud Kitchen ranks highest with an opportunity score of 89/100, supported by a demand index of 94/100 and a moderate competition index of 65/100. Estimated steady-state monthly revenue is ₹4–6 Lakhs with a projected break-even at 7–9 months.",
  },
  {
    id: "location-analysis",
    title: "Location Analysis",
    body: "The catchment holds approximately 4.2 lakh residents within 5 km, with commercial activity in the top 5% of Hyderabad micro-markets. Accessibility scores 82/100 (metro 1.8 km, ORR 2.4 km) and growth potential 88/100 on +14% YoY footfall driven by continued corporate expansion in the IT corridor.",
  },
  {
    id: "market-analysis",
    title: "Market Analysis",
    body: "Delivery-first consumption dominates: 72% of evening food orders in this pincode are delivery-only. Health-oriented menus show 41% search interest against only 17% supply, indicating a clear positioning gap for a differentiated virtual brand.",
  },
  {
    id: "competition",
    title: "Competition",
    body: "18 direct competitors operate within a 3 km radius; 3 are cloud-kitchen-native and the remainder are restaurant kitchens using spare capacity. Average competitor rating is 4.05★. Pricing clusters between ₹180 and ₹320 per order, leaving room at the ₹250–350 premium-healthy tier.",
  },
  {
    id: "demand-prediction",
    title: "Demand Prediction",
    body: "Mock model output places demand at 87/100 for the launch quarter, rising to 94/100 at peak season. Weekday lunch (12pm–3pm) and weekday dinner (8pm–11pm) account for 68% of forecast order volume.",
  },
  {
    id: "revenue-prediction",
    title: "Revenue Prediction",
    body: "Expected monthly revenue reaches ₹2.8 Lakhs in month 1, ₹4.6 Lakhs by month 6 and ₹5.9 Lakhs by month 12, with a month-12 band of ₹4.6–7.1 Lakhs. Contribution margin after food cost and commission is approximately 28%.",
  },
  {
    id: "risk",
    title: "Risk",
    body: "Overall risk is Medium. Talent availability is the single High-rated factor (72/100) due to ~35% kitchen-staff attrition. Operating cost (54/100) and market saturation (58/100) are Medium; regulatory and demand-volatility risks are Low.",
  },
  {
    id: "recommendation",
    title: "Recommendation",
    body: "Proceed with a Cloud Kitchen launch operating two virtual brands from a single facility, positioned in the premium-healthy tier. Reserve ₹6,00,000 as working-capital runway, target 25–30% direct-channel orders by month 6, and re-evaluate expansion after two consecutive months above ₹5 Lakhs revenue.",
  },
];
