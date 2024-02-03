import 'client-only';

import { Channel, useBind } from '@/integrations/pusherClient';
import { z } from 'zod';

import { RealtimeEventSchemaType } from '@/domain/realtimeCommon';

export default <S extends RealtimeEventSchemaType>(
  eventSchema: S,
  channel: Channel | null,
  callback: (eventData: z.infer<S>['data'] | null) => Promise<void> | void
): void => {
  useBind(eventSchema, channel, callback);
};
