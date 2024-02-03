import { MessagesFeedMessage } from '@/domain/messagesServer';
import { RefObject, useEffect } from 'react';

import getOpacity from './getOpacity';

export default (
  messageRef: RefObject<HTMLDivElement>,
  message: MessagesFeedMessage
): void => {
  const { createdAt, expiresAt } = message;

  useEffect(() => {
    const interval = setInterval(() => {
      if (messageRef.current) {
        messageRef.current.style.opacity = getOpacity(
          createdAt,
          expiresAt
        ).toString();
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [createdAt, expiresAt, messageRef]);
};
