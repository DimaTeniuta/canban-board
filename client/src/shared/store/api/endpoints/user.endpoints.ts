import { ISuccessRes } from '../../../types/general';
import { IUser, IUserReq, IUserUpdate } from '../../../types/user';
import { apiConfig } from '../apiConfig';

const extendedApiSlice = apiConfig.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<IUser, IUserReq>({
      query: ({ userId }) => `/users/${{ userId }}`,
    }),

    updateUser: builder.mutation<IUser, IUserUpdate>({
      query: ({ userId, data }) => ({
        url: `/users/${userId}`,
        method: 'PUT',
        body: data,
      }),
    }),

    deleteUser: builder.mutation<ISuccessRes, IUserReq>({
      query: ({ userId }) => ({
        url: `/users/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User', 'Board', 'Column', 'Task'],
    }),
  }),
});

export const { useGetUserQuery, useUpdateUserMutation, useDeleteUserMutation } = extendedApiSlice;
