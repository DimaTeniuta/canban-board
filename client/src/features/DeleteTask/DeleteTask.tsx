import React from 'react';
import { useSnackbar } from 'notistack';
import { useStoreDispatch } from '../../shared/hooks/storeHooks';
import useModalData from '../../shared/hooks/useModalData';
import { useDeleteTaskMutation } from '../../shared/store/api/endpoints/task.endpoints';
import { closeModal } from '../../shared/store/slices/modalSlice/modalSlice';
import { ITaskModalData } from '../../entities/Task/Task.types';
import ConfirmBox from '../../entities/ConfirmBox/ConfirmBox';
import Spinner from '../../shared/UI/Spinner/Spinner';

const DeleteTask = () => {
  const dispatch = useStoreDispatch();
  const modalData = (useModalData() as unknown) as ITaskModalData;
  const [deleteTask, { isLoading }] = useDeleteTaskMutation();
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = () => {
    deleteTask(modalData)
      .unwrap()
      .then(() => {
        dispatch(closeModal());
        enqueueSnackbar('Task is deleted', { variant: 'success' });
      })
      .catch((err) => {
        dispatch(closeModal());
        enqueueSnackbar(err.data.errorMessage, { variant: 'error' });
      });
  };

  return (
    <>
      <ConfirmBox onAction={handleDelete} />
      {isLoading && <Spinner />}
    </>
  );
};

export default DeleteTask;
