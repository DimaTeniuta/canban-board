import taskService from "./task.service.js";
import { validationResult } from "express-validator";

class TaskController {
  async getAllTasks(req, res, next) {
    try {
      const boardId = req.params.id;
      const userId = req.user.id;
      const columnId = req.params.columnId;
      const tasks = await taskService.getAllTasks(userId, boardId, columnId);
      if (typeof tasks === "string") {
        if (tasks === 'Not Found') {
          return res.status(404).json(tasks);
        }
        return res.status(400).json(tasks);
      }
      res.json(tasks);
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
      if (typeof task === "string") {
        if (task === 'Not Found') {
          return res.status(404).json(task);
        }
        return res.status(400).json(task);
      }
      res.json(task);
    } catch (error) {
      next(error);
    }
  }

  async createTask(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(res.status(400).json("Validation error"));
      }
      const boardId = req.params.id;
      const userId = req.user.id;
      const columnId = req.params.columnId;
      const { title, description } = req.body;
      const task = await taskService.createTask(userId, boardId, columnId, { title, description });
      if (typeof task === "string") {
        if (task === 'Not Found') {
          return res.status(404).json(task);
        }
        return res.status(400).json(task);
      }
      res.json(task);
    } catch (error) {
      next(error);
    }
  }

  async updateTask(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(res.status(400).json("Validation error"));
      }
      const boardId = req.params.id;
      const userId = req.user.id;
      const columnId = req.params.columnId;
      const taskId = req.params.taskId;
      const { title, description } = req.body;
      const task = await taskService.updateTask(userId, boardId, columnId, taskId, { title, description });
      if (typeof task === "string") {
        if (task === 'Not Found') {
          return res.status(404).json(task);
        }
        return res.status(400).json(task);
      }
      res.json(task);
    } catch (error) {
      next(error);
    }
  }

  async deleteTask(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(res.status(400).json("Validation error"));
      }
      const boardId = req.params.id;
      const userId = req.user.id;
      const columnId = req.params.columnId;
      const taskId = req.params.taskId;
      const tasks = await taskService.deleteTask(userId, boardId, columnId, taskId);
      if (typeof tasks === "string") {
        if (tasks === 'Not Found') {
          return res.status(404).json(tasks);
        }
        return res.status(400).json(tasks);
      }
      res.json(tasks);
    } catch (error) {
      next(error);
    }
  }
}

const taskController = new TaskController();
export default taskController;
