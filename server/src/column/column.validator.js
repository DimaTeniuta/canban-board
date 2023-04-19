import { body } from "express-validator";

export const columnValidator = [
  body("title", 'The title is required').notEmpty().isString(),
];