import 'server-only';

import { db } from '@/db/connection';
import { post } from '@/db/schema';
import { createId } from '@paralleldrive/cuid2';

type InsertArgs = {
  data: Omit<typeof post.$inferInsert, 'createdAt' | 'id'>;
};

export default async ({ data }: InsertArgs): Promise<void> => {
  await db
    .insert(post)
    .values({
      ...data,
      id: createId(),
    })
    .returning({ id: post.id });
};
