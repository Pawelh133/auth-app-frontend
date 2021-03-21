import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import PathLink from '../helpers/pathLinkUrl/PathLink';

import LoginPage from './Login';
import RegisterPage from './Register';
import NotFoundPage from './NotFound';
import ProfilePage from './Profile';
import AuthRequiredRoute from '../components/Route/AuthRequiredRoute';
import NonAuthRequiredRoute from '../components/Route/NonAuthRequiredRoute';

export const routes = {
  login: new PathLink('/'),
  register: new PathLink('/register'),
  profile: new PathLink('/profile'),
};

function Routes() {
  console.log(routes);
  return (
    <Switch>
      <NonAuthRequiredRoute
        exact
        path={routes.login.path}
        component={LoginPage} />
      <NonAuthRequiredRoute
        exact
        path={routes.register.path}
        component={RegisterPage} />
      <AuthRequiredRoute
        exact
        path={routes.profile.path}
        component={ProfilePage} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  );
}

export default withRouter(Routes);
