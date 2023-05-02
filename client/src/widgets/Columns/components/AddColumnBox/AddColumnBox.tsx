import React from 'react';
import AddCardIcon from '@mui/icons-material/AddCard';
import { useStoreDispatch } from '../../../../shared/hooks/store.hooks';
import { openModal } from '../../../../shared/store/slices/modalSlice/modalSlice';
import CreateColumn from '../../../../features/CreateColumn/CreateColumn';
import * as Styled from './AddColumnBox.styles';

const AddColumnBox = () => {
  const dispatch = useStoreDispatch();

  const handleClick = () => {
    dispatch(openModal({ title: 'Create Column', Component: CreateColumn }));
  };

  return (
    <Styled.Wrapper>
      <Styled.Button variant="contained" onClick={handleClick}>
        <AddCardIcon sx={{ color: 'primary.contrastText' }} />
        Add Column
      </Styled.Button>
    </Styled.Wrapper>
  );
};

export default AddColumnBox;
