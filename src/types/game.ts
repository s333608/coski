export interface Ingredient {
  id: string;
  name: string;
  category: string;
  type: string;
  unlock_level: number;
  description: string;
  image_url?: string;
}

export interface Cocktail {
  id: string;
  name: string;
  category: string;
  difficulty: number;
  glass_type: string;
  method: 'shake' | 'stir' | 'build' | 'blend';
  garnish: string;
  description: string;
  unlock_level: number;
  image_url?: string;
}

export interface RecipeIngredient {
  id: string;
  cocktail_id: string;
  ingredient_id: string;
  amount: number;
  unit: string;
  order_index: number;
  ingredient?: Ingredient;
}

export interface PlayerProgress {
  id: string;
  user_id: string;
  level: number;
  experience: number;
  reputation: number;
  total_drinks_made: number;
  perfect_drinks: number;
  current_shift: number;
  career_stage: 'part_time' | 'shift_lead' | 'head_bartender' | 'manager' | 'owner';
  total_tips: number;
  best_score: number;
}

export interface MixingStep {
  type: 'glass' | 'ingredient' | 'method' | 'garnish';
  completed: boolean;
  data?: any;
}

export interface CurrentMix {
  glass?: string;
  ingredients: { ingredient: Ingredient; amount: number; unit: string }[];
  method?: 'shake' | 'stir' | 'build' | 'blend';
  garnish?: string;
  startTime: number;
}

export interface BossEvaluation {
  rating: number;
  accuracy_score: number;
  timing_score: number;
  presentation_score: number;
  total_score: number;
  feedback: string;
  tips: number;
  experience_gained: number;
}

export type GameScreen = 'menu' | 'mode-select' | 'mixing' | 'evaluation' | 'encyclopedia' | 'progress';

export type GameMode = 'story' | 'endless' | 'challenge';
