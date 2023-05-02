import { Container } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { DragDropContext, Droppable, DroppableProvided, DropResult } from 'react-beautiful-dnd';
import {
  useGetColumnsQuery,
  useUpdateColumnOrderMutation,
} from '../../shared/store/api/endpoints/column.endpoints';
import Column from '../../features/Column/Column';
import AddColumnBox from './components/AddColumnBox/AddColumnBox';
import * as Styled from './Columns.styles';

const Columns = () => {
  const { id } = useParams();
  const { data } = useGetColumnsQuery(id!);
  console.log(555, data);

  const [updateColumnOrder] = useUpdateColumnOrderMutation();

  const onDragEnd = async (result: DropResult) => {
    console.log(111, result);
    if (!result.destination) return;
    const { destination, source, type } = result;

    const oldOrder = source.index;
    const newOrder = destination.index;
    const oldId = source.droppableId;
    const newId = destination.droppableId;

    if (type === 'column') {
      const data = { oldOrder, newOrder };
      await updateColumnOrder({ boardId: id!, data })
        .unwrap()
        .then((res) => console.log(222, res))
        .catch((err) => console.log(333, err));
    }
  };

  return (
    <Container maxWidth="xl">
      <Styled.Container>
        <AddColumnBox />

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable type="column" droppableId={id || ''} direction="horizontal">
            {(provided: DroppableProvided) => (
              <Styled.ColumnBox ref={provided.innerRef} {...provided.droppableProps}>
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
