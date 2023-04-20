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
      .updateTaskColumn(
        '643e8678c6d84835f25382c4',
        '6440e9c56068c9988f60ede0',
        '6440e9c56068c9988f60ede4',
        '64414b72b8a72fa11866a5ba',
        8,
        2
      )
      .then((res) => console.log(222, res));

    // taskService
    //   .createTask('643e8678c6d84835f25382c4', '6440e9c56068c9988f60ede4', {
    //     title: 'col2',
    //     description: 'bb',
    //   })
    //   .then((res) => console.log(222, res));
  };

  return (
    <main>
      HomePage <Button onClick={handleClick}>click</Button>
    </main>
  );
};

export default HomePage;
