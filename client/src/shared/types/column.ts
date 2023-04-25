export interface IColumn {
  title: string;
  userId: string;
  columnID: string;
  id: string;
}

interface IColumnRequest {
  title: string;
}

export interface IColumnCreateResponse {
  boardId: string;
  data: IColumnRequest;
}
