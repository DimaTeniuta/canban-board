import { Divider, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import React, { FC, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InfoSharpIcon from '@mui/icons-material/InfoSharp';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useStoreDispatch } from '../../../../shared/hooks/store.hooks';
import { openModal } from '../../../../shared/store/slices/modalSlice/modalSlice';
import UpdateTask from '../../../../features/UpdateTask';
import DeleteTask from '../../../../features/DeleteTask/DeleteTask';
import * as Styled from './ActionsButton.styles';
import { IActionsButtonProps } from './ActionsButton.types';

export const ActionsButton: FC<IActionsButtonProps> = ({ data }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useStoreDispatch();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleShowInfo = () => {};

  const handleUpdate = () => {
    dispatch(openModal({ title: 'Update Task', Component: UpdateTask, modalData: { ...data } }));
  };

  const handleDelete = () => {
    dispatch(
      openModal({
        title: 'Delete Task',
        Component: DeleteTask,
        modalData: { columnId: data.columnId, boardId: data.boardId, taskId: data.id },
      })
    );
  };

  return (
    <>
      <Styled.WrapActionsButton>
        <Tooltip title={'Actions'}>
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <MoreVertIcon sx={{ color: 'primary.contrastText' }} />
          </IconButton>
        </Tooltip>
      </Styled.WrapActionsButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: Styled.PaperPropsActionsButtons,
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleShowInfo}>
          <InfoSharpIcon sx={Styled.IconStyleActionsButtons} />
          More Info
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleUpdate}>
          <ModeEditOutlineOutlinedIcon sx={Styled.IconStyleActionsButtons} />
          Update Task
        </MenuItem>

        <MenuItem onClick={handleDelete}>
          <DeleteOutlineIcon sx={Styled.IconStyleActionsButtons} />
          Delete Task
        </MenuItem>
      </Menu>
    </>
  );
};
