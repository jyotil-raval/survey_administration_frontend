import React, { Fragment, FC } from 'react';
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom';
import Login from '../containers/login';
import GetSurveys from '../containers/get_surveys';
import AddSurvey from '../containers/add_survey';

const Body: FC = (props: any) => {
  let isLogin: string | null | boolean = localStorage.getItem('isLogin');
  isLogin = isLogin === 'true' ? true : false;
  return (
    <Fragment>
      <HashRouter>
        <Switch>
          <Route exact path='/' render={(props: any) => (isLogin ? <Redirect to='/get-survey' /> : <Redirect to='/login' />)} />
          <Route exact path='/login' render={(props: any) => (isLogin ? <Redirect to='/get-survey' /> : <Login {...props} />)} />
          <Route exact path='/get-survey' render={(props: any) => (isLogin ? <GetSurveys {...props} /> : <Redirect to='/login' />)} />
          <Route exact path='/add-survey' render={(props: any) => (isLogin ? <AddSurvey {...props} /> : <Redirect to='/login' />)} />
        </Switch>
      </HashRouter>
    </Fragment>
  );
};

export default Body;
