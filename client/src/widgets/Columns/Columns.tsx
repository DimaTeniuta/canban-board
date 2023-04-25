import { Container } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetColumnsQuery } from '../../shared/store/api/endpoints/column.endpoints';
import Column from '../../entities/Column/Column';
import AddColumnBox from './components/AddColumnBox/AddColumnBox';
import * as Styled from './Columns.styles';

const Columns = () => {
  const { id } = useParams();
  const { data } = useGetColumnsQuery(id!);
  console.log(222, data);

  return (
    <Container maxWidth="xl">
      <Styled.Container>
        {data?.map((column) => (
          <Column key={column.id} title={column.title} />
        ))}
        <AddColumnBox />
      </Styled.Container>
    </Container>
  );
};

export default Columns;
