import React, { FC } from 'react';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import * as Styled from './Task.styles';
import { ITaskProps } from './Task.types';
import { ActionsButton } from './components/ActionsButton/ActionsButton';

const Task: FC<ITaskProps> = ({ taskData, index }) => {
  return (
    <Draggable draggableId={taskData.id} key={taskData.id} index={index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <Styled.PaperContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Styled.TitleBox>
            <Styled.Title>{taskData.title}</Styled.Title>
            <ActionsButton data={taskData} />
          </Styled.TitleBox>
          <Styled.Description>{taskData.description}</Styled.Description>
        </Styled.PaperContainer>
      )}
    </Draggable>
  );
};

export default Task;
