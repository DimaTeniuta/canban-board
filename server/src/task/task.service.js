import boardModel from "../board/board.model.js";
import columnModel from "../column/column.model.js";
import TaskDto from "./dto/task.dto.js";
import taskModel from "./task.model.js";

class TaskService {
  async getAllTasks(userId, boardId, columnId) {
    const board = await boardModel.findById(boardId);
    if (!board) {
      return "Not Found";
    }
    if (board.userId !== userId) {
      return "Bad request";
    }
    const column = await columnModel.findById(columnId);
    if (!column) {
      return "Bad request";
    }
    if (column.userId !== userId) {
      return "Bad request";
    }
    if (column.boardId !== boardId) {
      return "Bad request";
    }
    const tasks = await taskModel.find({ columnId });
    return {
      tasks: tasks,
    };
  }

  async getTask(userId, boardId, columnId, taskId) {
    const board = await boardModel.findById(boardId);
    if (!board) {
      return "Not Found";
    }
    if (board.userId !== userId) {
      return "Bad request";
    }
    const column = await columnModel.findById(columnId);
    if (!column) {
      return "Bad request";
    }
    if (column.userId !== userId) {
      return "Bad request";
    }
    if (column.boardId !== boardId) {
      return "Bad request";
    }
    const task = await taskModel.findById(taskId);
    const taskDto = new TaskDto(task);
    return {
      task: taskDto,
    };
  }

  async createTask(userId, boardId, columnId, body) {
    const board = await boardModel.findById(boardId);
    if (!board) {
      return "Not Found";
    }
    if (board.userId !== userId) {
      return "Bad request";
    }
    const column = await columnModel.findById(columnId);
    if (!column) {
      return "Bad request";
    }
    if (column.userId !== userId) {
      return "Bad request";
    }
    if (column.boardId !== boardId) {
      return "Bad request";
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
    const board = await boardModel.findById(boardId);
    if (!board) {
      return "Not Found";
    }
    if (board.userId !== userId) {
      return "Bad request";
    }
    const column = await columnModel.findById(columnId);
    if (!column) {
      return "Bad request";
    }
    if (column.userId !== userId) {
      return "Bad request";
    }
    if (column.boardId !== boardId) {
      return "Bad request";
    }
    await taskModel.findByIdAndUpdate(taskId, {
      title: body.title,
      description: body.description,
    });

    const updatedTask = await taskModel.findById(taskId);
    const taskDto = new TaskDto(updatedTask);
    return {
      task: taskDto,
    };
  }

  async updateTaskOrder(userId, boardId, columnId, oldOrder, newOrder) {
    const board = await boardModel.findById(boardId);
    if (!board) {
      return "Not Found";
    }
    if (board.userId !== userId) {
      return "Bad request";
    }
    const column = await columnModel.findById(columnId);
    if (!column) {
      return "Bad request";
    }
    if (column.userId !== userId) {
      return "Bad request";
    }
    if (column.boardId !== boardId) {
      return "Bad request";
    }
    const oldTasks = await taskModel.find({ boardId });
    const newTasks = oldTasks
      .sort((a, b) => a.order - b.order)
      .map((task, index) => {
        const { _id, userId, boardId, columnId, title, description, order } =
          task;
        const tmpTask = {
          _id,
          userId,
          boardId,
          columnId,
          title,
          description,
          order,
        };
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
    return {
      tasks: savedTasks,
    };
  }

  async deleteTask(userId, boardId, columnId, taskId) {
    const board = await boardModel.findById(boardId);
    if (!board) {
      return "Not Found";
    }
    if (board.userId !== userId) {
      return "Bad request";
    }
    const column = await columnModel.findById(columnId);
    if (!column) {
      return "Bad request";
    }
    if (column.userId !== userId) {
      return "Bad request";
    }
    if (column.boardId !== boardId) {
      return "Bad request";
    }
    const deletedTask = await taskModel.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return "Bad request";
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
    const savedTasks = await taskModel.find({ boardId });
    return {
      tasks: savedTasks,
    };
  }
}

const taskService = new TaskService();
export default taskService;
