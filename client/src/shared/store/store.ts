import { configureStore } from '@reduxjs/toolkit';
import userReducer, { userMiddleware } from './slices/userSlice/userSlice';
import modalReducer from './slices/modalSlice/modalSlice';
import { apiConfig } from './api/apiConfig';

export const store = configureStore({
  reducer: {
    [apiConfig.reducerPath]: apiConfig.reducer,
    user: userReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(userMiddleware)
      .concat(apiConfig.middleware),
});

export type TStoreDispatch = typeof store.dispatch;
