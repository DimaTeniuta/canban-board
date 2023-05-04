import React from 'react';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import ColumnForm from '../../entities/ColumnForm/ColumnForm';
import { useCreateColumnMutation } from '../../shared/store/api/endpoints/column.endpoints';
import { IFormColumnInput } from '../../entities/ColumnForm/ColumnForm.types';
import { useStoreDispatch } from '../../shared/hooks/store.hooks';
import { closeModal } from '../../shared/store/slices/modalSlice/modalSlice';

const CreateColumn = () => {
  const [createColumn, { isLoading }] = useCreateColumnMutation();
  const { id } = useParams();
  const dispatch = useStoreDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (inputs: IFormColumnInput) => {
    createColumn({ boardId: id!, data: inputs })
      .unwrap()
      .then(() => {
        dispatch(closeModal());
        enqueueSnackbar('Column is created', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar(err.data.errorMessage, { variant: 'error' });
      });
  };

  return <ColumnForm onSubmit={handleSubmit} defaultValues={{ title: '' }} loading={isLoading} />;
};

export default CreateColumn;
