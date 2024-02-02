import { createMessage } from '@/domain/messages';

export default async (): Promise<void> => {
  if (Math.random() < 0.5) {
    await createMessage({
      text: `this is a fake message`,
    });
  }
};
