import { User, getExpiresAt } from '@/domain/messagesCommon';
import { MessagesFeedMessage } from '@/domain/messagesServer';
import { RefObject } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

import createMessage from './createMessage';

const FormDataSchema = z.object({
  message: z.string().min(1),
});

type FormAction = (formData: FormData) => Promise<void>;

export default (
  upsertOptimisticMessage: (message: MessagesFeedMessage) => void,
  formRef: RefObject<HTMLFormElement>,
  user: User
): FormAction => {
  return async (formData): Promise<void> => {
    const parsed = FormDataSchema.safeParse({
      message: formData.get(`message`),
    });

    if (!parsed.success) {
      return;
    }

    const { message } = parsed.data;
    const expiresAt = getExpiresAt();

    formRef.current?.reset();

    upsertOptimisticMessage({
      createdAt: new Date(),
      expiresAt,
      id: `optimistic-${uuidv4()}`,
      numUpvotes: 0,
      text: message,
      userAvatarSrc: user.avatarSrc,
      userName: user.name,
    });

    await createMessage({
      expiresAt,
      text: message,
      userAvatarSrc: user.avatarSrc,
      userName: user.name,
    });
  };
};
