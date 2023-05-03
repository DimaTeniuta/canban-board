import { object, string } from 'yup';

export const validationTaskSchema = object({
  title: string()
    .required()
    .min(3),
  description: string()
    .required()
    .min(3),
});
