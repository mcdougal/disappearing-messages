import { getExpiresAt } from '@/domain/messagesCommon';
import { QueryMessagesFeedMessage } from '@/domain/messagesServer';
import { Dispatch, RefObject, SetStateAction } from 'react';

import createMessage from './createMessage';

type FormAction = (formData: FormData) => Promise<void>;

export default (
  addOptimisticMessage: (message: QueryMessagesFeedMessage) => void,
  formRef: RefObject<HTMLFormElement>,
  setSubmittedAt: Dispatch<SetStateAction<Date | null>>
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

    setSubmittedAt(new Date());
    formRef.current?.reset();
    addOptimisticMessage(optimisticMessage);
    await createMessage(formData, expiresAt);
  };
};
