import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import PathLink from '../helpers/pathLinkUrl/PathLink';

import LoginPage from './Login';
import RegisterPage from './Register';
import NotFoundPage from './NotFound';
import ProfilePage from './Profile';
import NonAuthRequiredRoute from '../components/NonAuthRequiredRoute';

export const routes = {
  login: new PathLink('/'),
  register: new PathLink('/register'),
  profile: new PathLink('/profile'),
};

function Routes() {

  return (
    <Switch>
      <Route
        exact
        path={routes.login.path}
        component={LoginPage} />
      <Route
        exact
        path={routes.register.path}
        component={RegisterPage} />
      <NonAuthRequiredRoute
        exact
        path={routes.profile.path}
        component={ProfilePage} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  );
}

export default withRouter(Routes);
