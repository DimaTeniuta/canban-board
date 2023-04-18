import { Router } from "express";
import authMiddleware from "../auth/auth.middleware.js";
import { boardCreateValidator, boardUpdateValidator } from "./board.validator.js";
import boardController from "./board.controller.js";

const boardRouter = Router();
boardRouter.get("/boards", authMiddleware, boardController.getAllBoards);
boardRouter.get("/boards/:id", authMiddleware, boardController.getBoard);
boardRouter.post("/boards", authMiddleware, boardCreateValidator, boardController.createBoard);
boardRouter.put("/boards/:id", authMiddleware, boardUpdateValidator, boardController.updateBoard);
boardRouter.delete("/boards/:id", authMiddleware, boardUpdateValidator, boardController.deleteBoard);

export default boardRouter;