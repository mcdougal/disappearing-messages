'use server';
import { z } from 'zod';

const schema = z.object({
  message: z.string().min(1),
});

const errorMap: z.ZodErrorMap = (error, context) => {
  if (error.code === z.ZodIssueCode.too_small) {
    return { message: `Required` };
  }
  return { message: context.defaultError };
};

type CreateMessageResponse = {
  errorMessage: string | undefined;
};

export default async (
  prevState: CreateMessageResponse,
  formData: FormData
): Promise<CreateMessageResponse> => {
  const parse = schema.safeParse(
    {
      message: formData.get(`message`),
    },
    { errorMap }
  );

  if (!parse.success) {
    return { errorMessage: parse.error.message };
  }

  return { errorMessage: undefined };
};
