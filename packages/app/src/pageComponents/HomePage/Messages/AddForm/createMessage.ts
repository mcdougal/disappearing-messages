'use server';

import { createMessage } from '@/domain/messages';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const FormDataSchema = z.object({
  message: z.string().min(1),
});

export default async (formData: FormData): Promise<void> => {
  const parsed = FormDataSchema.safeParse({
    message: formData.get(`message`),
  });

  if (parsed.success) {
    await createMessage({
      text: parsed.data.message.trim(),
    });

    revalidatePath(`/`);
  }
};
