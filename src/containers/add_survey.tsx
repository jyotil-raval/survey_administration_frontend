import React, { Fragment, useState, ChangeEvent } from 'react';
import Header from '../components/header_auth';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import useInput from '../components/useTextField';
import { Button, Checkbox, FormControl, FormControlLabel, Grid, Typography } from '@material-ui/core';
import { add_survey } from '../server/add_survey';

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
  id: string;
  survey_name: string;
  survey_expire_date: Date;
  survey_url: string;
  survey_from_email: string;
  accessibility: string[] | undefined;
}

const AddSurvey = (props: any) => {
  const classes = useStyles();

  const [name, setName] = useInput('');
  const [expireDate, setExpireDate] = useInput('');
  const [url, setURL] = useInput('');
  const [fromEmail, setFromEmail] = useInput('');
  const [accessibilityEmail, setAccessibilityEmail] = useInput('');

  const [triggerCaseCloser, setTriggerCaseCloser] = useState(false);
  const [triggerActivityCloser, setTriggerActivityCloser] = useState(false);

  const [accessibility, setAccessibility] = useState([]);

  const emptyUseInput = (dispatch: any): any => {
    let event = {
      preventDefault: () => {},
      target: { value: '' }
    };
    dispatch(event);
  };

  const addAccessibility = () => {
    let temp: any = [];
    temp = accessibility;
    temp.push(accessibilityEmail);
    setAccessibility(temp);
    emptyUseInput(setAccessibilityEmail);
  };

  const validateForm: (surveyDetail: object) => boolean = surveyDetail => {
    return true;
  };

  const handleSubmit: () => void = async () => {
    const form_id = parseInt(`${Math.random()}`.split('.')[1]);

    let surveyDetail: SurveyDetail = {
      id: `${form_id}`,
      survey_name: name,
      survey_expire_date: expireDate,
      survey_url: url,
      survey_from_email: fromEmail,
      accessibility: accessibility
    };

    const isFormValid: boolean = validateForm(surveyDetail);
    if (isFormValid) {
      await add_survey(surveyDetail);
    }
  };

  const handleCaseClosure = (event: ChangeEvent<HTMLInputElement>) => {
    setTriggerCaseCloser(event.target.checked);
  };

  const handleActivityClosure = (event: ChangeEvent<HTMLInputElement>) => {
    setTriggerActivityCloser(event.target.checked);
  };

  const isUrlInvalid: (userInput: string) => boolean = userInput => {
    let url = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
    if (url.test(userInput)) {
      return false;
    }
    return true;
  };

  const isEmailInvalid: (userInput: string) => boolean = userInput => {
    let email = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    if (email.test(userInput)) {
      return false;
    }
    return true;
  };

  const [nameFieldDirty, setNameFieldDirty] = useState<boolean>(false);
  const [expireDateDirty, setExpireDateDirty] = useState<boolean>(false);
  const [urlDirty, setURLDirty] = useState<boolean>(false);
  const [fromEmailDirty, setFromEmailDirty] = useState<boolean>(false);

  return (
    <Fragment>
      <Header></Header>
      <div className='App-body'>
        <form className={classes.root} noValidate autoComplete='off' onSubmit={handleSubmit}>
          <Grid container>
            <Grid item>
              <FormControl
                onClick={() => {
                  setNameFieldDirty(true);
                }}>
                <TextField
                  required
                  id='survey-name'
                  error={name === '' && nameFieldDirty}
                  helperText={name === '' ? 'Enter Survey Name' : ' '}
                  label='Survey Name'
                  type='search'
                  variant='outlined'
                  value={name}
                  onChange={setName}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl
                onClick={() => {
                  setExpireDateDirty(true);
                }}>
                <TextField
                  id='survey-expire-date'
                  required
                  label='Survey Expire Date'
                  variant='outlined'
                  type='date'
                  error={expireDate === '' && expireDateDirty}
                  helperText={expireDate === '' ? 'Please enter proper date' : ' '}
                  value={expireDate}
                  onChange={setExpireDate}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item>
              <FormControl
                onClick={() => {
                  setURLDirty(true);
                }}>
                <TextField
                  required
                  error={urlDirty && (url === '' || isUrlInvalid(url))}
                  helperText={urlDirty && (url === '' || isUrlInvalid(url)) ? 'Please enter proper URL' : ' '}
                  id='survey-url'
                  label='Survey URL'
                  type='search'
                  variant='outlined'
                  value={url}
                  onChange={setURL}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl
                onClick={() => {
                  setFromEmailDirty(true);
                }}>
                <TextField
                  required
                  error={fromEmailDirty && (fromEmail === '' || isEmailInvalid(fromEmail))}
                  helperText={fromEmailDirty && (fromEmail === '' || isEmailInvalid(fromEmail)) ? 'Please enter proper Email Address' : ' '}
                  id='survey-email'
                  label='Survey From Email Address'
                  type='search'
                  variant='outlined'
                  value={fromEmail}
                  onChange={setFromEmail}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container>
            <div className='trigger-detail'>
              <Grid item>
                <FormControl>
                  <div className='margin-top-5p'>
                    <Typography>Survey Trigger:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Typography>
                  </div>
                </FormControl>
              </Grid>
              <Grid item>
                <FormControlLabel control={<Checkbox checked={triggerCaseCloser} onChange={event => handleCaseClosure(event)} name='triggerCaseCloser' color='primary' />} label='Case Closure' />
                <FormControlLabel
                  control={<Checkbox checked={triggerActivityCloser} onChange={event => handleActivityClosure(event)} name='triggerActivityCloser' color='primary' />}
                  label='Activity Closure'
                />
              </Grid>
            </div>
          </Grid>
          <Grid container>
            <Grid item>
              <FormControl>
                <TextField id='survey-accessibility-email' label='Survey accessibility Email Address' type='search' variant='outlined' value={accessibilityEmail} onChange={setAccessibilityEmail} />
              </FormControl>
            </Grid>
            <Grid item>
              <div className='margin-top-8p'>
                <Button type='button' variant='outlined' color='primary' onClick={addAccessibility}>
                  Add to Accessibility
                </Button>
              </div>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item>
              {accessibility.map((person, idx) => {
                return (
                  <Typography key={idx} variant='h6'>
                    {person}
                  </Typography>
                );
              })}
            </Grid>
          </Grid>
          <div>
            <Button type='button' variant='contained' color='primary' onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default AddSurvey;
