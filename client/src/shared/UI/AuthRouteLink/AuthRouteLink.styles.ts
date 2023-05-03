import { styled, Typography as MuiTypography } from '@mui/material';

export const Typography = styled(MuiTypography)(({ theme }) => ({
  color: theme.palette.secondary.contrastText,
})) as typeof MuiTypography;
