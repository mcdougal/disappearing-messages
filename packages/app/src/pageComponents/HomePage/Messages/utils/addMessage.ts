import { QueryMessagesFeedMessage } from '@/domain/messagesServer';

export default (
  message: QueryMessagesFeedMessage,
  messages: Array<QueryMessagesFeedMessage>
): Array<QueryMessagesFeedMessage> => {
  const exists = messages.find((m) => {
    return (
      m.id === message.id ||
      (message.id.startsWith(`optimistic-`) &&
        m.text === message.text &&
        m.expiresAt.getTime() === message.expiresAt.getTime())
    );
  });

  console.log(`----------------------`);
  console.log(`message:`, message);
  console.log(`messages:`, messages);
  console.log(`exists:`, exists);

  if (exists) {
    return messages;
  }

  return [message, ...messages].sort((a, b) => {
    return b.expiresAt.getTime() - a.expiresAt.getTime();
  });
};
