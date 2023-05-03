import { Router } from "express";
import { authLoginValidator, authRegisterValidator } from './auth.validator.js';
import authController from "./auth.controller.js";

const authRouter = Router();

authRouter.post("/registration", authRegisterValidator, authController.registration);
authRouter.post("/login", authLoginValidator, authController.login);
authRouter.post("/logout", authController.logout);
authRouter.get("/refresh", authController.refresh);

export default authRouter;