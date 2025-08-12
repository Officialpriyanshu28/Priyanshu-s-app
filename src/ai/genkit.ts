import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Configure Genkit to use the googleAI plugin.
// The API key will be passed dynamically in the flow.
// The global 'ai' object will be used for defining prompts and flows.
export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash-latest',
});
