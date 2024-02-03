'use client';

import { User } from '@/domain/messagesCommon';
import { MessagesFeedMessage } from '@/domain/messagesServer';
import Image from 'next/image';
import { useRef } from 'react';

import getFormAction from './getFormAction';

type Props = {
  addOptimisticMessage: (message: MessagesFeedMessage) => void;
  user: User;
};

const AddForm = ({ addOptimisticMessage, user }: Props): React.ReactElement => {
  const formRef = useRef<HTMLFormElement>(null);
  const formAction = getFormAction(addOptimisticMessage, formRef, user);

  return (
    <form ref={formRef} action={formAction}>
      <div className="flex items-center rounded-full ring-1 ring-gray-300 focus-within:shadow-lg">
        <div className="pl-4">
          <Image
            alt={`User avatar for ${user.name}`}
            height={40}
            src={user.avatarSrc}
            width={40}
          />
        </div>
        <label className="sr-only" htmlFor="messageInput">
          What do you want to say?
        </label>
        <input
          autoFocus
          className="w-full border-0 bg-transparent py-5 pl-4 pr-8 focus:ring-0"
          id="messageInput"
          maxLength={255}
          name="message"
          placeholder="What do you want to say?"
          type="text"
        />
      </div>
    </form>
  );
};

export default AddForm;
