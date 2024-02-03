'use server';

import { createMessage } from '@/domain/messagesServer';

type MessageData = Parameters<typeof createMessage>[0];

export default async (messageData: MessageData): Promise<void> => {
  await createMessage(messageData);
};
