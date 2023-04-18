import { Button } from '@mui/material';
import React from 'react';
import store from '../../shared/store/root';

const HomePage = () => {
  return (
    <main>
      HomePage <Button onClick={() => store.user.getUsers()}>click</Button>
    </main>
  );
};

export default HomePage;
