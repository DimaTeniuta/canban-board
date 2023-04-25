export interface ICardBoxProps {
  title: string;
  description: string;
  path: string;
  onUpdate: () => void;
  onDelete: () => void;
}
