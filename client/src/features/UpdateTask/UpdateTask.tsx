import React from 'react';
import { useSnackbar } from 'notistack';
import TaskForm from '../../entities/TaskForm/TaskForm';
import { useUpdateTaskMutation } from '../../shared/store/api/endpoints/task.endpoints';
import { ITask } from '../../shared/types/task';
import useModalData from '../../shared/hooks/useModalData';
import { ITaskFormInputs } from '../../entities/TaskForm/TaskForm.types';
import { useStoreDispatch } from '../../shared/hooks/store.hooks';
import { closeModal } from '../../shared/store/slices/modalSlice/modalSlice';

const UpdateTask = () => {
  const modalData = (useModalData() as unknown) as ITask;
  const [updateTask, { isLoading }] = useUpdateTaskMutation();
  const dispatch = useStoreDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (inputs: ITaskFormInputs) => {
    updateTask({
      boardId: modalData.boardId,
      columnId: modalData.columnId,
      taskId: modalData.id,
      data: inputs,
    })
      .unwrap()
      .then(() => {
        dispatch(closeModal());
        enqueueSnackbar('Task is updated', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar(err.data.errorMessage, { variant: 'error' });
      });
  };

  return (
    <TaskForm
      defaultValues={{ title: modalData.title, description: modalData.description }}
      loading={isLoading}
      onSubmit={handleSubmit}
    />
  );
};

export default UpdateTask;
