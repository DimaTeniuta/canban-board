import React from 'react';
import NavButton from '../../shared/UI/NavButton';
import * as Styled from './AuthNav.styles';

const AuthNav = () => {
  return (
    <Styled.Container>
      <NavButton path={'/login'}>Login</NavButton>
      <NavButton path={'/register'}>Register</NavButton>
    </Styled.Container>
  );
};

export default AuthNav;
