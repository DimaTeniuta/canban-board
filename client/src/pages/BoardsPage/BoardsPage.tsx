import React from 'react';
import { Container } from '@mui/material';
import Boards from '../../widgets/Boards';

const BoardsPage = () => {
  return (
    <main>
      <Container maxWidth="xl">
        <Boards />
      </Container>
    </main>
  );
};

export default BoardsPage;
