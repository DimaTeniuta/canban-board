import { body } from "express-validator";

export const authValidator = [
  body("email", 'Wrong Email').isEmail(),
  body("password", "The password length must exceed 5").isLength({ min: 5, max: 32 }),
];
