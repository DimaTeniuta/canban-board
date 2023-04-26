import { IColumn, IColumnCreateResponse, IColumnUpdateResponse } from '../../../types/column';
import { apiConfig } from '../apiConfig';

const extendedApiSlice = apiConfig.injectEndpoints({
  endpoints: (builder) => ({
    getColumns: builder.query<IColumn[], string>({
      query: (boardId) => `boards/${boardId}/columns`,
      providesTags: (result) => [
        'Columns',
        ...(result ? result.map(({ id }) => ({ type: 'Columns' as const, id })) : []),
      ],
    }),

    createColumn: builder.mutation<IColumn, IColumnCreateResponse>({
      query: ({ boardId, data }) => ({
        url: `/boards/${boardId}/columns`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Columns'],
    }),

    updateColumn: builder.mutation<IColumn, IColumnUpdateResponse>({
      query: ({ boardId, columnId, data }) => ({
        url: `/boards/${boardId}/columns/${columnId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_, __, arg) => [{ type: 'Columns', id: arg.columnId }],
    }),
  }),
});

export const {
  useGetColumnsQuery,
  useCreateColumnMutation,
  useUpdateColumnMutation,
} = extendedApiSlice;
