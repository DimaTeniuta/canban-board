import React, { FC } from 'react';
import { Button } from '../../shared/UI/GoToButton/GoToButton.styles';
import { useStoreDispatch } from '../../shared/hooks/storeHooks';
import { closeModal } from '../../shared/store/slices/modalSlice/modalSlice';
import * as Styled from './ConfirmBox.styles';
import { IConfirmBoxProps } from './ConfirmBox.types';

const ConfirmBox: FC<IConfirmBoxProps> = ({ onAction }) => {
  const dispatch = useStoreDispatch();

  const handleConfirm = () => {
    onAction();
  };

  const handleCancel = () => {
    dispatch(closeModal());
  };

  return (
    <Styled.Container>
      <Button variant="contained" color="primary" onClick={handleConfirm}>
        Delete
      </Button>

      <Button variant="contained" color="error" onClick={handleCancel}>
        Cancel
      </Button>
    </Styled.Container>
  );
};

export default ConfirmBox;
