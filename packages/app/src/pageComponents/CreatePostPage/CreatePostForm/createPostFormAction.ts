'use server';

import { getExpiresAt } from '@/domain/post/common';
import { createPost } from '@/domain/post/server';
import { SessionUser } from '@/domain/user/server';
import { z } from 'zod';

const FormDataSchema = z.object({
  text: z.string().min(1).max(255),
});

type ResponseStatus = `invalid` | `success`;

export default async (
  sessionUser: SessionUser,
  formData: FormData
): Promise<ResponseStatus> => {
  const parsed = FormDataSchema.safeParse({
    text: formData.get(`text`),
  });

  if (!parsed.success) {
    return `invalid`;
  }

  const { text } = parsed.data;
  const postedAt = new Date();
  const updatedAt = postedAt;
  const expiresAt = getExpiresAt(updatedAt);

  await createPost({
    data: {
      authorId: sessionUser.id,
      expiresAt,
      postedAt,
      text: text.trim(),
      updatedAt,
    },
  });

  return `success`;
};
