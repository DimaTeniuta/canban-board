import { IUser } from './user';

export interface IAuthRequest {
  email: string;
  password: string;
  name?: string;
}

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}
