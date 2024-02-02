'use client';

import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef, useState } from 'react';

import createMessage from './createMessage';

const AddForm = (): React.ReactElement => {
  const formRef = useRef<HTMLFormElement>(null);
  const [submittedAt, setSubmittedAt] = useState<Date | null>(null);

  const formAction = async (formData: FormData): Promise<void> => {
    if (formData.get(`message`)) {
      setSubmittedAt(new Date());
      formRef.current?.reset();
      await createMessage(formData);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSubmittedAt(null);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [submittedAt]);

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
