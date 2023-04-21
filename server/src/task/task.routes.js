import { Router } from "express";
import authMiddleware from "../auth/auth.middleware.js";
import taskController from "./task.controller.js";
import { taskValidator } from "./task.validator.js";

const taskRouter = Router();
taskRouter.get("/boards/:id/columns/:columnId/tasks", authMiddleware, taskController.getAllTasks);
taskRouter.get("/boards/:id/columns/:columnId/tasks/:taskId", authMiddleware, taskController.getTask);
taskRouter.post("/boards/:id/columns/:columnId/tasks", authMiddleware, taskValidator, taskController.createTask);
taskRouter.put("/boards/:id/columns/:columnId/tasks/:taskId", authMiddleware, taskValidator, taskController.updateTask);
taskRouter.put("/boards/:id/columns/:columnId/order/tasks", authMiddleware, taskController.updateTaskOrder);
taskRouter.put("/boards/:id/columns/:columnOldId/:columnNewId/order/tasks", authMiddleware, taskController.updateTaskColumn);
taskRouter.delete("/boards/:id/columns/:columnId/tasks/:taskId", authMiddleware, taskController.deleteTask);

export default taskRouter;