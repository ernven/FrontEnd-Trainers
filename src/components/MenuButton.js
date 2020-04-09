import React, { useState } from 'react';
import { IconButton, Popper, MenuItem, MenuList, Grow, Paper, ClickAwayListener } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

export default function MenuButton() {
    const [open, setOpen] = useState(false);
    const anchorRef = React.useRef(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <IconButton edge="start" color="inherit" aria-label="menu" 
                ref={anchorRef}
                onClick={handleClickOpen}>
                    <MenuIcon />
            </IconButton>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
                <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
                <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                        <MenuList autoFocusItem={open} >
                        <Link to="/" style={{ textDecoration: 'none', color: '#000000' }}>
                                <MenuItem onClick={handleClose}>Customers</MenuItem>
                            </Link><Link to="/trainings" style={{ textDecoration: 'none', color: '#000000' }}>
                                <MenuItem onClick={handleClose}>Trainings</MenuItem>
                            </Link>
                        </MenuList>
                    </ClickAwayListener>
                </Paper>
                </Grow>
            )}
            </Popper>
        </div>
    );
}