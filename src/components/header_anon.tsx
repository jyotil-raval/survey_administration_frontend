import { AppBar, Button, makeStyles, Toolbar, Typography } from '@material-ui/core';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { login_true } from '../helper/methods';

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

  const login = () => {
    login_true();
    let isLogin = localStorage.getItem('isLogin');
    if (isLogin === 'true') {
      history.push('/get-survey');
      window.location.reload();
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            Survey
          </Typography>
          <Button color='secondary' variant='contained' className='align-item-right' onClick={login}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Header;
