import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { authValidator } from "../validator/auth.js";
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.post("/registration", authValidator, userController.registration);
router.post("/login", authValidator, userController.login);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);
router.get("/users", authMiddleware, userController.getUsers);

export default router;
