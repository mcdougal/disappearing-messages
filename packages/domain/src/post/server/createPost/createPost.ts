import 'server-only';

import { db, eq } from '@/db/connection';
import { post } from '@/db/schema';
import { createId } from '@paralleldrive/cuid2';

import {
  PostCreatedEventSchema,
  getPublicChannelName,
} from '@/domain/realtime/common';
import { triggerRealtimeEvent } from '@/domain/realtime/server';

type InsertArgs = {
  data: Omit<typeof post.$inferInsert, 'createdAt' | 'id'>;
};

export default async ({ data }: InsertArgs): Promise<void> => {
  const [insertedPost] = await db
    .insert(post)
    .values({
      ...data,
      id: createId(),
    })
    .returning({ id: post.id });

  const postData = await db.query.post.findFirst({
    where: eq(post.id, insertedPost.id),
    with: {
      author: {
        columns: {
          avatarSrc: true,
          name: true,
        },
      },
    },
    columns: {
      expiresAt: true,
      id: true,
      numUpvotes: true,
      postedAt: true,
      text: true,
    },
  });

  if (postData) {
    await triggerRealtimeEvent(PostCreatedEventSchema, getPublicChannelName(), {
      post: {
        author: {
          avatarSrc: postData.author.avatarSrc,
          name: postData.author.name,
        },
        expiresAt: postData.expiresAt,
        id: postData.id,
        numUpvotes: postData.numUpvotes,
        postedAt: postData.postedAt,
        text: postData.text,
      },
    });
  }
};
