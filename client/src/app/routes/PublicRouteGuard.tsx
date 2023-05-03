import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import useUser from '../../shared/hooks/useUser';
import { IRouteProps } from './route.types';

export const PublicRouteGuard: FC<IRouteProps> = ({ children }) => {
  const { isAuth } = useUser();

  if (isAuth) {
    return <Navigate to={'/boards'} replace />;
  }

  return <>{children}</>;
};
