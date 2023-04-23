import { createSlice, Middleware } from '@reduxjs/toolkit';
import { IUserStore } from '../types/userSlice.types';
import { IStoreState } from '../types/api.types';

const initialState: IUserStore = {
  user: null,
  isAuth: false,
  token: localStorage.getItem('token') || null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(_, action) {
      console.log(222, action.payload);
      return {
        user: action.payload.user,
        isAuth: !!action.payload.accessToken,
        token: action.payload.accessToken,
      };
    },
    updateUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearUser: () => {
      return initialState;
    },
  },
});

export const userMiddleware: Middleware = () => (next) => (action) => {
  if (action.type === 'user/setUser') localStorage.setItem('token', action.payload.accessToken);
  if (action.type === 'user/clearUser') localStorage.removeItem('token');
  return next(action);
};
export const { updateUser, setUser, clearUser } = userSlice.actions;
export const selectUser = (state: IStoreState) => state.user;
export default userSlice.reducer;
