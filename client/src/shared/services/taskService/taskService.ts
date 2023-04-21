import api from '../../api/api';

class TaskService {
  getAllTasks(boardId: string, columnId: string): Promise<void> {
    return api.get(`/boards/${boardId}/columns/${columnId}/tasks`);
  }

  getTask(boardId: string, columnId: string, taskId: string): Promise<void> {
    return api.get(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}`);
  }

  createTask(
    boardId: string,
    columnId: string,
    body: { title: string; description: string }
  ): Promise<void> {
    return api.post(`/boards/${boardId}/columns/${columnId}/tasks`, body);
  }

  updateTask(
    boardId: string,
    columnId: string,
    taskId: string,
    body: { title: string; description: string }
  ): Promise<void> {
    return api.put(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}`, body);
  }

  updateTaskOrder(
    boardId: string,
    columnId: string,
    oldOrder: number,
    newOrder: number
  ): Promise<void> {
    return api.put(`/boards/${boardId}/columns/${columnId}/order/tasks`, { oldOrder, newOrder });
  }

  updateTaskColumn(
    boardId: string,
    oldColumnId: string,
    newColumnId: string,
    taskId: string,
    oldOrder: number,
    newOrder: number
  ): Promise<void> {
    return api.put(`/boards/${boardId}/columns/${oldColumnId}/${newColumnId}/order/tasks`, {
      taskId,
      oldOrder,
      newOrder,
    });
  }

  deleteTask(boardId: string, columnId: string, taskId: string): Promise<void> {
    return api.delete(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}`);
  }
}

const taskService = new TaskService();
export default taskService;
