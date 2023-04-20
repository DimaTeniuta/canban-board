import columnService from "./column.service.js";
import { validationResult } from "express-validator";

class ColumnController {
  async getColumns(req, res, next) {
    try {
        const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(res.status(400).json("Validation error"));
      }
      const boardId = req.params.id;
      const userId = req.user.id;
      const columns = await columnService.getColumns(userId, boardId);
      res.json(columns);
    } catch (error) {
      next(error);
    }
  }

  async createColumn(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(res.status(400).json("Validation error"));
      }
      const boardId = req.params.id;
      const userId = req.user.id;
      const { title } = req.body;
      const column = await columnService.createColumn(userId, boardId, title);
      if (typeof column === "string") {
        if (column === 'Not Found') {
          return res.status(404).json(column);
        }
        return res.status(400).json(column);
      }
      res.json(column);
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
      if (typeof column === "string") {
        if (column === 'Not Found') {
          return res.status(404).json(column);
        }
        return res.status(400).json(column);
      }
      res.json(column);
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
      if (typeof column === "string") {
        if (column === 'Not Found') {
          return res.status(404).json(column);
        }
        return res.status(400).json(column);
      }
      res.json(column);
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
      if (typeof column === "string") {
        if (column === 'Not Found') {
          return res.status(404).json(column);
        }
        return res.status(400).json(column);
      }
      res.json(column);
    } catch (error) {
      next(error);
    }
  }
}

const columnController = new ColumnController();
export default columnController;
