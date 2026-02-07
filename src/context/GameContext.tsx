import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { seedDatabase } from '../lib/seedDatabase';
import {
  Ingredient,
  Cocktail,
  RecipeIngredient,
  PlayerProgress,
  CurrentMix,
  BossEvaluation,
  GameScreen,
  GameMode,
} from '../types/game';

interface GameContextType {
  isLoading: boolean;
  currentScreen: GameScreen;
  gameMode: GameMode | null;
  ingredients: Ingredient[];
  cocktails: Cocktail[];
  currentCocktail: Cocktail | null;
  currentRecipe: RecipeIngredient[];
  playerProgress: PlayerProgress | null;
  currentMix: CurrentMix;
  lastEvaluation: BossEvaluation | null;
  setCurrentScreen: (screen: GameScreen) => void;
  setGameMode: (mode: GameMode) => void;
  startMixing: (cocktail: Cocktail) => void;
  addIngredientToMix: (ingredient: Ingredient, amount: number, unit: string) => void;
  setMixGlass: (glass: string) => void;
  setMixMethod: (method: 'shake' | 'stir' | 'build' | 'blend') => void;
  setMixGarnish: (garnish: string) => void;
  submitDrink: () => Promise<void>;
  initializePlayer: () => Promise<void>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('menu');
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [currentCocktail, setCurrentCocktail] = useState<Cocktail | null>(null);
  const [currentRecipe, setCurrentRecipe] = useState<RecipeIngredient[]>([]);
  const [playerProgress, setPlayerProgress] = useState<PlayerProgress | null>(null);
  const [lastEvaluation, setLastEvaluation] = useState<BossEvaluation | null>(null);
  const [currentMix, setCurrentMix] = useState<CurrentMix>({
    ingredients: [],
    startTime: Date.now(),
  });

  useEffect(() => {
    initializeGame();
  }, []);

  async function initializeGame() {
    try {
      await seedDatabase();

      const { data: ingredientsData } = await supabase
        .from('ingredients')
        .select('*')
        .order('unlock_level');

      const { data: cocktailsData } = await supabase
        .from('cocktails')
        .select('*')
        .order('unlock_level');

      if (ingredientsData) setIngredients(ingredientsData);
      if (cocktailsData) setCocktails(cocktailsData);

      setIsLoading(false);
    } catch (error) {
      console.error('Error initializing game:', error);
      setIsLoading(false);
    }
  }

  async function initializePlayer() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      let { data: progress } = await supabase
        .from('player_progress')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (!progress) {
        const { data: newProgress } = await supabase
          .from('player_progress')
          .insert({
            user_id: user.id,
            level: 1,
            experience: 0,
            reputation: 0,
            total_drinks_made: 0,
            perfect_drinks: 0,
            current_shift: 1,
            career_stage: 'part_time',
            total_tips: 0,
            best_score: 0,
          })
          .select()
          .single();

        progress = newProgress;
      }

