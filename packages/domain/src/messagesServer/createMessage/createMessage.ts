import { db } from '@/db/connection';
import { messages } from '@/db/schema';
import { createId } from '@paralleldrive/cuid2';
import ms from 'ms';
import { forEachSeries } from 'p-iteration';

import {
  MessageCreatedEventSchema,
  getPublicChannelName,
} from '@/domain/realtimeCommon';
import { triggerRealtimeEvent } from '@/domain/realtimeServer';

type InsertData = Omit<typeof messages.$inferInsert, 'createdAt' | 'id'>;

export default async (data: InsertData): Promise<void> => {
  const insertedMessages = await db
    .insert(messages)
    .values({
      ...data,
      expiresAt: new Date(Date.now() + ms(`30 seconds`)),
      id: createId(),
    })
    .returning();

  await forEachSeries(insertedMessages, async (insertedMessage) => {
    await triggerRealtimeEvent(
      MessageCreatedEventSchema,
      getPublicChannelName(),
      {
        message: {
          createdAt: insertedMessage.createdAt,
          expiresAt: insertedMessage.expiresAt,
          id: insertedMessage.id,
          text: insertedMessage.text,
        },
      }
    );
  });
};
