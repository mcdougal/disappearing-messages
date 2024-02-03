'use server';

import { createMessage } from '@/domain/messagesServer';

type CreateMessageArgs = Parameters<typeof createMessage>[0];

export default async (args: CreateMessageArgs): Promise<void> => {
  await createMessage(args);
};
