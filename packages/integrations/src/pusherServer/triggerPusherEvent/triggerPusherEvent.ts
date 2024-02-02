import { getRequiredEnvVar } from '@/common/env';
import { sleep } from '@/common/sleep';
import Pusher from 'pusher';
import { z } from 'zod';

import isRequestError from './isRequestError';
import { EventSchema } from './types';

// See: https://pusher.com/docs/channels/library_auth_reference/rest-api/#general
const RATE_LIMIT_HTTP_STATUS_CODE = 403;
const TOO_BIG_HTTP_STATUS_CODE = 413;
const MAX_RETRIES = 10;
const RETRY_DELAY_MS = 2000;

export default async <S extends EventSchema>(
  eventSchema: S,
  channelName: string,
  eventData: z.infer<S>['data']
): Promise<void> => {
  const pusher = new Pusher({
    appId: getRequiredEnvVar(`PUSHER_APP_ID`),
    cluster: getRequiredEnvVar(`NEXT_PUBLIC_PUSHER_CLUSTER`),
    key: getRequiredEnvVar(`NEXT_PUBLIC_PUSHER_KEY`),
    secret: getRequiredEnvVar(`PUSHER_SECRET`),
    useTLS: true,
  });

  const eventName = eventSchema.shape.name.value;

  let numRetries = 0;
  let lastError: unknown;

  while (numRetries < MAX_RETRIES) {
    try {
      await pusher.trigger(channelName, eventName, eventData);
      return;
    } catch (error) {
      if (!isRequestError(error)) {
        throw error;
      }

      const { status } = error;

      if (status === TOO_BIG_HTTP_STATUS_CODE) {
        throw new Error(`Event data too big to send to Pusher`);
      }

      if (status !== RATE_LIMIT_HTTP_STATUS_CODE) {
        throw error;
      }

      lastError = error;
      numRetries += 1;

      await sleep(RETRY_DELAY_MS);
    }
  }

  throw lastError;
};
