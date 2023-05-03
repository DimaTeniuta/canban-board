import { object, string } from 'yup';

export const validateLoginSchema = object({
  email: string()
    .email()
    .required(),
  password: string()
    .required()
    .min(5),
});
