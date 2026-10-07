import React, { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { Header } from '../design/components/Header';
import { BottomNav } from '../design/components/BottomNav';
import { CrisisModal } from '../design/components/CrisisModal';
import { TodayView } from '../modules/today/TodayView';
import { TrackView } from '../modules/track/TrackView';
import { LearnView } from '../modules/learn/LearnView';
import { CalculatorsView } from '../modules/calculators/CalculatorsView';
import { MindView } from '../modules/mind/MindView';
import { PlayView } from '../modules/play/PlayView';
import { CostingView } from '../modules/costing/CostingView';
import { CareFinderView } from '../modules/care-finder/CareFinderView';
import { SupportView } from '../modules/support/SupportView';
import { ReportsView } from '../modules/reports/ReportsView';
import { CommunityView } from '../modules/community/CommunityView';
import { SettingsView } from '../modules/settings/SettingsView';

export const App: React.FC = () => {
  const { profile, activeTab } = useAppStore();

  const isUrdu = profile.language === 'ur';

  // Apply font scale and theme dynamically to root
  useEffect(() => {
    document.documentElement.dir = isUrdu ? 'rtl' : 'ltr';
    document.documentElement.lang = profile.language;
  }, [profile.language, isUrdu]);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'today':
        return <TodayView />;
      case 'track':
        return <TrackView />;
      case 'learn':
        return <LearnView />;
      case 'calculators':
        return <CalculatorsView />;
      case 'mind':
        return <MindView />;
      case 'play':
        return <PlayView />;
      case 'costing':
        return <CostingView />;
      case 'careFinder':
        return <CareFinderView />;
      case 'support':
        return <SupportView />;
      case 'reports':
        return <ReportsView />;
      case 'community':
        return <CommunityView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <TodayView />;
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-scale-${profile.fontScale} theme-${profile.theme} ${
        isUrdu ? 'font-urdu' : profile.theme === 'dyslexia' ? 'font-accessible' : 'font-sans'
      }`}
    >
      {/* Universal NHS Top Bar */}
      <Header />

      {/* Emergency Crisis Intercept Overlay (Always Active if Triggered) */}
      <CrisisModal />

      {/* Main Container Layout */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto pb-20 md:pb-6">
        <BottomNav />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
};

export default App;
