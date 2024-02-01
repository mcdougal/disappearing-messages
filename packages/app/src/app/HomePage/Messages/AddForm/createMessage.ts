'use server';

import { db } from '@/db/connection';
import { messages } from '@/db/schema';
import { createId } from '@paralleldrive/cuid2';
import ms from 'ms';
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
    await db.insert(messages).values({
      expiresAt: new Date(Date.now() + ms(`10 seconds`)),
      id: createId(),
      text: parsed.data.message.trim(),
    });

    revalidatePath(`/`);
  }
};
