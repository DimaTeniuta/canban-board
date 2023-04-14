import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { IAuthRouteLinkProps } from './AuthRouteLink.types';
import * as Styled from './AuthRouteLink.styles';

const AuthRouteLink: FC<IAuthRouteLinkProps> = ({ children, path }) => {
  return (
    <Styled.Typography component={NavLink} to={path}>
      {children}
    </Styled.Typography>
  );
};

export default AuthRouteLink;
