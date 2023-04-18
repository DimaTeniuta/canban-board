import { Button } from '@mui/material';
import React from 'react';
import store from '../../shared/store/root';
import userService from '../../shared/services/userService/userService';
import boardService from '../../shared/services/boardService/boardService';

const HomePage = () => {
  const userId = store.user.user!.id as string;

  const handleClick = () => {
    boardService.deleteBoard('643e84c6c6d84835f25382ba').then((res) => console.log(222, res));
  };

  return (
    <main>
      HomePage <Button onClick={handleClick}>click</Button>
    </main>
  );
};

export default HomePage;
