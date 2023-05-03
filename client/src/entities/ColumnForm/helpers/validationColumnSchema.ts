import { object, string } from 'yup';

export const validationColumnSchema = object({
  title: string()
    .required()
    .min(3),
});
