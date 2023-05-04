import { Container } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { DragDropContext, Droppable, DroppableProvided, DropResult } from 'react-beautiful-dnd';
import {
  useGetColumnsQuery,
  useUpdateColumnOrderMutation,
} from '../../shared/store/api/endpoints/column.endpoints';
import Column from '../../features/Column/Column';
import {
  useUpdateTaskOrderAndColumnMutation,
  useUpdateTaskOrderMutation,
} from '../../shared/store/api/endpoints/task.endpoints';
import CreateButton from '../../shared/components/CreateButton/CreateButton';
import CreateColumn from '../../features/CreateColumn/CreateColumn';
import { useStoreDispatch } from '../../shared/hooks/store.hooks';
import { openModal } from '../../shared/store/slices/modalSlice/modalSlice';
import * as Styled from './Columns.styles';

const Columns = () => {
  const { id } = useParams();
  const { data } = useGetColumnsQuery(id!);
  const dispatch = useStoreDispatch();

  const [updateColumnOrder] = useUpdateColumnOrderMutation();
  const [updateTaskOrder] = useUpdateTaskOrderMutation();
  const [updateTaskOrderAndColumn] = useUpdateTaskOrderAndColumnMutation();

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    const { destination, source, type } = result;

    const oldOrder = source.index;
    const newOrder = destination.index;
    const oldId = source.droppableId;
    const newId = destination.droppableId;

    const data = { oldOrder, newOrder };

    if (oldOrder === newOrder && oldId === newId) return;

    if (type === 'column') {
      await updateColumnOrder({ boardId: id!, data }).unwrap();
    } else if (type === 'task') {
      if (oldId === newId) {
        await updateTaskOrder({ boardId: id!, columnId: oldId, data }).unwrap();
      } else {
        const data = { taskId: result.draggableId, oldOrder, newOrder };
        await updateTaskOrderAndColumn({
          boardId: id!,
          columnOldId: oldId,
          columnNewId: newId,
          data,
        }).unwrap();
      }
    }
  };

  const handleCreateColumn = () => {
    dispatch(openModal({ title: 'Create Column', Component: CreateColumn }));
  };

  return (
    <Container maxWidth="xl">
      <Styled.Container>
        <Styled.CreateButtonWrapper>
          <CreateButton onClick={handleCreateColumn}>Add Column</CreateButton>
        </Styled.CreateButtonWrapper>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable type="column" droppableId={id || ''} direction="horizontal">
            {(provided: DroppableProvided) => (
              <Styled.ColumnBox elevation={3} ref={provided.innerRef} {...provided.droppableProps}>
                {data?.map((column, index) => (
                  <Column key={column.id} columnData={column} index={index} />
                ))}

                {provided.placeholder}
              </Styled.ColumnBox>
            )}
          </Droppable>
        </DragDropContext>
      </Styled.Container>
    </Container>
  );
};

export default Columns;
