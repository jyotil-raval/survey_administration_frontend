const Add_Survey = '../containers/add_survey.tsx';
const Get_Survey = '../containers/get_surveys.tsx';
const Login = '../containers/login.tsx';

interface IndexRoute {
  path: string;
  component: string;
}

const index_routes: Array<IndexRoute> = [
  {
    path: '/add-survey',
    component: Add_Survey
  },
  {
    path: '/get-survey',
    component: Get_Survey
  },
  {
    path: '/login',
    component: Login
  }
];

export default index_routes;
