'use client';

import SendIcon from '@mui/icons-material/Send';
import { Button, Stack, TextField } from '@mui/material';
import { useFormState } from 'react-dom';

import { createMessage } from '@/app/actions';

const AddForm = (): React.ReactElement => {
  const [formState, formAction] = useFormState(createMessage, {
    errorMessage: undefined,
  });

  const { errorMessage } = formState;

  return (
    <form action={formAction}>
      <Stack>
        <TextField
          autoFocus
          error={Boolean(errorMessage)}
          helperText={errorMessage}
          id="message"
          multiline
          name="message"
          placeholder="Write a disappearing message..."
          rows={4}
        />
        <Button startIcon={<SendIcon />} type="submit" variant="contained">
          Send
        </Button>
      </Stack>
    </form>
  );
};

export default AddForm;
