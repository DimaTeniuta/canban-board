import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Spinner from '../../shared/UI/Spinner/Spinner';
import Header from '../../widgets/modules/Header/Header';

export const Layout = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<Spinner />}>
        <Outlet />
      </Suspense>
    </>
  );
};
