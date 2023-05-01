import { ITask, ITasksRequest, ITasksUpdateRequest } from '../../../types/task';
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
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = extendedApiSlice;
