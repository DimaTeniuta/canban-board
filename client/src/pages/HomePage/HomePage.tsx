import { Button } from '@mui/material';
import React from 'react';
import store from '../../shared/store/root';
import userService from '../../shared/services/userService/userService';
import boardService from '../../shared/services/boardService/boardService';
import columnService from '../../shared/services/columnService/columnService';

const HomePage = () => {
  const userId = store.user.user!.id as string;

  const handleClick = () => {
    columnService
      .updateColumnOrder('643e8678c6d84835f25382c4', 2, 4)
      .then((res) => console.log(222, res));

    // columnService
    //   .createColumn('643e8678c6d84835f25382c4', 'test')
    //   .then((res) => console.log(222, res));
  };

  return (
    <main>
      HomePage <Button onClick={handleClick}>click</Button>
    </main>
  );
};

export default HomePage;
