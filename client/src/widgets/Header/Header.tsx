import { AppBar, Container } from '@mui/material';
import React from 'react';
import { observer } from 'mobx-react-lite';
import Logo from '../../shared/UI/Logo';
import AuthNav from '../../features/AuthNav';
import store from '../../shared/store/root';
import LogoutBox from '../../features/LogoutBox/LogoutBox';
import UserName from '../../entities/UserName/UserName';
import { useStoreSelector } from '../../shared/hooks/store.hooks';
import { selectUser } from '../../shared/store/slices/userSlice';
import * as Styled from './Header.styles';

const Header = () => {
  const { isAuth } = useStoreSelector(selectUser);

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Styled.Toolbar disableGutters={true}>
          <Logo />
          {isAuth ? (
            <Styled.WrapperLogoutBox>
              <UserName />
              <LogoutBox />
            </Styled.WrapperLogoutBox>
          ) : (
            <AuthNav />
          )}
        </Styled.Toolbar>
      </Container>
    </AppBar>
  );
};

export default observer(Header);
