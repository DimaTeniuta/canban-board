import { CssBaseline, ThemeProvider } from '@mui/material';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Provider } from 'react-redux';
import Spinner from '../shared/UI/Spinner/Spinner';
import { store } from '../shared/store/store';
import light from './theme/main';
import Router from './routes/router';

const App = () => {
  useEffect(() => {
    // store.user.checkAuth();
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={light}>
        <CssBaseline />
        <Router />
      </ThemeProvider>
    </Provider>
  );
};

export default observer(App);
