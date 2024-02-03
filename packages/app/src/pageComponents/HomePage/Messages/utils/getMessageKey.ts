import { MessagesFeedMessage } from '@/domain/messagesServer';

export default (message: MessagesFeedMessage): string => {
  return JSON.stringify({
    expiresAt: message.expiresAt.getTime(),
    text: message.text,
    userAvatarSrc: message.userAvatarSrc,
    userName: message.userName,
  });
};
