import React, { useRef } from 'react';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import { useStoreSelector } from '../../hooks/store.hooks';
import { closeAlert, selectNotifier } from '../../store/slices/notifierSlice';
import * as Styled from './Notifier.styles';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="standard" {...props} />;
});

const Notifier = () => {
  const { alertArray } = useStoreSelector(selectNotifier);
  const containerRef = useRef(null);

  const handleClose = (id: number) => {
    return () => closeAlert(id);
  };

  return (
    <Styled.Wrapper ref={containerRef}>
      {alertArray.map(({ id, type, message }) => (
        <>
          <Slide key={id} direction="up" in={true} container={containerRef.current}>
            <Alert key={id} onClose={handleClose(id)} severity={type} sx={{ width: '100%' }}>
              {message}
            </Alert>
          </Slide>
        </>
      ))}
    </Styled.Wrapper>
  );
};

export default Notifier;
