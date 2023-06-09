import { CssBaseline, ThemeProvider } from '@mui/material';
import React, { useEffect } from 'react';
import { SnackbarProvider } from 'notistack';
import Spinner from '../shared/UI/Spinner/Spinner';
import { useLazyCheckAuthQuery } from '../shared/store/api/endpoints/auth.endpoints';
import { useStoreDispatch } from '../shared/hooks/storeHooks';
import { setUser } from '../shared/store/slices/userSlice/userSlice';
import { SnackbarUtilsConfigurator } from '../shared/utils/snackBar';
import useUser from '../shared/hooks/useUser';
import light from './theme/main';
import Router from './routes/AppRouter';

const App = () => {
  const [checkAuth, { isLoading }] = useLazyCheckAuthQuery();
  const dispatch = useStoreDispatch();
  const { token } = useUser();

  useEffect(() => {
    if (!token) return;
    checkAuth(null)
      .unwrap()
      .then((res) => {
        dispatch(setUser(res));
      });
  }, [checkAuth, dispatch, token]);

  return (
    <SnackbarProvider
      maxSnack={7}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      autoHideDuration={5000}
    >
      <ThemeProvider theme={light}>
        <CssBaseline />
        <SnackbarUtilsConfigurator />
        {isLoading ? <Spinner /> : <Router />}
      </ThemeProvider>
    </SnackbarProvider>
  );
};

export default App;
