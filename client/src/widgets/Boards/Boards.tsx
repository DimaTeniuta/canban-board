import React from 'react';
import { useGetAllBoardsQuery } from '../../shared/store/api/endpoints/board.endpoints';
import Spinner from '../../shared/UI/Spinner/Spinner';
import { useStoreDispatch } from '../../shared/hooks/storeHooks';
import { openModal } from '../../shared/store/slices/modalSlice/modalSlice';
import UpdateBoard from '../../features/UpdateBoard';
import { IBoard } from '../../shared/types/board';
import DeleteBoard from '../../features/DeleteBoard/DeleteBoard';
import CreateButton from '../../shared/components/CreateButton/CreateButton';
import CreateBoard from '../../features/CreateBoard/CreateBoard';
import CardBox from './components/CardBox/CardBox';
import * as Styled from './Boards.styles';

const Boards = () => {
  const { data, isLoading } = useGetAllBoardsQuery(null);
  const dispatch = useStoreDispatch();

  const handleUpdate = (data: IBoard) => {
    return () => {
      dispatch(
        openModal({
          title: 'Update Board',
          Component: UpdateBoard,
          modalData: { ...data },
        })
      );
    };
  };

  const handleDelete = (id: string) => {
    return () =>
      dispatch(
        openModal({ title: 'Delete Board', Component: DeleteBoard, modalData: { boardId: id } })
      );
  };

  const handleCreateBoard = () => {
    dispatch(openModal({ title: 'Create Board', Component: CreateBoard }));
  };

  return (
    <Styled.Container>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Styled.CreateButtonWrapper>
            <CreateButton onClick={handleCreateBoard}>Add Board</CreateButton>
          </Styled.CreateButtonWrapper>

          {data &&
            data.map((board) => (
              <CardBox
                key={board.id}
                title={board.title}
                description={board.description}
                onUpdate={handleUpdate(board)}
                onDelete={handleDelete(board.id)}
                path={`${board.id}`}
              />
            ))}
        </>
      )}
    </Styled.Container>
  );
};

export default Boards;
