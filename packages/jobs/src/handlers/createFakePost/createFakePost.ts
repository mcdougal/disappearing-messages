import { createChatCompletion } from '@/domain/ai/server';
import { getExpiresAt } from '@/domain/post/common';
import { createPost } from '@/domain/post/server';
import { getOrCreateUserForSession } from '@/domain/user/server';
import { v4 as uuidv4 } from 'uuid';

export default async (): Promise<void> => {
  const sessionUser = await getOrCreateUserForSession({
    where: { sessionId: uuidv4() },
  });

  const postedAt = new Date();
  const updatedAt = postedAt;
  const expiresAt = getExpiresAt(updatedAt);

  const message = await createChatCompletion(
    `Say an opinion about a random pop culture reference`
  );

  if (message) {
    await createPost({
      data: {
        authorId: sessionUser.id,
        expiresAt,
        postedAt,
        text: message,
        updatedAt,
      },
    });
  }
};
