'use server';

import { createComment } from '@/domain/comment/server';
import { revalidatePath } from 'next/cache';

type CreateCommentArgs = Parameters<typeof createComment>[0];

export default async (args: CreateCommentArgs): Promise<void> => {
  await createComment(args);
  revalidatePath(`/`);
};
