'use server';

import { upvotePost } from '@/domain/post/server';
import { revalidatePath } from 'next/cache';

type UpvotePostArgs = Parameters<typeof upvotePost>[0];

export default async (args: UpvotePostArgs): Promise<void> => {
  await upvotePost(args);
  revalidatePath(`/`, `layout`);
};
