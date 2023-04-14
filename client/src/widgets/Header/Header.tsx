import { AppBar, Container } from '@mui/material';
import React from 'react';
import Logo from '../../shared/UI/Logo';
import AuthNav from '../../features/AuthNav';
import * as Styled from './Header.styles';

const Header = () => {
  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Styled.Toolbar disableGutters={true}>
          <Logo />
          <AuthNav />
        </Styled.Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
