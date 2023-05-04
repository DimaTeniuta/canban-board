import { styled } from '@mui/material';

export const Container = styled('div')({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 20,
  flexWrap: 'wrap',
  width: '100%',
  minHeight: 'calc(100vh - 160px)',
  margin: '20px auto 0 auto',
  paddingTop: '40px',
});

export const CreateButtonWrapper = styled('div')({
  position: 'absolute',
  top: 10,
  transform: 'translate(0, -50%)',
});
