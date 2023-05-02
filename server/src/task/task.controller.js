import taskService from "./task.service.js";
import { validationResult } from "express-validator";
import errorService from '../exceptions/error.service.js';
import { chooseTaskResponse } from "./helpers/chooseTaskResponse.js";

class TaskController {
  async getAllTasks(req, res, next) {
    try {
      const boardId = req.params.id;
      const userId = req.user.id;
      const columnId = req.params.columnId;
      const tasks = await taskService.getAllTasks(userId, boardId, columnId);
      const response = chooseTaskResponse(res, tasks);

      return response;
    } catch (error) {
      next(error);
    }
  }

  async getTask(req, res, next) {
    try {
      const boardId = req.params.id;
      const userId = req.user.id;
      const columnId = req.params.columnId;
      const taskId = req.params.taskId;
      const task = await taskService.getTask(userId, boardId, columnId, taskId);
      const response = chooseTaskResponse(res, task);

      return response;
    } catch (error) {
      next(error);
    }
  }

  async createTask(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(res.status(400).json(errorService.setError(errors.errors[0].msg)));
      }
      const boardId = req.params.id;
      const userId = req.user.id;
      const columnId = req.params.columnId;
      const { title, description } = req.body;
      const task = await taskService.createTask(userId, boardId, columnId, { title, description });
      const response = chooseTaskResponse(res, task);

      return response;
    } catch (error) {
      next(error);
    }
  }

  async updateTask(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(res.status(400).json(errorService.setError(errors.errors[0].msg)));
      }
      const boardId = req.params.id;
      const userId = req.user.id;
      const columnId = req.params.columnId;
      const taskId = req.params.taskId;
      const { title, description } = req.body;
      const task = await taskService.updateTask(userId, boardId, columnId, taskId, { title, description });
      const response = chooseTaskResponse(res, task);

      return response;
    } catch (error) {
      next(error);
    }
  }

  async deleteTask(req, res, next) {
    try {
      const boardId = req.params.id;
      const userId = req.user.id;
      const columnId = req.params.columnId;
      const taskId = req.params.taskId;
      const tasks = await taskService.deleteTask(userId, boardId, columnId, taskId);
      const response = chooseTaskResponse(res, tasks);

      return response;
    } catch (error) {
      next(error);
    }
  }

  async updateTaskOrder(req, res, next) {
    try {
      const boardId = req.params.id;
      const userId = req.user.id;
      const columnId = req.params.columnId;
      const { oldOrder, newOrder } = req.body;
      const tasks = await taskService.updateTaskOrder(userId, boardId, columnId, oldOrder, newOrder);
      const response = chooseTaskResponse(res, tasks);

      return response;
    } catch (error) {
      next(error);
    }
  }

  async updateTaskColumn(req, res, next) {
    try {
      const boardId = req.params.id;
      const userId = req.user.id;
      const oldColumn = req.params.columnOldId;
      const newColumn = req.params.columnNewId;
      const { taskId, oldOrder, newOrder } = req.body;
      const tasks = await taskService.updateTaskColumn(userId, boardId, { oldColumn, newColumn, taskId, oldOrder, newOrder });
      const response = chooseTaskResponse(res, tasks);

      return response;
    } catch (error) {
      next(error);
    }
  }
}

const taskController = new TaskController();
export default taskController;
