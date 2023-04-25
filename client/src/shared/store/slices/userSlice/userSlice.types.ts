import { IUser } from '../../../types/user';

export interface IUserStore {
  user: IUser | null;
  isAuth: boolean;
  token: string | null;
}
