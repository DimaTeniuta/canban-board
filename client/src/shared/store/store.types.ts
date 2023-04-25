import { IModalStore } from './slices/modalSlice/modalSlice.types';
import { IUserStore } from './slices/userSlice/userSlice.types';

export interface IStoreState {
  user: IUserStore;
  modal: IModalStore;
}
