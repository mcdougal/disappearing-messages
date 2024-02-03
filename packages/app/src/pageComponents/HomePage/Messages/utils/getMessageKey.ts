import { MessagesFeedMessage } from '@/domain/messagesServer';

export default (message: MessagesFeedMessage): string => {
  return JSON.stringify({
    text: message.text,
    userAvatarSrc: message.userAvatarSrc,
    userName: message.userName,
  });
};
