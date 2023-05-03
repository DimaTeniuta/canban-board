import { styled, Button } from '@mui/material';

export const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  fontSize: 16,
  '&.active': {
    color: theme.palette.primary.contrastText,
    boxShadow: 'none',
  },
})) as typeof Button;
