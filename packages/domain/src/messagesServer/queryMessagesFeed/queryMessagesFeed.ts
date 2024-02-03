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
    numUpvotes: true;
    text: true;
    userAvatarSrc: true;
    userName: true;
  }
>;

export default async (): Promise<Array<MessagesFeedMessage>> => {
  return db.query.messages.findMany({
    where: gt(messages.expiresAt, new Date()),
    orderBy: [desc(messages.expiresAt)],
    columns: {
      createdAt: true,
      expiresAt: true,
      id: true,
      numUpvotes: true,
      text: true,
      userAvatarSrc: true,
      userName: true,
    },
  });
};
