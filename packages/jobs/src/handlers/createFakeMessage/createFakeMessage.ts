import { getExpiresAt, makeRandomUser } from '@/domain/messagesCommon';
import { createMessage } from '@/domain/messagesServer';

export default async (): Promise<void> => {
  if (Math.random() < 0.5) {
    const user = makeRandomUser();

    await createMessage({
      expiresAt: getExpiresAt(),
      text: `this is a fake message`,
      userAvatarSrc: user.avatarSrc,
      userName: user.name,
    });
  }
};
