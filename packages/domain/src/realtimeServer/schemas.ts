import { coercedDate } from '@/common/zod';
import { z } from 'zod';

export const MessageCreatedEventSchema = z.object({
  name: z.literal(`messageCreated`),
  data: z.object({
    message: z.object({
      createdAt: coercedDate(),
      expiresAt: coercedDate(),
      id: z.string(),
      text: z.string(),
    }),
  }),
});

export type RealtimeEventSchemaType = typeof MessageCreatedEventSchema;
