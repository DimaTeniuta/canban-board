import { Button } from '@mui/material';
import React from 'react';
import { useGetAllUsersMutation } from '../../shared/store/api/endpoints/user.endpoints';

const HomePage = () => {
  const [getAllUsers] = useGetAllUsersMutation();

  const handleClick = async () => {
    const data = await getAllUsers(null).unwrap();
    console.log(1111, data);
  };

  return (
    <main>
      HomePage <Button onClick={handleClick}>click</Button>
    </main>
  );
};

export default HomePage;
