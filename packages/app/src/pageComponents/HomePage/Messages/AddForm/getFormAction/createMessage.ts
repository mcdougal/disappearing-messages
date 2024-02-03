'use server';

import { createMessage } from '@/domain/messagesServer';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const FormDataSchema = z.object({
  message: z.string().min(1),
});

export default async (formData: FormData, expiresAt: Date): Promise<void> => {
  const parsed = FormDataSchema.safeParse({
    message: formData.get(`message`),
  });

  if (parsed.success) {
    await createMessage({
      expiresAt,
      text: parsed.data.message.trim(),
    });

    revalidatePath(`/`);
  }
};
