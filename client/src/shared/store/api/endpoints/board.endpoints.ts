import { IBoardRequest, IBoard, IBoardUpdateRequest } from '../../../types/board';
import { apiConfig } from '../apiConfig';

const extendedApiSlice = apiConfig.injectEndpoints({
  endpoints: (builder) => ({
    getAllBoards: builder.query<IBoard[], null>({
      query: () => 'boards',
      providesTags: (result) => [
        'Board',
        ...(result ? result.map(({ id }) => ({ type: 'Board' as const, id })) : []),
      ],
    }),

    createBoard: builder.mutation<IBoard, IBoardRequest>({
      query: (data) => ({
        url: 'boards',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Board'],
    }),

    updateBoard: builder.mutation<IBoard, IBoardUpdateRequest>({
      query: ({ id, data }) => ({
        url: `boards/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_, __, arg) => [{ type: 'Board', id: arg.id }],
    }),

    deleteBoard: builder.mutation<IBoard, string>({
      query: (id) => ({
        url: `boards/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, arg) => [{ type: 'Board', id: arg }],
    }),
  }),
});

export const {
  useCreateBoardMutation,
  useGetAllBoardsQuery,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
} = extendedApiSlice;
