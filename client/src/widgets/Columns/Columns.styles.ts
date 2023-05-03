import { styled, Paper } from '@mui/material';

export const Container = styled('div')({
  position: 'relative',
  display: 'flex',
  margin: '20px auto 0 auto',
  paddingTop: 30,
});

export const ColumnBox = styled(Paper)(() => ({
  display: 'flex',
  alignItems: 'flex-start',
  columnGap: 20,
  flexWrap: 'nowrap',
  width: '100%',
  minHeight: '550px',
  maxHeight: '550px',
  margin: '30px auto 0 auto',
  padding: 20,
  overflowX: 'auto',
  overflowY: 'hidden',
}));
