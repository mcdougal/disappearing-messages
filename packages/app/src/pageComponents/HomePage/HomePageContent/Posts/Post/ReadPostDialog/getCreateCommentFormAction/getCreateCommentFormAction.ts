import { PostsFeedPost } from '@/domain/post/server';
import { SessionUser } from '@/domain/user/server';
import { RefObject } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

import createComment from './createComment';

const FormDataSchema = z.object({
  text: z.string().min(1),
});

type FormAction = (formData: FormData) => Promise<void>;

export default (
  upsertOptimisticPost: (post: PostsFeedPost) => void,
  formRef: RefObject<HTMLFormElement>,
  sessionUser: SessionUser,
  post: PostsFeedPost
): FormAction => {
  return async (formData): Promise<void> => {
    const parsed = FormDataSchema.safeParse({
      text: formData.get(`text`),
    });

    if (!parsed.success) {
      return;
    }

    const { text } = parsed.data;

    formRef.current?.reset();

    upsertOptimisticPost({
      ...post,
      comments: [
        {
          author: sessionUser,
          id: `optimistic-${uuidv4()}`,
          text,
        },
        ...post.comments,
      ],
    });

    await createComment({
      data: {
        authorId: sessionUser.id,
        postId: post.id,
        text,
      },
    });
  };
};
