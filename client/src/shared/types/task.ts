export interface ITask {
  title: string;
  description: string;
  order: string;
  id: string;
  userId: string;
  boardId: string;
  columnId: string;
}

export interface ITasksRequest {
  boardId: string;
  columnId: string;
}

export interface ITaskFields {
  title: string;
  description: string;
}

export interface ITasksUpdateRequest extends ITasksRequest {
  taskId: string;
  data: ITaskFields;
}
