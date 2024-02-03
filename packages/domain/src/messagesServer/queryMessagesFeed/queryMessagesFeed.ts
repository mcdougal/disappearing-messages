import 'server-only';

import { db, desc, gt } from '@/db/connection';
import { messages } from '@/db/schema';
import { QueryResult } from '@/db/types';

export type MessagesFeedMessage = QueryResult<
  'messages',
  {
    createdAt: true;
    expiresAt: true;
    id: true;
    text: true;
  }
>;

export default async (): Promise<Array<MessagesFeedMessage>> => {
  return db.query.messages.findMany({
    columns: {
      createdAt: true,
      expiresAt: true,
      id: true,
      text: true,
    },
    where: gt(messages.expiresAt, new Date()),
    orderBy: [desc(messages.expiresAt)],
  });
};
