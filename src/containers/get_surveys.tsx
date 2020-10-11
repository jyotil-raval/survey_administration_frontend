import { Accordion, AccordionDetails, AccordionSummary, Container, Typography } from '@material-ui/core';
import React, { Fragment, useState } from 'react';
import Header from '../components/header_auth';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%'
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary
    }
  })
);

interface SurveyDetail {
  id: number;
  survey_name: string;
  survey_expire_date?: Date;
  survey_url?: string;
  survey_from_email?: string;
}

const GetSurveys = (props: any) => {
  let surveys: Array<SurveyDetail> = [];
  if (localStorage.getItem('surveys')) {
    surveys = JSON.parse(localStorage.getItem('surveys') || '');
  }

  const classes = useStyles();

  const [expanded, setExpanded] = useState<number | false>(false);
  const handleChange = (panel: number) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const create_accordion: (surveys: Array<SurveyDetail>) => any = surveys => {
    return surveys.map((survey, idx) => {
      return (
        <div key={idx}>
          <Container>
            <Accordion expanded={expanded === idx} onChange={handleChange(idx)}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`${idx}-header`} id={`${idx}-header`}>
                <Typography className={classes.heading}>{survey.survey_name}</Typography>
                <Typography className={classes.secondaryHeading}>{survey.survey_expire_date}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div>
                  <Typography>Survey Name: {survey.survey_name}</Typography>
                  <Typography>Survey Expire Date: {survey.survey_expire_date}</Typography>
                  <Typography>Survey From Email: {survey.survey_from_email}</Typography>
                  <Typography>Survey URL: {survey.survey_url}</Typography>
                </div>
              </AccordionDetails>
            </Accordion>
          </Container>
        </div>
      );
    });
  };

  return (
    <Fragment>
      <Header></Header>
      <div className='App-body'>{create_accordion(surveys)}</div>
    </Fragment>
  );
};

export default GetSurveys;
