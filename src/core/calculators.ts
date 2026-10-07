/**
 * PERCKS Kidney Companion — Verified Clinical & Lifestyle Calculators Engine
 * All formulas are derived strictly from primary peer-reviewed literature and NICE/KDIGO guidelines.
 */

// ==========================================
// 1. KIDNEY CALCULATORS
// ==========================================

export interface EgfrInput {
  serumCreatinineUmolL?: number;
  serumCreatinineMgDl?: number;
  ageYears: number;
  isFemale: boolean;
}

export interface EgfrResult {
  eGfr: number; // mL/min/1.73m2
  gStage: 'G1' | 'G2' | 'G3a' | 'G3b' | 'G4' | 'G5';
  stageDescription: string;
  plainEnglishSummary: string;
}

/**
 * CKD-EPI 2021 Race-Free Creatinine Equation (Inker et al. NEJM 2021)
 */
export function calculateEgfrCkdEpi2021(input: EgfrInput): EgfrResult {
  const scrMgDl = input.serumCreatinineMgDl ?? ((input.serumCreatinineUmolL ?? 0) / 88.4);
  const age = Math.max(18, Math.min(120, input.ageYears));
  const isFemale = input.isFemale;

  const kappa = isFemale ? 0.7 : 0.9;
  const alpha = isFemale ? -0.241 : -0.302;
  const femaleFactor = isFemale ? 1.012 : 1.0;

  const minRatio = Math.min(scrMgDl / kappa, 1.0);
  const maxRatio = Math.max(scrMgDl / kappa, 1.0);

  const egfr = 142 * Math.pow(minRatio, alpha) * Math.pow(maxRatio, -1.200) * Math.pow(0.9938, age) * femaleFactor;
  const roundedEgfr = Math.max(1, Math.round(egfr * 10) / 10);

  let gStage: EgfrResult['gStage'] = 'G1';
  let stageDescription = 'Normal or high kidney filtration rate';
  let plainEnglishSummary = 'Your kidney filters are cleaning waste efficiently. If no protein was found in urine, your kidneys are functioning well.';

  if (roundedEgfr >= 90) {
    gStage = 'G1';
    stageDescription = 'Normal or high filtration (>=90 mL/min/1.73m²)';
  } else if (roundedEgfr >= 60) {
    gStage = 'G2';
    stageDescription = 'Mildly reduced filtration (60-89 mL/min/1.73m²)';
    plainEnglishSummary = 'Your kidneys are working well with a very mild, normal change that is common as we grow older.';
  } else if (roundedEgfr >= 45) {
    gStage = 'G3a';
    stageDescription = 'Mild to moderately reduced filtration (45-59 mL/min/1.73m²)';
    plainEnglishSummary = 'Kidneys are filtering slightly slower. Routine 6-monthly check-ups, healthy eating, and blood pressure control will help keep this stable.';
  } else if (roundedEgfr >= 30) {
    gStage = 'G3b';
    stageDescription = 'Moderately to severely reduced filtration (30-44 mL/min/1.73m²)';
    plainEnglishSummary = 'Kidneys are working harder to clear waste. Your care team will monitor your blood tests closely and check your medicine plan.';
  } else if (roundedEgfr >= 15) {
    gStage = 'G4';
    stageDescription = 'Severely reduced filtration (15-29 mL/min/1.73m²)';
    plainEnglishSummary = 'Kidney function is noticeably reduced. Specialist renal clinic appointments help prepare and protect your body.';
  } else {
    gStage = 'G5';
    stageDescription = 'Very low filtration (<15 mL/min/1.73m²)';
    plainEnglishSummary = 'Kidney failure stage. You will discuss specialized care, dialysis, or transplant options with your renal consultant.';
  }

  return {
    eGfr: roundedEgfr,
    gStage,
    stageDescription,
    plainEnglishSummary,
  };
}

/**
 * Kidney Failure Risk Equation (KFRE 4-Variable Model, Tangri 2011/2016)
 * Non-North America recalibrated baseline.
 */
