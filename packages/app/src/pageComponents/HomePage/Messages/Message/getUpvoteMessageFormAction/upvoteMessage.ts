'use server';

import { upvoteMessage } from '@/domain/messagesServer';

type UpvoteMessageArgs = Parameters<typeof upvoteMessage>[0];

export default async (args: UpvoteMessageArgs): Promise<void> => {
  await upvoteMessage(args);
};
