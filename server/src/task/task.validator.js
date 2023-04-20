import { body } from "express-validator";

export const taskValidator = [
  body("title", 'The title is required').notEmpty().isString(),
  body("description", 'The description is required').notEmpty().isString(),
];

export const taskUpdateColumnValidator = [
  body("oldColumn", 'The oldColumn is required').notEmpty().isString(),
  body("newColumn", 'The newColumn is required').notEmpty().isString(),
  body("oldOrder", 'The oldOrder is required').is,
  body("newOrder", 'The newOrder is required').isNumeric(),
];