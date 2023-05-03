import { object, string } from 'yup';

export const validationBoardSchema = object({
  title: string().required(),
  description: string()
    .required()
    .min(5),
});
