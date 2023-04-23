import { MiddlewareAPI, Middleware, configureStore, isRejectedWithValue } from '@reduxjs/toolkit';
import userReducer, { clearUser, setUser, userMiddleware } from './slices/userSlice';
import notifierReducer, { openErrorAlert } from './slices/notifierSlice';
import { apiConfig } from './api/apiConfig';

export const apiErrorMiddleware: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    if (action.type.startsWith('api/') && action.payload.status === 401) {
      api.dispatch(openErrorAlert('401'));
      fetch('http://localhost:2300/refresh', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
        .then((response) => response.json())
        .then((data) => {
          api.dispatch(setUser(data));
          console.log(3333, action);
        });
    }
    if (action.payload.status === 403) {
      api.dispatch(openErrorAlert('Unauthorized'));
      api.dispatch(clearUser());
    }
  }
  return next(action);
};

export const store = configureStore({
  reducer: {
    user: userReducer,
    notifier: notifierReducer,
    [apiConfig.reducerPath]: apiConfig.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiErrorMiddleware)
      .concat(userMiddleware)
      .concat(apiConfig.middleware),
  devTools: true,
});

export type TStoreDispatch = typeof store.dispatch;
