'use server';
/**
 * @fileOverview An advanced AI assistant with multiple capabilities.
 *
 * - advancedAssistant - A function that handles various AI tasks based on the specified mode.
 * - AdvancedAssistantInput - The input type for the advancedAssistant function.
 * - AdvancedAssistantOutput - The return type for the advancedAssistant function.
 */

import { ai } from '@/ai/genkit';
import { generate } from 'genkit/generate';
import { z } from 'zod';

const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

const AdvancedAssistantInputSchema = z.object({
  mode: z.enum(['image_solver', 'text_genius_summary', 'text_genius_mindmap', 'code_doctor', 'chat']),
  question: z.string().optional().describe("The user's question or text input."),
  image: z
    .string()
    .optional()
    .describe(
      "A photo of a question or a problem, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  code: z.string().optional().describe('A code snippet that might contain errors.'),
  chat_history: z.array(ChatMessageSchema).optional().describe('The history of the conversation.'),
  apiKey: z.string().optional().describe('The user-provided API key for the AI model.'),
});

export type AdvancedAssistantInput = z.infer<typeof AdvancedAssistantInputSchema>;
export type AdvancedAssistantOutput = string;
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

export async function advancedAssistant(input: AdvancedAssistantInput): Promise<AdvancedAssistantOutput> {
  return advancedAssistantFlow(input);
}

const assistantPrompt = ai.definePrompt({
  name: 'advancedAssistantPrompt',
  input: { schema: AdvancedAssistantInputSchema },
  output: { schema: z.string() },
  prompt: `You are an advanced AI assistant. Your capabilities are defined by the 'mode' provided.

{{#if (eq mode "image_solver")}}
You are an expert problem solver. The user has provided an image and a question.
Analyze the image and the question carefully, and provide a clear, step-by-step solution.
If the question is simple, provide a direct answer.

Image: {{media url=image}}
Question: {{{question}}}
{{/if}}

{{#if (eq mode "text_genius_summary")}}
You are an expert summarizer. The user has provided a block of text.
Generate a concise and easy-to-understand summary of the text.
The summary should capture the key points and main ideas.

Text to summarize:
"{{{question}}}"
{{/if}}

{{#if (eq mode "text_genius_mindmap")}}
You are an expert at creating structured mind maps. The user has provided a block of text.
Generate a mind map in Markdown format.
Use nested lists with headings (e.g., ###) for different branches.

Example of a mind map format:
### Main Idea
- **Key Concept 1**
  - Sub-point 1.1
  - Sub-point 1.2
- **Key Concept 2**
  - Sub-point 2.1

Text to create a mind map from:
"{{{question}}}"
{{/if}}

{{#if (eq mode "code_doctor")}}
You are an expert code debugger. The user has provided a code snippet that may have errors.
Analyze the code, identify any errors, and provide a corrected version.
Explain the error and the fix clearly in a Markdown block.

Code to analyze:
\`\`\`
{{{code}}}
\`\`\`
{{/if}}

{{#if (eq mode "chat")}}
You are a helpful and friendly AI chat assistant.
Continue the conversation based on the provided history.
Be concise and helpful.

{{#if chat_history}}
Conversation History:
{{#each chat_history}}
**{{role}}**: {{{content}}}
{{/each}}
{{/if}}

Current question:
**user**: {{{question}}}
**model**:
{{/if}}
`,
});

const advancedAssistantFlow = ai.defineFlow(
  {
    name: 'advancedAssistantFlow',
    inputSchema: AdvancedAssistantInputSchema,
    outputSchema: z.string(),
  },
  async (input) => {
    // Dynamically create a model instance with the user's API key.
    const model = ai.model('googleai/gemini-1.5-flash-latest', {
      auth: { apiKey: input.apiKey || process.env.GEMINI_API_KEY || '' },
    });

    const { output } = await generate({
        prompt: await assistantPrompt.render(input),
        model,
    });
    
    return output?.text ?? "Sorry, I couldn't process your request. Please try again.";
  }
);
