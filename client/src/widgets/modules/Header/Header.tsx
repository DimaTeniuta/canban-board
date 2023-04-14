import { AppBar, Container, Toolbar } from '@mui/material';
import React from 'react';
import Logo from '../../../shared/UI/Logo/Logo';

const Header = () => {
  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters={true}>
          <Logo />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
