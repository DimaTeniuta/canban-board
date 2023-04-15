import { Paper, styled, Container as MuiContainer } from '@mui/material';

export const Container = styled(MuiContainer)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: 'calc(100vh - 60px)',
  minHeight: 500,
  paddingBottom: 10,
}));

export const PaperContainer = styled(Paper)({
  padding: '20px',
  minHeight: 300,
  maxWidth: 550,
  margin: 'auto',
});

export const LinkWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: 20,
});
