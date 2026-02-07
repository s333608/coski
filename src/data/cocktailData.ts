export interface IngredientData {
  name: string;
  category: 'spirit' | 'mixer' | 'garnish' | 'tool' | 'liqueur' | 'bitters';
  type: string;
  unlock_level: number;
  description: string;
}

export interface CocktailData {
  name: string;
  category: string;
  difficulty: number;
  glass_type: string;
  method: 'shake' | 'stir' | 'build' | 'blend';
  garnish: string;
  description: string;
  unlock_level: number;
  ingredients: {
    ingredient_name: string;
    amount: number;
    unit: string;
    order: number;
  }[];
}

export const ingredientsData: IngredientData[] = [
  { name: 'Vodka', category: 'spirit', type: 'vodka', unlock_level: 1, description: 'Clear, neutral spirit perfect for cocktails' },
  { name: 'Gin', category: 'spirit', type: 'gin', unlock_level: 1, description: 'Juniper-flavored spirit with botanical notes' },
  { name: 'White Rum', category: 'spirit', type: 'rum', unlock_level: 1, description: 'Light, clear rum ideal for mixing' },
  { name: 'Dark Rum', category: 'spirit', type: 'rum', unlock_level: 3, description: 'Rich, aged rum with deep flavor' },
  { name: 'Tequila', category: 'spirit', type: 'tequila', unlock_level: 2, description: 'Agave spirit from Mexico' },
  { name: 'Bourbon', category: 'spirit', type: 'whiskey', unlock_level: 2, description: 'American whiskey with sweet notes' },
  { name: 'Scotch', category: 'spirit', type: 'whiskey', unlock_level: 4, description: 'Scottish whisky with smoky character' },
  { name: 'Cognac', category: 'spirit', type: 'brandy', unlock_level: 5, description: 'Premium French brandy' },

  { name: 'Triple Sec', category: 'liqueur', type: 'orange', unlock_level: 1, description: 'Orange-flavored liqueur' },
  { name: 'Cointreau', category: 'liqueur', type: 'orange', unlock_level: 3, description: 'Premium orange liqueur' },
  { name: 'Amaretto', category: 'liqueur', type: 'almond', unlock_level: 3, description: 'Sweet almond liqueur' },
  { name: 'Kahlúa', category: 'liqueur', type: 'coffee', unlock_level: 2, description: 'Coffee liqueur from Mexico' },
  { name: 'Baileys', category: 'liqueur', type: 'cream', unlock_level: 2, description: 'Irish cream liqueur' },
  { name: 'Campari', category: 'liqueur', type: 'bitter', unlock_level: 4, description: 'Italian bitter aperitif' },
  { name: 'Sweet Vermouth', category: 'liqueur', type: 'vermouth', unlock_level: 2, description: 'Fortified wine with herbs' },
  { name: 'Dry Vermouth', category: 'liqueur', type: 'vermouth', unlock_level: 2, description: 'Dry fortified wine' },

  { name: 'Fresh Lime Juice', category: 'mixer', type: 'citrus', unlock_level: 1, description: 'Freshly squeezed lime juice' },
  { name: 'Fresh Lemon Juice', category: 'mixer', type: 'citrus', unlock_level: 1, description: 'Freshly squeezed lemon juice' },
  { name: 'Orange Juice', category: 'mixer', type: 'juice', unlock_level: 1, description: 'Fresh orange juice' },
  { name: 'Cranberry Juice', category: 'mixer', type: 'juice', unlock_level: 1, description: 'Tart cranberry juice' },
  { name: 'Pineapple Juice', category: 'mixer', type: 'juice', unlock_level: 2, description: 'Sweet tropical juice' },
  { name: 'Tomato Juice', category: 'mixer', type: 'juice', unlock_level: 2, description: 'Savory vegetable juice' },
  { name: 'Simple Syrup', category: 'mixer', type: 'sweetener', unlock_level: 1, description: 'Sugar and water syrup' },
  { name: 'Club Soda', category: 'mixer', type: 'carbonated', unlock_level: 1, description: 'Carbonated water' },
  { name: 'Tonic Water', category: 'mixer', type: 'carbonated', unlock_level: 1, description: 'Quinine-flavored soda' },
  { name: 'Ginger Beer', category: 'mixer', type: 'carbonated', unlock_level: 2, description: 'Spicy ginger soda' },
  { name: 'Cola', category: 'mixer', type: 'carbonated', unlock_level: 1, description: 'Classic cola soda' },
  { name: 'Grenadine', category: 'mixer', type: 'sweetener', unlock_level: 1, description: 'Pomegranate syrup' },
  { name: 'Coconut Cream', category: 'mixer', type: 'cream', unlock_level: 3, description: 'Rich coconut cream' },
  { name: 'Heavy Cream', category: 'mixer', type: 'cream', unlock_level: 2, description: 'Rich dairy cream' },

  { name: 'Angostura Bitters', category: 'bitters', type: 'aromatic', unlock_level: 2, description: 'Classic aromatic bitters' },
  { name: 'Orange Bitters', category: 'bitters', type: 'citrus', unlock_level: 3, description: 'Citrus-forward bitters' },

  { name: 'Lime Wedge', category: 'garnish', type: 'citrus', unlock_level: 1, description: 'Fresh lime garnish' },
  { name: 'Lemon Twist', category: 'garnish', type: 'citrus', unlock_level: 1, description: 'Twisted lemon peel' },
  { name: 'Orange Slice', category: 'garnish', type: 'citrus', unlock_level: 1, description: 'Fresh orange slice' },
  { name: 'Maraschino Cherry', category: 'garnish', type: 'fruit', unlock_level: 1, description: 'Classic cocktail cherry' },
  { name: 'Mint Sprig', category: 'garnish', type: 'herb', unlock_level: 1, description: 'Fresh mint leaves' },
  { name: 'Celery Stalk', category: 'garnish', type: 'vegetable', unlock_level: 2, description: 'Crisp celery stick' },
  { name: 'Olives', category: 'garnish', type: 'savory', unlock_level: 2, description: 'Cocktail olives' },
  { name: 'Salt Rim', category: 'garnish', type: 'rim', unlock_level: 1, description: 'Salt for glass rim' },
  { name: 'Sugar Rim', category: 'garnish', type: 'rim', unlock_level: 1, description: 'Sugar for glass rim' },
];

