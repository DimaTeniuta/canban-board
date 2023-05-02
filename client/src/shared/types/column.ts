export interface IColumn {
  title: string;
  userId: string;
  boardId: string;
  id: string;
  order: number;
}

export interface IColumnRequest {
  title: string;
}

export interface IColumnCreateResponse {
  boardId: string;
  data: IColumnRequest;
}

export interface IColumnUpdateResponse extends IColumnCreateResponse {
  columnId: string;
}

export interface IColumnDeleteRequest {
  boardId: string;
  columnId: string;
}

export interface IColumnDeleteResponse {
  message: string;
}

export interface IColumnUpdateOrderRequest {
  boardId: string;
  data: {
    oldOrder: number;
    newOrder: number;
  };
}
