import { BookText, Infinity, Zap, ArrowLeft } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { GameMode } from '../types/game';

export function ModeSelect() {
  const { setCurrentScreen, setGameMode, cocktails, playerProgress, startMixing } = useGame();

  const handleModeSelect = (mode: GameMode) => {
    setGameMode(mode);
    const availableCocktails = cocktails.filter(
      c => c.unlock_level <= (playerProgress?.level || 1)
    );
    if (availableCocktails.length > 0) {
      const randomCocktail = availableCocktails[
        Math.floor(Math.random() * availableCocktails.length)
      ];
      startMixing(randomCocktail);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <button
          onClick={() => setCurrentScreen('menu')}
          className="mb-8 text-slate-400 hover:text-white transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Menu
        </button>

        <h2 className="text-4xl font-bold text-white mb-2 text-center">Choose Your Mode</h2>
        <p className="text-slate-400 text-center mb-12">Select how you want to play</p>

        <div className="grid md:grid-cols-3 gap-6">
          <button
            onClick={() => handleModeSelect('story')}
            className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-8 rounded-2xl hover:from-blue-500 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-xl"
          >
            <BookText className="w-12 h-12 mb-4 mx-auto" />
            <h3 className="text-2xl font-bold mb-3">Story Mode</h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              Follow your journey from part-time bartender to bar owner. Complete shifts and
              impress your boss to progress.
            </p>
            <div className="mt-6 pt-6 border-t border-blue-400/30">
              <p className="text-xs text-blue-200">Career Progression</p>
            </div>
          </button>

          <button
            onClick={() => handleModeSelect('endless')}
            className="bg-gradient-to-br from-purple-600 to-purple-800 text-white p-8 rounded-2xl hover:from-purple-500 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-xl"
          >
            <Infinity className="w-12 h-12 mb-4 mx-auto" />
            <h3 className="text-2xl font-bold mb-3">Endless Mode</h3>
            <p className="text-purple-100 text-sm leading-relaxed">
              Keep mixing drinks and chase high scores. The drinks keep coming, how long can you
              last?
            </p>
            <div className="mt-6 pt-6 border-t border-purple-400/30">
              <p className="text-xs text-purple-200">Score Chase</p>
            </div>
          </button>

          <button
            onClick={() => handleModeSelect('challenge')}
            className="bg-gradient-to-br from-orange-600 to-orange-800 text-white p-8 rounded-2xl hover:from-orange-500 hover:to-orange-700 transition-all duration-200 transform hover:scale-105 shadow-xl"
          >
            <Zap className="w-12 h-12 mb-4 mx-auto" />
            <h3 className="text-2xl font-bold mb-3">Challenge Mode</h3>
            <p className="text-orange-100 text-sm leading-relaxed">
              Face special challenges with time limits, special orders, and ingredient
              restrictions.
            </p>
            <div className="mt-6 pt-6 border-t border-orange-400/30">
              <p className="text-xs text-orange-200">Test Your Skills</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
