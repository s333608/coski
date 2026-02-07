import { GlassWater, Trophy, BookOpen, User } from 'lucide-react';
import { useGame } from '../context/GameContext';

export function MainMenu() {
  const { setCurrentScreen, playerProgress, initializePlayer } = useGame();

  const handleStart = async () => {
    if (!playerProgress) {
      await initializePlayer();
    }
    setCurrentScreen('mode-select');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block mb-6">
            <GlassWater className="w-24 h-24 text-cyan-400 mx-auto mb-4" />
          </div>
          <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">
            Mixology<span className="text-cyan-400">Master</span>
          </h1>
          <p className="text-xl text-slate-300">
            Master the art of cocktail crafting
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleStart}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl text-xl font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/50"
          >
            Start Mixing
          </button>

          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => setCurrentScreen('progress')}
              className="bg-slate-800 text-white px-6 py-4 rounded-xl font-medium hover:bg-slate-700 transition-all duration-200 flex flex-col items-center gap-2"
            >
              <User className="w-6 h-6 text-cyan-400" />
              <span>Profile</span>
            </button>

            <button
              onClick={() => setCurrentScreen('encyclopedia')}
              className="bg-slate-800 text-white px-6 py-4 rounded-xl font-medium hover:bg-slate-700 transition-all duration-200 flex flex-col items-center gap-2"
            >
              <BookOpen className="w-6 h-6 text-cyan-400" />
              <span>Recipes</span>
            </button>

            <button
              className="bg-slate-800 text-white px-6 py-4 rounded-xl font-medium hover:bg-slate-700 transition-all duration-200 flex flex-col items-center gap-2"
            >
              <Trophy className="w-6 h-6 text-cyan-400" />
              <span>Rankings</span>
            </button>
          </div>
        </div>

        {playerProgress && (
          <div className="mt-8 bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-400 text-sm">Level {playerProgress.level}</p>
                <p className="text-white font-semibold text-lg capitalize">
                  {playerProgress.career_stage.replace('_', ' ')}
                </p>
              </div>
              <div className="text-right">
                <p className="text-slate-400 text-sm">Total Tips</p>
                <p className="text-cyan-400 font-bold text-xl">${playerProgress.total_tips}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
