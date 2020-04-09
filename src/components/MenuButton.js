import React, { useState } from 'react';
import { IconButton, Popper, MenuItem, MenuList, Grow, Paper, ClickAwayListener } from '@material-ui/core';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import TodayIcon from '@material-ui/icons/Today';

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
                                <MenuItem onClick={handleClose}><PersonIcon style={{paddingRight: 6}} />Customers</MenuItem>
                            </Link>
                            <Link to="/trainings" style={{ textDecoration: 'none', color: '#000000' }}>
                                <MenuItem onClick={handleClose}><FitnessCenterIcon style={{paddingRight: 6}} />Trainings</MenuItem>
                            </Link>
                            <Link to="/calendar" style={{ textDecoration: 'none', color: '#000000' }}>
                                <MenuItem onClick={handleClose}><TodayIcon style={{paddingRight: 6}} />Calendar</MenuItem>
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