import { styled } from '@mui/material';

export const Container = styled('div')({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  columnGap: 10,
  flexWrap: 'nowrap',
  minHeight: 'calc(100vh - 160px)',
  margin: '20px auto 0 auto',
  border: '1px solid red',
});
