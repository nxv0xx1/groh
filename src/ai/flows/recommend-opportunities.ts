'use server';
/**
 * @fileOverview Recommends volunteering and donation opportunities based on user interests.
 *
 * - recommendOpportunities - A function that recommends opportunities based on user interests.
 * - RecommendOpportunitiesInput - The input type for the recommendOpportunities function.
 * - RecommendOpportunitiesOutput - The return type for the recommendOpportunities function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendOpportunitiesInputSchema = z.object({
  interests: z
    .string()
    .describe('A description of the user\'s interests and passions.'),
});
export type RecommendOpportunitiesInput = z.infer<typeof RecommendOpportunitiesInputSchema>;

const RecommendOpportunitiesOutputSchema = z.object({
  volunteeringOpportunities: z
    .array(z.string())
    .describe('A list of volunteering opportunities that align with the user\'s interests.'),
  donationOptions: z
    .array(z.string())
    .describe('A list of donation options that align with the user\'s interests.'),
});
export type RecommendOpportunitiesOutput = z.infer<typeof RecommendOpportunitiesOutputSchema>;

export async function recommendOpportunities(
  input: RecommendOpportunitiesInput
): Promise<RecommendOpportunitiesOutput> {
  return recommendOpportunitiesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendOpportunitiesPrompt',
  input: {schema: RecommendOpportunitiesInputSchema},
  output: {schema: RecommendOpportunitiesOutputSchema},
  prompt: `You are an AI assistant that recommends volunteering opportunities and donation options based on user interests.

  User Interests: {{{interests}}}

  Based on the user's interests, suggest relevant volunteering opportunities and donation options. Return the response as a JSON object.
  `,
});

const recommendOpportunitiesFlow = ai.defineFlow(
  {
    name: 'recommendOpportunitiesFlow',
    inputSchema: RecommendOpportunitiesInputSchema,
    outputSchema: RecommendOpportunitiesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