export function calculateKfre4Var(
  ageYears: number,
  isMale: boolean,
  eGfr: number,
  uAcrMgMmol: number
): { risk2YearPct: number; risk5YearPct: number; clinicalNote: string } {
  // Convert uACR mg/mmol to mg/g for Tangri equation (multiply by 8.84)
  const uAcrMgG = Math.max(1, uAcrMgMmol * 8.84);
  const maleFlag = isMale ? 1 : 0;

  // Tangri 2016 non-North America coefficient linear predictor
  const score =
    -0.2201 * (ageYears / 10 - 7.036) +
    0.2467 * (maleFlag - 0.5642) -
    0.5567 * (eGfr / 5 - 7.222) +
    0.4510 * (Math.log(uAcrMgG) - 5.137);

  const baseline2yr = 0.9832;
  const baseline5yr = 0.9365;

  const expScore = Math.exp(score);
  const risk2Year = Math.max(0.1, Math.min(99.9, (1 - Math.pow(baseline2yr, expScore)) * 100));
  const risk5Year = Math.max(0.1, Math.min(99.9, (1 - Math.pow(baseline5yr, expScore)) * 100));

  return {
    risk2YearPct: Math.round(risk2Year * 10) / 10,
    risk5YearPct: Math.round(risk5Year * 10) / 10,
    clinicalNote: 'Estimated 2-year and 5-year progression risk for discussion with your kidney doctor.',
  };
}

/**
 * KDIGO 2024 / NICE NG203 ACR Category and Risk Classification
 */
export function classifyUrineAcr(acrMgMmol: number): {
  aStage: 'A1' | 'A2' | 'A3';
  description: string;
  plainEnglish: string;
} {
  if (acrMgMmol < 3.0) {
    return {
      aStage: 'A1',
      description: 'Normal to mildly increased albuminuria (<3 mg/mmol)',
      plainEnglish: 'Normal level. Your kidney filters are keeping protein sealed inside your blood.',
    };
  } else if (acrMgMmol <= 30.0) {
    return {
      aStage: 'A2',
      description: 'Moderately increased albuminuria / Microalbuminuria (3-30 mg/mmol)',
      plainEnglish: 'Small amounts of protein are leaking through kidney filters. Blood pressure medicines often help seal this.',
    };
  } else {
    return {
      aStage: 'A3',
      description: 'Severely increased albuminuria / Macroalbuminuria (>30 mg/mmol)',
      plainEnglish: 'Higher protein leak. Your kidney team will discuss kidney-protective medicines (such as SGLT2 inhibitors or ACE inhibitors).',
    };
  }
}

// ==========================================
// 2. CARDIOVASCULAR & BP CALCULATORS
// ==========================================

export interface HomeBpReading {
  day: number; // 1 to 7
  systolic: number;
  diastolic: number;
  pulse?: number;
}

/**
 * NICE NG136 7-Day Home Blood Pressure Averaging (Discard Day 1)
 */
export function calculateNiceHomeBpAverage(readings: HomeBpReading[]): {
  averageSystolic: number;
  averageDiastolic: number;
  stage: 'Normal / On Target' | 'Stage 1 Hypertension' | 'Stage 2 Hypertension' | 'Severe / Needs Review';
  readingsUsed: number;
} {
  // Discard Day 1 readings as per NICE standard protocol
  const validReadings = readings.filter(r => r.day > 1);

  if (validReadings.length === 0) {
    // Fallback if only day 1 is available
    const totalSys = readings.reduce((acc, r) => acc + r.systolic, 0);
    const totalDia = readings.reduce((acc, r) => acc + r.diastolic, 0);
    const avgSys = Math.round(totalSys / (readings.length || 1));
    const avgDia = Math.round(totalDia / (readings.length || 1));
    return {
      averageSystolic: avgSys,
      averageDiastolic: avgDia,
      stage: avgSys >= 150 || avgDia >= 95 ? 'Stage 2 Hypertension' : avgSys >= 135 || avgDia >= 85 ? 'Stage 1 Hypertension' : 'Normal / On Target',
      readingsUsed: readings.length,
    };
  }

  const avgSystolic = Math.round(validReadings.reduce((acc, r) => acc + r.systolic, 0) / validReadings.length);
  const avgDiastolic = Math.round(validReadings.reduce((acc, r) => acc + r.diastolic, 0) / validReadings.length);

  let stage: 'Normal / On Target' | 'Stage 1 Hypertension' | 'Stage 2 Hypertension' | 'Severe / Needs Review' = 'Normal / On Target';

  if (avgSystolic >= 180 || avgDiastolic >= 120) {
    stage = 'Severe / Needs Review';
  } else if (avgSystolic >= 150 || avgDiastolic >= 95) {
    stage = 'Stage 2 Hypertension';
  } else if (avgSystolic >= 135 || avgDiastolic >= 85) {
    stage = 'Stage 1 Hypertension';
  }

  return {
    averageSystolic: avgSystolic,
    averageDiastolic: avgDiastolic,
    stage,
    readingsUsed: validReadings.length,
  };
}

