'use client';

import { QueryMessagesFeedMessage } from '@/domain/messagesServer';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { useRef } from 'react';

import getFormAction from './getFormAction';
import useSubmittedAt from './useSubmittedAt';

type Props = {
  addOptimisticMessage: (message: QueryMessagesFeedMessage) => void;
};

const AddForm = ({ addOptimisticMessage }: Props): React.ReactElement => {
  const formRef = useRef<HTMLFormElement>(null);
  const [submittedAt, setSubmittedAt] = useSubmittedAt();

  const formAction = getFormAction(
    addOptimisticMessage,
    formRef,
    setSubmittedAt
  );

  return (
    <form ref={formRef} action={formAction}>
      <div className="flex items-center rounded-full ring-1 ring-gray-300 focus-within:shadow-lg">
        <label className="sr-only" htmlFor="messageInput">
          What do you want to say?
        </label>
        <input
          autoFocus
          className="w-full border-0 bg-transparent px-8 py-5 focus:ring-0"
          id="messageInput"
          maxLength={255}
          name="message"
          placeholder="What do you want to say?"
          type="text"
        />
        {submittedAt && (
          <div className="px-5">
            <CheckCircleIcon className="animate-grow-in-and-out aspect-square w-8" />
          </div>
        )}
      </div>
    </form>
  );
};

export default AddForm;
