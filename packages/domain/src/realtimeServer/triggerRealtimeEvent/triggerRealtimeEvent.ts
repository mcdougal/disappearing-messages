import 'server-only';

import { triggerPusherEvent } from '@/integrations/pusherServer';
import { z } from 'zod';

import { RealtimeEventSchemaType } from '@/domain/realtimeCommon';

export default async <S extends RealtimeEventSchemaType>(
  eventSchema: S,
  channelName: string,
  eventData: z.infer<S>['data']
): Promise<void> => {
  await triggerPusherEvent(eventSchema, channelName, eventData);
};
