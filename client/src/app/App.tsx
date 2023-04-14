import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import light from './theme/main';
import router from './routes/router';

const App = () => {
  return (
    <ThemeProvider theme={light}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
