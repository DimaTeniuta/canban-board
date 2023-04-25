import { styled, IconButton as MuiIconButton } from '@mui/material';

export const IconButton = styled(MuiIconButton)(() => ({
  color: 'gray',
  ':hover': {
    color: '#dc5b5b',
    backgroundColor: '#f4d8d8',
  },
  transition: '0.3s',
}));
