import { describe, it, expect } from 'vitest';
import {
  calculateEgfrCkdEpi2021,
  calculateKfre4Var,
  classifyUrineAcr,
  calculateNiceHomeBpAverage,
  calculateBmi,
  calculateWhtr,
  calculateBri,
  calculateBsa,
  calculateBmr,
  calculateAlcoholUnits,
  calculateSaltFromSodium,
  calculateMetMinutes,
  calculateOsmolality,
} from '../../src/core/calculators';

describe('Clinical Calculators Verification Test Suite', () => {
  describe('eGFR CKD-EPI 2021 Race-Free Equation (Inker 2021)', () => {
    it('accurately calculates eGFR for female test vector (Age 54, Scr 110.5 umol/L -> 51.2 ml/min, G3a)', () => {
      const result = calculateEgfrCkdEpi2021({
        ageYears: 54,
        isFemale: true,
        serumCreatinineUmolL: 110.5,
      });
      expect(result.eGfr).toBe(51.2);
      expect(result.gStage).toBe('G3a');
    });

    it('accurately calculates eGFR for male test vector (Age 67, Scr 159.1 umol/L -> 40.8 ml/min, G3b)', () => {
      const result = calculateEgfrCkdEpi2021({
        ageYears: 67,
        isFemale: false,
        serumCreatinineUmolL: 159.1,
      });
      expect(result.eGfr).toBe(40.8);
      expect(result.gStage).toBe('G3b');
    });

    it('accurately calculates eGFR for female normal test vector (Age 42, Scr 75.1 umol/L -> 87.7 ml/min, G2)', () => {
      const result = calculateEgfrCkdEpi2021({
        ageYears: 42,
        isFemale: true,
        serumCreatinineUmolL: 75.1,
      });
      expect(result.eGfr).toBe(87.7);
      expect(result.gStage).toBe('G2');
    });
  });

  describe('Kidney Failure Risk Equation KFRE (Tangri 2011/2016)', () => {
    it('estimates 2-year and 5-year risk correctly for high-risk profile', () => {
      const result = calculateKfre4Var(65, true, 35, 30);
      expect(result.risk2YearPct).toBeGreaterThan(1.0);
      expect(result.risk5YearPct).toBeGreaterThan(result.risk2YearPct);
    });
  });

  describe('KDIGO / NICE NG203 ACR Staging', () => {
    it('classifies A1 normal category (<3 mg/mmol)', () => {
      const result = classifyUrineAcr(1.5);
      expect(result.aStage).toBe('A1');
    });

    it('classifies A2 microalbuminuria category (3-30 mg/mmol)', () => {
      const result = classifyUrineAcr(15.2);
      expect(result.aStage).toBe('A2');
    });

    it('classifies A3 macroalbuminuria category (>30 mg/mmol)', () => {
      const result = classifyUrineAcr(45.0);
      expect(result.aStage).toBe('A3');
    });
  });

  describe('NICE NG136 7-Day Home BP Averaging', () => {
    it('discards Day 1 readings and averages Days 2-7 correctly', () => {
      const readings = [
        { day: 1, systolic: 150, diastolic: 95 }, // Discarded
        { day: 1, systolic: 148, diastolic: 92 }, // Discarded
        { day: 2, systolic: 130, diastolic: 80 },
        { day: 3, systolic: 132, diastolic: 82 },
        { day: 4, systolic: 128, diastolic: 78 },
        { day: 5, systolic: 134, diastolic: 84 },
        { day: 6, systolic: 130, diastolic: 80 },
        { day: 7, systolic: 126, diastolic: 76 },
      ];
      const result = calculateNiceHomeBpAverage(readings);
      expect(result.readingsUsed).toBe(6);
      expect(result.averageSystolic).toBe(130);
      expect(result.averageDiastolic).toBe(80);
      expect(result.stage).toBe('Normal / On Target');
    });
  });

  describe('Body & Lifestyle Calculators', () => {
    it('calculates BMI and healthy range correctly', () => {
      const result = calculateBmi(70, 175);
      expect(result.bmi).toBe(22.9);
      expect(result.category).toBe('Healthy weight');
    });

    it('calculates Waist-to-Height Ratio (Ashwell 2012)', () => {
      const result = calculateWhtr(80, 170);
      expect(result.whtr).toBe(0.47);
      expect(result.category).toContain('Healthy');
    });

    it('calculates Body Roundness Index (Thomas 2013)', () => {
      const bri = calculateBri(88, 162);
      expect(bri).toBeGreaterThan(3.0);
    });

    it('calculates BSA (Mosteller)', () => {
      const bsa = calculateBsa(175, 75);
      expect(bsa).toBe(1.91);
    });

    it('calculates BMR (Mifflin-St Jeor 1990)', () => {
      const bmrMale = calculateBmr(75, 175, 50, false);
      expect(bmrMale).toBe(1599);
    });

    it('converts sodium to salt correctly (6g salt target)', () => {
      const salt = calculateSaltFromSodium(2400);
      expect(salt).toBe(6.0);
    });

    it('calculates alcohol units accurately', () => {
      const units = calculateAlcoholUnits(500, 5.0); // 1 pint 5% beer
      expect(units).toBe(2.5);
    });

    it('calculates physical activity MET-minutes', () => {
      const metMins = calculateMetMinutes(4.0, 30); // 30 min brisk walk
      expect(metMins).toBe(120);
    });

    it('calculates plasma osmolality', () => {
      const osm = calculateOsmolality(140, 5.5, 6.0);
      expect(osm).toBe(292);
    });
  });
});
