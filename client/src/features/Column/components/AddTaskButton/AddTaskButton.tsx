import React, { FC } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { IAddTaskButtonProps } from './AddTaskButton.type';
import * as Styled from './AddTaskButton.styles';

export const AddTaskButton: FC<IAddTaskButtonProps> = ({ onAction }) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    onAction();
  };

  return (
    <Styled.IconButton onClick={handleClick}>
      <AddIcon />
    </Styled.IconButton>
  );
};
