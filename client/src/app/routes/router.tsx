import React, { lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '../Layout';
import useUser from '../../shared/hooks/useUser';
import { PublicRouteGuard } from './PublicRouteGuard';
import { PrivateRouteGuard } from './PrivateRouteGuard';

const LoginPage = lazy(() => import('../../pages/LoginPage'));
const RegisterPage = lazy(() => import('../../pages/RegisterPage'));
const HomePage = lazy(() => import('../../pages/HomePage'));

const Router = () => {
  const { isAuth } = useUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              isAuth ? <Navigate to={'/home'} replace /> : <Navigate to={'/login'} replace />
            }
          />
          <Route
            path="login"
            element={
              <PublicRouteGuard>
                <LoginPage />
              </PublicRouteGuard>
            }
          />
          <Route
            path="register"
            element={
              <PublicRouteGuard>
                <RegisterPage />
              </PublicRouteGuard>
            }
          />
          <Route
            path="home"
            element={
              <PrivateRouteGuard>
                <HomePage />
              </PrivateRouteGuard>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
