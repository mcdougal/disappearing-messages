'use server';
import { z } from 'zod';

const FormDataSchema = z.object({
  message: z.string().min(1),
});

export default async (formData: FormData): Promise<void> => {
  const parsed = FormDataSchema.safeParse({
    message: formData.get(`message`),
  });

  console.log(parsed);
};
