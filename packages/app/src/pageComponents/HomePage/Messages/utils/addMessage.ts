import { MessagesFeedMessage } from '@/domain/messagesServer';

export default (
  message: MessagesFeedMessage,
  messages: Array<MessagesFeedMessage>
): Array<MessagesFeedMessage> => {
  const exists = messages.find((m) => {
    return (
      m.id === message.id ||
      (message.id.startsWith(`optimistic-`) &&
        m.text === message.text &&
        m.expiresAt.getTime() === message.expiresAt.getTime())
    );
  });

  if (exists) {
    return messages;
  }

  return [message, ...messages].sort((a, b) => {
    return b.expiresAt.getTime() - a.expiresAt.getTime();
  });
};
