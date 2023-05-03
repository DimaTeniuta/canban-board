import React, { FC } from 'react';
import GoToButton from '../../../../shared/UI/GoToButton/GoToButton';
import ActionsButtons from '../../../../shared/components/ActionsButtons/ActionsButtons';
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
          <ActionsButtons onUpdate={onUpdate} onDelete={onDelete} />
        </Styled.ButtonWrap>
      </Styled.ContentWrap>
    </Styled.PaperContainer>
  );
};

export default CardBox;
