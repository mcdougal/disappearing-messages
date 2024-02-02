import { z } from 'zod';

export type EventSchema = z.ZodObject<{
  name: z.ZodLiteral<string>;
  data: z.ZodObject<z.ZodRawShape>;
}>;

export type RequestError = {
  status: number;
};
