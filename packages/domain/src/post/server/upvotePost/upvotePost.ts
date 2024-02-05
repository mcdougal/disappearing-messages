import 'server-only';

import { db, eq } from '@/db/connection';
import { post, upvote } from '@/db/schema';

type UpdateArgs = {
  data: Omit<typeof upvote.$inferInsert, 'createdAt'> & {
    expiresAt: Date;
    updatedAt: Date;
  };
};

export default async ({ data }: UpdateArgs): Promise<void> => {
  const { expiresAt, updatedAt, ...upvoteData } = data;

  await db.insert(upvote).values(upvoteData);

  await db
    .update(post)
    .set({ expiresAt, updatedAt })
    .where(eq(post.id, data.postId));
};
