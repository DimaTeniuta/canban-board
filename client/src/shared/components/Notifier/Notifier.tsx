import React, { useRef } from 'react';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import { observer } from 'mobx-react-lite';
import { notificationStore } from '../../store/notificationStore/notificationStore';
import * as Styled from './Notifier.styles';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="standard" {...props} />;
});

const Notifier = () => {
  const alertArray = notificationStore.alertArray;
  const containerRef = useRef(null);

  const handleClose = (id: number) => {
    return () => notificationStore.closeAlert(id);
  };

  return (
    <Styled.Wrapper ref={containerRef}>
      {alertArray.map(({ id, type, message }) => (
        <>
          <Slide key={id} direction="up" in={true} container={containerRef.current}>
            <Alert onClose={handleClose(id)} severity={type} sx={{ width: '100%' }}>
              {message}
            </Alert>
          </Slide>
        </>
      ))}
    </Styled.Wrapper>
  );
};

export default observer(Notifier);
