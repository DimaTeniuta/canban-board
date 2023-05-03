import { styled, Button as MuiButton } from '@mui/material';

export const Wrapper = styled('div')({
  position: 'absolute',
  top: 0,
  left: 'calc(50% - 75px)',
});

export const Button = styled(MuiButton)({
  display: 'flex',
  columnGap: 10,
});
