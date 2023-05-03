export interface ITaskFormInputs {
  title: string;
  description: string;
}

export interface ITaskFormProps {
  onSubmit: (inputs: ITaskFormInputs) => void;
  defaultValues: ITaskFormInputs;
  loading: boolean;
}
