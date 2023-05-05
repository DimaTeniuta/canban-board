import React, { lazy } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { Layout } from '../Layout';
import useUser from '../../shared/hooks/useUser';
import { PublicRouteGuard } from './PublicRouteGuard';
import { PrivateRouteGuard } from './PrivateRouteGuard';

const LoginPage = lazy(() => import('../../pages/LoginPage'));
const RegisterPage = lazy(() => import('../../pages/RegisterPage'));
const BoardsPage = lazy(() => import('../../pages/BoardsPage'));
const BoardPage = lazy(() => import('../../pages/BoardPage'));

const AppRouter = () => {
  const { isAuth } = useUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              isAuth ? <Navigate to={'/boards'} replace /> : <Navigate to={'/login'} replace />
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

          <Route path="boards" element={<PrivateRouteGuard>{<Outlet />}</PrivateRouteGuard>}>
            <Route index element={<BoardsPage />} />
            <Route path=":id" element={<BoardPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
