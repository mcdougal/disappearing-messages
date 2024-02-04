import 'server-only';

import { db, desc, gt } from '@/db/connection';
import { post } from '@/db/schema';
import { QueryResult } from '@/db/types';

export type PostsFeedPost = QueryResult<
  'post',
  {
    expiresAt: true;
    id: true;
    numUpvotes: true;
    postedAt: true;
    text: true;
  },
  {
    author: {
      columns: {
        avatarSrc: true;
        name: true;
      };
    };
  }
>;

export default async (): Promise<Array<PostsFeedPost>> => {
  return db.query.post.findMany({
    where: gt(post.expiresAt, new Date()),
    orderBy: [desc(post.postedAt)],
    columns: {
      expiresAt: true,
      id: true,
      numUpvotes: true,
      postedAt: true,
      text: true,
    },
    with: {
      author: {
        columns: {
          avatarSrc: true,
          name: true,
        },
      },
    },
  });
};
