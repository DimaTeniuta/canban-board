import { IColumn, IColumnCreateResponse } from '../../../types/column';
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
  }),
});

export const { useGetColumnsQuery, useCreateColumnMutation } = extendedApiSlice;
