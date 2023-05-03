export interface IFormColumnInput {
  title: string;
}

export interface IColumnFormProps {
  onSubmit: (inputs: IFormColumnInput) => void;
  defaultValues: IFormColumnInput;
  loading: boolean;
}
