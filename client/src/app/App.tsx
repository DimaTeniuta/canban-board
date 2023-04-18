import { CssBaseline, ThemeProvider } from '@mui/material';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import store from '../shared/store/root';
import Spinner from '../shared/UI/Spinner/Spinner';
import light from './theme/main';
import Router from './routes/router';

const App = () => {
  const loading = store.user.isLoading;

  useEffect(() => {
    store.user.checkAuth();
  }, []);

  return (
    <ThemeProvider theme={light}>
      <CssBaseline />
      {loading ? <Spinner /> : <Router />}
    </ThemeProvider>
  );
};

export default observer(App);
