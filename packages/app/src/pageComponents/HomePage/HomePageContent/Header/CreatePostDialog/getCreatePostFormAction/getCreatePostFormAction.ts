import { getExpiresAt } from '@/domain/post/common';
import { PostsFeedPost } from '@/domain/post/server';
import { SessionUser } from '@/domain/user/server';
import { RefObject } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

import createPost from './createPost';

const FormDataSchema = z.object({
  text: z.string().min(1),
});

type FormAction = (formData: FormData) => Promise<void>;

export default (
  upsertOptimisticPost: (post: PostsFeedPost) => void,
  formRef: RefObject<HTMLFormElement>,
  sessionUser: SessionUser
): FormAction => {
  return async (formData): Promise<void> => {
    const parsed = FormDataSchema.safeParse({
      text: formData.get(`text`),
    });

    if (!parsed.success) {
      return;
    }

    const { text } = parsed.data;
    const postedAt = new Date();
    const updatedAt = postedAt;
    const expiresAt = getExpiresAt(updatedAt);

    formRef.current?.reset();

    upsertOptimisticPost({
      expiresAt,
      id: `optimistic-${uuidv4()}`,
      postedAt,
      text,
      updatedAt,
      author: {
        avatarSrc: sessionUser.avatarSrc,
        name: sessionUser.name,
      },
      comments: [],
      upvotes: [],
    });

    await createPost({
      data: {
        authorId: sessionUser.id,
        expiresAt,
        postedAt,
        text,
        updatedAt,
      },
    });
  };
};
