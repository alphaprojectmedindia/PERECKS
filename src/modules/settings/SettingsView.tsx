import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { translations, LanguageCode } from '../../i18n/translations';
import { Settings, Download, Trash2, Shield, User, Globe, Check, AlertTriangle } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const {
    profile,
    consents,
    measurements,
    labs,
    updateProfile,
    updateConsents,
    setLanguage,
    setFontScale,
    setTheme,
    resetAllData,
  } = useAppStore();
  const t = translations[profile.language] || translations.en;

  const [nickname, setNickname] = useState(profile.nickname);
  const [bpTargetSys, setBpTargetSys] = useState(String(profile.bpTargetSystolic || 135));
  const [bpTargetDia, setBpTargetDia] = useState(String(profile.bpTargetDiastolic || 85));
  const [savedMsg, setSavedMsg] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      nickname,
      bpTargetSystolic: Number(bpTargetSys),
      bpTargetDiastolic: Number(bpTargetDia),
    });
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 3000);
  };

  const handleExportJson = () => {
    const data = {
      profile,
      consents,
      measurements,
      labs,
      exportedAt: new Date().toISOString(),
      provenance: 'PERCKS Kidney Companion (UK GDPR Article 20 Data Portability)',
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PERCKS_MyData_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const handleExportCsv = () => {
    let csv = 'Type,Date,PrimaryValue,SecondaryValue,Unit,Notes\n';
    measurements.forEach((m) => {
      csv += `"${m.type}","${m.takenAt}","${m.primaryValue}","${m.secondaryValue || ''}","${m.unit}","${m.notes || ''}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PERCKS_Measurements_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        'Are you sure you want to permanently delete your account and all stored health measurements? This action cannot be undone.'
      )
    ) {
      await resetAllData();
      alert('All local health data has been permanently erased in compliance with UK GDPR Article 17.');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-nhs-text">{t.settings.title}</h2>
        <p className="text-xs text-nhs-secondaryText">
          Manage your personal profile, privacy consents, language, and UK GDPR data rights.
        </p>
      </div>

      {savedMsg && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-800 rounded-xl text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-nhs-green" />
          <span>Profile settings updated successfully!</span>
        </div>
      )}

      {/* Profile & Clinician Targets Form */}
      <div className="bg-white rounded-2xl p-6 border border-nhs-borderGrey/30 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-nhs-darkBlue flex items-center gap-2">
          <User className="w-5 h-5 text-nhs-blue" />
          <span>My Profile & Clinician Targets</span>
        </h3>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-nhs-text mb-1">Nickname (Pseudonymous)</label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
                className="w-full p-3 border border-nhs-borderGrey/40 rounded-xl text-sm min-h-[44px]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-nhs-text mb-1">Target Systolic BP (mmHg)</label>
              <input
                type="number"
                value={bpTargetSys}
                onChange={(e) => setBpTargetSys(e.target.value)}
                required
                className="w-full p-3 border border-nhs-borderGrey/40 rounded-xl text-sm min-h-[44px]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-nhs-text mb-1">Target Diastolic BP (mmHg)</label>
              <input
                type="number"
                value={bpTargetDia}
                onChange={(e) => setBpTargetDia(e.target.value)}
                required
                className="w-full p-3 border border-nhs-borderGrey/40 rounded-xl text-sm min-h-[44px]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 bg-nhs-blue hover:bg-nhs-darkBlue text-white font-bold text-xs rounded-xl shadow min-h-[44px]"
          >
            Save Profile Settings
          </button>
        </form>
      </div>

      {/* Language & Accessibility */}
      <div className="bg-white rounded-2xl p-6 border border-nhs-borderGrey/30 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-nhs-darkBlue flex items-center gap-2">
          <Globe className="w-5 h-5 text-nhs-blue" />
          <span>Language & Accessibility Preferences</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block font-bold text-nhs-text mb-1">{t.settings.language}</label>
            <select
              value={profile.language}
              onChange={(e) => setLanguage(e.target.value as LanguageCode)}
              className="w-full p-3 border border-nhs-borderGrey/40 rounded-xl min-h-[44px]"
            >
              <option value="en">English (UK)</option>
              <option value="pl">Polski (Polish)</option>
              <option value="ur">اردو (Urdu - RTL)</option>
              <option value="bn">বাংলা (Bengali)</option>
              <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
              <option value="ta">தமிழ் (Tamil)</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-nhs-text mb-1">{t.settings.textSize}</label>
            <select
              value={profile.fontScale}
              onChange={(e) => setFontScale(Number(e.target.value) as any)}
              className="w-full p-3 border border-nhs-borderGrey/40 rounded-xl min-h-[44px]"
            >
              <option value={100}>100% (Standard)</option>
              <option value={125}>125% (Medium)</option>
              <option value={150}>150% (Large)</option>
              <option value={200}>200% (Extra Large)</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-nhs-text mb-1">{t.settings.theme}</label>
            <select
              value={profile.theme}
              onChange={(e) => setTheme(e.target.value as any)}
              className="w-full p-3 border border-nhs-borderGrey/40 rounded-xl min-h-[44px]"
            >
              <option value="calm">Calm NHS (Default)</option>
              <option value="high_contrast">High Contrast (Yellow/Black)</option>
              <option value="dark">Dark Theme</option>
              <option value="dyslexia">Easy Read (Atkinson Font)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Privacy Consents (Granular Toggles) */}
      <div className="bg-white rounded-2xl p-6 border border-nhs-borderGrey/30 shadow-sm space-y-3">
        <h3 className="text-base font-bold text-nhs-darkBlue flex items-center gap-2">
          <Shield className="w-5 h-5 text-nhs-blue" />
          <span>{t.settings.consents}</span>
        </h3>

        <div className="space-y-2 text-xs divide-y divide-gray-100">
          <div className="pt-2 flex items-center justify-between">
            <div>
              <span className="font-bold text-nhs-text">Health Data Processing (UK GDPR Art 9)</span>
              <p className="text-nhs-secondaryText">Allow app to process and store your vitals and measurements offline.</p>
            </div>
            <input
              type="checkbox"
              checked={consents.healthData}
              onChange={(e) => updateConsents({ healthData: e.target.checked })}
              className="w-5 h-5 rounded text-nhs-blue"
            />
          </div>

          <div className="pt-2 flex items-center justify-between">
            <div>
              <span className="font-bold text-nhs-text">Mental Health Questionnaires (PHQ-9 / GAD-7)</span>
              <p className="text-nhs-secondaryText">Enable validated emotional wellbeing screeners and crisis safety flows.</p>
            </div>
            <input
              type="checkbox"
              checked={consents.mentalHealth}
              onChange={(e) => updateConsents({ mentalHealth: e.target.checked })}
              className="w-5 h-5 rounded text-nhs-blue"
            />
          </div>

          <div className="pt-2 flex items-center justify-between">
            <div>
              <span className="font-bold text-nhs-text">Consented Research Data Export</span>
              <p className="text-nhs-secondaryText">Opt-in to share pseudonymised health improvement data with the NHS/Coventry research team.</p>
            </div>
            <input
              type="checkbox"
              checked={consents.researchExport}
              onChange={(e) => updateConsents({ researchExport: e.target.checked })}
              className="w-5 h-5 rounded text-nhs-blue"
            />
          </div>
        </div>
      </div>

      {/* Data Export & Account Deletion */}
      <div className="bg-white rounded-2xl p-6 border border-nhs-borderGrey/30 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-nhs-darkBlue">UK GDPR Self-Service Rights</h3>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleExportJson}
            className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-nhs-text font-semibold text-xs rounded-xl shadow-sm flex items-center gap-1.5 min-h-[44px]"
          >
            <Download className="w-4 h-4" />
            <span>Export Data as JSON</span>
          </button>
          <button
            onClick={handleExportCsv}
            className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-nhs-text font-semibold text-xs rounded-xl shadow-sm flex items-center gap-1.5 min-h-[44px]"
          >
            <Download className="w-4 h-4" />
            <span>Export Data as CSV</span>
          </button>
          <button
            onClick={handleDeleteAccount}
            className="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-nhs-red font-bold text-xs rounded-xl border border-red-200 shadow-sm flex items-center gap-1.5 min-h-[44px]"
          >
            <Trash2 className="w-4 h-4" />
            <span>{t.settings.deleteAccount}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
