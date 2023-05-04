import { styled } from '@mui/material';

export const Container = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  minWidth: '260px',
}));

export const Title = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: 22,
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
  wordBreak: 'break-word',
}));

export const Description = styled('div')(() => ({
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
  wordBreak: 'break-word',
}));
