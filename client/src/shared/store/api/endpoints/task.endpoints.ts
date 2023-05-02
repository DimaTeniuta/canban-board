import {
  ITask,
  ITasksRequest,
  ITasksUpdateOrder,
  ITasksUpdateOrderAndColumn,
  ITasksUpdateRequest,
} from '../../../types/task';
import { apiConfig } from '../apiConfig';

const extendedApiSlice = apiConfig.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<ITask[], ITasksRequest>({
      query: ({ boardId, columnId }) => `boards/${boardId}/columns/${columnId}/tasks`,
      providesTags: (result) => [
        'Task',
        ...(result?.length ? result.map(({ id }) => ({ type: 'Task' as const, id })) : []),
      ],
    }),

    createTask: builder.mutation({
      query: ({ boardId, columnId, data }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Task'],
    }),

    updateTask: builder.mutation<ITask, ITasksUpdateRequest>({
      query: ({ boardId, columnId, taskId, data }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_, __, arg) => [{ type: 'Task', id: arg.taskId }],
    }),

    deleteTask: builder.mutation({
      query: ({ boardId, columnId, taskId }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, arg) => [{ type: 'Task', id: arg.taskId }],
    }),

    updateTaskOrder: builder.mutation<ITask[], ITasksUpdateOrder>({
      query: ({ boardId, columnId, data }) => ({
        url: `/boards/${boardId}/columns/${columnId}/order/tasks`,
        method: 'PUT',
        body: data,
      }),

      async onQueryStarted({ boardId, columnId, data }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          extendedApiSlice.util.updateQueryData('getTasks', { boardId, columnId }, (draft) => {
            const { oldOrder, newOrder } = data;
            draft
              .sort((a, b) => a.order - b.order)
              .forEach((task, index) => {
                if (oldOrder < newOrder) {
                  if (index === oldOrder) {
                    draft[index] = { ...task, order: newOrder };
                  } else if (index === newOrder) {
                    draft[index] = { ...task, order: task.order - 1 };
                  } else if (index < newOrder && index > oldOrder) {
                    draft[index] = { ...task, order: task.order - 1 };
                  } else {
                    draft[index] = task;
                  }
                } else if (oldOrder > newOrder) {
                  if (index === oldOrder) {
                    draft[index] = { ...task, order: newOrder };
                  } else if (index === newOrder) {
                    draft[index] = { ...task, order: task.order + 1 };
                  } else if (index > newOrder && index < oldOrder) {
                    draft[index] = { ...task, order: task.order + 1 };
                  } else {
                    draft[index] = task;
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
          dispatch(extendedApiSlice.util.invalidateTags(['Task']));
        }
      },
      invalidatesTags: (result) =>
        result ? result.map((task) => ({ type: 'Task' as const, id: task.columnId })) : ['Task'],
    }),

    updateTaskOrderAndColumn: builder.mutation<ITask[], ITasksUpdateOrderAndColumn>({
      query: ({ boardId, columnOldId, columnNewId, data }) => ({
        url: `boards/${boardId}/columns/${columnOldId}/${columnNewId}/order/tasks`,
        method: 'PUT',
        body: data,
      }),

      async onQueryStarted(
        { boardId, columnOldId, columnNewId, data },
        { dispatch, queryFulfilled }
      ) {
        let updatedTask = {} as ITask;
        const patchResult = dispatch(
          extendedApiSlice.util.updateQueryData(
            'getTasks',
            { boardId, columnId: columnOldId },
            (draft) => {
              const { oldOrder, newOrder } = data;
              draft.sort((a, b) => a.order - b.order);
              updatedTask = { ...draft[oldOrder], columnId: columnNewId, order: newOrder } as ITask;
              draft.splice(oldOrder, 1);

              draft
                .sort((a, b) => a.order - b.order)
                .forEach((task, index) => {
                  draft[index] = { ...task, order: index };
                });
              draft.sort((a, b) => a.order - b.order);
            }
          )
        );

        const otherPatchResult = dispatch(
          extendedApiSlice.util.updateQueryData(
            'getTasks',
            { boardId, columnId: columnNewId },
            (draft) => {
              const oldOrder = draft.length;
              const newOrder = data.newOrder;

              draft.push({ ...updatedTask, order: oldOrder });

              draft.forEach((task, index) => {
                if (oldOrder < newOrder) {
                  if (index === oldOrder) {
                    draft[index] = { ...task, order: newOrder };
                  } else if (index === newOrder) {
                    draft[index] = { ...task, order: task.order - 1 };
                  } else if (index < newOrder && index > oldOrder) {
                    draft[index] = { ...task, order: task.order - 1 };
                  } else {
                    draft[index] = task;
                  }
                } else if (oldOrder > newOrder) {
                  if (index === oldOrder) {
                    draft[index] = { ...task, order: newOrder };
                  } else if (index === newOrder) {
                    draft[index] = { ...task, order: task.order + 1 };
                  } else if (index > newOrder && index < oldOrder) {
                    draft[index] = { ...task, order: task.order + 1 };
                  } else {
                    draft[index] = task;
                  }
                }
              });

              draft.sort((a, b) => a.order - b.order);
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
          otherPatchResult.undo();
          dispatch(extendedApiSlice.util.invalidateTags(['Task']));
        }
      },
      invalidatesTags: () => ['Task'],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskOrderMutation,
  useUpdateTaskOrderAndColumnMutation,
} = extendedApiSlice;
