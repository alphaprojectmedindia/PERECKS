import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { translations } from '../../i18n/translations';
import { CheckCircle2, Circle, Flame, Sparkles, Coffee, HeartPulse, ArrowRight, Smile } from 'lucide-react';

export const TodayView: React.FC = () => {
  const { profile, points, toggleUnwellPause, awardPoints, setActiveTab } = useAppStore();
  const t = translations[profile.language] || translations.en;

  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

  const tasks = [
    {
      id: 'task-bp',
      title: 'Log your morning or evening blood pressure',
      points: 10,
      duration: '30 seconds',
      tab: 'track',
    },
    {
      id: 'task-lesson',
      title: 'Read a 2-minute lesson: Understanding Stage 3 CKD',
      points: 15,
      duration: '2 minutes',
      tab: 'learn',
    },
    {
      id: 'task-quiz',
      title: 'Play the Daily Kidney Quiz (3 quick questions)',
      points: 15,
      duration: '1 minute',
      tab: 'play',
    },
  ];

  const handleToggleTask = (taskId: string, pointsValue: number) => {
    if (!completedTasks[taskId]) {
      setCompletedTasks((prev) => ({ ...prev, [taskId]: true }));
      awardPoints(pointsValue);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Guide Character Card ("Bea the Bean") */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-nhs-brightBlue/30 rounded-2xl p-5 shadow-sm flex items-start gap-4">
        <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-2xl shadow-md border-2 border-nhs-blue flex-shrink-0">
          🌱
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-nhs-darkBlue text-base flex items-center gap-1.5">
              <span>Bea the Bean</span>
              <span className="text-xs bg-nhs-blue text-white px-2 py-0.5 rounded-full font-medium">Your Guide</span>
            </h2>
            <button
              onClick={toggleUnwellPause}
              className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                profile.isUnwellPaused
                  ? 'bg-amber-100 border-amber-300 text-amber-900 font-bold'
                  : 'bg-white border-nhs-borderGrey/40 text-nhs-secondaryText hover:bg-gray-50'
              }`}
            >
              {profile.isUnwellPaused ? 'Paused (I am unwell)' : 'I am unwell (Pause)'}
            </button>
          </div>
          <p className="text-sm text-nhs-text mt-1.5 leading-relaxed font-medium">
            {profile.isUnwellPaused
              ? 'Your reminders and streaks are gently paused. Rest, sip water, and remember your care team is here if you need advice.'
              : t.today.guideMessage}
          </p>
        </div>
      </div>

      {/* Streak & Points Hero */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Gentle Streak Card */}
        <div className="bg-white rounded-2xl p-5 border border-nhs-borderGrey/30 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-nhs-secondaryText uppercase tracking-wider">{t.today.streak}</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-nhs-blue">{points.currentStreakDays}</span>
              <span className="text-sm text-nhs-secondaryText font-medium">{t.today.streakDays}</span>
            </div>
            <p className="text-xs text-nhs-green font-medium flex items-center gap-1">
              <Smile className="w-3.5 h-3.5" />
              <span>No penalty for rest days!</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500 shadow-inner">
            <Flame className="w-6 h-6" />
          </div>
        </div>

        {/* Kidney Points Card */}
        <div className="bg-white rounded-2xl p-5 border border-nhs-borderGrey/30 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-nhs-secondaryText uppercase tracking-wider">{t.today.points}</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-nhs-darkBlue">{points.totalPoints}</span>
              <span className="text-xs bg-nhs-lightBlue/20 text-nhs-darkBlue px-2 py-0.5 rounded-full font-bold">
                Tier: Sprout 🌱
              </span>
            </div>
            <p className="text-xs text-nhs-secondaryText">+{points.todayPoints} earned today</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 shadow-inner">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* 3 Small Steps for Today */}
      <div className="bg-white rounded-2xl p-6 border border-nhs-borderGrey/30 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-nhs-text">{t.today.tasksTitle}</h3>
            <p className="text-xs text-nhs-secondaryText">Small, calm daily habits to protect your health.</p>
          </div>
          <span className="text-xs font-bold text-nhs-blue bg-blue-50 px-2.5 py-1 rounded-full">
            {Object.values(completedTasks).filter(Boolean).length} / {tasks.length} Done
          </span>
        </div>

        <div className="space-y-3">
          {tasks.map((task) => {
            const isDone = !!completedTasks[task.id];
            return (
              <div
                key={task.id}
                className={`p-4 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                  isDone
                    ? 'bg-green-50/70 border-green-200 text-gray-600'
                    : 'bg-white border-nhs-borderGrey/30 hover:border-nhs-blue shadow-sm'
                }`}
              >
                <button
                  onClick={() => handleToggleTask(task.id, task.points)}
                  className="flex items-center gap-3 text-left flex-1"
                  aria-label={isDone ? 'Mark task as incomplete' : 'Mark task as complete'}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-6 h-6 text-nhs-green flex-shrink-0" />
                  ) : (
                    <Circle className="w-6 h-6 text-nhs-borderGrey flex-shrink-0 hover:text-nhs-blue" />
                  )}
                  <div>
                    <p className={`text-sm font-semibold ${isDone ? 'line-through text-gray-500' : 'text-nhs-text'}`}>
                      {task.title}
                    </p>
                    <span className="text-xs text-nhs-secondaryText">
                      ⏱ {task.duration} • +{task.points} pts
                    </span>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab(task.tab)}
                  className="p-2 text-nhs-blue hover:bg-nhs-background rounded-lg text-xs font-semibold flex items-center gap-1 min-h-[44px]"
                  title="Go to module"
                >
                  <span>Go</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Action Navigation Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setActiveTab('track')}
          className="p-4 bg-white rounded-xl border border-nhs-borderGrey/30 hover:border-nhs-blue text-center shadow-sm min-h-[44px] flex flex-col items-center justify-center gap-2"
        >
          <span className="text-2xl">📊</span>
          <span className="text-xs font-bold text-nhs-text">Log Blood Pressure</span>
        </button>
        <button
          onClick={() => setActiveTab('learn')}
          className="p-4 bg-white rounded-xl border border-nhs-borderGrey/30 hover:border-nhs-blue text-center shadow-sm min-h-[44px] flex flex-col items-center justify-center gap-2"
        >
          <span className="text-2xl">📖</span>
          <span className="text-xs font-bold text-nhs-text">Kidney Lessons</span>
        </button>
        <button
          onClick={() => setActiveTab('mind')}
          className="p-4 bg-white rounded-xl border border-nhs-borderGrey/30 hover:border-nhs-blue text-center shadow-sm min-h-[44px] flex flex-col items-center justify-center gap-2"
        >
          <span className="text-2xl">🧘</span>
          <span className="text-xs font-bold text-nhs-text">2-Min Breathing</span>
        </button>
        <button
          onClick={() => setActiveTab('costing')}
          className="p-4 bg-white rounded-xl border border-nhs-borderGrey/30 hover:border-nhs-blue text-center shadow-sm min-h-[44px] flex flex-col items-center justify-center gap-2"
        >
          <span className="text-2xl">💷</span>
          <span className="text-xs font-bold text-nhs-text">UK NHS Costs</span>
        </button>
      </div>
    </div>
  );
};
