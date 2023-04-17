import { Router } from "express";
import { authLoginValidator, authRegisterValidator } from './auth.validator.js';
import authController from "./auth.controller.js";
import authMiddleware from "./auth.middleware.js";

const authRouter = Router();

authRouter.post("/registration", authRegisterValidator, authController.registration);
authRouter.post("/login", authLoginValidator, authController.login);
authRouter.post("/logout", authController.logout);
authRouter.get("/refresh", authController.refresh);
authRouter.get("/users", authMiddleware, authController.getUsers);

export default authRouter;