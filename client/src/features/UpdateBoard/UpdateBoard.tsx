import React from 'react';
import { useSnackbar } from 'notistack';
import BoardForm from '../../entities/BoardForm/BoardForm';
import { IFormBoardInput } from '../../entities/BoardForm/BoardForm.types';
import { useUpdateBoardMutation } from '../../shared/store/api/endpoints/board.endpoints';
import { useStoreDispatch } from '../../shared/hooks/storeHooks';
import { closeModal } from '../../shared/store/slices/modalSlice/modalSlice';
import useModalData from '../../shared/hooks/useModalData';
import { IBoard } from '../../shared/types/board';

const UpdateBoard = () => {
  const [updateBoard, { isLoading }] = useUpdateBoardMutation();
  const dispatch = useStoreDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const modalData = (useModalData() as unknown) as IBoard;

  const handleSubmit = (inputs: IFormBoardInput) => {
    updateBoard({ id: modalData.id, data: inputs })
      .unwrap()
      .then(() => {
        dispatch(closeModal());
        enqueueSnackbar('Board is updated', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar(err.data.errorMessage, { variant: 'error' });
      });
  };

  return (
    <BoardForm
      onSubmit={handleSubmit}
      defaultValues={{ title: modalData.title, description: modalData.description }}
      loading={isLoading}
    />
  );
};

export default UpdateBoard;
