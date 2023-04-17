import { object, string } from 'yup';

export const validateRegisterSchema = object({
  email: string()
    .email()
    .required(),
  password: string()
    .required()
    .min(5),
  name: string()
    .required()
    .min(3),
});
