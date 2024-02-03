import { QueryMessagesFeedMessage } from '@/domain/messagesServer';
import { usePublicChannel, useSubscribe } from '@/domain/realtimeClient';
import { MessageCreatedEventSchema } from '@/domain/realtimeCommon';
import { useCallback, useEffect, useState } from 'react';

import { addMessage } from './utils';

export default (
  initialMessages: Array<QueryMessagesFeedMessage>
): Array<QueryMessagesFeedMessage> => {
  const [messages, setMessages] = useState(initialMessages);

  const publicChannel = usePublicChannel();

  useSubscribe(
    MessageCreatedEventSchema,
    publicChannel,
    useCallback((eventData) => {
      const message = eventData?.message;

      if (message) {
        setMessages((prevMessages) => {
          return addMessage(message, prevMessages);
        });
      }
    }, [])
  );

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  return messages;
};
