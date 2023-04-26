export interface IColumn {
  title: string;
  userId: string;
  boardId: string;
  id: string;
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