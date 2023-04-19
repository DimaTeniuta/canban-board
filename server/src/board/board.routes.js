import { Router } from "express";
import authMiddleware from "../auth/auth.middleware.js";
import { boardValidator } from "./board.validator.js";
import boardController from "./board.controller.js";

const boardRouter = Router();
boardRouter.get("/boards", authMiddleware, boardController.getAllBoards);
boardRouter.get("/boards/:id", authMiddleware, boardController.getBoard);
boardRouter.post("/boards", authMiddleware, boardValidator, boardController.createBoard);
boardRouter.put("/boards/:id", authMiddleware, boardValidator, boardController.updateBoard);
boardRouter.delete("/boards/:id", authMiddleware, boardValidator, boardController.deleteBoard);

export default boardRouter;