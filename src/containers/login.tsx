import { Button } from '@material-ui/core';
import React, { Fragment, FC } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/header_anon';

const Login: FC = (props: any) => {
  return (
    <Fragment>
      <Header></Header>
      <div className='App-body'>Login</div>
    </Fragment>
  );
};

export default Login;
