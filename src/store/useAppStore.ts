/**
 * PERCKS Kidney Companion — Global Zustand State Store
 * Manages user profile, vitals, labs, localization, accessibility themes, points, and crisis state.
 */

import { create } from 'zustand';
import { UserProfile, UserConsents, MeasurementRecord, LabRecord, PointsState, CrisisState } from '../core/types';
import { LanguageCode } from '../i18n/translations';
import { saveMeasurementOffline, clearAllLocalData } from '../core/db';

interface AppState {
  profile: UserProfile;
  consents: UserConsents;
  measurements: MeasurementRecord[];
  labs: LabRecord[];
  points: PointsState;
  crisis: CrisisState;
  activeTab: string;

  // Actions
  setLanguage: (lang: LanguageCode) => void;
  setTheme: (theme: UserProfile['theme']) => void;
  setFontScale: (scale: UserProfile['fontScale']) => void;
  setReadingLevel: (level: UserProfile['readingLevel']) => void;
  updateProfile: (partial: Partial<UserProfile>) => void;
  updateConsents: (partial: Partial<UserConsents>) => void;
  addMeasurement: (record: Omit<MeasurementRecord, 'id' | 'syncStatus'>) => Promise<void>;
  addLabRecord: (record: Omit<LabRecord, 'id'>) => void;
  awardPoints: (amount: number, badgeName?: string) => void;
  toggleUnwellPause: () => void;
  triggerCrisis: (source: string) => void;
  dismissCrisis: () => void;
  setActiveTab: (tab: string) => void;
  resetAllData: () => Promise<void>;
}

const DEFAULT_PROFILE: UserProfile = {
  id: 'local-patient-user',
  nickname: 'Patient User',
  avatarIcon: 'Bean',
  avatarColor: '#005EB8',
  language: 'en',
  fontScale: 100,
  readingLevel: 'simple',
  theme: 'calm',
  ckdStage: 'stage_3a',
  hasDiabetes: false,
  hasHypertension: true,
  takingGlp1: false,
  bpTargetSystolic: 135,
  bpTargetDiastolic: 85,
  isUnwellPaused: false,
};

const DEFAULT_CONSENTS: UserConsents = {
  healthData: true,
  mentalHealth: true,
  community: true,
  researchExport: false,
};

const DEFAULT_POINTS: PointsState = {
  totalPoints: 65,
  todayPoints: 15,
  currentStreakDays: 4,
  lastActiveDate: new Date().toISOString().split('T')[0],
  badges: ['First Log', 'BP Buddy', 'Salt Sleuth'],
};

export const useAppStore = create<AppState>((set, get) => ({
  profile: DEFAULT_PROFILE,
  consents: DEFAULT_CONSENTS,
  measurements: [
    {
      id: 'm-sample-bp-1',
      type: 'blood_pressure',
      primaryValue: 128,
      secondaryValue: 82,
      unit: 'mmHg',
      takenAt: new Date(Date.now() - 86400000).toISOString(),
      notes: 'Morning reading before breakfast',
      syncStatus: 'synced',
    },
    {
      id: 'm-sample-bp-2',
      type: 'blood_pressure',
      primaryValue: 132,
      secondaryValue: 84,
      unit: 'mmHg',
      takenAt: new Date().toISOString(),
      notes: 'Evening reading after rest',
      syncStatus: 'synced',
    },
    {
      id: 'm-sample-wt',
      type: 'weight',
      primaryValue: 74.5,
      unit: 'kg',
      takenAt: new Date().toISOString(),
      notes: 'Morning weight',
      syncStatus: 'synced',
    },
    {
      id: 'm-sample-mood',
      type: 'sleep',
      primaryValue: 7.5,
      secondaryValue: 4, // 4/5 quality
      unit: 'hours',
      takenAt: new Date().toISOString(),
      notes: 'Good restful sleep',
      syncStatus: 'synced',
    },
  ],
  labs: [
    {
      id: 'lab-1',
      testName: 'egfr',
      value: 52,
      unit: 'mL/min/1.73m²',
      sampleDate: '2026-06-15',
      location: 'Coventry & Warwickshire Pathology',
    },
    {
      id: 'lab-2',
      testName: 'urine_acr',
      value: 4.8,
      unit: 'mg/mmol',
      sampleDate: '2026-06-15',
      location: 'Coventry & Warwickshire Pathology',
    },
  ],
  points: DEFAULT_POINTS,
  crisis: {
    isActive: false,
    triggeredBy: '',
    triggeredAt: '',
  },
  activeTab: 'today',

  setLanguage: (lang) => set((state) => ({ profile: { ...state.profile, language: lang } })),
  setTheme: (theme) => set((state) => ({ profile: { ...state.profile, theme } })),
  setFontScale: (fontScale) => set((state) => ({ profile: { ...state.profile, fontScale } })),
  setReadingLevel: (readingLevel) => set((state) => ({ profile: { ...state.profile, readingLevel } })),
  updateProfile: (partial) => set((state) => ({ profile: { ...state.profile, ...partial } })),
  updateConsents: (partial) => set((state) => ({ consents: { ...state.consents, ...partial } })),

  addMeasurement: async (record) => {
    const newRecord: MeasurementRecord = {
      ...record,
      id: 'm-' + Math.random().toString(36).substring(2, 9),
      syncStatus: 'synced',
    };
    await saveMeasurementOffline(newRecord);
    set((state) => ({ measurements: [newRecord, ...state.measurements] }));
    get().awardPoints(10);
  },

  addLabRecord: (record) => {
    const newLab: LabRecord = {
      ...record,
      id: 'lab-' + Math.random().toString(36).substring(2, 9),
    };
    set((state) => ({ labs: [newLab, ...state.labs] }));
    get().awardPoints(15);
  },

  awardPoints: (amount, badgeName) => {
    set((state) => {
      const today = new Date().toISOString().split('T')[0];
      const isNewDay = state.points.lastActiveDate !== today;
      const todayPoints = isNewDay ? amount : state.points.todayPoints + amount;
      const streak = isNewDay ? state.points.currentStreakDays + 1 : state.points.currentStreakDays;
      const badges = badgeName && !state.points.badges.includes(badgeName)
        ? [...state.points.badges, badgeName]
        : state.points.badges;

      return {
        points: {
          totalPoints: state.points.totalPoints + amount,
          todayPoints,
          currentStreakDays: streak,
          lastActiveDate: today,
          badges,
        },
      };
    });
  },

  toggleUnwellPause: () => {
    set((state) => ({
      profile: { ...state.profile, isUnwellPaused: !state.profile.isUnwellPaused },
    }));
  },

  triggerCrisis: (source) => {
    set({
      crisis: {
        isActive: true,
        triggeredBy: source,
        triggeredAt: new Date().toISOString(),
      },
    });
  },

  dismissCrisis: () => {
    set({
      crisis: {
        isActive: false,
        triggeredBy: '',
        triggeredAt: '',
      },
    });
  },

  setActiveTab: (tab) => set({ activeTab: tab }),

  resetAllData: async () => {
    await clearAllLocalData();
    set({
      profile: DEFAULT_PROFILE,
      consents: DEFAULT_CONSENTS,
      measurements: [],
      labs: [],
      points: {
        totalPoints: 0,
        todayPoints: 0,
        currentStreakDays: 0,
        lastActiveDate: '',
        badges: [],
      },
    });
  },
}));
