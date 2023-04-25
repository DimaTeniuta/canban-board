import { IconButton } from '@mui/material';
import React from 'react';
import AddCardIcon from '@mui/icons-material/AddCard';
import { useStoreDispatch } from '../../../../shared/hooks/store.hooks';
import { openModal } from '../../../../shared/store/slices/modalSlice/modalSlice';
import CreateColumn from '../../../../features/CreateColumn/CreateColumn';

const AddColumnBox = () => {
  const dispatch = useStoreDispatch();

  const handleClick = () => {
    dispatch(openModal({ open: true, title: 'Create Column', Component: CreateColumn }));
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <AddCardIcon color="primary" />
      </IconButton>
    </>
  );
};

export default AddColumnBox;
