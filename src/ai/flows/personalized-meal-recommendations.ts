// src/ai/flows/personalized-meal-recommendations.ts
'use server';

/**
 * @fileOverview Provides personalized meal recommendations based on user's past order history.
 *
 * - getPersonalizedMealRecommendations - A function that retrieves personalized meal recommendations.
 * - PersonalizedMealRecommendationsInput - The input type for the getPersonalizedMealRecommendations function.
 * - PersonalizedMealRecommendationsOutput - The return type for the getPersonalizedMealRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedMealRecommendationsInputSchema = z.object({
  userId: z.string().describe('The ID of the user.'),
  orderHistory: z
    .array(z.string())
    .describe('The user order history as a list of order names.'),
});
export type PersonalizedMealRecommendationsInput =
  z.infer<typeof PersonalizedMealRecommendationsInputSchema>;

const PersonalizedMealRecommendationsOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('A list of personalized meal recommendations.'),
});
export type PersonalizedMealRecommendationsOutput =
  z.infer<typeof PersonalizedMealRecommendationsOutputSchema>;

export async function getPersonalizedMealRecommendations(
  input: PersonalizedMealRecommendationsInput
): Promise<PersonalizedMealRecommendationsOutput> {
  return personalizedMealRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedMealRecommendationsPrompt',
  input: {schema: PersonalizedMealRecommendationsInputSchema},
  output: {schema: PersonalizedMealRecommendationsOutputSchema},
  prompt: `You are a meal recommendation expert. Based on the user's past order history, provide personalized meal recommendations.

User ID: {{{userId}}}
Order History: {{#each orderHistory}}{{{this}}}, {{/each}}

Recommendations:`,
});

const personalizedMealRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedMealRecommendationsFlow',
    inputSchema: PersonalizedMealRecommendationsInputSchema,
    outputSchema: PersonalizedMealRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
