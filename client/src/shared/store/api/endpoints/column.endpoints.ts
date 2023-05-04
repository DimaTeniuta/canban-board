import {
  IColumn,
  IColumnCreateResponse,
  IColumnDeleteRequest,
  IColumnDeleteResponse,
  IColumnUpdateOrderRequest,
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

    updateColumnOrder: builder.mutation<IColumn[], IColumnUpdateOrderRequest>({
      query: ({ boardId, data }) => ({
        url: `/boards/${boardId}/columns/order/set`,
        method: 'PUT',
        body: data,
      }),
      async onQueryStarted({ boardId, data }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          extendedApiSlice.util.updateQueryData('getColumns', boardId, (draft) => {
            const { oldOrder, newOrder } = data;
            draft.forEach((column, index) => {
              const { id, userId, boardId, title, order } = column;
              const tmpColumn = { id, userId, boardId, title, order };
              if (oldOrder < newOrder) {
                if (index === oldOrder) {
                  draft[index] = { ...tmpColumn, order: newOrder };
                } else if (index === newOrder) {
                  draft[index] = { ...tmpColumn, order: column.order - 1 };
                } else if (index < newOrder && index > oldOrder) {
                  draft[index] = { ...tmpColumn, order: column.order - 1 };
                } else {
                  draft[index] = column;
                }
              } else if (oldOrder > newOrder) {
                if (index === oldOrder) {
                  draft[index] = { ...tmpColumn, order: newOrder };
                } else if (index === newOrder) {
                  draft[index] = { ...tmpColumn, order: column.order + 1 };
                } else if (index > newOrder && index < oldOrder) {
                  draft[index] = { ...tmpColumn, order: column.order + 1 };
                } else {
                  draft[index] = column;
                }
              }
            });

            draft.sort((a, b) => a.order - b.order);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
          dispatch(extendedApiSlice.util.invalidateTags(['Column']));
        }
      },
    }),
  }),
});

export const {
  useGetColumnsQuery,
  useCreateColumnMutation,
  useUpdateColumnMutation,
  useDeleteColumnMutation,
  useUpdateColumnOrderMutation,
} = extendedApiSlice;
