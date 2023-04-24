import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Divider, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { Logout } from '@mui/icons-material';
import useUser from '../../shared/hooks/useUser';
import { useStoreDispatch } from '../../shared/hooks/store.hooks';
import { clearUser } from '../../shared/store/slices/userSlice';
import * as Styled from './LogoNav.styles';

export const LogoNav = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { user } = useUser();
  const navigate = useNavigate();
  const dispatch = useStoreDispatch();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(clearUser());
    navigate('/login');
  };

  const handleGoToProfile = () => {
    console.log('go to profile');
  };

  return (
    <>
      <Styled.WrapProfileButtons>
        <Styled.TypographyEmailProfileButtons>{user?.name}</Styled.TypographyEmailProfileButtons>
        <Tooltip title={'Account settings'}>
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Styled.AvatarProfileButtons>{user?.name[0].toUpperCase()}</Styled.AvatarProfileButtons>
          </IconButton>
        </Tooltip>
      </Styled.WrapProfileButtons>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: Styled.PaperPropsProfileButtons,
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleGoToProfile}>
          <AccountCircleIcon sx={Styled.IconStyleProfileButtons} />
          {'Profile'}
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleLogout}>
          <Logout sx={Styled.IconStyleProfileButtons} />
          {'Logout'}
        </MenuItem>
      </Menu>
    </>
  );
};

export default LogoNav;
