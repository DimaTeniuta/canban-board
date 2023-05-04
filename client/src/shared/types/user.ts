export interface IUser {
  email: string;
  id: string;
  name: string;
}

export interface IUserAuth extends IUser {
  token: string;
}

export interface IUserReq {
  userId: string;
}

export interface IUserUpdate extends IUserReq {
  data: {
    name: string;
  };
}
