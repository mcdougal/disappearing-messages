import 'server-only';

import { db } from '@/db/connection';
import { comment } from '@/db/schema';
import { createId } from '@paralleldrive/cuid2';
import { revalidatePath } from 'next/cache';

import { HomePageRoute, ReadPostPageRoute } from '@/domain/routes/common';

type InsertArgs = {
  data: Omit<typeof comment.$inferInsert, 'createdAt' | 'id'>;
};

export default async ({ data }: InsertArgs): Promise<void> => {
  await db.insert(comment).values({
    ...data,
    id: createId(),
  });

  revalidatePath(HomePageRoute.getPath({}));
  revalidatePath(ReadPostPageRoute.getPath({ postId: data.postId }));
};
