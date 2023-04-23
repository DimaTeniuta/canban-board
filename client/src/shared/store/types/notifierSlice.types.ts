export interface IAlert {
  type: 'success' | 'error';
  message: string;
  id: number;
}

export interface INotifierStore {
  alertArray: IAlert[];
  alertId: number;
}
