export interface IBoard {
  title: string;
  description: string;
  id: string;
  userId: string;
}

export interface IBoardRequest {
  title: string;
  description: string;
}

export interface IBoardUpdateRequest {
  id: string;
  data: IBoardRequest;
}
