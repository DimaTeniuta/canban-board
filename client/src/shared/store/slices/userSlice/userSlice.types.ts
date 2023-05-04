import { IUserAuth } from '../../../types/user';

export interface IUserStore {
  user: IUserAuth | null;
  isAuth: boolean;
  token: string | null;
}
