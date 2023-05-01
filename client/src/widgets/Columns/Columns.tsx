import { Container } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetColumnsQuery } from '../../shared/store/api/endpoints/column.endpoints';
import Column from '../../features/Column/Column';
import AddColumnBox from './components/AddColumnBox/AddColumnBox';
import * as Styled from './Columns.styles';

const Columns = () => {
  const { id } = useParams();
  const { data } = useGetColumnsQuery(id!);

  return (
    <Container maxWidth="xl">
      <Styled.Container>
        <AddColumnBox />
        <Styled.ColumnBox>
          {data?.map((column) => (
            <Column key={column.id} columnData={column} />
          ))}
        </Styled.ColumnBox>
      </Styled.Container>
    </Container>
  );
};

export default Columns;
