import { styled } from '@mui/material';

export const Container = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 20,
  flexWrap: 'wrap',
  width: '100%',
  minHeight: 'calc(100vh - 160px)',
  margin: '20px auto 0 auto',
});
