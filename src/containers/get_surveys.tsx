import { Accordion, AccordionDetails, AccordionSummary, Container, Typography } from '@material-ui/core';
import React, { Fragment, useEffect, useState } from 'react';
import Header from '../components/header_auth';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { get_Survey } from '../server/get_survey';

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
  id: string;
  survey_name: string;
  survey_expire_date?: Date;
  survey_url?: string;
  survey_from_email?: string;
}

interface SurveyDetailAPI {
  Items: Array<SurveyDetail>;
  Count: number;
  ScannedCount?: number;
}

const GetSurveys = (props: any) => {
  let surveys: Array<SurveyDetail> = [];

  const [surveysDetail, setSurveysDetail] = useState<SurveyDetailAPI | null>(null);

  if (localStorage.getItem('surveys')) {
    surveys = JSON.parse(localStorage.getItem('surveys') || '');
  }

  const classes = useStyles();

  useEffect(() => {
    (async () => {
      let result = await get_Survey();
      if (result.Count) {
        setSurveysDetail(result);
      }
    })();
  }, []);

  const [expanded, setExpanded] = useState<number | false>(false);
  const handleChange = (panel: number) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const create_accordion: (surveys: Array<SurveyDetail>) => any = surveys => {
    return ((surveysDetail || {}).Items || []).map((survey, idx) => {
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
                  <Typography className='align-left-content'>Survey Name: {survey.survey_name}</Typography>
                  <Typography className='align-left-content'>Survey Expire Date: {survey.survey_expire_date}</Typography>
                  <Typography className='align-left-content'>Survey From Email: {survey.survey_from_email}</Typography>
                  <Typography className='align-left-content'>Survey URL: {survey.survey_url}</Typography>
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
