export interface ITask {
  title: string;
  description: string;
  order: number;
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

export interface ITasksUpdateOrder extends ITasksRequest {
  data: {
    oldOrder: number;
    newOrder: number;
  };
}

export interface ITasksUpdateOrderAndColumn {
  boardId: string;
  columnOldId: string;
  columnNewId: string;
  data: {
    taskId: string;
    oldOrder: number;
    newOrder: number;
  };
}
