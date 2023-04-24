import { AppBar, Container } from '@mui/material';
import React from 'react';
import Logo from '../../shared/UI/Logo';
import AuthNav from '../../features/AuthNav';
import LogoutBox from '../../features/LogoutBox/LogoutBox';
import UserName from '../../entities/UserName/UserName';
import useUser from '../../shared/hooks/useUser';
import * as Styled from './Header.styles';

const Header = () => {
  const { isAuth } = useUser();

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

export default Header;
