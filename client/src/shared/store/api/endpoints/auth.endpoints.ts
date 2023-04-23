import { apiConfig } from '../apiConfig';

const extendedApiSlice = apiConfig.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: 'registration',
        method: 'POST',
        body: data,
      }),
    }),
    logIn: builder.mutation({
      query: (data) => ({
        url: 'login',
        method: 'POST',
        body: data,
      }),
    }),
    refreshToken: builder.mutation({
      query: () => ({ url: 'refresh' }),
    }),
  }),
});

export const { useRegisterMutation, useLogInMutation, useRefreshTokenMutation } = extendedApiSlice;
