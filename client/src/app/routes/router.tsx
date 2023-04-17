import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import LoginPage from '../../pages/LoginPage/LoginPage';
import RegisterPage from '../../pages/RegisterPage/RegisterPage';
import { Layout } from '../Layout';
import store from '../../shared/store/root';
import HomePage from '../../pages/HomePage/HomePage';
import { PublicRouteGuard } from './PublicRouteGuard';
import { PrivateRouteGuard } from './PrivateRouteGuard';

const Router = () => {
  const isAuth = store.user.isAuth;

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

export default observer(Router);
