import axios from 'axios';

const environment = {
  baseURL: 'https://tedc58dlsa.execute-api.us-east-1.amazonaws.com/dev/'
};

let api: any;
let apiDetail = {
  baseURL: environment.baseURL
};

const setAPI = (apiDetail: any): any => {
  api = axios.create(apiDetail);
};

setAPI(apiDetail);

const setHeadersWithUserToken = (token: string | null): void => {
  if (token) {
    api.defaults.headers.common['idToken'] = token;
  }
};

const unsetHeadersWithUserToken = () => {
  delete api.defaults.headers.common['idToken'];
};

export { api, setHeadersWithUserToken, unsetHeadersWithUserToken };
