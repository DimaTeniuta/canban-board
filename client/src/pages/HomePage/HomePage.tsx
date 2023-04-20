import { Button } from '@mui/material';
import React from 'react';
import store from '../../shared/store/root';
import userService from '../../shared/services/userService/userService';
import boardService from '../../shared/services/boardService/boardService';
import columnService from '../../shared/services/columnService/columnService';
import taskService from '../../shared/services/taskService/taskService';

const HomePage = () => {
  const userId = store.user.user!.id as string;

  const handleClick = () => {
    taskService
      .deleteTask(
        '643e8678c6d84835f25382c4',
        '6440e9c56068c9988f60ede0',
        '6440f5e74d3def6775375b4d'
      )
      .then((res) => console.log(222, res));
  };

  return (
    <main>
      HomePage <Button onClick={handleClick}>click</Button>
    </main>
  );
};

export default HomePage;
