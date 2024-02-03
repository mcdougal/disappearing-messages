import { MessagesFeedMessage } from '@/domain/messagesServer';
import { usePublicChannel, useSubscribe } from '@/domain/realtimeClient';
import { MessageCreatedEventSchema } from '@/domain/realtimeCommon';
import { useCallback, useState } from 'react';

import { upsertMessage } from './utils';

export default (
  initialMessages: Array<MessagesFeedMessage>
): Array<MessagesFeedMessage> => {
  const [messages, setMessages] = useState(initialMessages);

  useSubscribe(
    MessageCreatedEventSchema,
    usePublicChannel(),
    useCallback((eventData) => {
      const message = eventData?.message;

      if (message) {
        setMessages((prevMessages) => {
          return upsertMessage(message, prevMessages);
        });
      }
    }, [])
  );

  return messages;
};
