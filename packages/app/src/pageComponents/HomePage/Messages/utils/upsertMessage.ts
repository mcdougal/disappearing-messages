import { MessagesFeedMessage } from '@/domain/messagesServer';

import getMessageKey from './getMessageKey';

export default (
  message: MessagesFeedMessage,
  messages: Array<MessagesFeedMessage>
): Array<MessagesFeedMessage> => {
  const existingIndex = messages.findIndex((m) => {
    return (
      m.id === message.id ||
      (message.id.startsWith(`optimistic-`) &&
        getMessageKey(m) === getMessageKey(message))
    );
  });

  const newMessages =
    existingIndex !== -1
      ? [
          ...messages.slice(0, existingIndex),
          { ...messages[existingIndex], ...message },
          ...messages.slice(existingIndex + 1),
        ]
      : [message, ...messages];

  return newMessages.sort((a, b) => {
    return b.expiresAt.getTime() - a.expiresAt.getTime();
  });
};
