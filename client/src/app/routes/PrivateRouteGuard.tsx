import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useStoreSelector } from '../../shared/hooks/store.hooks';
import { selectUser } from '../../shared/store/slices/userSlice';
import { IRouteProps } from './route.types';

export const PrivateRouteGuard: FC<IRouteProps> = ({ children }) => {
  const { isAuth } = useStoreSelector(selectUser);

  if (!isAuth) {
    return <Navigate to={'/login'} replace />;
  }

  return <>{children}</>;
};
