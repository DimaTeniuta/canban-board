import { body } from "express-validator";

export const authRegisterValidator = [
  body("email", 'Wrong Email').isEmail(),
  body("password", "The password length must be between 5 and 32").isString().isLength({ min: 5, max: 32 }),
  body("name", "The name length must be between 3 and 32").isString().isLength({ min: 3, max: 32 }),
];

export const authLoginValidator = [
  body("email", 'Wrong Email').isEmail(),
  body("password", "The password length must be between 5 and 32").isString().isLength({ min: 5, max: 32 }),
];