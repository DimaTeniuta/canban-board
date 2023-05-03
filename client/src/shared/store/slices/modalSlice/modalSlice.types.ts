export interface IModalStore {
  open: boolean;
  title: string;
  Component: React.FC;
  modalData?: { [key: string]: unknown };
}

export type TModalFields = Omit<IModalStore, 'open'>;
