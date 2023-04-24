import { configureStore } from '@reduxjs/toolkit';
import userReducer, { userMiddleware } from './slices/userSlice';
import { apiConfig } from './api/apiConfig';

export const store = configureStore({
  reducer: {
    [apiConfig.reducerPath]: apiConfig.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userMiddleware)
      .concat(apiConfig.middleware),
  devTools: true,
});

export type TStoreDispatch = typeof store.dispatch;
