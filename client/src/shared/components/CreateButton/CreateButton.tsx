import React, { FC } from 'react';
import AddCardIcon from '@mui/icons-material/AddCard';
import * as Styled from './CreateButton.styles';
import { ICreateButtonProps } from './CreateButton.types';

const CreateButton: FC<ICreateButtonProps> = ({ onClick, children }) => {
  return (
    <Styled.Button variant="contained" onClick={onClick}>
      <AddCardIcon sx={{ color: 'primary.contrastText' }} />
      {children}
    </Styled.Button>
  );
};

export default CreateButton;
