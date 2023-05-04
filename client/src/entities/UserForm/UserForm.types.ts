export interface IUserFormInput {
  name: string;
  email: string;
}

export interface IUserFormProps {
  onSubmit: (inputs: IUserFormInput) => void;
  onDelete: () => void;
  defaultValues: Record<string, string>;
  loading: boolean;
}
