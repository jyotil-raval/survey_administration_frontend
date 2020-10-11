import { api, setHeadersWithUserToken } from './axios';

const get_Survey = async () => {
  try {
    let token = localStorage.getItem('idToken');
    setHeadersWithUserToken(token);
    const afterSuccess = await api.get('/get-survey');
    if (afterSuccess) {
      return afterSuccess.data.surveys;
    }
  } catch (error) {
    console.log('login -> error', error);
  }
};

export { get_Survey };
