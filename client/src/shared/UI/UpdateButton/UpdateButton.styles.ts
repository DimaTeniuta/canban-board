import { styled, IconButton as MuiIconButton } from '@mui/material';

export const IconButton = styled(MuiIconButton)(() => ({
  color: 'gray',
  ':hover': {
    color: 'primary.main',
    backgroundColor: '#c2eafc',
  },
  transition: '0.3s',
}));
