import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useNavigate } from 'react-router-dom';
import * as Styled from './BurgerMenu.styles';

export const BurgerMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGoToBoards = () => {
    navigate('/boards');
  };

  return (
    <>
      <Styled.WrapBurgerButton>
        <Tooltip title={'Board Menu'}>
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <MenuIcon sx={{ color: 'primary.contrastText' }} />
          </IconButton>
        </Tooltip>
      </Styled.WrapBurgerButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: Styled.PaperPropsBurgerButtons,
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleGoToBoards}>
          <DashboardIcon sx={Styled.IconStyleBurgerButtons} />
          Boards Page
        </MenuItem>
      </Menu>
    </>
  );
};

export default BurgerMenu;
