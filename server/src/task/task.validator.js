import { body } from "express-validator";

export const taskValidator = [
  body("title", 'The title is required').notEmpty().isString(),
  body("description", 'The description is required').notEmpty().isString(),
];