import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Spinner from '../../shared/UI/Spinner';
import Header from '../../widgets/Header';
import ModalWindow from '../../widgets/ModalWindow/ModalWindow';
import useModal from '../../shared/hooks/useModal';

export const Layout = () => {
  const { open } = useModal();
  return (
    <>
      <Header />
      <Suspense fallback={<Spinner />}>
        <Outlet />
      </Suspense>
      {open && <ModalWindow />}
    </>
  );
};
