import { Button } from '@mui/material';
import React from 'react';
import { useStoreDispatch } from '../../shared/hooks/store.hooks';
import { clearUser } from '../../shared/store/slices/userSlice';

const LogoutBox = () => {
  const dispatch = useStoreDispatch();
  const handleLogout = () => {
    dispatch(clearUser());
  };

  return (
    <Button variant="contained" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutBox;
