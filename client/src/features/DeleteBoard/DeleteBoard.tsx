import React from 'react';
import { useSnackbar } from 'notistack';
import { useDeleteBoardMutation } from '../../shared/store/api/endpoints/board.endpoints';
import { useStoreDispatch } from '../../shared/hooks/storeHooks';
import useModalData from '../../shared/hooks/useModalData';
import ConfirmBox from '../../entities/ConfirmBox/ConfirmBox';
import Spinner from '../../shared/UI/Spinner/Spinner';
import { closeModal } from '../../shared/store/slices/modalSlice/modalSlice';

const DeleteBoard = () => {
  const dispatch = useStoreDispatch();
  const modalData = (useModalData() as unknown) as { boardId: string };
  const [deleteBoard, { isLoading }] = useDeleteBoardMutation();
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = () => {
    deleteBoard(modalData.boardId)
      .unwrap()
      .then(() => {
        dispatch(closeModal());
        enqueueSnackbar('Board is updated', { variant: 'success' });
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

export default DeleteBoard;
