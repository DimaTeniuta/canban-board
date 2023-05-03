import React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog } from '@mui/material';
import { Box } from '@mui/system';
import useModal from '../../shared/hooks/useModal';
import { useStoreDispatch } from '../../shared/hooks/store.hooks';
import { closeModal } from '../../shared/store/slices/modalSlice/modalSlice';
import * as Styled from './ModalWindow.styles';

const ModalWindow = () => {
  const { Component, open, title } = useModal();
  const dispatch = useStoreDispatch();

  const onClose = () => {
    dispatch(closeModal());
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Box sx={{ mr: 5 }}>{title}</Box>
        <Styled.IconButtonModalWindow aria-label="close" onClick={onClose}>
          <CloseIcon />
        </Styled.IconButtonModalWindow>
      </DialogTitle>
      <DialogContent>{<Component />}</DialogContent>
    </Dialog>
  );
};

export default ModalWindow;
