import { body } from "express-validator";

export const columnValidator = [
  body("title", 'The title is required').notEmpty().isString(),
];

export const columnOrderValidator = [
  body("oldOrder", 'The oldOrder must be a number').isNumeric(),
  body("newOrder", 'The newOrder must be a number').isNumeric(),
];