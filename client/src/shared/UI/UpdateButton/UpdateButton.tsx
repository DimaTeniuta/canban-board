import React, { FC } from 'react';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { IUpdateButtonProps } from './UpdateButton.types';
import * as Styled from './UpdateButton.styles';

const UpdateButton: FC<IUpdateButtonProps> = ({ onAction }) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    onAction();
  };

  return (
    <Styled.IconButton onClick={handleClick}>
      <ModeEditOutlineOutlinedIcon />
    </Styled.IconButton>
  );
};

export default UpdateButton;
