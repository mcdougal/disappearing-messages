import 'server-only';

import { db, eq } from '@/db/connection';
import { post } from '@/db/schema';

import {
  getPublicChannelName,
  PostUpvotedEventSchema,
} from '@/domain/realtime/common';
import { triggerRealtimeEvent } from '@/domain/realtime/server';

type UpdateArgs = {
  data: Pick<typeof post.$inferInsert, 'expiresAt'>;
  where: { id: string };
};

export default async ({ data, where }: UpdateArgs): Promise<void> => {
  const existingPost = await db.query.post.findFirst({
    where: eq(post.id, where.id),
    columns: {
      id: true,
      numUpvotes: true,
    },
  });

  if (existingPost) {
    const [updatedPost] = await db
      .update(post)
      .set({
        expiresAt: data.expiresAt,
        numUpvotes: existingPost.numUpvotes + 1,
      })
      .where(eq(post.id, existingPost.id))
      .returning();

    if (updatedPost) {
      await triggerRealtimeEvent(
        PostUpvotedEventSchema,
        getPublicChannelName(),
        {
          post: {
            id: updatedPost.id,
            numUpvotes: updatedPost.numUpvotes,
          },
        }
      );
    }
  }
};
