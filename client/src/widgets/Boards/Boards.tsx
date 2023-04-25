import React from 'react';
import { useSnackbar } from 'notistack';
import {
  useDeleteBoardMutation,
  useGetAllBoardsQuery,
} from '../../shared/store/api/endpoints/board.endpoints';
import Spinner from '../../shared/UI/Spinner/Spinner';
import CardBox from '../../shared/components/CardBox/CardBox';
import { useStoreDispatch } from '../../shared/hooks/store.hooks';
import { openModal } from '../../shared/store/slices/modalSlice/modalSlice';
import UpdateBoard from '../../features/UpdateBoard';
import { IBoard } from '../../shared/types/board';
import * as Styled from './Boards.styles';

const Boards = () => {
  const { data, isLoading } = useGetAllBoardsQuery(null);
  const [deleteBoard] = useDeleteBoardMutation();
  const dispatch = useStoreDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleUpdate = (data: IBoard) => {
    return () => {
      dispatch(
        openModal({
          open: true,
          title: 'Update Board',
          Component: UpdateBoard,
          modalData: data,
        })
      );
    };
  };

  const handleDelete = (id: string) => {
    return () =>
      deleteBoard(id)
        .unwrap()
        .then(() => enqueueSnackbar('Board is updated', { variant: 'success' }))
        .catch((err) => enqueueSnackbar(err.data.errorMessage, { variant: 'error' }));
  };

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
            onUpdate={handleUpdate(board)}
            onDelete={handleDelete(board.id)}
            path={`boards/${board.id}`}
          />
        ))
      )}
    </Styled.Container>
  );
};

export default Boards;
