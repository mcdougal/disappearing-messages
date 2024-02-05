/* eslint-disable import/no-named-as-default */
import { getRequiredEnvVar } from '@/common/env';
import OpenAI from 'openai';

let globalOpenAi: OpenAI | null = null;

const getOpenAi = (): OpenAI => {
  if (!globalOpenAi) {
    globalOpenAi = new OpenAI({
      apiKey: getRequiredEnvVar(`OPENAI_API_KEY`),
      organization: getRequiredEnvVar(`OPENAI_ORG_ID`),
    });
  }

  return globalOpenAi;
};

export default async (prompt: string): Promise<string | null> => {
  const openai = getOpenAi();

  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: `user`, content: prompt }],
    model: `gpt-4`,
  });

  return chatCompletion.choices.length > 0
    ? chatCompletion.choices[0].message.content
    : null;
};
