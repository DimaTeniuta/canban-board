export interface IRegisterFormProps {
  onSubmit: (inputs: IFormRegisterInput) => void;
  defaultValues: Record<string, string>;
}

export interface IFormRegisterInput {
  email: string;
  password: string;
  name: string;
}
