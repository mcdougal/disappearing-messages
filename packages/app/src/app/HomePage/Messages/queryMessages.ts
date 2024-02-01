import 'client-only';

import 'server-only';

import { db } from '@/db/connection';
import { QueryResult } from '@/db/types';

type Message = QueryResult<
  'messages',
  {
    expiresAt: true;
    id: true;
    text: true;
  }
>;

export default async (): Promise<Array<Message>> => {
  return db.query.messages.findMany({
    columns: {
      expiresAt: true,
      id: true,
      text: true,
    },
  });
};
