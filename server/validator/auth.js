import { body } from "express-validator";

export const registerValidator = [
  body("email", 'Wrong Email').isEmail(),
  body("password", "The password length must exceed 5").isLength({ min: 5 }),
  body("fullName", 'The fullName length must exceed 3').isLength({ min: 3 }),
  body("avatarUrl", 'The avatarUrl must be in String format').optional().isURL(),
];

export const loginValidator = [
  body("email", 'Wrong Email').isEmail(),
  body("password", "The password length must exceed 5").isLength({ min: 5 }),
];
