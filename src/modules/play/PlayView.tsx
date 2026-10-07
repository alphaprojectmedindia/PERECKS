import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { translations } from '../../i18n/translations';
import { Gamepad2, CheckCircle2, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import gamesData from '../../../games/games.json';

export const PlayView: React.FC = () => {
  const { profile, awardPoints } = useAppStore();
  const t = translations[profile.language] || translations.en;

  const [activeGameId, setActiveGameId] = useState<string | null>(null);
  const [gameState, setGameState] = useState<Record<string, any>>({});
  const [feedback, setFeedback] = useState<string | null>(null);

  const activeGame = gamesData.find((g) => g.id === activeGameId);

  const handleFinishGame = (points: number, badge: string, feedbackMsg: string) => {
    awardPoints(points, badge);
    setFeedback(feedbackMsg);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-nhs-text">{t.nav.play}</h2>
        <p className="text-xs text-nhs-secondaryText">
          Fun, 2-minute micro-games grounded in behavioural science (BCTTv1). No penalties, only gentle learning!
        </p>
      </div>

      {activeGame ? (
        /* Active Game Sandbox */
        <div className="bg-white rounded-2xl p-6 border border-nhs-borderGrey/30 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs bg-nhs-blue text-white px-2.5 py-0.5 rounded-full font-bold">
                +{activeGame.points} pts
              </span>
              <h3 className="text-lg font-bold text-nhs-text mt-1">{activeGame.title}</h3>
              <p className="text-xs text-nhs-secondaryText">{activeGame.description}</p>
            </div>
            <button
              onClick={() => {
                setActiveGameId(null);
                setFeedback(null);
                setGameState({});
              }}
              className="text-xs font-bold text-nhs-blue hover:underline py-2"
            >
              ← Back to all games
            </button>
          </div>

          {/* Feedback Display */}
          {feedback && (
            <div className="p-4 bg-green-50 border border-green-200 text-green-900 rounded-xl text-xs font-semibold animate-fadeIn flex items-start gap-2">
              <Sparkles className="w-5 h-5 text-nhs-green flex-shrink-0" />
              <div>
                <p className="font-bold text-sm">Well done! +{activeGame.points} Kidney Points awarded!</p>
                <p className="mt-0.5">{feedback}</p>
              </div>
            </div>
          )}

          {/* Specific Game Mechanics */}
          {activeGame.id === 'salt-detective' && (
            <div className="space-y-4">
              <p className="text-xs font-bold text-nhs-text">Scenario: Which lunch option has less hidden salt?</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() =>
                    handleFinishGame(
                      20,
                      'Salt Sleuth',
                      'Great choice! Homemade vegetable soup uses herbs instead of heavy salt, saving over 1.2g of sodium.'
                    )
                  }
                  className="p-4 rounded-xl border-2 border-dashed border-nhs-blue/40 hover:border-nhs-blue bg-blue-50/50 text-left min-h-[44px]"
                >
                  <span className="text-2xl block mb-1">🍲</span>
                  <span className="font-bold text-xs text-nhs-darkBlue block">Homemade Fresh Vegetable Soup</span>
                  <span className="text-[11px] text-nhs-green font-semibold">0.25g salt per bowl</span>
                </button>

                <button
                  onClick={() =>
                    alert('That option has 1.45g of salt (over 25% of your daily limit). Try the fresh soup!')
                  }
                  className="p-4 rounded-xl border border-gray-200 hover:border-gray-400 bg-gray-50 text-left min-h-[44px]"
                >
                  <span className="text-2xl block mb-1">🥫</span>
                  <span className="font-bold text-xs text-gray-700 block">Canned Ready-Made Cream Soup</span>
                  <span className="text-[11px] text-red-600 font-semibold">1.45g salt per bowl (High)</span>
                </button>
              </div>
            </div>
          )}

          {activeGame.id === 'pill-check' && (
            <div className="space-y-4">
              <p className="text-xs font-bold text-nhs-text">
                Tap the medicine that generally requires a pharmacist check before taking in CKD:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() =>
                    handleFinishGame(
                      20,
                      'Pill Check Pro',
                      'Correct! Ibuprofen is an NSAID that reduces blood flow into kidney filters.'
                    )
                  }
                  className="p-3.5 rounded-xl border border-gray-200 hover:border-nhs-blue bg-white text-left text-xs font-bold text-nhs-text"
                >
                  💊 Ibuprofen (Nurofen / Advil)
                </button>
                <button
                  onClick={() =>
                    alert('Paracetamol is usually safe for kidneys at recommended doses. Check another option!')
                  }
                  className="p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 bg-white text-left text-xs font-medium text-gray-600"
                >
                  💊 Paracetamol (500mg)
                </button>
              </div>
            </div>
          )}

          {activeGame.id !== 'salt-detective' && activeGame.id !== 'pill-check' && (
            <div className="text-center py-8 space-y-4">
              <div className="text-4xl">🎮</div>
              <p className="text-xs text-nhs-secondaryText max-w-sm mx-auto">
                Ready to practice this habit? Click below to complete this activity and earn points.
              </p>
              <button
                onClick={() =>
                  handleFinishGame(
                    activeGame.points,
                    activeGame.title,
                    `You completed ${activeGame.title} successfully!`
                  )
                }
                className="px-6 py-3 bg-nhs-blue hover:bg-nhs-darkBlue text-white font-bold rounded-xl shadow min-h-[44px]"
              >
                Complete Activity (+{activeGame.points} pts)
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Games Directory Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {gamesData.map((game) => (
            <div
              key={game.id}
              onClick={() => setActiveGameId(game.id)}
              className="bg-white rounded-2xl p-5 border border-nhs-borderGrey/30 hover:border-nhs-blue shadow-sm hover:shadow-md cursor-pointer transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold bg-amber-50 text-amber-800 px-2.5 py-0.5 rounded-full">
                    +{game.points} pts
                  </span>
                  <span className="text-[10px] text-gray-500 font-mono">BCT: {game.bct.join(', ')}</span>
                </div>
                <h3 className="font-bold text-nhs-text text-base leading-snug">{game.title}</h3>
                <p className="text-xs text-nhs-secondaryText">{game.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-nhs-blue">
                <span>Play Now</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
