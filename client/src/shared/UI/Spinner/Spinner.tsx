import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import * as Styled from './Spinner.styles';

const Spinner = () => {
  return (
    <Styled.Container>
      <CircularProgress />
    </Styled.Container>
  );
};

export default Spinner;
