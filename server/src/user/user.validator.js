import { body } from "express-validator";

export const userValidator = [
    body("name", "The name length must be between 3 and 32").isString().isLength({ min: 3, max: 32 }),
];