import { apiConfig } from '../apiConfig';

const extendedApiSlice = apiConfig.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.mutation({
      query: () => ({ url: 'users' }),
    }),
  }),
});

export const { useGetAllUsersMutation } = extendedApiSlice;
