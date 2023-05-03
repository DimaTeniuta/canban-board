import { body } from "express-validator";

export const taskValidator = [
  body("title", 'The title is required').notEmpty().isString(),
  body("description", 'The description is required').notEmpty().isString(),
];

export const taskOrderValidator = [
  body("oldOrder", 'The oldOrder must be a number').isNumeric(),
  body("newOrder", 'The newOrder must be a number').isNumeric(),
];

export const taskColumnOrderValidator = [
  body("taskId", 'The taskId is required').notEmpty().isString(),
  body("oldOrder", 'The oldOrder must be a number').isNumeric(),
  body("newOrder", 'The newOrder must be a number').isNumeric(),
];