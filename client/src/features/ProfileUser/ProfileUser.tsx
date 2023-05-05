import React from 'react';
import { useSnackbar } from 'notistack';
import { useUpdateUserMutation } from '../../shared/store/api/endpoints/user.endpoints';
import useUser from '../../shared/hooks/useUser';
import { useStoreDispatch } from '../../shared/hooks/storeHooks';
import { IUserFormInput } from '../../entities/UserForm/UserForm.types';
import { closeModal, openModal } from '../../shared/store/slices/modalSlice/modalSlice';
import UserForm from '../../entities/UserForm/UserForm';
import { updateUser as storeUpdateUser } from '../../shared/store/slices/userSlice/userSlice';
import DeleteUser from '../DeleteUser/DeleteUser';

const ProfileUser = () => {
  const user = useUser();
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const dispatch = useStoreDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (inputs: IUserFormInput) => {
    updateUser({
      userId: user.user!.id!,
      data: { name: inputs.name },
    })
      .unwrap()
      .then((res) => {
        dispatch(closeModal());
        dispatch(storeUpdateUser(res.name));
        enqueueSnackbar('User is updated', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar(err.data.errorMessage, { variant: 'error' });
      });
  };

  const handleDelete = () => {
    dispatch(openModal({ title: 'Delete User', Component: DeleteUser }));
  };

  return (
    <UserForm
      defaultValues={{ name: user.user!.name!, email: user.user!.email! }}
      loading={isLoading}
      onSubmit={handleSubmit}
      onDelete={handleDelete}
    />
  );
};

export default ProfileUser;
