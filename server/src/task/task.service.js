import boardModel from "../board/board.model.js";
import columnModel from "../column/column.model.js";
import TaskDto from "./dto/task.dto.js";
import TaskUpdatedDto from "./dto/taskUpdated.dto.js";
import { checkTaskAccess } from "./helpers/checkTaskAccess.js";
import taskModel from "./task.model.js";

class TaskService {
  async getAllTasks(userId, boardId, columnId) {
    const accessRes = await checkTaskAccess(boardId, columnId, userId);
    if (accessRes) {
      return accessRes;
    }

    const tasks = await taskModel.find({ columnId });
    const tasksDto = tasks
      .map((task) => new TaskDto(task))
      .sort((a, b) => a.order - b.order);

    return tasksDto;
  }

  async getTask(userId, boardId, columnId, taskId) {
    const accessRes = await checkTaskAccess(boardId, columnId, userId);
    if (accessRes) {
      return accessRes;
    }

    const task = await taskModel.findById(taskId);
    const taskDto = new TaskDto(task);
    return taskDto;
  }

  async createTask(userId, boardId, columnId, body) {
    const accessRes = await checkTaskAccess(boardId, columnId, userId);
    if (accessRes) {
      return accessRes;
    }

    const tasks = await taskModel.find({ columnId });
    const order = tasks.length;
    const newTask = await taskModel.create({
      title: body.title,
      description: body.description,
      order,
      userId,
      boardId,
      columnId,
    });
    const taskDto = new TaskDto(newTask);
    return {
      task: taskDto,
    };
  }

  async updateTask(userId, boardId, columnId, taskId, body) {
    const accessRes = await checkTaskAccess(boardId, columnId, userId);
    if (accessRes) {
      return accessRes;
    }

    await taskModel.findByIdAndUpdate(taskId, {
      title: body.title,
      description: body.description,
    });

    const updatedTask = await taskModel.findById(taskId);
    const taskDto = new TaskDto(updatedTask);

    return taskDto;
  }

  async updateTaskOrder(userId, boardId, columnId, oldOrder, newOrder) {
    const accessRes = await checkTaskAccess(boardId, columnId, userId);
    if (accessRes) {
      return accessRes;
    }

    const oldTasks = await taskModel.find({ columnId });
    if (!oldTasks) {
      return "Not Found";
    }

    const newTasks = oldTasks
      .sort((a, b) => a.order - b.order)
      .map((task, index) => {
        const tmpTask = new TaskUpdatedDto(task);
        if (oldOrder < newOrder) {
          if (index === oldOrder) {
            return { ...tmpTask, order: newOrder };
          } else if (index === newOrder) {
            return { ...tmpTask, order: task.order - 1 };
          } else if (index < newOrder && index > oldOrder) {
            return { ...tmpTask, order: task.order - 1 };
          } else {
            return task;
          }
        } else if (oldOrder > newOrder) {
          if (index === oldOrder) {
            return { ...tmpTask, order: newOrder };
          } else if (index === newOrder) {
            return { ...tmpTask, order: task.order + 1 };
          } else if (index > newOrder && index < oldOrder) {
            return { ...tmpTask, order: task.order + 1 };
          } else {
            return task;
          }
        } else if (oldOrder === newOrder) {
          return task;
        }
      });

    await Promise.all(
      newTasks.map((el) => {
        return new Promise((res) =>
          res(taskModel.findOneAndUpdate({ _id: el._id }, { order: el.order }))
        );
      })
    );

    const savedTasks = await taskModel.find({ boardId });
    const savedTasksDto = savedTasks
      .map((task) => new TaskDto(task))
      .sort((a, b) => a.order - b.order);

    return savedTasksDto;
  }

  async deleteTask(userId, boardId, columnId, taskId) {
    const accessRes = await checkTaskAccess(boardId, columnId, userId);
    if (accessRes) {
      return accessRes;
    }

    const deletedTask = await taskModel.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return "Not Found";
    }

    const oldTasks = await taskModel.find({ boardId });
    const newTasks = oldTasks
      .sort((a, b) => a.order - b.order)
      .map((task, index) => {
        const { _id, order } = task;
        const tmpTask = { _id, order };
        return { ...tmpTask, order: index };
      });

    await Promise.all(
      newTasks.map((el) => {
        return new Promise((res) =>
          res(taskModel.findOneAndUpdate({ _id: el._id }, { order: el.order }))
        );
      })
    );

    return {
      message: "Success",
    };
  }

  async updateTaskColumn(userId, boardId, body) {
    const { oldColumn, newColumn, taskId, oldOrder, newOrder } = body;
 
    const accessResOld = await checkTaskAccess(boardId, oldColumn, userId);
    if (accessResOld) {
      return accessResOld;
    }

    const accessResNew = await checkTaskAccess(boardId, newColumn, userId);
    if (accessResNew) {
      return accessResNew;
    }

    const newTasks = await taskModel.find({ columnId: newColumn });
    if (!newTasks) {
      return "Not Found";
    }

    const task = await taskModel.findOneAndUpdate(
      { _id: taskId },
      {
        columnId: newColumn,
        order: newTasks.length,
      }
    );

    if (!task) {
      return "Not Found";
    }

    const updatedTask = await taskModel.findById(taskId);

    const res = await this.updateTaskOrder(
      userId,
      boardId,
      newColumn,
      updatedTask.order,
      newOrder
    );

    return res;
  }
}

const taskService = new TaskService();
export default taskService;
