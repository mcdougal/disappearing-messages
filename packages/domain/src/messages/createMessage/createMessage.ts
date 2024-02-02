import { db } from '@/db/connection';
import { messages } from '@/db/schema';
import { createId } from '@paralleldrive/cuid2';
import ms from 'ms';

type InsertData = Omit<
  typeof messages.$inferInsert,
  'createdAt' | 'expiresAt' | 'id'
>;

export default async (data: InsertData): Promise<void> => {
  await db.insert(messages).values({
    ...data,
    expiresAt: new Date(Date.now() + ms(`24 hours`)),
    id: createId(),
  });
};
