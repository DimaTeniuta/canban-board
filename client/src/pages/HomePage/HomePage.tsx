import { Button } from '@mui/material';
import React from 'react';
import store from '../../shared/store/root';
import userService from '../../shared/services/userService/userService';

const HomePage = () => {
  // const handleClick = () => {
  //   userService.getUser(store.user?.user?.id || '').then((res) => console.log(222, res));
  // };
  const handleClick = () => {
    userService
      .updateUser(store.user?.user?.id || '', 'Dima2')
      .then((res) => console.log(222, res));
  };

  return (
    <main>
      HomePage <Button onClick={handleClick}>click</Button>
    </main>
  );
};

export default HomePage;
