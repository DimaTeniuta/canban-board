import { body, param } from "express-validator";

export const boardCreateValidator = [
  body("title", 'The title is required').notEmpty().isString(),
  body("description", 'The description is required').notEmpty().isString(),
  body("userId", 'The userId is required').notEmpty().isString(),
];

export const boardUpdateValidator = [
  body("title", 'The title is required').notEmpty().isString(),
  body("description", 'The description is required').notEmpty().isString(),
  body("userId", 'The userId is required').notEmpty().isString(),
];