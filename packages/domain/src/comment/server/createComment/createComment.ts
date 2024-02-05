import 'server-only';

import { db, eq } from '@/db/connection';
import { comment, post } from '@/db/schema';
import { createId } from '@paralleldrive/cuid2';

type InsertArgs = {
  data: Omit<typeof comment.$inferInsert, 'createdAt' | 'id'> & {
    expiresAt: Date;
    updatedAt: Date;
  };
};

export default async ({ data }: InsertArgs): Promise<void> => {
  const { expiresAt, updatedAt, ...commentData } = data;

  await db.insert(comment).values({
    ...commentData,
    id: createId(),
  });

  await db
    .update(post)
    .set({ expiresAt, updatedAt })
    .where(eq(post.id, data.postId));
};
