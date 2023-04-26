import React, { FC } from 'react';
import ActionsButtons from '../../shared/components/ActionsButtons/ActionsButtons';
import { useStoreDispatch } from '../../shared/hooks/store.hooks';
import { openModal } from '../../shared/store/slices/modalSlice/modalSlice';
import UpdateColumn from '../UpdateColumn/UpdateColumn';
import * as Styled from './Column.styles';
import { IColumnProps } from './Column.types';
import { AddTaskButton } from './components/AddTaskButton/AddTaskButton';

const Column: FC<IColumnProps> = ({ columnData }) => {
  const dispatch = useStoreDispatch();
  const handleUpdate = () => {
    dispatch(
      openModal({
        open: true,
        title: 'Update Column',
        Component: UpdateColumn,
        modalData: { ...columnData },
      })
    );
  };

  const handleDelete = () => {};
  const handleAddTask = () => {};

  return (
    <Styled.PaperContainer>
      <Styled.Title>{columnData.title}</Styled.Title>
      <Styled.WrapContent>
        <Styled.TaskBox>1111</Styled.TaskBox>
        <Styled.ButtonsWrap>
          <AddTaskButton onAction={handleAddTask} />
          <ActionsButtons onUpdate={handleUpdate} onDelete={handleDelete} />
        </Styled.ButtonsWrap>
      </Styled.WrapContent>
    </Styled.PaperContainer>
  );
};

export default Column;
