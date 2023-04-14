import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { INavButtonProps } from './NavButton.types';
import * as Styled from './NavButton.styles';

const NavButton: FC<INavButtonProps> = ({ children, path }) => {
  return (
    <Styled.NavButton variant="contained" component={NavLink} to={path}>
      {children}
    </Styled.NavButton>
  );
};

export default NavButton;
