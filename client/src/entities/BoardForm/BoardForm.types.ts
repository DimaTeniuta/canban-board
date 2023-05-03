export interface IFormBoardInput {
  title: string;
  description: string;
}

export interface IBoardFormProps {
  onSubmit: (inputs: IFormBoardInput) => void;
  defaultValues: IFormBoardInput;
  loading: boolean;
}
