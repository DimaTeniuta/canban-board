import { Paper } from '@mui/material';
import React from 'react';
import { useGetAllBoardsQuery } from '../../shared/store/api/endpoints/board.endpoints';
import Spinner from '../../shared/UI/Spinner/Spinner';
import CardBox from '../../shared/components/CardBox/CardBox';
import * as Styled from './Boards.styles';

const Boards = () => {
  const { data, isLoading, isError } = useGetAllBoardsQuery(null);
  console.log(222, data);

  const handleUpdate = () => {};

  const handleDelete = () => {};

  return (
    <Styled.Container>
      {isLoading ? (
        <Spinner />
      ) : (
        data &&
        data.map((board) => (
          <CardBox
            key={board.id}
            title={board.title}
            description={board.description}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            path={`boards/${board.id}`}
          />
        ))
      )}
    </Styled.Container>
  );
};

export default Boards;
