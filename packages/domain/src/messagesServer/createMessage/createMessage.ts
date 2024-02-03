import 'server-only';

import { db } from '@/db/connection';
import { messages } from '@/db/schema';
import { createId } from '@paralleldrive/cuid2';

import {
  MessageCreatedEventSchema,
  getPublicChannelName,
} from '@/domain/realtimeCommon';
import { triggerRealtimeEvent } from '@/domain/realtimeServer';

type InsertData = Omit<typeof messages.$inferInsert, 'createdAt' | 'id'>;

export default async (data: InsertData): Promise<void> => {
  const [insertedMessage] = await db
    .insert(messages)
    .values({
      ...data,
      id: createId(),
    })
    .returning();

  if (insertedMessage) {
    await triggerRealtimeEvent(
      MessageCreatedEventSchema,
      getPublicChannelName(),
      {
        message: {
          createdAt: insertedMessage.createdAt,
          expiresAt: insertedMessage.expiresAt,
          id: insertedMessage.id,
          numUpvotes: insertedMessage.numUpvotes,
          text: insertedMessage.text,
          userAvatarSrc: insertedMessage.userAvatarSrc,
          userName: insertedMessage.userName,
        },
      }
    );
  }
};
