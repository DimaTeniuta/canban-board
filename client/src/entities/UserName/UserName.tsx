import React from 'react';
import useUser from '../../shared/hooks/useUser';
import * as Styled from './UserName.styles';

const UserName = () => {
  const { user } = useUser();

  return (
    <Styled.WrapProfileButtons>
      <Styled.UserName>{user?.name}</Styled.UserName>
      <Styled.AvatarProfileButtons>
        {user?.name && user?.name[0].toUpperCase()}
      </Styled.AvatarProfileButtons>
    </Styled.WrapProfileButtons>
  );
};

export default UserName;
