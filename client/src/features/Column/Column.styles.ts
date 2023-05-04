import { styled, Paper } from '@mui/material';

export const PaperContainer = styled(Paper)({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  minHeight: 500,
  maxHeight: 500,
  maxWidth: 300,
  minWidth: 300,
});

export const Title = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 9,
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '40px',
  padding: '0 20px',
  borderTopLeftRadius: '4px',
  borderTopRightRadius: '4px',
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.dark,
}));

export const WrapContent = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '100%',
  height: '100%',
  marginTop: 40,
}));

export const TaskBox = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  flexGrow: 1,
  rowGap: 10,
  width: '100%',
  minHeight: '420px',
  maxHeight: '420px',
  padding: '10px',
  overflowY: 'auto',
  '::-webkit-scrollbar': {
    width: 8,
  },
  '::-webkit-scrollbar-thumb': {
    borderRadius: '6px',
  },
}));

export const ButtonsWrap = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  height: '40px',
}));
