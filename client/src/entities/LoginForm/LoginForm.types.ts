export interface ILoginFormProps {
  onSubmit: (inputs: IFormLoginInput) => void;
  defaultValues: Record<string, string>;
}

export interface IFormLoginInput {
  email: string;
  password: string;
}
