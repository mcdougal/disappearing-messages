'use server';

import { createComment } from '@/domain/comment/server';
import { getExpiresAt } from '@/domain/post/common';
import { SessionUser } from '@/domain/user/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const FormDataSchema = z.object({
  text: z.string().min(1).max(255),
});

type ResponseStatus = `invalid` | `success`;

export default async (
  sessionUser: SessionUser,
  postId: string,
  replyingToId: string | null,
  formData: FormData
): Promise<ResponseStatus> => {
  const parsed = FormDataSchema.safeParse({
    text: formData.get(`text`),
  });

  if (!parsed.success) {
    return `invalid`;
  }

  const { text } = parsed.data;
  const updatedAt = new Date();
  const expiresAt = getExpiresAt(updatedAt);

  await createComment({
    data: {
      authorId: sessionUser.id,
      expiresAt,
      postId,
      replyingToId,
      text: text.trim(),
      updatedAt,
    },
  });

  revalidatePath(`/`, `layout`);

  return `success`;
};
