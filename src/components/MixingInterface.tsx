import { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Ingredient } from '../types/game';

export function MixingInterface() {
  const {
    currentCocktail,
    currentRecipe,
    currentMix,
    ingredients,
    playerProgress,
    addIngredientToMix,
    setMixGlass,
    setMixMethod,
    setMixGarnish,
    submitDrink,
  } = useGame();

  const [step, setStep] = useState<'glass' | 'ingredients' | 'method' | 'garnish'>('glass');
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
  const [amount, setAmount] = useState('1');
  const [unit, setUnit] = useState('oz');
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - currentMix.startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [currentMix.startTime]);

  if (!currentCocktail) return null;

  const availableIngredients = ingredients.filter(
    ing => ing.unlock_level <= (playerProgress?.level || 1)
  );

  const glassTypes = [
    'Rocks Glass',
    'Highball Glass',
    'Martini Glass',
    'Coupe Glass',
    'Hurricane Glass',
    'Copper Mug',
  ];

  const methods: Array<'shake' | 'stir' | 'build' | 'blend'> = ['shake', 'stir', 'build', 'blend'];

  const handleAddIngredient = () => {
    if (selectedIngredient) {
      addIngredientToMix(selectedIngredient, parseFloat(amount), unit);
      setSelectedIngredient(null);
      setAmount('1');
    }
  };

  const handleGlassSelect = (glass: string) => {
    setMixGlass(glass);
    setStep('ingredients');
  };

  const handleMethodSelect = (method: 'shake' | 'stir' | 'build' | 'blend') => {
    setMixMethod(method);
    setStep('garnish');
  };

  const handleGarnishSelect = (garnish: string) => {
    setMixGarnish(garnish);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-1">{currentCocktail.name}</h2>
            <p className="text-slate-400">{currentCocktail.description}</p>
          </div>
          <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-lg">
            <Clock className="w-5 h-5 text-cyan-400" />
            <span className="text-white font-mono text-lg">{formatTime(elapsedTime)}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-4">Recipe</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-slate-300">
                <span className="font-semibold">Glass:</span>
                <span>{currentCocktail.glass_type}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span className="font-semibold">Method:</span>
                <span className="capitalize">{currentCocktail.method}</span>
              </div>
              <div className="mt-4">
                <p className="font-semibold text-white mb-2">Ingredients:</p>
                <ul className="space-y-2">
                  {currentRecipe.map((ing) => (
                    <li key={ing.id} className="text-slate-300 flex items-center gap-2">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                      {ing.amount} {ing.unit} {ing.ingredient?.name}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center gap-2 text-slate-300 mt-4">
                <span className="font-semibold">Garnish:</span>
                <span>{currentCocktail.garnish}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-slate-700">
              <div className="flex gap-2 mb-6">
                {['glass', 'ingredients', 'method', 'garnish'].map((s, idx) => (
                  <div
                    key={s}
                    className={`flex-1 h-2 rounded-full transition-colors ${
                      s === step
                        ? 'bg-cyan-400'
                        : idx < ['glass', 'ingredients', 'method', 'garnish'].indexOf(step)
                        ? 'bg-green-500'
                        : 'bg-slate-700'
                    }`}
                  />
                ))}
              </div>

              {step === 'glass' && (
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Select Glass</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {glassTypes.map((glass) => (
                      <button
                        key={glass}
                        onClick={() => handleGlassSelect(glass)}
                        className={`p-4 rounded-xl font-medium transition-all ${
                          currentMix.glass === glass
                            ? 'bg-cyan-500 text-white'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                      >
                        {glass}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 'ingredients' && (
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Add Ingredients</h3>

                  <div className="mb-4 bg-slate-900/50 rounded-lg p-4">
                    <p className="text-sm text-slate-400 mb-2">Your Mix:</p>
                    {currentMix.ingredients.length === 0 ? (
                      <p className="text-slate-500 text-sm">No ingredients added yet</p>
                    ) : (
                      <ul className="space-y-1">
                        {currentMix.ingredients.map((ing, idx) => (
                          <li key={idx} className="text-slate-200 text-sm flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            {ing.amount} {ing.unit} {ing.ingredient.name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Select Ingredient
                    </label>
                    <select
                      value={selectedIngredient?.id || ''}
                      onChange={(e) => {
                        const ing = availableIngredients.find((i) => i.id === e.target.value);
                        setSelectedIngredient(ing || null);
                      }}
                      className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600"
                    >
                      <option value="">Choose an ingredient...</option>
                      {availableIngredients.map((ing) => (
                        <option key={ing.id} value={ing.id}>
                          {ing.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Amount
                      </label>
                      <input
                        type="number"
                        step="0.25"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Unit</label>
                      <select
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600"
                      >
                        <option value="oz">oz</option>
                        <option value="ml">ml</option>
                        <option value="dashes">dashes</option>
                        <option value="leaves">leaves</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={handleAddIngredient}
                    disabled={!selectedIngredient}
                    className="w-full bg-cyan-500 text-white py-3 rounded-lg font-semibold hover:bg-cyan-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-3"
                  >
                    Add Ingredient
                  </button>

                  <button
                    onClick={() => setStep('method')}
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-500 transition-colors"
                  >
                    Continue to Method
                  </button>
                </div>
              )}

              {step === 'method' && (
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Select Method</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {methods.map((method) => (
                      <button
                        key={method}
                        onClick={() => handleMethodSelect(method)}
                        className={`p-4 rounded-xl font-medium transition-all capitalize ${
                          currentMix.method === method
                            ? 'bg-cyan-500 text-white'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 'garnish' && (
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Add Garnish</h3>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {[
                      'Lime Wedge',
                      'Lemon Twist',
                      'Orange Slice',
                      'Maraschino Cherry',
                      'Mint Sprig',
                      'Celery Stalk',
                      'Olives',
                      'None',
                    ].map((garnish) => (
                      <button
                        key={garnish}
                        onClick={() => handleGarnishSelect(garnish)}
                        className={`p-3 rounded-lg font-medium transition-all ${
                          currentMix.garnish === garnish
                            ? 'bg-cyan-500 text-white'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                      >
                        {garnish}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={submitDrink}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl text-lg font-bold hover:from-green-400 hover:to-emerald-500 transition-all shadow-lg"
                  >
                    Serve Drink
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
