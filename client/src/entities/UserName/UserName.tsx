import React from 'react';
import store from '../../shared/store/root';
import * as Styled from './UserName.styles';

const UserName = () => {
  const userName = store.user.user?.name;

  return (
    <Styled.WrapProfileButtons>
      <Styled.UserName>{userName}</Styled.UserName>
      <Styled.AvatarProfileButtons>
        {userName && userName[0].toUpperCase()}
      </Styled.AvatarProfileButtons>
    </Styled.WrapProfileButtons>
  );
};

export default UserName;
