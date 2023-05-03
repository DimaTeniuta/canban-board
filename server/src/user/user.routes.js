import { Router } from "express";
import authMiddleware from "../auth/auth.middleware.js";
import userController from "./user.controller.js";

const userRouter = Router();
userRouter.get("/users/:id", authMiddleware, userController.getUser);
userRouter.put("/users/:id", authMiddleware, userController.updateUser);
userRouter.delete("/users/:id", authMiddleware, userController.deleteUser);

export default userRouter;