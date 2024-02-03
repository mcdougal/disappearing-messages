import { getExpiresAt } from '@/domain/messagesCommon';
import { MessagesFeedMessage } from '@/domain/messagesServer';
import { RefObject } from 'react';

import createMessage from './createMessage';

type FormAction = (formData: FormData) => Promise<void>;

export default (
  addOptimisticMessage: (message: MessagesFeedMessage) => void,
  formRef: RefObject<HTMLFormElement>
): FormAction => {
  return async (formData): Promise<void> => {
    const message = formData.get(`message`);

    if (!message) {
      return;
    }

    const expiresAt = getExpiresAt();
    const optimisticMessage = {
      createdAt: new Date(),
      expiresAt,
      id: `optimistic-${Date.now()}`,
      text: message.toString(),
    };

    formRef.current?.reset();
    addOptimisticMessage(optimisticMessage);
    await createMessage(formData, expiresAt);
  };
};
