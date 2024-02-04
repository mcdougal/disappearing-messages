import { coercedDate } from '@/common/zod';
import { z } from 'zod';

export const PostCreatedEventSchema = z.object({
  name: z.literal(`postCreated`),
  data: z.object({
    post: z.object({
      expiresAt: coercedDate(),
      id: z.string(),
      postedAt: coercedDate(),
      text: z.string(),
      author: z.object({
        avatarSrc: z.string(),
        name: z.string(),
      }),
    }),
  }),
});

export const PostUpvotedEventSchema = z.object({
  name: z.literal(`postUpvoted`),
  data: z.object({
    post: z.object({
      postId: z.string(),
      userId: z.string(),
    }),
  }),
});

export type RealtimeEventSchemaType =
  | typeof PostCreatedEventSchema
  | typeof PostUpvotedEventSchema;
