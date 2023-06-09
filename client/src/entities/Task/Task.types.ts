import { ITask } from '../../shared/types/task';

export interface ITaskProps {
  taskData: ITask;
  index: number;
  onDelete?: () => void;
  onUpdate?: () => void;
  onOpen?: () => void;
}

export interface ITaskModalData {
  boardId: string;
  columnId: string;
  taskId: string;
}
