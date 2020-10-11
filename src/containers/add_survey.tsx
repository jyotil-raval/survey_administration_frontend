import React, { Fragment, useEffect, useState } from 'react';
import Header from '../components/header_auth';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import useInput from '../components/useTextField';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch'
      }
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200
    }
  })
);

interface SurveyDetail {
  id: number;
  survey_name: string;
  survey_expire_date: Date;
  survey_url: string;
  survey_from_email: string;
}

const AddSurvey = (props: any) => {
  const classes = useStyles();

  const [name, setName] = useInput('');
  const [expireDate, setExpireDate] = useInput('');
  const [url, setURL] = useInput('');
  const [fromEmail, setFromEmail] = useInput('');
  const [invalidForm, setInvalidForm] = useState({
    name: false,
    expireDate: false,
    url: false,
    fromEmail: false
  });

  const validateForm: (surveyDetail: object) => boolean = surveyDetail => {
    return true;
  };

  const handleSubmit: () => void = () => {
    let formValidation = invalidForm;
    formValidation.name = true;
    setInvalidForm(formValidation);

    const form_id = parseInt(`${Math.random()}`.split('.')[1]);

    let surveyDetail: SurveyDetail = {
      id: form_id,
      survey_name: name,
      survey_expire_date: expireDate,
      survey_url: url,
      survey_from_email: fromEmail
    };

    const isFormValid: boolean = validateForm(surveyDetail);
    if (isFormValid) {
      let surveys = [];
      if (localStorage.getItem('surveys')) {
        surveys = JSON.parse(localStorage.getItem('surveys') || '');
      }
      surveys.push(surveyDetail);
      localStorage.setItem('surveys', JSON.stringify(surveys));
    }
  };

  return (
    <Fragment>
      <Header></Header>
      <div className='App-body'>
        <form className={classes.root} noValidate autoComplete='off' onSubmit={handleSubmit}>
          <div>
            <TextField fullWidth required id='survey-name' error={invalidForm.name} label='Survey Name' type='search' variant='outlined' value={name} onChange={setName} />
            <TextField
              id='survey-expire-date'
              error={invalidForm.expireDate}
              fullWidth
              required
              label='Survey Expire Date'
              variant='outlined'
              type='date'
              value={expireDate}
              onChange={setExpireDate}
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField fullWidth required error={invalidForm.url} id='survey-url' label='Survey URL' type='search' variant='outlined' value={url} onChange={setURL} />
            <TextField
              fullWidth
              required
              error={invalidForm.fromEmail}
              id='survey-email'
              label='Survey From Email Address'
              type='search'
              variant='outlined'
              value={fromEmail}
              onChange={setFromEmail}
            />
          </div>
          <div>
            <Button type='submit' variant='contained' color='primary'>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default AddSurvey;
