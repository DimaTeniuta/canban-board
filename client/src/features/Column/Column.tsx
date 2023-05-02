import React, { FC } from 'react';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import ActionsButtons from '../../shared/components/ActionsButtons/ActionsButtons';
import { useStoreDispatch } from '../../shared/hooks/store.hooks';
import { openModal } from '../../shared/store/slices/modalSlice/modalSlice';
import UpdateColumn from '../UpdateColumn';
import DeleteColumn from '../DeleteColumn';
import CreateTask from '../CreateTask/CreateTask';
import { useGetTasksQuery } from '../../shared/store/api/endpoints/task.endpoints';
import Task from '../../entities/Task/Task';
import * as Styled from './Column.styles';
import { IColumnProps } from './Column.types';
import { AddTaskButton } from './components/AddTaskButton/AddTaskButton';

const Column: FC<IColumnProps> = ({ columnData, index }) => {
  const dispatch = useStoreDispatch();
  const { data } = useGetTasksQuery({ boardId: columnData.boardId, columnId: columnData.id });

  const handleUpdate = () => {
    dispatch(
      openModal({
        title: 'Update Column',
        Component: UpdateColumn,
        modalData: { ...columnData },
      })
    );
  };

  const handleDelete = () => {
    dispatch(
      openModal({
        title: 'Delete Column',
        Component: DeleteColumn,
        modalData: { boardId: columnData.boardId, columnId: columnData.id },
      })
    );
  };

  const handleAddTask = () => {
    dispatch(
      openModal({
        title: 'Create Task',
        Component: CreateTask,
        modalData: { boardId: columnData.boardId, columnId: columnData.id },
      })
    );
  };

  return (
    <Draggable draggableId={columnData.id} key={columnData.id} index={index}>
      {(providedDragColumn: DraggableProvided, dragableSnapshot: DraggableStateSnapshot) => (
        <Styled.PaperContainer
          ref={providedDragColumn.innerRef}
          {...providedDragColumn.draggableProps}
          {...providedDragColumn.dragHandleProps}
        >
          <Styled.Title>{columnData.title}</Styled.Title>
          <Styled.WrapContent>
            <Styled.TaskBox>
              {data && data?.map((task) => <Task key={task.id} taskData={task} />)}
            </Styled.TaskBox>

            <Styled.ButtonsWrap>
              <AddTaskButton onAction={handleAddTask} />
              <ActionsButtons onUpdate={handleUpdate} onDelete={handleDelete} />
            </Styled.ButtonsWrap>
          </Styled.WrapContent>
        </Styled.PaperContainer>
      )}
    </Draggable>
  );
};

export default Column;
