import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { translations } from '../../i18n/translations';
import { Heart, ShieldAlert, Sparkles, ExternalLink, Play, Pause, RefreshCw } from 'lucide-react';

export const MindView: React.FC = () => {
  const { profile, triggerCrisis, awardPoints } = useAppStore();
  const t = translations[profile.language] || translations.en;

  const [activeTab, setActiveTab] = useState<'breathing' | 'phq9' | 'gad7'>('breathing');

  // Breathing Exercise State
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Rest'>('Inhale');
  const [breathCounter, setBreathCounter] = useState(4);

  // PHQ-9 Questionnaire State (9 questions)
  const [phq9Answers, setPhq9Answers] = useState<Record<number, number>>({});
  const [phq9Score, setPhq9Score] = useState<number | null>(null);

  const phq9Questions = [
    'Little interest or pleasure in doing things',
    'Feeling down, depressed, or hopeless',
    'Trouble falling or staying asleep, or sleeping too much',
    'Feeling tired or having little energy',
    'Poor appetite or overeating',
    'Feeling bad about yourself — or that you are a failure or have let yourself or your family down',
    'Trouble concentrating on things, such as reading the newspaper or watching television',
    'Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual',
    'Thoughts that you would be better off dead, or of hurting yourself in some way',
  ];

  const handlePhq9Select = (qIdx: number, val: number) => {
    setPhq9Answers((prev) => ({ ...prev, [qIdx]: val }));

    // STRICT SAFETY RULE 2.8 / DCB0129 HAZARD 003:
    // If Question 9 (item index 8) is scored > 0, trigger crisis screen immediately.
    if (qIdx === 8 && val > 0) {
      triggerCrisis('phq9_item_9_positive');
    }
  };

  const handleCalculatePhq9 = () => {
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += phq9Answers[i] ?? 0;
    }
    setPhq9Score(sum);
    awardPoints(20, 'Mindful Check-in');
  };

  // Breathing Box Timer simulation
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (breathingActive) {
      interval = setInterval(() => {
        setBreathCounter((prev) => {
          if (prev <= 1) {
            setBreathPhase((curr) => {
              if (curr === 'Inhale') return 'Hold';
              if (curr === 'Hold') return 'Exhale';
              if (curr === 'Exhale') return 'Rest';
              return 'Inhale';
            });
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [breathingActive]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-nhs-text">{t.mind.title}</h2>
        <p className="text-xs text-nhs-secondaryText">
          Gentle emotional support, breathing exercises, and validated mood check-ins.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTab('breathing')}
          className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors min-h-[44px] ${
            activeTab === 'breathing'
              ? 'bg-nhs-blue text-white shadow-sm'
              : 'bg-white border border-nhs-borderGrey/30 text-nhs-text hover:bg-nhs-background'
          }`}
        >
          2-Minute Box Breathing
        </button>
        <button
          onClick={() => setActiveTab('phq9')}
          className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors min-h-[44px] ${
            activeTab === 'phq9'
              ? 'bg-nhs-blue text-white shadow-sm'
              : 'bg-white border border-nhs-borderGrey/30 text-nhs-text hover:bg-nhs-background'
          }`}
        >
          PHQ-9 Mood Check-In
        </button>
      </div>

      {/* Breathing Tool */}
      {activeTab === 'breathing' && (
        <div className="bg-white rounded-2xl p-6 border border-nhs-borderGrey/30 shadow-sm text-center space-y-6">
          <div className="max-w-md mx-auto space-y-2">
            <h3 className="text-lg font-bold text-nhs-darkBlue">Calm Box Breathing</h3>
            <p className="text-xs text-nhs-secondaryText">
              Slow, paced breathing activates your parasympathetic nervous system, lowering blood pressure and vascular stress.
            </p>
          </div>

          {/* Animated Circle */}
          <div className="flex items-center justify-center py-6">
            <div
              className={`w-44 h-44 rounded-full flex flex-col items-center justify-center transition-all duration-1000 shadow-lg border-4 ${
                breathPhase === 'Inhale'
                  ? 'scale-110 bg-blue-100 border-nhs-blue'
                  : breathPhase === 'Hold'
                  ? 'scale-110 bg-indigo-100 border-indigo-400'
                  : breathPhase === 'Exhale'
                  ? 'scale-90 bg-emerald-100 border-nhs-green'
                  : 'scale-90 bg-gray-100 border-gray-300'
              }`}
            >
              <span className="text-lg font-extrabold text-nhs-darkBlue">{breathPhase}</span>
              <span className="text-2xl font-black text-nhs-blue mt-1">{breathCounter}s</span>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={() => {
                setBreathingActive(!breathingActive);
                if (!breathingActive) awardPoints(10);
              }}
              className="px-6 py-3 bg-nhs-blue hover:bg-nhs-darkBlue text-white font-bold rounded-xl shadow min-h-[44px] flex items-center gap-2"
            >
              {breathingActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{breathingActive ? 'Pause Exercise' : 'Start 2-Minute Breathing'}</span>
            </button>
          </div>
        </div>
      )}

      {/* PHQ-9 Screener */}
      {activeTab === 'phq9' && (
        <div className="bg-white rounded-2xl p-6 border border-nhs-borderGrey/30 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-nhs-darkBlue">PHQ-9 Depression Screener (Kroenke 2001)</h3>
              <p className="text-xs text-nhs-secondaryText">
                Over the last 2 weeks, how often have you been bothered by any of the following problems?
              </p>
            </div>
            <span className="text-[11px] bg-green-50 text-green-700 px-2.5 py-0.5 rounded-full font-bold">
              Private to You
            </span>
          </div>

          <div className="space-y-4 divide-y divide-gray-100">
            {phq9Questions.map((q, idx) => (
              <div key={idx} className="pt-3 space-y-2">
                <p className="text-xs font-bold text-nhs-text">{idx + 1}. {q}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { label: 'Not at all', val: 0 },
                    { label: 'Several days', val: 1 },
                    { label: 'More than half the days', val: 2 },
                    { label: 'Nearly every day', val: 3 },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => handlePhq9Select(idx, opt.val)}
                      className={`p-2 rounded-lg text-xs border text-center transition-colors min-h-[44px] ${
                        phq9Answers[idx] === opt.val
                          ? 'bg-nhs-blue text-white font-bold border-nhs-blue'
                          : 'bg-white border-gray-200 text-nhs-text hover:bg-gray-50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {Object.keys(phq9Answers).length === 9 && (
            <button
              onClick={handleCalculatePhq9}
              className="px-6 py-3 bg-nhs-blue hover:bg-nhs-darkBlue text-white font-bold rounded-xl shadow min-h-[44px]"
            >
              Calculate Mood Summary
            </button>
          )}

          {phq9Score !== null && (
            <div className="mt-4 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-nhs-brightBlue/40 rounded-2xl space-y-2 animate-fadeIn">
              <span className="text-xs font-bold text-nhs-secondaryText uppercase tracking-wider">PHQ-9 Total Score</span>
              <div className="text-3xl font-extrabold text-nhs-darkBlue">{phq9Score} / 27</div>
              <p className="text-xs font-semibold text-nhs-text">
                Band: {phq9Score <= 4 ? 'Minimal / None' : phq9Score <= 9 ? 'Mild depression symptoms' : phq9Score <= 14 ? 'Moderate depression' : 'Moderately severe to severe'}
              </p>
              <p className="text-xs text-nhs-secondaryText pt-1">
                Living with a chronic health condition affects mood and energy. If you feel low or anxious, you can self-refer freely to NHS Talking Therapies below without waiting for a GP appointment.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Free NHS Talking Therapies Signpost Card */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-5 shadow-sm flex items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-emerald-950 text-sm">Free NHS Talking Therapies (IAPT)</h4>
          <p className="text-xs text-emerald-800 mt-0.5">
            Free, confidential psychological support for stress, worry, and living with long-term kidney conditions.
          </p>
        </div>
        <a
          href="https://www.nhs.uk/mental-health/talking-therapies-medicine-treatments/talking-therapies-and-counselling/nhs-talking-therapies/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2.5 bg-nhs-green hover:bg-green-700 text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5 flex-shrink-0 min-h-[44px]"
        >
          <span>Self-Refer Online</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
