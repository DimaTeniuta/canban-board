import boardService from "./board.service.js";
import { validationResult } from "express-validator";

class BoardController {
  async getAllBoards(req, res, next) {
    try {
      const userId = req.user.id;
      const boards = await boardService.getAllBoards(userId);
      res.json(boards);
    } catch (error) {
      next(error);
    }
  }

  async getBoard(req, res, next) {
    try {
      const boardId = req.params.id;
      const board = await boardService.getBoard(boardId);
      const userId = req.user.id;
      if (board.userId !== userId) {
        return res.status(400).json("Bad request");
      }
      res.json(board);
    } catch (error) {
      next(error);
    }
  }

  async createBoard(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(res.status(400).json("Validation error"));
      }
      const userId = req.user.id;
      const { title, description } = req.body;
      const board = await boardService.createBoard(userId, title, description);
      res.json(board);
    } catch (error) {
      next(error);
    }
  }

  async updateBoard(req, res, next) {
    try {
      const userId = req.user.id;
      const boardId = req.params.id;

      const { title, description } = req.body;
      const board = await boardService.updateBoard(userId, boardId, {
        title,
        description,
      });
      if (typeof board === "string") {
        if (board === 'Not Found') {
          return res.status(404).json(board);
        }
        return res.status(400).json(board);
      }
      res.json(board);
    } catch (error) {
      next(error);
    }
  }
  async deleteBoard(req, res, next) {
    try {
      const userId = req.user.id;
      const boardId = req.params.id;

      const board = await boardService.deleteBoard(userId, boardId, );
      if (typeof board === "string") {
        if (board === 'Not Found') {
          return res.status(404).json(board);
        }
        return res.status(400).json(board);
      }
      res.json(board);
    } catch (error) {
      next(error);
    }
  }
}

const boardController = new BoardController();
export default boardController;
