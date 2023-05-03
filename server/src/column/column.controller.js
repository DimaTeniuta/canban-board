import errorService from "../exceptions/error.service.js";
import columnService from "./column.service.js";
import { validationResult } from "express-validator";
import { chooseColumnResponse } from "./helpers/chooseColumnResponse.js";

class ColumnController {
  async getColumns(req, res, next) {
    try {
        const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(res.status(400).json(errorService.setError(errors.errors[0].msg)));
      }
      const boardId = req.params.id;
      const userId = req.user.id;
      const columns = await columnService.getColumns(userId, boardId);
      const response = chooseColumnResponse(res, columns);

      return response;
    } catch (error) {
      next(error);
    }
  }

  async createColumn(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(res.status(400).json(errorService.setError(errors.errors[0].msg)));
      }
      const boardId = req.params.id;
      const userId = req.user.id;
      const { title } = req.body;
      const column = await columnService.createColumn(userId, boardId, title);
      const response = chooseColumnResponse(res, column);

      return response;
    } catch (error) {
      next(error);
    }
  }

  async updateColumn(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(res.status(400).json("Validation error"));
      }
      const boardId = req.params.id;
      const columnId = req.params.columnId;
      const userId = req.user.id;
      const { title } = req.body;
      const column = await columnService.updateColumn(userId, boardId, columnId, title);
      const response = chooseColumnResponse(res, column);

      return response;
    } catch (error) {
      next(error);
    }
  }

  async updateColumnOrder(req, res, next) {
    try {
      const boardId = req.params.id;
      const userId = req.user.id;
      const { oldOrder, newOrder } = req.body;
      const column = await columnService.updateColumnOrder(userId, boardId, oldOrder, newOrder);
      const response = chooseColumnResponse(res, column);

      return response;
    } catch (error) {
      next(error);
    }
  }

  async deleteColumn(req, res, next) {
    try {
      const boardId = req.params.id;
      const columnId = req.params.columnId;
      const userId = req.user.id;
      const column = await columnService.deleteColumn(userId, boardId, columnId);
      const response = chooseColumnResponse(res, column);

      return response;
    } catch (error) {
      next(error);
    }
  }
}

const columnController = new ColumnController();
export default columnController;
