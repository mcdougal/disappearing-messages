import { getExpiresAt } from '@/domain/messagesCommon';
import { createMessage } from '@/domain/messagesServer';

export default async (): Promise<void> => {
  if (Math.random() < 0.5) {
    await createMessage({
      expiresAt: getExpiresAt(),
      text: `this is a fake message`,
    });
  }
};
