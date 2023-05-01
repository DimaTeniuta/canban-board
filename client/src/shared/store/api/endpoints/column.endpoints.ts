import {
  IColumn,
  IColumnCreateResponse,
  IColumnDeleteRequest,
  IColumnDeleteResponse,
  IColumnUpdateResponse,
} from '../../../types/column';
import { apiConfig } from '../apiConfig';

const extendedApiSlice = apiConfig.injectEndpoints({
  endpoints: (builder) => ({
    getColumns: builder.query<IColumn[], string>({
      query: (boardId) => `boards/${boardId}/columns`,
      providesTags: (result) => [
        'Column',
        ...(result?.length ? result.map(({ id }) => ({ type: 'Column' as const, id })) : []),
      ],
    }),

    createColumn: builder.mutation<IColumn, IColumnCreateResponse>({
      query: ({ boardId, data }) => ({
        url: `/boards/${boardId}/columns`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Column'],
    }),

    updateColumn: builder.mutation<IColumn, IColumnUpdateResponse>({
      query: ({ boardId, columnId, data }) => ({
        url: `/boards/${boardId}/columns/${columnId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_, __, arg) => [{ type: 'Column', id: arg.columnId }],
    }),

    deleteColumn: builder.mutation<IColumnDeleteResponse, IColumnDeleteRequest>({
      query: ({ boardId, columnId }) => ({
        url: `/boards/${boardId}/columns/${columnId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, arg) => [{ type: 'Column', id: arg.columnId }],
    }),
  }),
});

export const {
  useGetColumnsQuery,
  useCreateColumnMutation,
  useUpdateColumnMutation,
  useDeleteColumnMutation,
} = extendedApiSlice;
