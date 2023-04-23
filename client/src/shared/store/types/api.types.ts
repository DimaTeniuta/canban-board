import { INotifierStore } from './notifierSlice.types';
import { IUserStore } from './userSlice.types';

export interface IStoreState {
  user: IUserStore;
  notifier: INotifierStore;
}
