import { Star, TrendingUp, Clock, Sparkles, DollarSign, Award } from 'lucide-react';
import { useGame } from '../context/GameContext';

export function BossEvaluation() {
  const { lastEvaluation, currentCocktail, setCurrentScreen, playerProgress } = useGame();

  if (!lastEvaluation || !currentCocktail) return null;

  const stars = Array.from({ length: 5 }, (_, i) => i < lastEvaluation.rating);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-slate-800/50 backdrop-blur rounded-3xl p-8 border border-slate-700 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-slate-600">
              <span className="text-4xl">👨‍💼</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Boss Evaluation</h2>
            <p className="text-slate-400">Your {currentCocktail.name} has been reviewed</p>
          </div>

          <div className="flex justify-center gap-2 mb-6">
            {stars.map((filled, idx) => (
              <Star
                key={idx}
                className={`w-10 h-10 ${
                  filled ? 'fill-yellow-400 text-yellow-400' : 'text-slate-600'
                }`}
              />
            ))}
          </div>

          <div className="bg-slate-900/50 rounded-2xl p-6 mb-6">
            <p className="text-slate-200 text-lg italic text-center leading-relaxed">
              "{lastEvaluation.feedback}"
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-blue-400" />
                <span className="text-slate-300 text-sm">Accuracy</span>
              </div>
              <p className="text-3xl font-bold text-white">{lastEvaluation.accuracy_score}%</p>
            </div>

            <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 border border-green-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-green-400" />
                <span className="text-slate-300 text-sm">Timing</span>
              </div>
              <p className="text-3xl font-bold text-white">{lastEvaluation.timing_score}%</p>
            </div>

            <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-purple-400" />
                <span className="text-slate-300 text-sm">Presentation</span>
              </div>
              <p className="text-3xl font-bold text-white">{lastEvaluation.presentation_score}%</p>
            </div>

            <div className="bg-gradient-to-br from-cyan-600/20 to-cyan-800/20 border border-cyan-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-cyan-400" />
                <span className="text-slate-300 text-sm">Total Score</span>
              </div>
              <p className="text-3xl font-bold text-white">{lastEvaluation.total_score}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-900/50 rounded-lg p-4 flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-slate-400 text-sm">Tips Earned</p>
                <p className="text-white text-xl font-bold">${lastEvaluation.tips}</p>
              </div>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-4 flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-cyan-400" />
              <div>
                <p className="text-slate-400 text-sm">XP Gained</p>
                <p className="text-white text-xl font-bold">+{lastEvaluation.experience_gained}</p>
              </div>
            </div>
          </div>

          {playerProgress && (
            <div className="mb-6 bg-slate-900/50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-400 text-sm">Level {playerProgress.level}</span>
                <span className="text-slate-400 text-sm">
                  {playerProgress.experience % 1000}/1000 XP
                </span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(playerProgress.experience % 1000) / 10}%` }}
                />
              </div>
            </div>
          )}

          <button
            onClick={() => setCurrentScreen('mode-select')}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-xl text-lg font-bold hover:from-cyan-400 hover:to-blue-500 transition-all"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
