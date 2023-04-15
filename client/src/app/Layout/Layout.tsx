import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Spinner from '../../shared/UI/Spinner';
import Header from '../../widgets/Header';
import Notifier from '../../shared/components/Notifier/Notifier';

export const Layout = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<Spinner />}>
        <Outlet />
      </Suspense>
      <Notifier />
    </>
  );
};
