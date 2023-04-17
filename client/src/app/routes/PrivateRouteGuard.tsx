import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import store from '../../shared/store/root';
import { IRouteProps } from './route.types';

export const PrivateRouteGuard: FC<IRouteProps> = ({ children }) => {
  const isAuth = store.user.isAuth;

  if (!isAuth) {
    return <Navigate to={'/login'} replace />;
  }

  return <>{children}</>;
};
