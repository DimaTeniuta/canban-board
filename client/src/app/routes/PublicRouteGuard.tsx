import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import store from '../../shared/store/root';
import { IRouteProps } from './route.types';

export const PublicRouteGuard: FC<IRouteProps> = ({ children }) => {
  const isAuth = store.user.isAuth;

  if (isAuth) {
    return <Navigate to={'/home'} replace />;
  }

  return <>{children}</>;
};
