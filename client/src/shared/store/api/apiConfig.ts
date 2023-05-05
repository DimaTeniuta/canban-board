import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { IStoreState } from '../store.types';
import { clearUser, updateToken } from '../slices/userSlice/userSlice';
import Snackbar from '../../utils/snackBar';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.API_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as IStoreState).user.token;
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithReAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const refreshResult = await baseQuery('refresh', api, extraOptions);
    if (refreshResult?.data) {
      api.dispatch(updateToken(refreshResult.data));

      // try to make original request again after 401 error
      result = await baseQuery(args, api, extraOptions);
    }
  } else if (result?.error?.status === 403) {
    Snackbar.error('Unauthorized');
    api.dispatch(clearUser());
  }
  return result;
};

export const apiConfig = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['User', 'Board', 'Column', 'Task'],
  endpoints: () => ({}),
});
