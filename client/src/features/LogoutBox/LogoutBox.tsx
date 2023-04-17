import { Button } from '@mui/material';
import React from 'react';
import { observer } from 'mobx-react-lite';
import store from '../../shared/store/root';

const LogoutBox = () => {
  const handleLogout = () => {
    store.user.logout();
  };

  return (
    <Button variant="contained" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default observer(LogoutBox);
