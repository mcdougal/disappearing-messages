import { db, eq } from '@/db/connection';
import { user } from '@/db/schema';
import { QueryResult } from '@/db/types';
import { createId } from '@paralleldrive/cuid2';

import getRandomUserData from './getRandomUserData';

type QueryArgs = {
  where: {
    sessionId: string;
  };
};

export type SessionUser = QueryResult<
  'user',
  {
    avatarSrc: true;
    id: true;
    name: true;
  }
>;

export default async ({ where }: QueryArgs): Promise<SessionUser> => {
  let sessionUser = await db.query.user.findFirst({
    where: eq(user.sessionId, where.sessionId),
    columns: {
      avatarSrc: true,
      id: true,
      name: true,
    },
  });

  if (!sessionUser) {
    const randomUserData = getRandomUserData();
    const [insertedUser] = await db
      .insert(user)
      .values({
        avatarSrc: randomUserData.avatarSrc,
        id: createId(),
        name: randomUserData.name,
        sessionId: where.sessionId,
      })
      .returning({
        avatarSrc: user.avatarSrc,
        id: user.id,
        name: user.name,
      });

    if (insertedUser) {
      sessionUser = insertedUser;
    }
  }

  if (!sessionUser) {
    throw new Error(`Failed to get or create user for session`);
  }

  return {
    avatarSrc: sessionUser.avatarSrc,
    id: sessionUser.id,
    name: sessionUser.name,
  };
};
