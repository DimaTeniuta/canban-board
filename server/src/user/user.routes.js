import { Router } from "express";
import authMiddleware from "../auth/auth.middleware.js";
import userController from "./user.controller.js";
import { userValidator } from "./user.validator.js";

const userRouter = Router();
userRouter.get("/users/:id", authMiddleware, userController.getUser);
userRouter.put("/users/:id", authMiddleware, userValidator, userController.updateUser);
userRouter.delete("/users/:id", authMiddleware, userController.deleteUser);

export default userRouter;