import { getExpiresAt } from '@/domain/messagesCommon';
import { MessagesFeedMessage } from '@/domain/messagesServer';

import upvoteMessage from './upvoteMessage';

type FormAction = () => Promise<void>;

export default (
  message: MessagesFeedMessage,
  upsertOptimisticMessage: (message: MessagesFeedMessage) => void
): FormAction => {
  return async (): Promise<void> => {
    const expiresAt = getExpiresAt();

    upsertOptimisticMessage({
      ...message,
      expiresAt,
      numUpvotes: message.numUpvotes + 1,
    });

    await upvoteMessage({
      data: { expiresAt },
      where: { id: message.id },
    });
  };
};
