
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import 'dotenv/config';

// Configure Genkit to use the googleAI plugin.
// The API key will be loaded from the GEMINI_API_KEY environment variable.
// The global 'ai' object will be used for defining prompts and flows.
export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GEMINI_API_KEY,
    }),
  ],
  model: 'googleai/gemini-2.5-flash-latest',
});
