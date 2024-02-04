import { coercedDate } from '@/common/zod';
import { z } from 'zod';

export const PostCreatedEventSchema = z.object({
  name: z.literal(`postCreated`),
  data: z.object({
    post: z.object({
      expiresAt: coercedDate(),
      id: z.string(),
      numUpvotes: z.number(),
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
      id: z.string(),
      numUpvotes: z.number(),
    }),
  }),
});

export type RealtimeEventSchemaType =
  | typeof PostCreatedEventSchema
  | typeof PostUpvotedEventSchema;
