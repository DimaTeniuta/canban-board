import { Router } from "express";
import userController from "../controllers/user.controller.js";
import handleValidationErrors from "../utils/handleValidationErrors.js";
import { authValidator } from "../validator/auth.js";
export { body } from 'express-validator';

const router = Router();

router.post("/registration", authValidator, userController.registration);
router.post("/login", authValidator, handleValidationErrors, userController.login);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);
router.get("/users", userController.getUsers);

export default router;
