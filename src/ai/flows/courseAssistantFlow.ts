
'use server';
/**
 * @fileOverview A course assistant AI agent.
 *
 * - courseAssistant - A function that handles answering questions about a course.
 * - CourseAssistantInput - The input type for the courseAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const CourseAssistantInputSchema = z.object({
  courseTitle: z.string().describe('The title of the course.'),
  chapterTitle: z.string().describe('The title of the current chapter.'),
  videoTitle: z.string().describe('The title of the current video.'),
  question: z.string().optional().describe("The user's question about the course content."),
  imageDataUri: z
    .string()
    .optional()
    .describe(
      "An optional image file, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type CourseAssistantInput = z.infer<typeof CourseAssistantInputSchema>;

export async function courseAssistant(input: CourseAssistantInput): Promise<string> {
  const result = await courseAssistantFlow(input);
  return result;
}

const courseAssistantPrompt = ai.definePrompt(
  {
    name: 'courseAssistantPrompt',
    input: { schema: CourseAssistantInputSchema },
    output: { schema: z.string() },
    prompt: `You are an expert AI assistant for an online learning platform. Your role is to help students understand the course material better.

You will be given the context of the course, the current chapter, and the current video the student is watching. You will also be given a question from the student. If an image is provided, use it as additional context for your answer.

Your task is to provide a clear, concise, and helpful answer to the student's question based on the provided context. Be friendly and encouraging.

If there is an image but no text question, describe the image and ask how it relates to the course material.

Course: {{{courseTitle}}}
Chapter: {{{chapterTitle}}}
Video: {{{videoTitle}}}

{{#if question}}
Student's Question: {{{question}}}
{{/if}}

{{#if imageDataUri}}
[Image Content]
{{media url=imageDataUri}}
{{/if}}

Your Answer:`,
  }
);


const courseAssistantFlow = ai.defineFlow(
  {
    name: 'courseAssistantFlow',
    inputSchema: CourseAssistantInputSchema,
    outputSchema: z.string(),
  },
  async (input) => {
    const {output} = await courseAssistantPrompt(input);
    // Ensure we always return a string, even if the model output is null/undefined.
    return output ?? "Sorry, I couldn't generate a response. Please try again.";
  }
);
