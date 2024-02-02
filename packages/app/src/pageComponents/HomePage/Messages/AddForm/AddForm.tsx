'use client';

import { useRef } from 'react';

import createMessage from './createMessage';

const AddForm = (): React.ReactElement => {
  const formRef = useRef<HTMLFormElement>(null);

  const formAction = async (formData: FormData): Promise<void> => {
    formRef.current?.reset();
    await createMessage(formData);
  };

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
      </div>
    </form>
  );
};

export default AddForm;
