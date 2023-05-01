import React, { FC } from 'react';
import * as Styled from './Task.styles';
import { ITaskProps } from './Task.types';
import { ActionsButton } from './components/ActionsButton/ActionsButton';

const Task: FC<ITaskProps> = ({ taskData }) => {
  return (
    <Styled.PaperContainer>
      <Styled.TitleBox>
        <Styled.Title>{taskData.title}</Styled.Title>
        <ActionsButton data={taskData} />
      </Styled.TitleBox>
      <Styled.Description>{taskData.description}</Styled.Description>
    </Styled.PaperContainer>
  );
};

export default Task;
