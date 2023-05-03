import { styled, Paper } from '@mui/material';

export const PaperContainer = styled(Paper)({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '2px',
  width: '100%',
  minHeight: 114,
  maxHeight: 114,
});

export const TitleBox = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 10,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  height: '30px',
  padding: '0 0 0 6px',
  borderTopLeftRadius: '4px',
  borderTopRightRadius: '4px',
  backgroundColor: theme.palette.secondary.dark,
}));

export const Title = styled('div')(({ theme }) => ({
  maxWidth: '220px',
  color: theme.palette.primary.contrastText,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

export const Description = styled('div')(() => ({
  width: '100%',
  padding: 6,
  marginTop: 30,
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
  wordBreak: 'break-word',
  overflow: 'hidden',
}));
