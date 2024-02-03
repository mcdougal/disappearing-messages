import { MessagesFeedMessage } from '@/domain/messagesServer';

import getMessageKey from './getMessageKey';

export default (
  message: MessagesFeedMessage,
  messages: Array<MessagesFeedMessage>
): Array<MessagesFeedMessage> => {
  const exists = messages.find((m) => {
    return (
      m.id === message.id ||
      (message.id.startsWith(`optimistic-`) &&
        getMessageKey(m) === getMessageKey(message))
    );
  });

  if (exists) {
    return messages;
  }

  return [message, ...messages].sort((a, b) => {
    return b.expiresAt.getTime() - a.expiresAt.getTime();
  });
};
