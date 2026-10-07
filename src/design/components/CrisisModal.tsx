import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { translations } from '../../i18n/translations';
import { AlertCircle, Phone, MessageSquare, ShieldAlert, X } from 'lucide-react';

export const CrisisModal: React.FC = () => {
  const { profile, crisis, dismissCrisis } = useAppStore();
  const t = translations[profile.language] || translations.en;

  if (!crisis.isActive) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white text-nhs-text max-w-lg w-full rounded-2xl shadow-2xl border-4 border-nhs-red overflow-hidden">
        {/* Header */}
        <div className="bg-nhs-red text-white p-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-8 h-8 flex-shrink-0 animate-pulse" />
            <div>
              <h2 className="text-xl font-bold leading-snug">{t.crisis.bannerTitle}</h2>
              <p className="text-xs text-white/90">Free, confidential support is here for you 24/7</p>
            </div>
          </div>
          <button
            onClick={dismissCrisis}
            className="text-white/80 hover:text-white p-1 rounded-full"
            aria-label="Close crisis screen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <p className="text-sm font-medium leading-relaxed bg-red-50 text-red-900 p-3 rounded-lg border border-red-200">
            {t.crisis.bannerBody}
          </p>

          <div className="space-y-2.5">
            {/* 999 Emergency */}
            <a
              href="tel:999"
              className="flex items-center justify-between p-3.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold shadow-md transition-all text-sm min-h-[44px]"
            >
              <div className="flex items-center gap-2.5">
                <Phone className="w-5 h-5" />
                <span>{t.crisis.call999}</span>
              </div>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded">Free</span>
            </a>

            {/* NHS 111 Opt 2 */}
            <a
              href="tel:111"
              className="flex items-center justify-between p-3.5 bg-nhs-blue hover:bg-nhs-darkBlue text-white rounded-xl font-semibold shadow transition-all text-sm min-h-[44px]"
            >
              <div className="flex items-center gap-2.5">
                <Phone className="w-5 h-5" />
                <span>{t.crisis.call111}</span>
              </div>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded">24/7</span>
            </a>

            {/* Samaritans */}
            <a
              href="tel:116123"
              className="flex items-center justify-between p-3.5 bg-nhs-green hover:bg-green-700 text-white rounded-xl font-semibold shadow transition-all text-sm min-h-[44px]"
            >
              <div className="flex items-center gap-2.5">
                <Phone className="w-5 h-5" />
                <span>{t.crisis.callSamaritans}</span>
              </div>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded">116 123</span>
            </a>

            {/* Shout Text Line */}
            <a
              href="sms:85258?body=SHOUT"
              className="flex items-center justify-between p-3.5 bg-gray-800 hover:bg-gray-900 text-white rounded-xl font-semibold shadow transition-all text-sm min-h-[44px]"
            >
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-5 h-5" />
                <span>{t.crisis.textShout}</span>
              </div>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded">Text</span>
            </a>
          </div>

          <div className="pt-2 text-center">
            <p className="text-xs text-nhs-secondaryText">
              {t.crisis.pauseNotice}
            </p>
            <button
              onClick={dismissCrisis}
              className="mt-4 text-xs font-semibold text-nhs-blue hover:underline py-2 px-4"
            >
              I am safe and wish to return to the app
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
