import { QueryMessagesFeedMessage } from '@/domain/messages';
import { usePublicChannel, useSubscribe } from '@/domain/realtimeClient';
import { MessageCreatedEventSchema } from '@/domain/realtimeCommon';
import { useCallback, useEffect, useState } from 'react';

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
          const exists = prevMessages.find((m) => {
            m.id === message.id;
          });
          if (exists) {
            return prevMessages;
          }
          return [message, ...prevMessages].sort((a, b) => {
            return b.expiresAt.getTime() - a.expiresAt.getTime();
          });
        });
      }
    }, [])
  );

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  return messages;
};
