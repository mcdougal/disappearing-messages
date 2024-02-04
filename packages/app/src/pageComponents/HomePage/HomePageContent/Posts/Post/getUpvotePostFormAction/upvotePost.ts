'use server';

import { upvotePost } from '@/domain/post/server';

type UpvotePostArgs = Parameters<typeof upvotePost>[0];

export default async (args: UpvotePostArgs): Promise<void> => {
  await upvotePost(args);
};
