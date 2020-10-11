import React, { Fragment, useState, ChangeEvent } from 'react';
import Header from '../components/header_auth';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import useInput from '../components/useTextField';
import { Button, Checkbox, FormControl, FormControlLabel, Grid, Typography } from '@material-ui/core';

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
  const [accessibilityEmail, setAccessibilityEmail] = useInput('');

  const [triggerCaseCloser, setTriggerCaseCloser] = useState(false);
  const [triggerActivityCloser, setTriggerActivityCloser] = useState(false);

  const [accessibility, setAccessibility] = useState([]);

  const addAccessibility = () => {
    let temp: any = [];
    temp = accessibility;
    temp.push(accessibilityEmail);
    setAccessibility(temp);
    console.log('addAccessibility -> accessibility', accessibility);
  };

  const validateForm: (surveyDetail: object) => boolean = surveyDetail => {
    return true;
  };

  const handleSubmit: () => void = () => {
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

  const handleCaseClosure = (event: ChangeEvent<HTMLInputElement>) => {
    setTriggerCaseCloser(event.target.checked);
  };

  const handleActivityClosure = (event: ChangeEvent<HTMLInputElement>) => {
    setTriggerActivityCloser(event.target.checked);
  };

  const [formDirty, setFromDirty] = useState<boolean>(false);
  const [nameFieldDirty, setNameFieldDirty] = useState<boolean>(false);

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
                  helperText={name === '' ? 'Empty field!' : ' '}
                  label='Survey Name'
                  type='search'
                  variant='outlined'
                  value={name}
                  onChange={setName}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl>
                <TextField
                  id='survey-expire-date'
                  required
                  label='Survey Expire Date'
                  variant='outlined'
                  type='date'
                  error={expireDate === '' && formDirty}
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
              <FormControl>
                <TextField
                  required
                  error={url === '' && formDirty}
                  helperText={url === '' ? 'Please enter proper URL' : ' '}
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
              <FormControl>
                <TextField
                  required
                  error={fromEmail === '' && formDirty}
                  helperText={fromEmail === '' ? 'Please enter proper Email Address' : ' '}
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
                <TextField
                  required
                  id='survey-accessibility-email'
                  label='Survey accessibility Email Address'
                  type='search'
                  variant='outlined'
                  value={accessibilityEmail}
                  onChange={setAccessibilityEmail}
                />
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
            <Grid item></Grid>
          </Grid>
          <div>
            <Button type='button' variant='contained' color='primary'>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default AddSurvey;