export const cocktailsData: CocktailData[] = [
  {
    name: 'Margarita',
    category: 'Classic',
    difficulty: 2,
    glass_type: 'Rocks Glass',
    method: 'shake',
    garnish: 'Salt Rim, Lime Wedge',
    description: 'The iconic Mexican cocktail with tequila, lime, and orange liqueur. A perfect balance of sweet, sour, and salty.',
    unlock_level: 1,
    ingredients: [
      { ingredient_name: 'Tequila', amount: 2, unit: 'oz', order: 1 },
      { ingredient_name: 'Triple Sec', amount: 1, unit: 'oz', order: 2 },
      { ingredient_name: 'Fresh Lime Juice', amount: 1, unit: 'oz', order: 3 },
    ]
  },
  {
    name: 'Mojito',
    category: 'Classic',
    difficulty: 2,
    glass_type: 'Highball Glass',
    method: 'build',
    garnish: 'Mint Sprig, Lime Wedge',
    description: 'Refreshing Cuban cocktail with rum, mint, lime, and soda. Perfect for summer.',
    unlock_level: 1,
    ingredients: [
      { ingredient_name: 'White Rum', amount: 2, unit: 'oz', order: 1 },
      { ingredient_name: 'Fresh Lime Juice', amount: 1, unit: 'oz', order: 2 },
      { ingredient_name: 'Simple Syrup', amount: 0.5, unit: 'oz', order: 3 },
      { ingredient_name: 'Mint Sprig', amount: 8, unit: 'leaves', order: 4 },
      { ingredient_name: 'Club Soda', amount: 2, unit: 'oz', order: 5 },
    ]
  },
  {
    name: 'Old Fashioned',
    category: 'Classic',
    difficulty: 3,
    glass_type: 'Rocks Glass',
    method: 'stir',
    garnish: 'Orange Slice, Maraschino Cherry',
    description: 'The timeless whiskey cocktail that dates back to the 1800s. Simple yet sophisticated.',
    unlock_level: 2,
    ingredients: [
      { ingredient_name: 'Bourbon', amount: 2, unit: 'oz', order: 1 },
      { ingredient_name: 'Simple Syrup', amount: 0.25, unit: 'oz', order: 2 },
      { ingredient_name: 'Angostura Bitters', amount: 2, unit: 'dashes', order: 3 },
    ]
  },
  {
    name: 'Martini',
    category: 'Classic',
    difficulty: 3,
    glass_type: 'Martini Glass',
    method: 'stir',
    garnish: 'Lemon Twist',
    description: 'The quintessential cocktail. Gin and vermouth, stirred with ice and strained.',
    unlock_level: 2,
    ingredients: [
      { ingredient_name: 'Gin', amount: 2.5, unit: 'oz', order: 1 },
      { ingredient_name: 'Dry Vermouth', amount: 0.5, unit: 'oz', order: 2 },
    ]
  },
  {
    name: 'Cosmopolitan',
    category: 'Modern',
    difficulty: 2,
    glass_type: 'Martini Glass',
    method: 'shake',
    garnish: 'Lemon Twist',
    description: 'Made famous by Sex and the City. Vodka, cranberry, and citrus in perfect harmony.',
    unlock_level: 1,
    ingredients: [
      { ingredient_name: 'Vodka', amount: 1.5, unit: 'oz', order: 1 },
      { ingredient_name: 'Triple Sec', amount: 0.5, unit: 'oz', order: 2 },
      { ingredient_name: 'Fresh Lime Juice', amount: 0.5, unit: 'oz', order: 3 },
      { ingredient_name: 'Cranberry Juice', amount: 0.5, unit: 'oz', order: 4 },
    ]
  },
  {
    name: 'Piña Colada',
    category: 'Tropical',
    difficulty: 2,
    glass_type: 'Hurricane Glass',
    method: 'blend',
    garnish: 'Pineapple Slice, Maraschino Cherry',
    description: 'The taste of the Caribbean. Rum, coconut, and pineapple blended to perfection.',
    unlock_level: 3,
    ingredients: [
      { ingredient_name: 'White Rum', amount: 2, unit: 'oz', order: 1 },
      { ingredient_name: 'Coconut Cream', amount: 1.5, unit: 'oz', order: 2 },
      { ingredient_name: 'Pineapple Juice', amount: 3, unit: 'oz', order: 3 },
    ]
  },
  {
    name: 'Negroni',
    category: 'Classic',
    difficulty: 4,
    glass_type: 'Rocks Glass',
    method: 'stir',
    garnish: 'Orange Slice',
    description: 'Bold Italian aperitif with equal parts gin, Campari, and vermouth. Not for the faint of heart.',
    unlock_level: 4,
    ingredients: [
      { ingredient_name: 'Gin', amount: 1, unit: 'oz', order: 1 },
      { ingredient_name: 'Campari', amount: 1, unit: 'oz', order: 2 },
      { ingredient_name: 'Sweet Vermouth', amount: 1, unit: 'oz', order: 3 },
    ]
  },
  {
    name: 'Moscow Mule',
    category: 'Classic',
    difficulty: 1,
    glass_type: 'Copper Mug',
    method: 'build',
    garnish: 'Lime Wedge, Mint Sprig',
    description: 'Vodka, ginger beer, and lime served in a copper mug. Refreshing and zesty.',
    unlock_level: 1,
    ingredients: [
      { ingredient_name: 'Vodka', amount: 2, unit: 'oz', order: 1 },
      { ingredient_name: 'Fresh Lime Juice', amount: 0.5, unit: 'oz', order: 2 },
      { ingredient_name: 'Ginger Beer', amount: 4, unit: 'oz', order: 3 },
    ]
  },
  {
    name: 'Daiquiri',
    category: 'Classic',
    difficulty: 2,
    glass_type: 'Coupe Glass',
    method: 'shake',
    garnish: 'Lime Wheel',
    description: 'Hemingway\'s favorite. Simple rum, lime, and sugar shaken to perfection.',
    unlock_level: 1,
    ingredients: [
      { ingredient_name: 'White Rum', amount: 2, unit: 'oz', order: 1 },
      { ingredient_name: 'Fresh Lime Juice', amount: 1, unit: 'oz', order: 2 },
      { ingredient_name: 'Simple Syrup', amount: 0.75, unit: 'oz', order: 3 },
    ]
  },
  {
    name: 'Whiskey Sour',
    category: 'Classic',
    difficulty: 2,
    glass_type: 'Rocks Glass',
    method: 'shake',
    garnish: 'Lemon Twist, Maraschino Cherry',
    description: 'The perfect balance of whiskey, lemon, and sweetness. A timeless classic.',
    unlock_level: 2,
    ingredients: [
      { ingredient_name: 'Bourbon', amount: 2, unit: 'oz', order: 1 },
      { ingredient_name: 'Fresh Lemon Juice', amount: 0.75, unit: 'oz', order: 2 },
      { ingredient_name: 'Simple Syrup', amount: 0.5, unit: 'oz', order: 3 },
    ]
  },
  {
    name: 'Mai Tai',
    category: 'Tropical',
    difficulty: 3,
    glass_type: 'Rocks Glass',
    method: 'shake',
    garnish: 'Mint Sprig, Lime Wheel',
    description: 'Legendary tiki drink with rum, orange liqueur, and orgeat. A taste of Polynesia.',
    unlock_level: 3,
    ingredients: [
      { ingredient_name: 'White Rum', amount: 1, unit: 'oz', order: 1 },
      { ingredient_name: 'Dark Rum', amount: 1, unit: 'oz', order: 2 },
      { ingredient_name: 'Cointreau', amount: 0.5, unit: 'oz', order: 3 },
      { ingredient_name: 'Fresh Lime Juice', amount: 0.75, unit: 'oz', order: 4 },
      { ingredient_name: 'Simple Syrup', amount: 0.25, unit: 'oz', order: 5 },
    ]
  },
  {
    name: 'Manhattan',
    category: 'Classic',
    difficulty: 3,
    glass_type: 'Coupe Glass',
    method: 'stir',
    garnish: 'Maraschino Cherry',
    description: 'The sophisticated whiskey cocktail from New York. Smooth and complex.',
    unlock_level: 3,
    ingredients: [
      { ingredient_name: 'Bourbon', amount: 2, unit: 'oz', order: 1 },
      { ingredient_name: 'Sweet Vermouth', amount: 1, unit: 'oz', order: 2 },
      { ingredient_name: 'Angostura Bitters', amount: 2, unit: 'dashes', order: 3 },
    ]
  },
];
