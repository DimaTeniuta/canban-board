import { createSlice, Middleware } from '@reduxjs/toolkit';
import { IStoreState } from '../../store.types';
import { IUserStore } from './userSlice.types';

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
      return { ...initialState, token: null };
    },
    updateToken: (state, action) => {
      return { ...state, token: action.payload.accessToken };
    },
  },
});

export const userMiddleware: Middleware = () => (next) => (action) => {
  if (action.type === 'user/setUser') localStorage.setItem('token', action.payload.accessToken);
  if (action.type === 'user/clearUser') localStorage.removeItem('token');
  if (action.type === 'user/updateToken') localStorage.setItem('token', action.payload);
  return next(action);
};
export const { updateUser, setUser, clearUser, updateToken } = userSlice.actions;
export const selectUser = (state: IStoreState) => state.user;
export default userSlice.reducer;
