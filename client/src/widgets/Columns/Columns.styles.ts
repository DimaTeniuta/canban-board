import { styled } from '@mui/material';

export const Container = styled('div')({
  position: 'relative',
  display: 'flex',
  margin: '20px auto 0 auto',
  paddingTop: 30,
});

export const ColumnBox = styled('div')({
  display: 'flex',
  columnGap: 10,
  flexWrap: 'nowrap',
  minHeight: '500px',
  height: 'calc(100vh - 160px)',
  margin: '20px auto 0 auto',
  border: '1px solid red',
  overflowX: 'scroll',
  overflowY: 'hidden',
});