      setPlayerProgress(progress);
    } catch (error) {
      console.error('Error initializing player:', error);
    }
  }

  function startMixing(cocktail: Cocktail) {
    setCurrentCocktail(cocktail);
    setCurrentMix({
      ingredients: [],
      startTime: Date.now(),
    });

    supabase
      .from('recipe_ingredients')
      .select('*, ingredient:ingredients(*)')
      .eq('cocktail_id', cocktail.id)
      .order('order_index')
      .then(({ data }) => {
        if (data) setCurrentRecipe(data);
      });

    setCurrentScreen('mixing');
  }

  function addIngredientToMix(ingredient: Ingredient, amount: number, unit: string) {
    setCurrentMix(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, { ingredient, amount, unit }],
    }));
  }

  function setMixGlass(glass: string) {
    setCurrentMix(prev => ({ ...prev, glass }));
  }

  function setMixMethod(method: 'shake' | 'stir' | 'build' | 'blend') {
    setCurrentMix(prev => ({ ...prev, method }));
  }

  function setMixGarnish(garnish: string) {
    setCurrentMix(prev => ({ ...prev, garnish }));
  }

  async function submitDrink() {
    if (!currentCocktail || !playerProgress) return;

    const timeElapsed = (Date.now() - currentMix.startTime) / 1000;
    const evaluation = evaluateDrink(currentCocktail, currentRecipe, currentMix, timeElapsed);

    setLastEvaluation(evaluation);

    const newExperience = playerProgress.experience + evaluation.experience_gained;
    const newLevel = Math.floor(newExperience / 1000) + 1;
    const newTotalDrinks = playerProgress.total_drinks_made + 1;
    const newPerfectDrinks = evaluation.rating === 5 ? playerProgress.perfect_drinks + 1 : playerProgress.perfect_drinks;
    const newBestScore = Math.max(playerProgress.best_score, evaluation.total_score);
    const newTotalTips = playerProgress.total_tips + evaluation.tips;

    await supabase
      .from('player_progress')
      .update({
        experience: newExperience,
        level: newLevel,
        total_drinks_made: newTotalDrinks,
        perfect_drinks: newPerfectDrinks,
        best_score: newBestScore,
        total_tips: newTotalTips,
        updated_at: new Date().toISOString(),
      })
      .eq('id', playerProgress.id);

    setPlayerProgress({
      ...playerProgress,
      experience: newExperience,
      level: newLevel,
      total_drinks_made: newTotalDrinks,
      perfect_drinks: newPerfectDrinks,
      best_score: newBestScore,
      total_tips: newTotalTips,
    });

    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase
        .from('player_cocktails')
        .insert({
          user_id: user.id,
          name: generateCocktailName(currentCocktail, currentMix),
          boss_rating: evaluation.rating,
          accuracy_score: evaluation.accuracy_score,
          creativity_score: 0,
          presentation_score: evaluation.presentation_score,
          total_score: evaluation.total_score,
          recipe_data: currentMix,
        });
    }

    setCurrentScreen('evaluation');
  }

  function evaluateDrink(
    cocktail: Cocktail,
    recipe: RecipeIngredient[],
    mix: CurrentMix,
    timeElapsed: number
  ): BossEvaluation {
    let accuracy_score = 0;
    let timing_score = 100;
    let presentation_score = 0;

    const correctGlass = mix.glass === cocktail.glass_type;
    if (correctGlass) accuracy_score += 20;

    const correctMethod = mix.method === cocktail.method;
    if (correctMethod) accuracy_score += 20;

    let ingredientAccuracy = 0;
    for (const recipeIng of recipe) {
      const mixIng = mix.ingredients.find(
        mi => mi.ingredient.id === recipeIng.ingredient_id
      );
      if (mixIng) {
        const amountDiff = Math.abs(mixIng.amount - recipeIng.amount);
        const tolerance = recipeIng.amount * 0.1;
        if (amountDiff <= tolerance) {
          ingredientAccuracy += 100 / recipe.length;
        } else {
          ingredientAccuracy += (100 / recipe.length) * 0.5;
        }
      }
    }
    accuracy_score += Math.round(ingredientAccuracy * 0.6);

    if (timeElapsed < 60) {
      timing_score = 100;
    } else if (timeElapsed < 120) {
      timing_score = 80;
    } else if (timeElapsed < 180) {
      timing_score = 60;
    } else {
      timing_score = 40;
    }

    if (mix.garnish) {
      presentation_score = 100;
    } else {
      presentation_score = 50;
    }

    const total_score = Math.round(
      accuracy_score * 0.5 + timing_score * 0.3 + presentation_score * 0.2
    );

    let rating = 1;
    if (total_score >= 95) rating = 5;
    else if (total_score >= 85) rating = 4;
    else if (total_score >= 70) rating = 3;
    else if (total_score >= 50) rating = 2;

    const feedback = generateFeedback(rating, accuracy_score, timing_score);
    const tips = Math.round(rating * 10 * (1 + Math.random() * 0.5));
    const experience_gained = Math.round(total_score * (cocktail.difficulty * 0.5));

    return {
      rating,
      accuracy_score,
      timing_score,
      presentation_score,
      total_score,
      feedback,
      tips,
      experience_gained,
    };
  }

  function generateFeedback(rating: number, accuracy: number, timing: number): string {
    if (rating === 5) {
      return "Perfect! This is exactly what I was looking for. You've got real talent!";
    } else if (rating === 4) {
      return "Excellent work! Just a few minor tweaks and this would be perfect.";
    } else if (rating === 3) {
      return "Good effort. You're getting there, but there's still room for improvement.";
    } else if (rating === 2) {
      return "Hmm, not quite right. Check the recipe and try to be more precise.";
    } else {
      return "This needs work. Pay closer attention to the measurements and technique.";
    }
  }

  function generateCocktailName(cocktail: Cocktail, mix: CurrentMix): string {
    const adjectives = ['Midnight', 'Velvet', 'Golden', 'Crystal', 'Ruby', 'Sapphire', 'Twilight', 'Crimson'];
    const nouns = ['Dream', 'Whisper', 'Symphony', 'Eclipse', 'Paradise', 'Mirage', 'Reverie', 'Horizon'];

    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];

    return `${adj} ${noun}`;
  }

  const value = {
    isLoading,
    currentScreen,
    gameMode,
    ingredients,
    cocktails,
    currentCocktail,
    currentRecipe,
    playerProgress,
    currentMix,
    lastEvaluation,
    setCurrentScreen,
    setGameMode,
    startMixing,
    addIngredientToMix,
    setMixGlass,
    setMixMethod,
    setMixGarnish,
    submitDrink,
    initializePlayer,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
