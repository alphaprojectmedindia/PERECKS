import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { translations } from '../../i18n/translations';
import { MeasurementType } from '../../core/types';
import { Activity, Plus, History, Check, Clock, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';

export const TrackView: React.FC = () => {
  const { profile, measurements, addMeasurement } = useAppStore();
  const t = translations[profile.language] || translations.en;

  const [activeType, setActiveType] = useState<MeasurementType>('blood_pressure');
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [pulse, setPulse] = useState('');
  const [genericValue, setGenericValue] = useState('');
  const [notes, setNotes] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (activeType === 'blood_pressure') {
      if (!systolic || !diastolic) return;
      await addMeasurement({
        type: 'blood_pressure',
        primaryValue: Number(systolic),
        secondaryValue: Number(diastolic),
        unit: 'mmHg',
        takenAt: new Date().toISOString(),
        notes: pulse ? `Pulse: ${pulse} bpm. ${notes}` : notes,
      });
      setSystolic('');
      setDiastolic('');
      setPulse('');
    } else {
      if (!genericValue) return;
      const unitMap: Record<MeasurementType, string> = {
        blood_pressure: 'mmHg',
        weight: 'kg',
        glucose: 'mmol/L',
        fluid: 'ml',
        salt: 'grams',
        activity: 'minutes',
        sleep: 'hours',
        waist: 'cm',
        hip: 'cm',
      };
      await addMeasurement({
        type: activeType,
        primaryValue: Number(genericValue),
        unit: unitMap[activeType],
        takenAt: new Date().toISOString(),
        notes,
      });
      setGenericValue('');
    }

    setNotes('');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  // Filter readings for chart
  const bpReadings = measurements
    .filter((m) => m.type === 'blood_pressure')
    .slice(0, 10)
    .reverse()
    .map((m, idx) => ({
      name: new Date(m.takenAt).toLocaleDateString([], { month: 'short', day: 'numeric' }),
      systolic: m.primaryValue,
      diastolic: m.secondaryValue,
      targetSys: profile.bpTargetSystolic || 135,
    }));

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-nhs-text">{t.track.title}</h2>
        <p className="text-xs text-nhs-secondaryText">Log your health numbers quickly. All data stays offline on your device.</p>
      </div>

      {/* Tracker Type Selector */}
      <div className="flex flex-wrap gap-2 pb-2">
        {(
          [
            { type: 'blood_pressure', label: '🩸 ' + t.track.bp },
            { type: 'weight', label: '⚖️ ' + t.track.weight },
            { type: 'glucose', label: '🍬 ' + t.track.glucose },
            { type: 'fluid', label: '💧 ' + t.track.fluid },
            { type: 'salt', label: '🧂 ' + t.track.salt },
            { type: 'activity', label: '🏃 ' + t.track.activity },
            { type: 'sleep', label: '🌙 ' + t.track.sleep },
          ] as const
        ).map((item) => (
          <button
            key={item.type}
            onClick={() => setActiveType(item.type)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors min-h-[44px] ${
              activeType === item.type
                ? 'bg-nhs-blue text-white shadow-sm'
                : 'bg-white border border-nhs-borderGrey/30 text-nhs-text hover:bg-nhs-background'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Logging Form Card */}
      <div className="bg-white rounded-2xl p-6 border border-nhs-borderGrey/30 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-nhs-darkBlue flex items-center gap-2">
          <Plus className="w-5 h-5 text-nhs-blue" />
          <span>Log {activeType.replace('_', ' ').toUpperCase()}</span>
        </h3>

        {showSuccess && (
          <div className="p-3 bg-green-50 border border-green-200 text-green-800 rounded-xl text-xs font-semibold flex items-center gap-2 animate-fadeIn">
            <Check className="w-4 h-4 text-nhs-green" />
            <span>Saved securely to your offline health record (+10 points)!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {activeType === 'blood_pressure' ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-nhs-text mb-1">Systolic (Top number, mmHg)</label>
                <input
                  type="number"
                  placeholder="e.g. 128"
                  value={systolic}
                  onChange={(e) => setSystolic(e.target.value)}
                  min="60"
                  max="250"
                  required
                  className="w-full p-3 border border-nhs-borderGrey/40 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-nhs-blue min-h-[44px]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-nhs-text mb-1">Diastolic (Bottom number, mmHg)</label>
                <input
                  type="number"
                  placeholder="e.g. 82"
                  value={diastolic}
                  onChange={(e) => setDiastolic(e.target.value)}
                  min="40"
                  max="150"
                  required
                  className="w-full p-3 border border-nhs-borderGrey/40 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-nhs-blue min-h-[44px]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-nhs-text mb-1">Pulse (bpm, optional)</label>
                <input
                  type="number"
                  placeholder="e.g. 72"
                  value={pulse}
                  onChange={(e) => setPulse(e.target.value)}
                  className="w-full p-3 border border-nhs-borderGrey/40 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-nhs-blue min-h-[44px]"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-bold text-nhs-text mb-1">
                Value ({activeType === 'weight' ? 'kg' : activeType === 'fluid' ? 'ml' : activeType === 'activity' ? 'minutes' : 'units'})
              </label>
              <input
                type="number"
                step="any"
                placeholder="Enter value..."
                value={genericValue}
                onChange={(e) => setGenericValue(e.target.value)}
                required
                className="w-full p-3 border border-nhs-borderGrey/40 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-nhs-blue min-h-[44px]"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-nhs-text mb-1">{t.track.notes}</label>
            <input
              type="text"
              placeholder="e.g. Before breakfast, felt relaxed"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-3 border border-nhs-borderGrey/40 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-nhs-blue min-h-[44px]"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 bg-nhs-blue hover:bg-nhs-darkBlue text-white font-bold rounded-xl shadow-md transition-colors min-h-[44px]"
          >
            {t.track.save}
          </button>
        </form>
      </div>

      {/* Blood Pressure Trend Chart */}
      {activeType === 'blood_pressure' && bpReadings.length > 0 && (
        <div className="bg-white rounded-2xl p-6 border border-nhs-borderGrey/30 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-nhs-darkBlue flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-nhs-blue" />
              <span>Blood Pressure Trend & Clinician Target</span>
            </h3>
            <span className="text-xs text-nhs-secondaryText">Target: &lt;{profile.bpTargetSystolic || 135} mmHg</span>
          </div>

          <div className="h-60 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={bpReadings}>
                <XAxis dataKey="name" stroke="#768692" fontSize={11} />
                <YAxis domain={[50, 180]} stroke="#768692" fontSize={11} />
                <Tooltip />
                <ReferenceLine y={profile.bpTargetSystolic || 135} stroke="#DA291C" strokeDasharray="3 3" label={{ value: 'Target', fill: '#DA291C', fontSize: 10 }} />
                <Line type="monotone" dataKey="systolic" stroke="#005EB8" strokeWidth={2.5} name="Systolic" />
                <Line type="monotone" dataKey="diastolic" stroke="#41B6E6" strokeWidth={2} name="Diastolic" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Recent History Table */}
      <div className="bg-white rounded-2xl p-6 border border-nhs-borderGrey/30 shadow-sm space-y-3">
        <h3 className="text-sm font-bold text-nhs-darkBlue flex items-center gap-1.5">
          <History className="w-4 h-4 text-nhs-blue" />
          <span>{t.track.history}</span>
        </h3>

        <div className="divide-y divide-gray-100">
          {measurements.slice(0, 5).map((m) => (
            <div key={m.id} className="py-3 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-nhs-text capitalize">{m.type.replace('_', ' ')}</span>
                <p className="text-nhs-secondaryText text-[11px]">
                  {new Date(m.takenAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <div className="text-right">
                <span className="font-bold text-nhs-blue text-sm">
                  {m.primaryValue} {m.secondaryValue ? `/ ${m.secondaryValue}` : ''} {m.unit}
                </span>
                {m.notes && <p className="text-gray-500 text-[10px] truncate max-w-[150px]">{m.notes}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
