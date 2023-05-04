import React from 'react';
import { useSnackbar } from 'notistack';
import TaskForm from '../../entities/TaskForm/TaskForm';
import { useCreateTaskMutation } from '../../shared/store/api/endpoints/task.endpoints';
import { useStoreDispatch } from '../../shared/hooks/store.hooks';
import { ITaskFormInputs } from '../../entities/TaskForm/TaskForm.types';
import { closeModal } from '../../shared/store/slices/modalSlice/modalSlice';
import useModalData from '../../shared/hooks/useModalData';
import { ICreateTaskData } from './CreateTask.types';

const CreateTask = () => {
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const dispatch = useStoreDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const modalData = (useModalData() as unknown) as ICreateTaskData;

  const handleSubmit = (inputs: ITaskFormInputs) => {
    createTask({ boardId: modalData.boardId, columnId: modalData.columnId, data: inputs })
      .unwrap()
      .then(() => {
        dispatch(closeModal());
        enqueueSnackbar('Task is created', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar(err.data.errorMessage, { variant: 'error' });
      });
  };

  return (
    <TaskForm
      onSubmit={handleSubmit}
      defaultValues={{ title: '', description: '' }}
      loading={isLoading}
    />
  );
};

export default CreateTask;
