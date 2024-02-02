import { createMessage } from '@/domain/messages';

export default async (): Promise<void> => {
  await createMessage({
    text: `this is a fake message`,
  });
};
