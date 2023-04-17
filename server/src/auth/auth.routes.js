import { Router } from "express";
import { authValidator } from './auth.validator.js';
import authController from "./auth.controller.js";
import authMiddleware from "./auth.middleware.js";

const authRouter = Router();

authRouter.post("/registration", authValidator, authController.registration);
authRouter.post("/login", authValidator, authController.login);
authRouter.post("/logout", authController.logout);
authRouter.get("/refresh", authController.refresh);
authRouter.get("/users", authMiddleware, authController.getUsers);

export default authRouter;