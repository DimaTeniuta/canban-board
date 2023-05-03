import React from 'react';
import { useSnackbar } from 'notistack';
import ConfirmBox from '../../entities/ConfirmBox/ConfirmBox';
import { useStoreDispatch } from '../../shared/hooks/store.hooks';
import { useDeleteColumnMutation } from '../../shared/store/api/endpoints/column.endpoints';
import useModalData from '../../shared/hooks/useModalData';
import { IColumnDeleteRequest } from '../../shared/types/column';
import { closeModal } from '../../shared/store/slices/modalSlice/modalSlice';
import Spinner from '../../shared/UI/Spinner/Spinner';

const DeleteColumn = () => {
  const dispatch = useStoreDispatch();
  const modalData = (useModalData() as unknown) as IColumnDeleteRequest;
  const [deleteColumn, { isLoading }] = useDeleteColumnMutation();
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = () => {
    deleteColumn({ boardId: modalData.boardId, columnId: modalData.columnId })
      .unwrap()
      .then(() => {
        dispatch(closeModal());
        enqueueSnackbar('Column is deleted', { variant: 'success' });
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

export default DeleteColumn;
