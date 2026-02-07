import { ArrowLeft, Trophy, TrendingUp, Target, Award, DollarSign } from 'lucide-react';
import { useGame } from '../context/GameContext';

export function PlayerProgress() {
  const { setCurrentScreen, playerProgress } = useGame();

  if (!playerProgress) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-slate-400 mb-4">Loading your profile...</p>
        </div>
      </div>
    );
  }

  const careerStages = [
    { id: 'part_time', label: 'Part-Time Bartender', level: 1 },
    { id: 'shift_lead', label: 'Shift Lead', level: 5 },
    { id: 'head_bartender', label: 'Head Bartender', level: 10 },
    { id: 'manager', label: 'Bar Manager', level: 20 },
    { id: 'owner', label: 'Bar Owner', level: 30 },
  ];

  const currentStageIndex = careerStages.findIndex(
    (stage) => stage.id === playerProgress.career_stage
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => setCurrentScreen('menu')}
          className="mb-6 text-slate-400 hover:text-white transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Menu
        </button>

        <div className="bg-slate-800/50 backdrop-blur rounded-3xl p-8 border border-slate-700 mb-6">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
              {playerProgress.level}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-1 capitalize">
                {playerProgress.career_stage.replace('_', ' ')}
              </h2>
              <p className="text-slate-400">Level {playerProgress.level} Bartender</p>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-400 text-sm">Experience Progress</span>
              <span className="text-slate-400 text-sm">
                {playerProgress.experience % 1000}/1000 XP
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-cyan-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(playerProgress.experience % 1000) / 10}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-slate-900/50 rounded-xl p-4 text-center">
              <Trophy className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{playerProgress.total_drinks_made}</p>
              <p className="text-slate-400 text-sm">Total Drinks</p>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-4 text-center">
              <Award className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{playerProgress.perfect_drinks}</p>
              <p className="text-slate-400 text-sm">Perfect Drinks</p>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-4 text-center">
              <Target className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{playerProgress.best_score}</p>
              <p className="text-slate-400 text-sm">Best Score</p>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-4 text-center">
              <DollarSign className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">${playerProgress.total_tips}</p>
              <p className="text-slate-400 text-sm">Total Tips</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur rounded-3xl p-8 border border-slate-700">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-cyan-400" />
            Career Path
          </h3>

          <div className="space-y-4">
            {careerStages.map((stage, idx) => {
              const isCompleted = idx < currentStageIndex;
              const isCurrent = idx === currentStageIndex;
              const isLocked = idx > currentStageIndex;

              return (
                <div
                  key={stage.id}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                    isCurrent
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-500/50'
                      : isCompleted
                      ? 'bg-green-500/10 border border-green-500/30'
                      : 'bg-slate-900/30 border border-slate-700/50'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                      isCurrent
                        ? 'bg-cyan-500 text-white'
                        : isCompleted
                        ? 'bg-green-500 text-white'
                        : 'bg-slate-700 text-slate-400'
                    }`}
                  >
                    {isCompleted ? '✓' : stage.level}
                  </div>
                  <div className="flex-1">
                    <h4
                      className={`font-bold ${
                        isCurrent || isCompleted ? 'text-white' : 'text-slate-500'
                      }`}
                    >
                      {stage.label}
                    </h4>
                    <p className="text-slate-400 text-sm">
                      {isLocked ? `Unlocks at level ${stage.level}` : `Level ${stage.level}`}
                    </p>
                  </div>
                  {isCurrent && (
                    <span className="px-3 py-1 bg-cyan-500 text-white rounded-full text-xs font-bold">
                      Current
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
