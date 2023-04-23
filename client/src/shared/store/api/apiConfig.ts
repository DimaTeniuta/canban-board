import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IStoreState } from '../types/api.types';

export const apiConfig = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:2300/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as IStoreState).user.token;
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
    credentials: 'include',
  }),
  tagTypes: ['User'],
  endpoints: () => ({}),
});
