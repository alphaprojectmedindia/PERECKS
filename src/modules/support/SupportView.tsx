import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { translations } from '../../i18n/translations';
import { HelpCircle, ExternalLink, Phone, ShieldCheck, HeartHandshake } from 'lucide-react';
import supportData from '../../../content/support/support.json';

export const SupportView: React.FC = () => {
  const { profile } = useAppStore();
  const t = translations[profile.language] || translations.en;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-nhs-text">{t.nav.support}</h2>
        <p className="text-xs text-nhs-secondaryText">
          Trusted UK charities, patient grants, financial advice, and free counselling services.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {supportData.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-6 border border-nhs-borderGrey/30 shadow-sm space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-bold text-base text-nhs-text">{item.name}</h3>
                <span className="text-[10px] bg-blue-50 text-nhs-blue px-2 py-0.5 rounded font-bold whitespace-nowrap">
                  {item.area}
                </span>
              </div>
              <span className="text-xs font-semibold text-nhs-darkBlue block">{item.type}</span>
              <p className="text-xs text-nhs-secondaryText leading-relaxed">{item.description}</p>
              <div className="text-[11px] text-gray-500 bg-gray-50 p-2 rounded-lg">
                <strong>Eligibility:</strong> {item.eligibility}
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
              {item.phone && (
                <a
                  href={`tel:${item.phone.replace(/\s+/g, '')}`}
                  className="font-bold text-nhs-blue flex items-center gap-1 hover:underline min-h-[44px]"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{item.phone}</span>
                </a>
              )}
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-nhs-blue hover:bg-nhs-darkBlue text-white font-bold rounded-xl shadow flex items-center gap-1 min-h-[44px]"
              >
                <span>Visit Service</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
