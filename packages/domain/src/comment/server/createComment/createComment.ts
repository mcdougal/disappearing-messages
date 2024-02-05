import 'server-only';

import { db } from '@/db/connection';
import { comment } from '@/db/schema';
import { createId } from '@paralleldrive/cuid2';

type InsertArgs = {
  data: Omit<typeof comment.$inferInsert, 'createdAt' | 'id'>;
};

export default async ({ data }: InsertArgs): Promise<void> => {
  await db.insert(comment).values({
    ...data,
    id: createId(),
  });
};
