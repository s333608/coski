import { supabase } from './supabase';
import { ingredientsData, cocktailsData } from '../data/cocktailData';

export async function seedDatabase() {
  try {
    const { data: existingIngredients } = await supabase
      .from('ingredients')
      .select('id')
      .limit(1);

    if (existingIngredients && existingIngredients.length > 0) {
      console.log('Database already seeded');
      return { success: true, message: 'Already seeded' };
    }

    const { data: insertedIngredients, error: ingredientsError } = await supabase
      .from('ingredients')
      .insert(ingredientsData)
      .select();

    if (ingredientsError) {
      throw new Error(`Ingredients error: ${ingredientsError.message}`);
    }

    const ingredientMap = new Map(
      insertedIngredients.map(ing => [ing.name, ing.id])
    );

    for (const cocktail of cocktailsData) {
      const { ingredients, ...cocktailData } = cocktail;

      const { data: insertedCocktail, error: cocktailError } = await supabase
        .from('cocktails')
        .insert(cocktailData)
        .select()
        .single();

      if (cocktailError) {
        console.error(`Error inserting ${cocktail.name}:`, cocktailError);
        continue;
      }

      const recipeIngredients = ingredients.map(ing => ({
        cocktail_id: insertedCocktail.id,
        ingredient_id: ingredientMap.get(ing.ingredient_name),
        amount: ing.amount,
        unit: ing.unit,
        order_index: ing.order,
      }));

      const { error: recipeError } = await supabase
        .from('recipe_ingredients')
        .insert(recipeIngredients);

      if (recipeError) {
        console.error(`Error inserting recipe for ${cocktail.name}:`, recipeError);
      }
    }

    console.log('Database seeded successfully!');
    return { success: true, message: 'Database seeded successfully' };
  } catch (error) {
    console.error('Seeding error:', error);
    return { success: false, error };
  }
}
