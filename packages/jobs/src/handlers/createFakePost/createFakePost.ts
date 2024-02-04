import { getExpiresAt } from '@/domain/post/common';
import { createPost } from '@/domain/post/server';
import { getOrCreateUserForSession } from '@/domain/user/server';
import { v4 as uuidv4 } from 'uuid';

export default async (): Promise<void> => {
  if (Math.random() < 0.5) {
    const sessionUser = await getOrCreateUserForSession({
      where: { sessionId: uuidv4() },
    });

    const postedAt = new Date();
    const updatedAt = postedAt;
    const expiresAt = getExpiresAt(updatedAt);

    await createPost({
      data: {
        authorId: sessionUser.id,
        expiresAt,
        postedAt,
        text: `this is a fake post`,
        updatedAt,
      },
    });
  }
};
