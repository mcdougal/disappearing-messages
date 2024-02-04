'use server';

import { createPost } from '@/domain/post/server';
import { revalidatePath } from 'next/cache';

type CreatePostArgs = Parameters<typeof createPost>[0];

export default async (args: CreatePostArgs): Promise<void> => {
  await createPost(args);
  revalidatePath(`/`);
};
