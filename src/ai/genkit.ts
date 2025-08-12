import {genkit, configureGenkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Configure Genkit to use the googleAI plugin.
// The API key will be passed dynamically in the flow.
configureGenkit({
  plugins: [googleAI()],
});

// The global 'ai' object will be used for defining prompts and flows.
export const ai = genkit({
  model: 'googleai/gemini-1.5-flash-latest',
});
