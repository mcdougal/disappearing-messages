'use server';

import { createComment } from '@/domain/comment/server';
import { getExpiresAt } from '@/domain/post/common';
import { SessionUser } from '@/domain/user/server';
import { z } from 'zod';

const FormDataSchema = z.object({
  text: z.string().min(1),
});

export default async (
  sessionUser: SessionUser,
  postId: string,
  formData: FormData
): Promise<void> => {
  const parsed = FormDataSchema.safeParse({
    text: formData.get(`text`),
  });

  if (!parsed.success) {
    return;
  }

  const { text } = parsed.data;
  const updatedAt = new Date();
  const expiresAt = getExpiresAt(updatedAt);

  await createComment({
    data: {
      authorId: sessionUser.id,
      expiresAt,
      postId,
      text,
      updatedAt,
    },
  });
};
