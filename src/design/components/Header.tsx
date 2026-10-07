import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { translations, LanguageCode } from '../../i18n/translations';
import { HeartPulse, Globe, AlertTriangle, Moon, Sun, Type, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  const { profile, points, crisis, setLanguage, setTheme, setFontScale, triggerCrisis } = useAppStore();
  const t = translations[profile.language] || translations.en;
  const isUrdu = profile.language === 'ur';

  return (
    <header className="bg-nhs-blue text-white shadow-md border-b-4 border-nhs-brightBlue sticky top-0 z-40">
      {/* Top emergency assistance banner */}
      <div className="bg-nhs-darkBlue text-xs py-1 px-4 text-center flex items-center justify-between">
        <span className="flex items-center gap-1">
          <HeartPulse className="w-3.5 h-3.5 text-nhs-lightBlue" />
          <span>Information & self-care only. In an emergency call <strong>999</strong>.</span>
        </span>
        <button
          onClick={() => triggerCrisis('header_urgent_help')}
          className="text-white hover:underline text-xs bg-nhs-red/80 px-2 py-0.5 rounded ml-2 font-bold"
        >
          Need urgent help?
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
        {/* Logo & App Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-nhs-blue font-bold text-lg shadow-inner">
            🌱
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-bold tracking-tight leading-tight">
              {t.appName}
            </h1>
            <p className="text-xs text-nhs-lightBlue hidden sm:block">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Action Controls: Language, Theme, Text Size, Points */}
        <div className="flex items-center gap-2">
          {/* Points Pill */}
          <div className="bg-nhs-darkBlue/70 border border-nhs-lightBlue/40 px-2.5 py-1 rounded-full flex items-center gap-1.5 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-nhs-yellow" />
            <span>{points.totalPoints} pts</span>
          </div>

          {/* Language Selector */}
          <div className="relative flex items-center bg-nhs-darkBlue rounded-md px-2 py-1 text-xs border border-white/20">
            <Globe className="w-3.5 h-3.5 mr-1 text-nhs-lightBlue" />
            <select
              value={profile.language}
              onChange={(e) => setLanguage(e.target.value as LanguageCode)}
              className="bg-transparent text-white focus:outline-none cursor-pointer text-xs"
              aria-label="Select language"
            >
              <option value="en" className="text-nhs-text">English</option>
              <option value="pl" className="text-nhs-text">Polski</option>
              <option value="ur" className="text-nhs-text">اردو (Urdu)</option>
              <option value="bn" className="text-nhs-text">বাংলা (Bengali)</option>
              <option value="pa" className="text-nhs-text">ਪੰਜਾਬੀ (Punjabi)</option>
              <option value="ta" className="text-nhs-text">தமிழ் (Tamil)</option>
            </select>
          </div>

          {/* Text Size Toggle */}
          <button
            onClick={() => {
              const nextScale = profile.fontScale === 100 ? 125 : profile.fontScale === 125 ? 150 : profile.fontScale === 150 ? 200 : 100;
              setFontScale(nextScale);
            }}
            className="p-1.5 bg-nhs-darkBlue hover:bg-nhs-darkBlue/80 rounded-md border border-white/20 text-xs flex items-center justify-center min-w-[32px] min-h-[32px]"
            title="Adjust text size"
            aria-label="Adjust text size"
          >
            <Type className="w-3.5 h-3.5" />
            <span className="text-[10px] ml-0.5">{profile.fontScale}%</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(profile.theme === 'dark' ? 'calm' : profile.theme === 'high_contrast' ? 'calm' : 'high_contrast')}
            className="p-1.5 bg-nhs-darkBlue hover:bg-nhs-darkBlue/80 rounded-md border border-white/20 text-xs flex items-center justify-center min-w-[32px] min-h-[32px]"
            title="Switch theme"
            aria-label="Switch theme"
          >
            {profile.theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-nhs-yellow" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </header>
  );
};
