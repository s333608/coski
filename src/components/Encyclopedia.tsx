import { useState, useEffect } from 'react';
import { ArrowLeft, GlassWater, Lock } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { supabase } from '../lib/supabase';
import { Cocktail, RecipeIngredient } from '../types/game';

export function Encyclopedia() {
  const { setCurrentScreen, cocktails, playerProgress, startMixing } = useGame();
  const [selectedCocktail, setSelectedCocktail] = useState<Cocktail | null>(null);
  const [recipe, setRecipe] = useState<RecipeIngredient[]>([]);

  useEffect(() => {
    if (selectedCocktail) {
      loadRecipe(selectedCocktail.id);
    }
  }, [selectedCocktail]);

  async function loadRecipe(cocktailId: string) {
    const { data } = await supabase
      .from('recipe_ingredients')
      .select('*, ingredient:ingredients(*)')
      .eq('cocktail_id', cocktailId)
      .order('order_index');

    if (data) setRecipe(data);
  }

  const isUnlocked = (cocktail: Cocktail) => {
    return cocktail.unlock_level <= (playerProgress?.level || 1);
  };

  if (selectedCocktail) {
    const unlocked = isUnlocked(selectedCocktail);

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedCocktail(null)}
            className="mb-6 text-slate-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Encyclopedia
          </button>

          <div className="bg-slate-800/50 backdrop-blur rounded-3xl p-8 border border-slate-700">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-4xl font-bold text-white mb-2">{selectedCocktail.name}</h2>
                <div className="flex gap-3 items-center">
                  <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-medium">
                    {selectedCocktail.category}
                  </span>
                  <span className="text-slate-400">
                    Difficulty: {'⭐'.repeat(selectedCocktail.difficulty)}
                  </span>
                </div>
              </div>
              {!unlocked && (
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 rounded-lg">
                  <Lock className="w-5 h-5 text-yellow-500" />
                  <span className="text-slate-300">Level {selectedCocktail.unlock_level}</span>
                </div>
              )}
            </div>

            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              {selectedCocktail.description}
            </p>

            {unlocked ? (
              <>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Details</h3>
                    <div className="space-y-3 bg-slate-900/50 rounded-xl p-4">
                      <div>
                        <span className="text-slate-400 text-sm">Glass Type</span>
                        <p className="text-white font-medium">{selectedCocktail.glass_type}</p>
                      </div>
                      <div>
                        <span className="text-slate-400 text-sm">Method</span>
                        <p className="text-white font-medium capitalize">
                          {selectedCocktail.method}
                        </p>
                      </div>
                      <div>
                        <span className="text-slate-400 text-sm">Garnish</span>
                        <p className="text-white font-medium">{selectedCocktail.garnish}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Ingredients</h3>
                    <ul className="space-y-2 bg-slate-900/50 rounded-xl p-4">
                      {recipe.map((ing) => (
                        <li key={ing.id} className="text-slate-200 flex items-center gap-3">
                          <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                          <span className="font-medium">
                            {ing.amount} {ing.unit}
                          </span>
                          <span>{ing.ingredient?.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => startMixing(selectedCocktail)}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-xl text-lg font-bold hover:from-cyan-400 hover:to-blue-500 transition-all"
                >
                  Try This Recipe
                </button>
              </>
            ) : (
              <div className="text-center py-12">
                <Lock className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400 text-lg">
                  Reach level {selectedCocktail.unlock_level} to unlock this cocktail
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => setCurrentScreen('menu')}
          className="mb-6 text-slate-400 hover:text-white transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Menu
        </button>

        <div className="mb-8">
          <h2 className="text-4xl font-bold text-white mb-2">Cocktail Encyclopedia</h2>
          <p className="text-slate-400">Explore and learn classic and modern cocktail recipes</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cocktails.map((cocktail) => {
            const unlocked = isUnlocked(cocktail);
            return (
              <button
                key={cocktail.id}
                onClick={() => setSelectedCocktail(cocktail)}
                className={`bg-slate-800/50 backdrop-blur rounded-2xl p-6 border transition-all text-left ${
                  unlocked
                    ? 'border-slate-700 hover:border-cyan-500 hover:scale-105'
                    : 'border-slate-800 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <GlassWater className={`w-8 h-8 ${unlocked ? 'text-cyan-400' : 'text-slate-600'}`} />
                  {!unlocked && <Lock className="w-5 h-5 text-slate-600" />}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{cocktail.name}</h3>
                <p className="text-slate-400 text-sm mb-3 line-clamp-2">{cocktail.description}</p>
                <div className="flex gap-2 items-center">
                  <span className="px-2 py-1 bg-slate-900/50 text-cyan-400 rounded text-xs font-medium">
                    {cocktail.category}
                  </span>
                  <span className="text-slate-500 text-xs">
                    {'⭐'.repeat(cocktail.difficulty)}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
