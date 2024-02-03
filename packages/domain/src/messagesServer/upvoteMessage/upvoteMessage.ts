import 'server-only';

import { db, eq } from '@/db/connection';
import { messages } from '@/db/schema';

import {
  getPublicChannelName,
  MessageUpvotedEventSchema,
} from '@/domain/realtimeCommon';
import { triggerRealtimeEvent } from '@/domain/realtimeServer';

type UpdateArgs = {
  data: { expiresAt: Date };
  where: { id: string };
};

export default async ({ data, where }: UpdateArgs): Promise<void> => {
  const existingMessage = await db.query.messages.findFirst({
    where: eq(messages.id, where.id),
    columns: {
      id: true,
      numUpvotes: true,
    },
  });

  if (existingMessage) {
    const [updatedMessage] = await db
      .update(messages)
      .set({
        expiresAt: data.expiresAt,
        numUpvotes: existingMessage.numUpvotes + 1,
      })
      .where(eq(messages.id, existingMessage.id))
      .returning();

    if (updatedMessage) {
      await triggerRealtimeEvent(
        MessageUpvotedEventSchema,
        getPublicChannelName(),
        {
          message: {
            id: updatedMessage.id,
            numUpvotes: updatedMessage.numUpvotes,
          },
        }
      );
    }
  }
};
