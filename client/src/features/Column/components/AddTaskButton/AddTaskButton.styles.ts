import { styled, IconButton as MuiIconButton } from '@mui/material';

export const IconButton = styled(MuiIconButton)(({ theme }) => ({
  color: 'gray',
  ':hover': {
    color: theme.palette.primary.main,
    backgroundColor: '#b4bfbc',
  },
  transition: '0.3s',
}));
