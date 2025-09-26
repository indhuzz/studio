'use server';

/**
 * @fileOverview A flow for suggesting a new meal.
 * 
 * - suggestMeal - A function that suggests a new meal and generates an image for it.
 * - SuggestMealOutput - The return type for the suggestMeal function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SuggestMealOutputSchema = z.object({
    name: z.string().describe('The name of the suggested meal.'),
    description: z.string().describe('A short, appetizing description of the meal.'),
    image: z.string().describe("A data URI of a generated image for the meal. The image should be photorealistic. The format should be 'data:image/png;base64,<encoded_data>'."),
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

        const { media } = await ai.generate({
            model: 'googleai/imagen-4.0-fast-generate-001',
            prompt: `A photorealistic image of ${mealIdea.name}: ${mealIdea.description}`,
        });

        const imageUrl = media.url;
        if (!imageUrl) {
            throw new Error('Could not generate an image for the meal.');
        }
        
        return {
            name: mealIdea.name,
            description: mealIdea.description,
            image: imageUrl
        };
    }
);
