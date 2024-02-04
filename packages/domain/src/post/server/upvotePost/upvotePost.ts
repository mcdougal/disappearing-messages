import 'server-only';

import { db, eq } from '@/db/connection';
import { post, upvote } from '@/db/schema';

import {
  getPublicChannelName,
  PostUpvotedEventSchema,
} from '@/domain/realtime/common';
import { triggerRealtimeEvent } from '@/domain/realtime/server';

type UpdateArgs = {
  data: Omit<typeof upvote.$inferInsert, 'createdAt'> & {
    expiresAt: Date;
    updatedAt: Date;
  };
};

export default async ({ data }: UpdateArgs): Promise<void> => {
  const { expiresAt, updatedAt, ...upvoteData } = data;

  const [insertedUpvote] = await db
    .insert(upvote)
    .values(upvoteData)
    .returning();

  await db
    .update(post)
    .set({ expiresAt, updatedAt })
    .where(eq(post.id, data.postId));

  if (insertedUpvote) {
    await triggerRealtimeEvent(PostUpvotedEventSchema, getPublicChannelName(), {
      post: {
        postId: data.postId,
        userId: data.userId,
      },
    });
  }
};
