import { AppBar, Button, IconButton, makeStyles, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { login_false } from '../helper/methods';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const Header: FC = (props: any) => {
  const classes = useStyles();
  let history = useHistory();

  const SimpleMenu = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = (path: string) => {
      setAnchorEl(null);
      history.push(`/${path}`);
    };

    return (
      <div>
        <Button aria-controls='simple-menu' variant='contained' aria-haspopup='true' onClick={handleClick}>
          <MenuIcon />
        </Button>
        <Menu id='simple-menu' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem
            onClick={() => {
              handleClose('get-survey');
            }}>
            Survey List
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose('add-survey');
            }}>
            Add Survey
          </MenuItem>
        </Menu>
      </div>
    );
  };

  const logout = () => {
    login_false();
    let isLogin = localStorage.getItem('isLogin');
    console.log('logout -> isLogin', isLogin);
    if (isLogin === 'false') {
      history.push('/login');
      window.location.reload();
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start' className={classes.menuButton} color='inherit' aria-label='menu'>
            {SimpleMenu()}
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Survey
          </Typography>
          <Button color='secondary' variant='contained' className='align-item-right' onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Header;
