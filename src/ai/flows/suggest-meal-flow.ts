'use server';

/**
 * @fileOverview A flow for suggesting a new meal.
 * 
 * - suggestMeal - A function that suggests a new meal and its ingredients.
 * - SuggestMealOutput - The return type for the suggestMeal function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SuggestMealOutputSchema = z.object({
    name: z.string().describe('The name of the suggested meal.'),
    description: z.string().describe('A short, appetizing description of the meal.'),
    ingredients: z.array(z.string()).describe('A list of key ingredients for the meal.'),
});
export type SuggestMealOutput = z.infer<typeof SuggestMealOutputSchema>;

export async function suggestMeal(): Promise<SuggestMealOutput> {
    return suggestMealFlow();
}

const mealIdeaPrompt = ai.definePrompt({
    name: 'mealIdeaPrompt',
    output: { schema: z.object({ name: z.string(), description: z.string() }) },
    prompt: 'Suggest a new, creative, and delicious meal item for a canteen menu. Provide a name and a short, appetizing description.',
});

const ingredientsPrompt = ai.definePrompt({
    name: 'ingredientsPrompt',
    input: { schema: z.object({ name: z.string(), description: z.string() }) },
    output: { schema: z.object({ ingredients: z.array(z.string()) }) },
    prompt: `Based on the following meal, provide a list of its key ingredients.
    
    Meal Name: {{{name}}}
    Description: {{{description}}}
    
    List the ingredients clearly.`,
});


const suggestMealFlow = ai.defineFlow(
    {
        name: 'suggestMealFlow',
        outputSchema: SuggestMealOutputSchema,
    },
    async () => {
        const { output: mealIdea } = await mealIdeaPrompt();
        if (!mealIdea) {
            throw new Error('Could not generate a meal idea.');
        }

        const { output: ingredients } = await ingredientsPrompt(mealIdea);
        if (!ingredients) {
            throw new Error('Could not generate ingredients for the meal.');
        }
        
        return {
            name: mealIdea.name,
            description: mealIdea.description,
            ingredients: ingredients.ingredients,
        };
    }
);
