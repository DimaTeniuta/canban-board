import { IBoardRequest, IBoard } from '../../../types/board';
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
  }),
});

export const { useCreateBoardMutation, useGetAllBoardsQuery } = extendedApiSlice;
