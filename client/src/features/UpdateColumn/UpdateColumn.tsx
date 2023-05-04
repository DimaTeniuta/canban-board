import React from 'react';
import { useSnackbar } from 'notistack';
import ColumnForm from '../../entities/ColumnForm/ColumnForm';
import useModalData from '../../shared/hooks/useModalData';
import { useUpdateColumnMutation } from '../../shared/store/api/endpoints/column.endpoints';
import { IFormColumnInput } from '../../entities/ColumnForm/ColumnForm.types';
import { IColumn } from '../../shared/types/column';
import { closeModal } from '../../shared/store/slices/modalSlice/modalSlice';
import { useStoreDispatch } from '../../shared/hooks/store.hooks';

const UpdateColumn = () => {
  const modalData = (useModalData() as unknown) as IColumn;
  const [updateColumn, { isLoading }] = useUpdateColumnMutation();
  const dispatch = useStoreDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (inputs: IFormColumnInput) => {
    updateColumn({ boardId: modalData.boardId, columnId: modalData.id, data: inputs })
      .unwrap()
      .then(() => {
        dispatch(closeModal());
        enqueueSnackbar('Column is updated', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar(err.data.errorMessage, { variant: 'error' });
      });
  };
  return (
    <ColumnForm
      defaultValues={{ title: modalData.title }}
      loading={isLoading}
      onSubmit={handleSubmit}
    />
  );
};

export default UpdateColumn;
