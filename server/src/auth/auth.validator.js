import { body } from "express-validator";

export const authRegisterValidator = [
  body("email", 'Wrong Email').isEmail(),
  body("password", "The password length must exceed 5").isLength({ min: 5, max: 32 }),
  body("name", "The name length must exceed 3").isLength({ min: 3, max: 32 }),
];

export const authLoginValidator = [
  body("email", 'Wrong Email').isEmail(),
  body("password", "The password length must exceed 5").isLength({ min: 5, max: 32 }),
];