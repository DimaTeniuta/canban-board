import { Button } from '@mui/material';
import React, { FC } from 'react';
import { ISubmitButtonProps } from './SubmitButton.types';

const SubmitButton: FC<ISubmitButtonProps> = ({ children }) => {
  return (
    <Button sx={{ mt: 2 }} fullWidth type="submit" variant="contained">
      {children}
    </Button>
  );
};

export default SubmitButton;
