# Mixology Master

A fully interactive cocktail-mixing game where you play as a gamer working part-time as a bartender, aiming to impress your boss and rise through the ranks to become a bar owner.

## Features

### Core Gameplay
- **Realistic Cocktail Making**: Mix drinks with accurate measurements, proper glassware, and correct techniques
- **Real Recipes**: Learn and create classic and modern cocktails with authentic recipes
- **Boss Evaluation System**: Get rated on accuracy, timing, and presentation after every drink
- **Progressive Difficulty**: Start simple and unlock more complex cocktails as you level up

### Game Modes
- **Story Mode**: Follow your career journey from part-time bartender to bar owner
- **Endless Mode**: Chase high scores and see how long you can keep mixing perfect drinks
- **Challenge Mode**: Face special challenges with time limits and ingredient restrictions

### Progression System
- **Experience & Levels**: Earn XP for every drink you make
- **Career Stages**: Progress through 5 career stages from Part-Time Bartender to Bar Owner
- **Unlockable Content**: Unlock new ingredients, cocktails, and techniques as you level up
- **Tips & Rewards**: Earn tips based on your performance

### Features
- **Cocktail Encyclopedia**: Browse and learn about all available cocktails
- **Player Profile**: Track your stats, achievements, and progress
- **Real Mixology Knowledge**: Learn proper techniques, measurements, and cocktail history
- **Beautiful UI**: Polished, modern design with smooth animations

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up Supabase:
   - Create a Supabase project
   - Copy your project URL and anon key
   - Create a `.env` file based on `.env.example`
   - Add your Supabase credentials

3. Run the development server:
```bash
npm run dev
```

The game will automatically create the necessary database tables and seed them with cocktail data on first load.

## How to Play

1. **Select a Mode**: Choose Story, Endless, or Challenge mode
2. **Choose Your Glass**: Select the appropriate glassware for your cocktail
3. **Add Ingredients**: Carefully measure and add each ingredient
4. **Select Method**: Choose shake, stir, build, or blend
5. **Add Garnish**: Complete your drink with the perfect garnish
6. **Get Evaluated**: Your boss reviews your drink and gives you feedback
7. **Level Up**: Earn XP, tips, and unlock new content

## Scoring System

Your drinks are evaluated on three criteria:
- **Accuracy** (50%): Correct ingredients, measurements, glass, and method
- **Timing** (30%): How quickly you complete the drink
- **Presentation** (20%): Proper garnishing and finishing touches

## Technologies

- React 18 with TypeScript
- Vite for blazing-fast development
- Tailwind CSS for styling
- Supabase for backend and database
- Lucide React for icons

## Database Schema

The game uses Supabase with the following tables:
- `ingredients`: All available spirits, mixers, garnishes
- `cocktails`: Master list of cocktail recipes
- `recipe_ingredients`: Junction table linking cocktails to ingredients
- `player_progress`: Player stats and progression
- `player_unlocks`: Unlocked content per player
- `player_cocktails`: Drinks created by players
- `leaderboards`: Global and daily rankings

## Credits

Built with authentic cocktail recipes and real mixology knowledge. All cocktails featured are classic or well-known modern recipes.
