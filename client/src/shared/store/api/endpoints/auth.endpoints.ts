import { IAuthRequest, IAuthResponse } from '../../../types/auth';
import { apiConfig } from '../apiConfig';

const extendedApiSlice = apiConfig.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<IAuthResponse, IAuthRequest>({
      query: (data) => ({
        url: 'registration',
        method: 'POST',
        body: data,
      }),
    }),

    logIn: builder.mutation<IAuthResponse, IAuthRequest>({
      query: (data) => ({
        url: 'login',
        method: 'POST',
        body: data,
      }),
    }),

    checkAuth: builder.query<IAuthResponse, null>({
      query: () => 'refresh',
    }),
  }),
});

export const { useRegisterMutation, useLogInMutation, useLazyCheckAuthQuery } = extendedApiSlice;
