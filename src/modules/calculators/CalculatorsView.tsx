import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { translations } from '../../i18n/translations';
import {
  calculateEgfrCkdEpi2021,
  calculateKfre4Var,
  classifyUrineAcr,
  calculateBmi,
  calculateWhtr,
  calculateBri,
  calculateSaltFromSodium,
  calculateAlcoholUnits,
} from '../../core/calculators';
import { Calculator, AlertCircle, ShieldCheck, Sparkles } from 'lucide-react';

export const CalculatorsView: React.FC = () => {
  const { profile } = useAppStore();
  const t = translations[profile.language] || translations.en;

  const [activeTab, setActiveTab] = useState<'egfr' | 'kfre' | 'bp' | 'bmi' | 'salt'>('egfr');

  // eGFR Inputs
  const [egfrAge, setEgfrAge] = useState('54');
  const [egfrScr, setEgfrScr] = useState('110');
  const [egfrUnit, setEgfrUnit] = useState<'umol' | 'mgdl'>('umol');
  const [egfrSex, setEgfrSex] = useState<'female' | 'male'>('female');
  const [egfrResult, setEgfrResult] = useState<ReturnType<typeof calculateEgfrCkdEpi2021> | null>(null);

  // KFRE Inputs
  const [kfreAge, setKfreAge] = useState('65');
  const [kfreSex, setKfreSex] = useState<'male' | 'female'>('male');
  const [kfreEgfr, setKfreEgfr] = useState('35');
  const [kfreAcr, setKfreAcr] = useState('30');
  const [kfreResult, setKfreResult] = useState<{ risk2YearPct: number; risk5YearPct: number } | null>(null);

  // BMI Inputs
  const [weightKg, setWeightKg] = useState('75');
  const [heightCm, setHeightCm] = useState('175');
  const [bmiResult, setBmiResult] = useState<ReturnType<typeof calculateBmi> | null>(null);

  // Salt Inputs
  const [sodiumMg, setSodiumMg] = useState('1200');
  const [saltG, setSaltG] = useState<number | null>(null);

  const handleCalculateEgfr = (e: React.FormEvent) => {
    e.preventDefault();
    const res = calculateEgfrCkdEpi2021({
      ageYears: Number(egfrAge),
      isFemale: egfrSex === 'female',
      serumCreatinineUmolL: egfrUnit === 'umol' ? Number(egfrScr) : undefined,
      serumCreatinineMgDl: egfrUnit === 'mgdl' ? Number(egfrScr) : undefined,
    });
    setEgfrResult(res);
  };

  const handleCalculateKfre = (e: React.FormEvent) => {
    e.preventDefault();
    const res = calculateKfre4Var(Number(kfreAge), kfreSex === 'male', Number(kfreEgfr), Number(kfreAcr));
    setKfreResult(res);
  };

  const handleCalculateBmi = (e: React.FormEvent) => {
    e.preventDefault();
    const res = calculateBmi(Number(weightKg), Number(heightCm));
    setBmiResult(res);
  };

  const handleCalculateSalt = (e: React.FormEvent) => {
    e.preventDefault();
    setSaltG(calculateSaltFromSodium(Number(sodiumMg)));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-nhs-text">{t.calculators.title}</h2>
        <p className="text-xs text-nhs-secondaryText">
          Standardised mathematical models using NICE & KDIGO 2024 guidance.
        </p>
      </div>

      {/* Non-advisory safety declaration */}
      <div className="bg-amber-50 border-l-4 border-nhs-yellow p-4 rounded-r-xl text-xs text-amber-900 leading-relaxed font-medium flex items-start gap-2.5">
        <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0" />
        <span>{t.calculators.disclaimer}</span>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTab('egfr')}
          className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors min-h-[44px] ${
            activeTab === 'egfr'
              ? 'bg-nhs-blue text-white shadow-sm'
              : 'bg-white border border-nhs-borderGrey/30 text-nhs-text hover:bg-nhs-background'
          }`}
        >
          eGFR (CKD-EPI 2021)
        </button>
        <button
          onClick={() => setActiveTab('kfre')}
          className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors min-h-[44px] ${
            activeTab === 'kfre'
              ? 'bg-nhs-blue text-white shadow-sm'
              : 'bg-white border border-nhs-borderGrey/30 text-nhs-text hover:bg-nhs-background'
          }`}
        >
          KFRE Risk (4-Var)
        </button>
        <button
          onClick={() => setActiveTab('bmi')}
          className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors min-h-[44px] ${
            activeTab === 'bmi'
              ? 'bg-nhs-blue text-white shadow-sm'
              : 'bg-white border border-nhs-borderGrey/30 text-nhs-text hover:bg-nhs-background'
          }`}
        >
          BMI & Body Measures
        </button>
        <button
          onClick={() => setActiveTab('salt')}
          className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors min-h-[44px] ${
            activeTab === 'salt'
              ? 'bg-nhs-blue text-white shadow-sm'
              : 'bg-white border border-nhs-borderGrey/30 text-nhs-text hover:bg-nhs-background'
          }`}
        >
          Sodium to Salt Converter
        </button>
      </div>

      {/* Calculator Body */}
      {activeTab === 'egfr' && (
        <div className="bg-white rounded-2xl p-6 border border-nhs-borderGrey/30 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-nhs-darkBlue">eGFR (CKD-EPI 2021 Race-Free)</h3>
            <span className="text-[11px] bg-blue-50 text-nhs-blue px-2.5 py-0.5 rounded-full font-bold">
              UK Lab Standard
            </span>
          </div>

          <form onSubmit={handleCalculateEgfr} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-nhs-text mb-1">Age (Years)</label>
                <input
                  type="number"
                  value={egfrAge}
                  onChange={(e) => setEgfrAge(e.target.value)}
                  min="18"
                  max="110"
                  required
                  className="w-full p-3 border border-nhs-borderGrey/40 rounded-xl text-sm min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-nhs-text mb-1">Biological Sex</label>
                <select
                  value={egfrSex}
                  onChange={(e) => setEgfrSex(e.target.value as 'female' | 'male')}
                  className="w-full p-3 border border-nhs-borderGrey/40 rounded-xl text-sm min-h-[44px]"
                >
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-nhs-text mb-1">
                  Serum Creatinine ({egfrUnit === 'umol' ? 'µmol/L' : 'mg/dL'})
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    step="any"
                    value={egfrScr}
                    onChange={(e) => setEgfrScr(e.target.value)}
                    required
                    className="w-full p-3 border border-nhs-borderGrey/40 rounded-xl text-sm min-h-[44px]"
                  />
                  <select
                    value={egfrUnit}
                    onChange={(e) => setEgfrUnit(e.target.value as 'umol' | 'mgdl')}
                    className="p-2 border border-nhs-borderGrey/40 rounded-xl text-xs"
                  >
                    <option value="umol">µmol/L</option>
                    <option value="mgdl">mg/dL</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-nhs-blue hover:bg-nhs-darkBlue text-white font-bold rounded-xl shadow min-h-[44px]"
            >
              {t.calculators.calculate}
            </button>
          </form>

          {egfrResult && (
            <div className="mt-4 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-nhs-brightBlue/40 rounded-2xl space-y-2 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-nhs-secondaryText uppercase tracking-wider">Estimated GFR</span>
                <span className="text-xs bg-nhs-blue text-white px-2.5 py-0.5 rounded-full font-bold">
                  Stage {egfrResult.gStage}
                </span>
              </div>
              <div className="text-3xl font-extrabold text-nhs-darkBlue">
                {egfrResult.eGfr} <span className="text-sm font-normal text-nhs-secondaryText">mL/min/1.73m²</span>
              </div>
              <p className="text-xs font-semibold text-nhs-text">{egfrResult.stageDescription}</p>
              <p className="text-xs text-nhs-secondaryText leading-relaxed pt-1">
                <strong>{t.calculators.whatThisMeans}:</strong> {egfrResult.plainEnglishSummary}
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'kfre' && (
        <div className="bg-white rounded-2xl p-6 border border-nhs-borderGrey/30 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-nhs-darkBlue">Kidney Failure Risk Equation (KFRE 4-Variable)</h3>
            <span className="text-[11px] bg-amber-50 text-amber-800 px-2.5 py-0.5 rounded-full font-bold">
              Tangri 2016 Recalibrated
            </span>
          </div>

          <form onSubmit={handleCalculateKfre} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-nhs-text mb-1">Age (Years)</label>
                <input
                  type="number"
                  value={kfreAge}
                  onChange={(e) => setKfreAge(e.target.value)}
                  required
                  className="w-full p-3 border border-nhs-borderGrey/40 rounded-xl text-sm min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-nhs-text mb-1">Biological Sex</label>
                <select
                  value={kfreSex}
                  onChange={(e) => setKfreSex(e.target.value as 'male' | 'female')}
                  className="w-full p-3 border border-nhs-borderGrey/40 rounded-xl text-sm min-h-[44px]"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-nhs-text mb-1">eGFR (mL/min/1.73m²)</label>
                <input
                  type="number"
                  value={kfreEgfr}
                  onChange={(e) => setKfreEgfr(e.target.value)}
                  required
                  className="w-full p-3 border border-nhs-borderGrey/40 rounded-xl text-sm min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-nhs-text mb-1">Urine ACR (mg/mmol)</label>
                <input
                  type="number"
                  value={kfreAcr}
                  onChange={(e) => setKfreAcr(e.target.value)}
                  required
                  className="w-full p-3 border border-nhs-borderGrey/40 rounded-xl text-sm min-h-[44px]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-nhs-blue hover:bg-nhs-darkBlue text-white font-bold rounded-xl shadow min-h-[44px]"
            >
              Calculate Progression Risk
            </button>
          </form>

          {kfreResult && (
            <div className="mt-4 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-nhs-brightBlue/40 rounded-2xl space-y-3 animate-fadeIn">
              <span className="text-xs font-bold text-nhs-secondaryText uppercase tracking-wider">Estimated Risk</span>
              <div className="grid grid-cols-2 gap-4 pt-1">
                <div className="bg-white p-3.5 rounded-xl border border-blue-100">
                  <span className="text-[11px] text-nhs-secondaryText block">2-Year Risk</span>
                  <span className="text-2xl font-black text-nhs-blue">{kfreResult.risk2YearPct}%</span>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-blue-100">
                  <span className="text-[11px] text-nhs-secondaryText block">5-Year Risk</span>
                  <span className="text-2xl font-black text-nhs-darkBlue">{kfreResult.risk5YearPct}%</span>
                </div>
              </div>
              <p className="text-xs text-nhs-secondaryText leading-relaxed">
                This calculation helps your doctor decide whether you would benefit from extra renal clinic support or medications.
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'bmi' && (
        <div className="bg-white rounded-2xl p-6 border border-nhs-borderGrey/30 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-nhs-darkBlue">Body Mass Index (BMI) & Healthy Range</h3>

          <form onSubmit={handleCalculateBmi} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-nhs-text mb-1">Weight (kg)</label>
              <input
                type="number"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                required
                className="w-full p-3 border border-nhs-borderGrey/40 rounded-xl text-sm min-h-[44px]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-nhs-text mb-1">Height (cm)</label>
              <input
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                required
                className="w-full p-3 border border-nhs-borderGrey/40 rounded-xl text-sm min-h-[44px]"
              />
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="px-6 py-3 bg-nhs-blue hover:bg-nhs-darkBlue text-white font-bold rounded-xl shadow min-h-[44px]"
              >
                Calculate BMI
              </button>
            </div>
          </form>

          {bmiResult && (
            <div className="mt-4 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-nhs-brightBlue/40 rounded-2xl space-y-2 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-nhs-secondaryText uppercase tracking-wider">Your BMI</span>
                <span className="text-xs bg-nhs-blue text-white px-2.5 py-0.5 rounded-full font-bold">
                  {bmiResult.category}
                </span>
              </div>
              <div className="text-3xl font-extrabold text-nhs-darkBlue">{bmiResult.bmi} kg/m²</div>
              <p className="text-xs text-nhs-secondaryText">
                Healthy weight range for your height: <strong>{bmiResult.healthyWeightRangeKg.min} kg – {bmiResult.healthyWeightRangeKg.max} kg</strong>.
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'salt' && (
        <div className="bg-white rounded-2xl p-6 border border-nhs-borderGrey/30 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-nhs-darkBlue">Sodium (mg) to Salt (g) Converter</h3>
          <p className="text-xs text-nhs-secondaryText">
            Food nutrition labels often show Sodium in milligrams. The NHS recommends less than 6g of salt (2,400mg sodium) a day for adults.
          </p>

          <form onSubmit={handleCalculateSalt} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-nhs-text mb-1">Sodium from food label (mg)</label>
              <input
                type="number"
                value={sodiumMg}
                onChange={(e) => setSodiumMg(e.target.value)}
                required
                className="w-full p-3 border border-nhs-borderGrey/40 rounded-xl text-sm min-h-[44px]"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-nhs-blue hover:bg-nhs-darkBlue text-white font-bold rounded-xl shadow min-h-[44px]"
            >
              Convert to Salt
            </button>
          </form>

          {saltG !== null && (
            <div className="mt-4 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-nhs-brightBlue/40 rounded-2xl space-y-2 animate-fadeIn">
              <span className="text-xs font-bold text-nhs-secondaryText uppercase tracking-wider">Salt Equivalent</span>
              <div className="text-3xl font-extrabold text-nhs-darkBlue">
                {saltG} <span className="text-sm font-normal text-nhs-secondaryText">grams of salt</span>
              </div>
              <p className="text-xs text-nhs-secondaryText">
                {saltG > 1.5
                  ? '⚠️ High salt item (over 1.5g per portion).'
                  : saltG > 0.3
                  ? '🟡 Medium salt item.'
                  : '🟢 Low salt item (under 0.3g per portion).'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
