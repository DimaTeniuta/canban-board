import React from 'react';
import { useSnackbar } from 'notistack';
import BoardForm from '../../entities/BoardForm/BoardForm';
import { IFormBoardInput } from '../../entities/BoardForm/BoardForm.types';
import { useCreateBoardMutation } from '../../shared/store/api/endpoints/board.endpoints';
import { useStoreDispatch } from '../../shared/hooks/storeHooks';
import { closeModal } from '../../shared/store/slices/modalSlice/modalSlice';

const CreateBoard = () => {
  const [createBoard, { isLoading }] = useCreateBoardMutation();
  const dispatch = useStoreDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (inputs: IFormBoardInput) => {
    createBoard(inputs)
      .unwrap()
      .then(() => {
        dispatch(closeModal());
        enqueueSnackbar('Board is created', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar(err.data.errorMessage, { variant: 'error' });
      });
  };

  return (
    <BoardForm
      onSubmit={handleSubmit}
      defaultValues={{ title: '', description: '' }}
      loading={isLoading}
    />
  );
};

export default CreateBoard;
