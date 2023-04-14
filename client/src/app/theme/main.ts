import { createTheme } from '@mui/material';

export default createTheme({
  palette: {
    primary: {
      main: '#31708E',
      contrastText: '#8FC1E3',
    },
    secondary: {
      main: '#F7F9FB',
      contrastText: '#687864',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '::-webkit-scrollbar': {
          width: 10,
          height: 10,
        },
        '::-webkit-scrollbar-thumb': {
          backgroundColor: '#bdbdbd',
        },
        '::-webkit-scrollbar-track': {
          backgroundColor: '#f5f5f7',
        },
        '*': {
          margin: 0,
          padding: 0,
        },
        body: {
          minWidth: 320,
          margin: 0,
          backgroundColor: '#fefefe',
        },
        '#root': {
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '100vh',
          margin: '0 auto',
        },

        header: {
          flexGrow: 0,
        },
        footer: {
          flexGrow: 0,
        },
        main: {
          flexGrow: 1,
          position: 'relative',
          paddingBottom: '20px',
          marginTop: '65px',
          overflow: 'hidden',
        },
      },
    },
  },
});
