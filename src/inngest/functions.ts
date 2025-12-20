import prisma from '@/lib/database';
import { inngest } from './client';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { generateText } from 'ai';

const google = createGoogleGenerativeAI();
const openAi = createOpenAI();
const anthropic = createAnthropic();
export const executeAi = inngest.createFunction(
  { id: 'execute' },
  { event: 'execute/ai' },
  async ({ step }) => {
    await step.sleep('pretend', '5s');
    const { steps: geminiSteps } = await step.ai.wrap(
      'gemini-generate-text',
      generateText,
      {
        model: google('gemini-2.5-flash'),
        system: 'You are helpful assistant',
        prompt: 'What is 2 + 2',
      }
    );
    const { steps: openAiSteps } = await step.ai.wrap(
      'open-ai-generate-text',
      generateText,
      {
        model: openAi('gpt-4'),
        system: 'You are helpful assistant',
        prompt: 'What is 2 + 2',
      }
    );
    const { steps: anthropicSteps } = await step.ai.wrap(
      'anthropic-generate-text',
      generateText,
      {
        model: anthropic('claude-sonnet-4-0'),
        system: 'You are helpful assistant',
        prompt: 'What is 2 + 2',
      }
    );
    return {
      geminiSteps,
      openAiSteps,
      anthropicSteps,
    };
  }
);
