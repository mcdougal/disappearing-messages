import 'server-only';

import { asc, db, eq } from '@/db/connection';
import { comment, post } from '@/db/schema';
import { QueryResult } from '@/db/types';

type QueryArgs = {
  where: {
    id: string;
  };
};

export type Post = QueryResult<
  'post',
  {
    expiresAt: true;
    id: true;
    numUpvotes: true;
    postedAt: true;
    text: true;
    updatedAt: true;
  },
  {
    author: {
      columns: {
        avatarSrc: true;
        name: true;
      };
    };
    comments: {
      columns: {
        id: true;
        text: true;
      };
      with: {
        author: {
          columns: {
            avatarSrc: true;
            name: true;
          };
        };
      };
    };
    upvotes: {
      columns: {
        userId: true;
      };
    };
  }
>;

export default async ({ where }: QueryArgs): Promise<Post | null> => {
  const matchingPost = await db.query.post.findFirst({
    where: eq(post.id, where.id),
    columns: {
      expiresAt: true,
      id: true,
      postedAt: true,
      text: true,
      updatedAt: true,
    },
    with: {
      author: {
        columns: {
          avatarSrc: true,
          name: true,
        },
      },
      comments: {
        orderBy: [asc(comment.createdAt)],
        columns: {
          id: true,
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
      },
      upvotes: {
        columns: {
          userId: true,
        },
      },
    },
  });

  return matchingPost || null;
};
