'use client';

import { PaperAirplaneIcon } from '@heroicons/react/20/solid';
import { useFormState } from 'react-dom';

import { createMessage } from '@/app/actions';
import { Textarea } from '@/app/components';

const AddForm = (): React.ReactElement => {
  const [formState, formAction] = useFormState(createMessage, {
    errorMessage: undefined,
  });

  const { errorMessage } = formState;

  return (
    <form action={formAction}>
      <Textarea
        autoFocus
        error={Boolean(errorMessage)}
        helperText={errorMessage}
        id="add-form-message"
        name="message"
        placeholder="Write a disappearing message..."
        submit={{ label: `Send`, icon: PaperAirplaneIcon }}
      />
    </form>
  );
};

export default AddForm;
