import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import light from './theme/main';
import Router from './routes/router';

const App = () => {
  return (
    <ThemeProvider theme={light}>
      <CssBaseline />
      <Router />
    </ThemeProvider>
  );
};

export default App;
