import { api, unsetHeadersWithUserToken } from './axios';

const login = async (email: string, password: string) => {
  const userDetail = {
    email,
    password
  };
  try {
    unsetHeadersWithUserToken();
    const afterSuccess = await api.post('/login', userDetail);
    if (afterSuccess) {
      return afterSuccess.data.user;
    }
  } catch (error) {
    console.log('login -> error', error);
  }
};

export { login };
