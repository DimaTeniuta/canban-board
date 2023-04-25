import React, { FC } from 'react';
import * as Styled from './Column.styles';
import { IColumnProps } from './Column.types';

const Column: FC<IColumnProps> = ({ title }) => {
  return (
    <Styled.PaperContainer>
      <Styled.Title>{title}</Styled.Title>
    </Styled.PaperContainer>
  );
};

export default Column;
