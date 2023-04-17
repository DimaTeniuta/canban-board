import { styled, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';

export const WrapProfileButtons = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
}));

export const UserName = styled(Typography)(({ theme }) => ({
  maxWidth: 180,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',

  [theme.breakpoints.down('sm')]: {
    maxWidth: 100,
  },
}));

export const AvatarProfileButtons = styled(Avatar)(({ theme }) => ({
  width: 32,
  height: 32,
  marginLeft: 10,
  backgroundColor: theme.palette.secondary.main,
}));
