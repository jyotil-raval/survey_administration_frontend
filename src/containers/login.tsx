import { Button, Card, CardActions, CardContent, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@material-ui/core';
import React, { Fragment, FC, useState } from 'react';
import Header from '../components/header_anon';
import { makeStyles } from '@material-ui/core/styles';
import { login } from '../server/login';

import useInput from '../components/useTextField';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    minWidth: '50%'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  textField: {
    width: '25ch'
  }
});

const Login: FC = (props: any) => {
  const classes = useStyles();
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    let result = await login(email, password);
    localStorage.setItem('accessToken', result.accessToken);
    localStorage.setItem('idToken', result.idToken);
    localStorage.setItem('refreshToken', result.refreshToken);
    localStorage.setItem('isLogin', 'true');
    window.location.reload();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    console.log('Login:FC -> handleChange -> event', event);
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Fragment>
      <Header></Header>
      <div className='App-body'>
        <Card className={classes.root} variant='outlined'>
          <CardContent>
            <Grid container>
              <Grid item style={{ width: '100%' }}>
                <FormControl style={{ width: '100%' }}>
                  <TextField margin='normal' fullWidth id='user_email' label='Email' type='search' variant='outlined' value={email} onChange={setEmail} />
                </FormControl>
              </Grid>
            </Grid>
            <br />
            <Grid container>
              <Grid item style={{ width: '100%' }}>
                <FormControl style={{ width: '100%' }} variant='outlined'>
                  <InputLabel htmlFor='user_password'>Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    id='user_password'
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton aria-label='toggle password visibility' onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={70}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button size='large' variant='contained' color='primary' onClick={handleLogin}>
              Login
            </Button>
          </CardActions>
        </Card>
      </div>
    </Fragment>
  );
};

export default Login;
