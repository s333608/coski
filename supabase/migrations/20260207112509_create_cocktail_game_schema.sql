/*
  # Cocktail Mixing Game Database Schema

  ## Overview
  Complete database structure for a professional cocktail mixing game with real recipes,
  player progression, unlocks, and multiplayer features.

  ## New Tables

  ### `ingredients`
  Stores all available spirits, mixers, garnishes, and tools
  - `id` (uuid, primary key)
  - `name` (text) - ingredient name
  - `category` (text) - spirit, mixer, garnish, tool
  - `type` (text) - specific type (vodka, rum, citrus, etc)
  - `unlock_level` (integer) - level required to unlock
  - `description` (text) - ingredient details
  - `image_url` (text) - ingredient image
  - `created_at` (timestamptz)

  ### `cocktails`
  Master list of real cocktail recipes
  - `id` (uuid, primary key)
  - `name` (text) - cocktail name
  - `category` (text) - classic, modern, tropical, etc
  - `difficulty` (integer) - 1-5 difficulty rating
  - `glass_type` (text) - highball, martini, rocks, etc
  - `method` (text) - shake, stir, build, blend
  - `garnish` (text) - garnish description
  - `description` (text) - cocktail history/info
  - `unlock_level` (integer) - level required
  - `image_url` (text) - cocktail image
  - `created_at` (timestamptz)

  ### `recipe_ingredients`
  Junction table linking cocktails to ingredients with measurements
  - `id` (uuid, primary key)
  - `cocktail_id` (uuid, foreign key)
  - `ingredient_id` (uuid, foreign key)
  - `amount` (decimal) - quantity
  - `unit` (text) - oz, ml, dash, etc
  - `order` (integer) - order to add
  - `created_at` (timestamptz)

  ### `player_progress`
  Tracks individual player stats and progression
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key to auth.users)
  - `level` (integer) - current level
  - `experience` (integer) - total XP
  - `reputation` (integer) - reputation score
  - `total_drinks_made` (integer)
  - `perfect_drinks` (integer)
  - `current_shift` (integer)
  - `career_stage` (text) - part_time, shift_lead, head_bartender, manager, owner
  - `total_tips` (integer)
  - `best_score` (integer)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `player_unlocks`
  Tracks what each player has unlocked
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key to auth.users)
  - `unlock_type` (text) - ingredient, cocktail, technique, glass
  - `unlock_id` (uuid) - id of unlocked item
  - `unlocked_at` (timestamptz)

  ### `player_cocktails`
  Custom cocktails created by players
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key to auth.users)
  - `name` (text) - player-given name
  - `boss_rating` (integer) - 1-5 stars
  - `accuracy_score` (integer)
  - `creativity_score` (integer)
  - `presentation_score` (integer)
  - `total_score` (integer)
  - `recipe_data` (jsonb) - ingredients used
  - `created_at` (timestamptz)

  ### `leaderboards`
  Global and daily leaderboards
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key to auth.users)
  - `mode` (text) - story, endless, challenge
  - `score` (integer)
  - `drinks_made` (integer)
  - `accuracy` (decimal)
  - `period` (text) - daily, weekly, all_time
  - `created_at` (timestamptz)

  ## Security
  Enable RLS on all tables with appropriate policies for authenticated users
*/

-- Create ingredients table
CREATE TABLE IF NOT EXISTS ingredients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  type text NOT NULL,
  unlock_level integer DEFAULT 1,
  description text,
  image_url text,
  created_at timestamptz DEFAULT now()
);

-- Create cocktails table
CREATE TABLE IF NOT EXISTS cocktails (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  difficulty integer DEFAULT 1,
  glass_type text NOT NULL,
  method text NOT NULL,
  garnish text,
  description text,
  unlock_level integer DEFAULT 1,
  image_url text,
  created_at timestamptz DEFAULT now()
);

-- Create recipe_ingredients junction table
CREATE TABLE IF NOT EXISTS recipe_ingredients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cocktail_id uuid REFERENCES cocktails(id) ON DELETE CASCADE,
  ingredient_id uuid REFERENCES ingredients(id) ON DELETE CASCADE,
  amount decimal NOT NULL,
  unit text NOT NULL,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create player_progress table
CREATE TABLE IF NOT EXISTS player_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  level integer DEFAULT 1,
  experience integer DEFAULT 0,
  reputation integer DEFAULT 0,
  total_drinks_made integer DEFAULT 0,
  perfect_drinks integer DEFAULT 0,
  current_shift integer DEFAULT 1,
  career_stage text DEFAULT 'part_time',
  total_tips integer DEFAULT 0,
  best_score integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create player_unlocks table
CREATE TABLE IF NOT EXISTS player_unlocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  unlock_type text NOT NULL,
  unlock_id uuid NOT NULL,
  unlocked_at timestamptz DEFAULT now()
);

-- Create player_cocktails table
CREATE TABLE IF NOT EXISTS player_cocktails (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  boss_rating integer,
  accuracy_score integer DEFAULT 0,
  creativity_score integer DEFAULT 0,
  presentation_score integer DEFAULT 0,
  total_score integer DEFAULT 0,
  recipe_data jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create leaderboards table
CREATE TABLE IF NOT EXISTS leaderboards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  mode text NOT NULL,
  score integer DEFAULT 0,
  drinks_made integer DEFAULT 0,
  accuracy decimal DEFAULT 0,
  period text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE cocktails ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipe_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_unlocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_cocktails ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboards ENABLE ROW LEVEL SECURITY;

-- Policies for ingredients (public read)
CREATE POLICY "Anyone can view ingredients"
  ON ingredients FOR SELECT
  TO authenticated
  USING (true);

-- Policies for cocktails (public read)
CREATE POLICY "Anyone can view cocktails"
  ON cocktails FOR SELECT
  TO authenticated
  USING (true);

-- Policies for recipe_ingredients (public read)
CREATE POLICY "Anyone can view recipes"
  ON recipe_ingredients FOR SELECT
  TO authenticated
  USING (true);

-- Policies for player_progress
CREATE POLICY "Users can view own progress"
  ON player_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON player_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON player_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policies for player_unlocks
CREATE POLICY "Users can view own unlocks"
  ON player_unlocks FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own unlocks"
  ON player_unlocks FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policies for player_cocktails
CREATE POLICY "Users can view own cocktails"
  ON player_cocktails FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own cocktails"
  ON player_cocktails FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view all cocktails for leaderboard"
  ON player_cocktails FOR SELECT
  TO authenticated
  USING (true);

-- Policies for leaderboards
CREATE POLICY "Users can view all leaderboard entries"
  ON leaderboards FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert own scores"
  ON leaderboards FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_recipe_ingredients_cocktail ON recipe_ingredients(cocktail_id);
CREATE INDEX IF NOT EXISTS idx_recipe_ingredients_ingredient ON recipe_ingredients(ingredient_id);
CREATE INDEX IF NOT EXISTS idx_player_progress_user ON player_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_player_unlocks_user ON player_unlocks(user_id);
CREATE INDEX IF NOT EXISTS idx_player_cocktails_user ON player_cocktails(user_id);
CREATE INDEX IF NOT EXISTS idx_leaderboards_user ON leaderboards(user_id);
CREATE INDEX IF NOT EXISTS idx_leaderboards_period ON leaderboards(period);
CREATE INDEX IF NOT EXISTS idx_leaderboards_mode ON leaderboards(mode);