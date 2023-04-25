import { styled, Paper } from '@mui/material';

export const PaperContainer = styled(Paper)({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '10px',
  minHeight: 300,
  width: 400,
  margin: 'auto',
});

export const Title = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
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
