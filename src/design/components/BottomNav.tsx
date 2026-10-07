import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { translations } from '../../i18n/translations';
import {
  Calendar,
  Activity,
  BookOpen,
  Calculator,
  Heart,
  Gamepad2,
  PoundSterling,
  MapPin,
  HelpCircle,
  FileText,
  Users,
  Settings,
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { profile, activeTab, setActiveTab } = useAppStore();
  const t = translations[profile.language] || translations.en;

  const navItems = [
    { id: 'today', label: t.nav.today, icon: Calendar },
    { id: 'track', label: t.nav.track, icon: Activity },
    { id: 'learn', label: t.nav.learn, icon: BookOpen },
    { id: 'calculators', label: t.nav.calculators, icon: Calculator },
    { id: 'mind', label: t.nav.mind, icon: Heart },
    { id: 'play', label: t.nav.play, icon: Gamepad2 },
    { id: 'costing', label: t.nav.costing, icon: PoundSterling },
    { id: 'careFinder', label: t.nav.careFinder, icon: MapPin },
    { id: 'support', label: t.nav.support, icon: HelpCircle },
    { id: 'reports', label: t.nav.reports, icon: FileText },
    { id: 'community', label: t.nav.community, icon: Users },
    { id: 'settings', label: t.nav.settings, icon: Settings },
  ];

  return (
    <>
      {/* Mobile Bottom Navigation Bar (Primary 5 Tabs) */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-nhs-borderGrey/30 shadow-lg z-30 flex items-center justify-around py-1 px-2"
        aria-label="Mobile Navigation Bar"
      >
        {navItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 px-1 rounded-lg transition-colors ${
                isActive ? 'text-nhs-blue font-bold bg-nhs-background' : 'text-nhs-secondaryText hover:text-nhs-text'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-nhs-blue' : 'text-nhs-secondaryText'}`} />
              <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-[58px]">{item.label}</span>
            </button>
          );
        })}
        {/* 'More' tab for remaining views */}
        <button
          onClick={() => setActiveTab('settings')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 px-1 rounded-lg transition-colors ${
            !['today', 'track', 'learn', 'calculators', 'mind'].includes(activeTab)
              ? 'text-nhs-blue font-bold bg-nhs-background'
              : 'text-nhs-secondaryText hover:text-nhs-text'
          }`}
        >
          <Settings className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">More</span>
        </button>
      </nav>

      {/* Desktop / Tablet Sidebar Navigation */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-nhs-borderGrey/30 shadow-sm p-4 space-y-1">
        <div className="px-3 py-2 text-xs font-bold text-nhs-secondaryText uppercase tracking-wider">
          Companion Modules
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all min-h-[44px] text-left ${
                isActive
                  ? 'bg-nhs-blue text-white shadow-sm'
                  : 'text-nhs-text hover:bg-nhs-background hover:text-nhs-blue'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-nhs-secondaryText'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </aside>
    </>
  );
};
