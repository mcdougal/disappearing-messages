import { Channel } from 'pusher-js';
import { useEffect } from 'react';
import { z } from 'zod';

type EventSchema = z.ZodObject<{
  name: z.ZodLiteral<string>;
  data: z.ZodObject<z.ZodRawShape>;
}>;

export default <S extends EventSchema>(
  eventSchema: S,
  channel: Channel | null,
  callback: (eventData: z.infer<S>['data'] | null) => Promise<void> | void
): void => {
  const eventName = eventSchema.shape.name.value;

  useEffect(() => {
    if (!channel) {
      return;
    }

    const handler = async (eventData: unknown): Promise<void> => {
      console.log(`eventData:`, typeof eventData);
      console.log(eventData);
      const parseResult = eventSchema.safeParse({
        name: eventName,
        data: eventData,
      });
      console.log(`parseResult:`);
      console.log(parseResult);
      const validatedEventData = parseResult.success ? parseResult.data : null;
      await callback(validatedEventData?.data || null);
    };

    console.log(`subscribe`);
    channel.bind(eventName, handler);

    return () => {
      console.log(`unsubscribe`);
      channel.unbind(eventName, handler);
    };
  }, [eventSchema, eventName, channel, callback]);
};
