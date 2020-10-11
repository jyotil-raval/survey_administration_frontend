const login_true = () => {
  localStorage.setItem('isLogin', `true`);
};

const login_false = () => {
  localStorage.setItem('isLogin', `false`);
};

export { login_true, login_false };
