import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { translations } from '../../i18n/translations';
import { PoundSterling, TrendingUp, ShieldCheck, FileSpreadsheet, ExternalLink } from 'lucide-react';
import costingData from '../../../data/processed/uk_treatment_costs.json';

export const CostingView: React.FC = () => {
  const { profile } = useAppStore();
  const t = translations[profile.language] || translations.en;

  const [selectedStage, setSelectedStage] = useState<number | null>(0);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-nhs-text">{t.costing.title}</h2>
        <p className="text-xs text-nhs-secondaryText">{t.costing.subtitle}</p>
      </div>

      {/* Prevention Value Callout */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-2xl p-5 shadow-sm space-y-2">
        <div className="flex items-center gap-2">
          <PoundSterling className="w-5 h-5 text-nhs-green" />
          <h3 className="text-sm font-bold text-emerald-950 uppercase tracking-wide">
            {t.costing.preventionValue}
          </h3>
        </div>
        <p className="text-xs text-emerald-900 leading-relaxed font-medium">
          Managing blood pressure, healthy eating, and medication early (Stages 1–3) costs the NHS around <strong>£410–£820 per year</strong>, whereas hospital dialysis (Stage 5) costs over <strong>£38,500 per year per patient</strong>. Every year of delay in disease progression saves thousands of pounds for NHS care while preserving your quality of life.
        </p>
      </div>

      {/* Stage-by-Stage Cost Breakdown */}
      <div className="bg-white rounded-2xl p-6 border border-nhs-borderGrey/30 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-nhs-darkBlue flex items-center justify-between">
          <span>{t.costing.stageCosts}</span>
          <span className="text-xs font-normal text-nhs-secondaryText">NHS National Cost Collection (NCC) Baseline</span>
        </h3>

        <div className="space-y-3">
          {costingData.annualDirectCostsByStage.map((stage, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedStage(selectedStage === idx ? null : idx)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                selectedStage === idx
                  ? 'bg-blue-50/70 border-nhs-blue shadow-sm'
                  : 'bg-white border-nhs-borderGrey/30 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-nhs-text">{stage.stage}</h4>
                  <p className="text-xs text-nhs-secondaryText mt-0.5">{stage.description}</p>
                </div>
                <div className="text-right">
                  <span className="text-base font-black text-nhs-darkBlue">
                    £{stage.annualCostRangeGbp.mid.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-nhs-secondaryText block">/ patient / year</span>
                </div>
              </div>

              {selectedStage === idx && (
                <div className="mt-4 pt-3 border-t border-blue-100 space-y-2 text-xs animate-fadeIn">
                  <div className="bg-white p-3 rounded-lg border border-blue-100">
                    <strong>Typical NHS Care Elements:</strong>
                    <ul className="list-disc list-inside mt-1 text-gray-700 space-y-0.5">
                      {stage.typicalComponents.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-emerald-800 font-medium">
                    💡 <strong>Economic Insight:</strong> {stage.economicBenefitOfPrevention}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* NHS Resource Unit Tariffs */}
      <div className="bg-white rounded-2xl p-6 border border-nhs-borderGrey/30 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-nhs-darkBlue flex items-center justify-between">
          <span>{t.costing.resourceCosts}</span>
          <span className="text-xs font-normal text-nhs-secondaryText">PSSRU 2024 & NHS National Tariffs</span>
        </h3>

        <div className="divide-y divide-gray-100">
          {costingData.resourceUnitCostsGbp.map((res, idx) => (
            <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
              <div>
                <span className="font-semibold text-nhs-text">{res.resource}</span>
                <span className="text-[10px] text-nhs-secondaryText block">{res.source}</span>
              </div>
              <span className="font-bold text-nhs-blue text-sm">
                £{res.unitCostGbp.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Citation Footer */}
      <div className="text-[11px] text-nhs-secondaryText pt-2">
        <strong>Economic Sources:</strong> NHS National Cost Collection for the NHS (2024–2025) • PSSRU Unit Costs of Health and Social Care (Jones & Burns 2024) • NICE NG203 Resource Impact Report.
      </div>
    </div>
  );
};
