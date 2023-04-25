import React, { FC } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { IDeleteButtonProps } from './DeleteButton.types';
import * as Styled from './DeleteButton.styles';

export const DeleteButton: FC<IDeleteButtonProps> = ({ onAction }) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    onAction();
  };

  return (
    <Styled.IconButton onClick={handleClick}>
      <DeleteOutlineIcon />
    </Styled.IconButton>
  );
};

export default DeleteButton;
