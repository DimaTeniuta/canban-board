import { Paper, styled } from '@mui/material';

export const PaperContainer = styled(Paper)({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '10px',
  minHeight: 300,
  width: 260,
});

export const Title = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '40px',
  padding: '0 20px',
  borderTopLeftRadius: '4px',
  borderTopRightRadius: '4px',
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.dark,
}));

export const ContentWrap = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  minHeight: '280px',
  marginTop: '30px',
});

export const Description = styled('div')({
  display: 'flex',
  flexGrow: 1,
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
  wordBreak: 'break-word',
});

export const ButtonWrap = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  columnGap: 5,
  flexGrow: 0,
});
