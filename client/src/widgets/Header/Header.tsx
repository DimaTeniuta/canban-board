import { AppBar, Container } from '@mui/material';
import React from 'react';
import { observer } from 'mobx-react-lite';
import Logo from '../../shared/UI/Logo';
import AuthNav from '../../features/AuthNav';
import store from '../../shared/store/root';
import LogoutBox from '../../features/LogoutBox/LogoutBox';
import * as Styled from './Header.styles';

const Header = () => {
  const isAuth = store.user.isAuth;

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Styled.Toolbar disableGutters={true}>
          <Logo />
          {isAuth ? <LogoutBox /> : <AuthNav />}
        </Styled.Toolbar>
      </Container>
    </AppBar>
  );
};

export default observer(Header);