// ==========================================
// 3. BODY MEASURES & LIFESTYLE
// ==========================================

export function calculateBmi(weightKg: number, heightCm: number): {
  bmi: number;
  category: string;
  healthyWeightRangeKg: { min: number; max: number };
} {
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  const roundedBmi = Math.round(bmi * 10) / 10;

  let category = 'Healthy weight';
  if (roundedBmi < 18.5) category = 'Underweight';
  else if (roundedBmi < 25.0) category = 'Healthy weight';
  else if (roundedBmi < 30.0) category = 'Overweight';
  else if (roundedBmi < 35.0) category = 'Obesity Class 1';
  else category = 'Obesity Class 2+';

  const minWeight = Math.round(18.5 * heightM * heightM * 10) / 10;
  const maxWeight = Math.round(24.9 * heightM * heightM * 10) / 10;

  return {
    bmi: roundedBmi,
    category,
    healthyWeightRangeKg: { min: minWeight, max: maxWeight },
  };
}

/**
 * Waist-to-Height Ratio (Ashwell 2012 / NICE guidance)
 */
export function calculateWhtr(waistCm: number, heightCm: number): {
  whtr: number;
  category: string;
} {
  const ratio = waistCm / heightCm;
  const rounded = Math.round(ratio * 100) / 100;
  return {
    whtr: rounded,
    category: rounded < 0.5 ? 'Healthy (Waist under half your height)' : 'Increased cardiometabolic risk',
  };
}

/**
 * Body Roundness Index (Thomas et al. Obesity 2013)
 */
export function calculateBri(waistCm: number, heightCm: number): number {
  const waistM = waistCm / 100;
  const heightM = heightCm / 100;
  const term = Math.pow(waistM / (2 * Math.PI), 2) / Math.pow(0.5 * heightM, 2);
  const safeTerm = Math.max(0, 1 - term);
  const bri = 364.2 - 365.5 * Math.sqrt(safeTerm);
  return Math.round(bri * 10) / 10;
}

/**
 * Body Surface Area (Mosteller)
 */
export function calculateBsa(heightCm: number, weightKg: number): number {
  const bsa = Math.sqrt((heightCm * weightKg) / 3600);
  return Math.round(bsa * 100) / 100;
}

/**
 * Basal Metabolic Rate (Mifflin-St Jeor 1990)
 */
export function calculateBmr(weightKg: number, heightCm: number, ageYears: number, isFemale: boolean): number {
  const bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageYears + (isFemale ? -161 : 5);
  return Math.round(bmr);
}

/**
 * UK Alcohol Units
 */
export function calculateAlcoholUnits(volumeMl: number, abvPct: number): number {
  const units = (volumeMl * abvPct) / 1000;
  return Math.round(units * 10) / 10;
}

/**
 * Salt from Sodium Converter
 */
export function calculateSaltFromSodium(sodiumMg: number): number {
  const saltG = (sodiumMg * 2.5) / 1000;
  return Math.round(saltG * 100) / 100;
}

/**
 * Physical Activity MET-minutes
 */
export function calculateMetMinutes(metLevel: number, durationMinutes: number): number {
  return Math.round(metLevel * durationMinutes);
}

/**
 * Plasma Osmolality (Learning Tool)
 */
export function calculateOsmolality(sodiumMmolL: number, glucoseMmolL: number, ureaMmolL: number): number {
  return Math.round(2 * sodiumMmolL + glucoseMmolL + ureaMmolL);
}
