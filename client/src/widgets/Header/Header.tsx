import { AppBar, Container } from '@mui/material';
import React from 'react';
import Logo from '../../shared/UI/Logo';
import AuthNav from '../../features/AuthNav';
import useUser from '../../shared/hooks/useUser';
import LogoNav from '../../features/LogoNav';
import BurgerMenu from '../../features/BurgerMenu';
import * as Styled from './Header.styles';

const Header = () => {
  const { isAuth } = useUser();

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Styled.Toolbar disableGutters={true}>
          {isAuth ? (
            <>
              <BurgerMenu />
              <LogoNav />
            </>
          ) : (
            <>
              <Logo />
              <AuthNav />
            </>
          )}
        </Styled.Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
