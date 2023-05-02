import boardService from "./board.service.js";
import { validationResult } from "express-validator";
import errorService from "../exceptions/error.service.js";
import { chooseBoardResponse } from "./helpers/chooseBoardResponse.js";

class BoardController {
  async getAllBoards(req, res, next) {
    try {
      const userId = req.user.id;
      const boards = await boardService.getAllBoards(userId);
      const response = chooseBoardResponse(res, boards);
      
      return response;
    } catch (error) {
      next(error);
    }
  }

  async getBoard(req, res, next) {
    try {
      const boardId = req.params.id;
      const userId = req.user.id;
      const board = await boardService.getBoard(userId, boardId);
      const response = chooseBoardResponse(res, board);
      
      return response;
    } catch (error) {
      next(error);
    }
  }

  async createBoard(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(res.status(400).json(errorService.setError(errors.errors[0].msg)));
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
      const response = chooseBoardResponse(res, board);

      return response;
    } catch (error) {
      next(error);
    }
  }

  async deleteBoard(req, res, next) {
    try {
      const userId = req.user.id;
      const boardId = req.params.id;
      const board = await boardService.deleteBoard(userId, boardId, );
      const response = chooseBoardResponse(res, board);
      
      return response;
    } catch (error) {
      next(error);
    }
  }
}

const boardController = new BoardController();
export default boardController;
