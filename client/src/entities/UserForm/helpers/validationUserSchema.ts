import { object, string } from 'yup';

export const validationUserSchema = object({
  name: string()
    .required()
    .min(3)
    .max(32),
});
