import React, { FC } from 'react';
import UpdateButton from '../../UI/UpdateButton/UpdateButton';
import DeleteButton from '../../UI/DeleteButton/DeleteButton';
import * as Styled from './ActionsButtons.styles';
import { IActionsButtonsProps } from './ActionsButtons.types';

const ActionsButtons: FC<IActionsButtonsProps> = ({ onUpdate, onDelete }) => {
  return (
    <Styled.ButtonActionsWrap>
      <UpdateButton onAction={onUpdate} />
      <DeleteButton onAction={onDelete} />
    </Styled.ButtonActionsWrap>
  );
};

export default ActionsButtons;
