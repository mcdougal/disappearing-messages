import { MessagesFeedMessage } from '@/domain/messagesServer';
import { usePublicChannel, useSubscribe } from '@/domain/realtimeClient';
import { MessageUpvotedEventSchema } from '@/domain/realtimeCommon';
import { useCallback, useState } from 'react';

export default (initialMessage: MessagesFeedMessage): MessagesFeedMessage => {
  const [message, setMessage] = useState(initialMessage);

  useSubscribe(
    MessageUpvotedEventSchema,
    usePublicChannel(),
    useCallback((eventData) => {
      const updatedMessage = eventData?.message;

      setMessage((prevMessage) => {
        if (
          updatedMessage &&
          updatedMessage.id === prevMessage.id &&
          updatedMessage.numUpvotes > prevMessage.numUpvotes
        ) {
          return { ...prevMessage, ...updatedMessage };
        }

        return prevMessage;
      });
    }, [])
  );

  return message;
};
