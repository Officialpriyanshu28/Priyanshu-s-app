
'use server';
/**
 * @fileOverview An advanced AI assistant with multiple capabilities.
 *
 * - advancedAssistant - A function that handles various AI tasks based on the specified mode.
 * - AdvancedAssistantInput - The input type for the advancedAssistant function.
 * - AdvancedAssistantOutput - The return type for the advancedAssistant function.
 */

import { ai } from '@/ai/genkit';
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
      "A photo of a question or a problem, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'"
    ),
  code: z.string().optional().describe('A code snippet that might contain errors.'),
  chat_history: z.array(ChatMessageSchema).optional().describe('The history of the conversation.'),
});

export type AdvancedAssistantInput = z.infer<typeof AdvancedAssistantInputSchema>;
export type AdvancedAssistantOutput = string;
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

export async function advancedAssistant(input: AdvancedAssistantInput): Promise<AdvancedAssistantOutput> {
  const { mode, question, image, code, chat_history } = input;

  let promptContent = `You are an advanced AI assistant. Your capabilities are defined by the 'mode' provided.`;

  if (mode === 'image_solver' && image) {
    promptContent += `\n\nYou are an expert problem solver. The user has provided an image and a question.
Analyze the image and the question carefully, and provide a clear, step-by-step solution.
If the question is simple, provide a direct answer.

Image: {{media url=${image}}}
Question: ${question}`;
  } else if (mode === 'text_genius_summary') {
    promptContent += `\n\nYou are an expert summarizer. The user has provided a block of text.
Generate a concise and easy-to-understand summary of the text.
The summary should capture the key points and main ideas.

Text to summarize:
"${question}"`;
  } else if (mode === 'text_genius_mindmap') {
    promptContent += `\n\nYou are an expert at creating structured mind maps. The user has provided a block of text.
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
"${question}"`;
  } else if (mode === 'code_doctor' && code) {
    promptContent += `\n\nYou are an expert code debugger. The user has provided a code snippet that may have errors.
Analyze the code, identify any errors, and provide a corrected version.
Explain the error and the fix clearly in a Markdown block.

Code to analyze:
\`\`\`
${code}
\`\`\`
`;
  } else if (mode === 'chat') {
    if (chat_history && chat_history.length > 0) {
      promptContent += `\n\nYou are a helpful and friendly AI chat assistant.
Continue the conversation based on the provided history.
Be concise and helpful.

Conversation History:
${chat_history.map(msg => `**${msg.role}**: ${msg.content}`).join('\n')}

Current question:
**user**: ${question}
**model**:`;
    } else {
      promptContent += `\n\nYou are a helpful and friendly AI chat assistant.
Start the conversation with the user.
Be concise and helpful.
  
Current question:
**user**: ${question}
**model**:`;
    }
  }
  
  const { output } = await ai.generate({
      prompt: promptContent,
  });
    
  return output?.text ?? "Sorry, I couldn't process your request. Please try again.";
}
