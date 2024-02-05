'use server';

import { createComment } from '@/domain/comment/server';
import { ReadPostPageRoute } from '@/domain/routes/common';
import { SessionUser } from '@/domain/user/server';
import { redirect } from 'next/navigation';
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

  await createComment({
    data: {
      authorId: sessionUser.id,
      postId,
      text,
    },
  });

  redirect(ReadPostPageRoute.getPath({ postId }));
};
