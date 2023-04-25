import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { IGoToButtonProps } from './GoToButton.types';
import * as Styled from './GoToButton.styles';

const GoToButton: FC<IGoToButtonProps> = ({ path }) => {
  return (
    <Styled.Button component={NavLink} to={path} variant="contained">
      Open
    </Styled.Button>
  );
};

export default GoToButton;
