import React from 'react';
import useModalData from '../../shared/hooks/useModalData';
import { ITask } from '../../shared/types/task';
import * as Styled from './TaskInfo.styles';

const TaskInfo = () => {
  const modalData = (useModalData() as unknown) as ITask;
  return (
    <Styled.Container>
      <Styled.Title>{modalData.title}</Styled.Title>
      <Styled.Description>{modalData.description}</Styled.Description>
    </Styled.Container>
  );
};

export default TaskInfo;
