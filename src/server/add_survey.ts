import { api, setHeadersWithUserToken } from './axios';

interface SurveyDetail {
  id: number;
  survey_name: string;
  survey_expire_date: Date;
  survey_url: string;
  survey_from_email: string;
  accessibility: string[] | undefined;
}

const add_survey = async (survey_detail: SurveyDetail) => {
  let token: string | null = localStorage.getItem('idToken');
  setHeadersWithUserToken(token);
  const afterSuccess = await api.post('add-survey', survey_detail);
  console.log('afterSuccess', afterSuccess);
  return afterSuccess.data;
};

export { add_survey };
