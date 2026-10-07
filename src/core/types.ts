/**
 * PERCKS Kidney Companion — Core Domain Types
 */

import { LanguageCode } from '../i18n/translations';

export type VisualTheme = 'calm' | 'high_contrast' | 'dark' | 'large_text' | 'dyslexia';
export type FontScale = 100 | 125 | 150 | 200;
export type ReadingLevel = 'simple' | 'standard';

export interface UserProfile {
  id: string;
  nickname: string;
  avatarIcon: string;
  avatarColor: string;
  language: LanguageCode;
  fontScale: FontScale;
  readingLevel: ReadingLevel;
  theme: VisualTheme;
  ckdStage?: string;
  hasDiabetes?: boolean;
  hasHypertension?: boolean;
  takingGlp1?: boolean;
  bpTargetSystolic?: number;
  bpTargetDiastolic?: number;
  isUnwellPaused?: boolean;
}

export interface UserConsents {
  healthData: boolean;
  mentalHealth: boolean;
  community: boolean;
  researchExport: boolean;
}

export type MeasurementType =
  | 'blood_pressure'
  | 'weight'
  | 'glucose'
  | 'fluid'
  | 'salt'
  | 'activity'
  | 'sleep'
  | 'waist'
  | 'hip';

export interface MeasurementRecord {
  id: string;
  type: MeasurementType;
  primaryValue: number;
  secondaryValue?: number; // e.g., diastolic BP, pulse
  unit: string;
  takenAt: string; // ISO String
  notes?: string;
  syncStatus: 'synced' | 'pending';
}

export interface LabRecord {
  id: string;
  testName: 'egfr' | 'creatinine' | 'urine_acr' | 'hba1c' | 'potassium' | 'cholesterol';
  value: number;
  unit: string;
  sampleDate: string;
  location?: string;
}

export interface PointsState {
  totalPoints: number;
  todayPoints: number;
  currentStreakDays: number;
  lastActiveDate: string; // YYYY-MM-DD
  badges: string[];
}

export interface CrisisState {
  isActive: boolean;
  triggeredBy: string;
  triggeredAt: string;
}
