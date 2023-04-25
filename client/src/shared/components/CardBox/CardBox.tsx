import React, { FC } from 'react';
import UpdateButton from '../../UI/UpdateButton/UpdateButton';
import DeleteButton from '../../UI/DeleteButton/DeleteButton';
import GoToButton from '../../UI/GoToButton/GoToButton';
import * as Styled from './CardBox.styles';
import { ICardBoxProps } from './CardBox.types';

const CardBox: FC<ICardBoxProps> = ({ title, description, onUpdate, onDelete, path }) => {
  return (
    <Styled.PaperContainer>
      <Styled.Title>{title}</Styled.Title>
      <Styled.ContentWrap>
        <Styled.Description>{description}</Styled.Description>
        <Styled.ButtonWrap>
          <GoToButton path={path} />
          <Styled.ButtonActionsWrap>
            <UpdateButton onAction={onUpdate} />
            <DeleteButton onAction={onDelete} />
          </Styled.ButtonActionsWrap>
        </Styled.ButtonWrap>
      </Styled.ContentWrap>
    </Styled.PaperContainer>
  );
};

export default CardBox;
