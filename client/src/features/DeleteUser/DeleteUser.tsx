import React from 'react';
import { useSnackbar } from 'notistack';
import useUser from '../../shared/hooks/useUser';
import { useDeleteUserMutation } from '../../shared/store/api/endpoints/user.endpoints';
import { useStoreDispatch } from '../../shared/hooks/storeHooks';
import { closeModal } from '../../shared/store/slices/modalSlice/modalSlice';
import { clearUser } from '../../shared/store/slices/userSlice/userSlice';
import ConfirmBox from '../../entities/ConfirmBox/ConfirmBox';
import Spinner from '../../shared/UI/Spinner/Spinner';

const DeleteUser = () => {
  const user = useUser();
  const [deleteUser, { isLoading }] = useDeleteUserMutation();
  const dispatch = useStoreDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = () => {
    deleteUser({
      userId: user.user!.id!,
    })
      .unwrap()
      .then(() => {
        dispatch(closeModal());
        dispatch(clearUser());
        enqueueSnackbar('User is deleted', { variant: 'success' });
      })
      .catch((err) => {
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

export default DeleteUser;
