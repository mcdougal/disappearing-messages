import { sendOpenAiRequest } from '@/integrations/openAi';

export default async (prompt: string): Promise<string | null> => {
  return sendOpenAiRequest(prompt);
};
