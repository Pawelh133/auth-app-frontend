import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { isRefreshTokenValid } from '../../helpers/auth/session';
import { routes } from '../../routes';

const AuthRequiredRoute = props => {
  const { component, path, exact } = props;

  const authorized = isRefreshTokenValid();

  const authRequired = () => {
    const redirectPath =
      authorized
        ? routes.home.path
        : routes.login.path;

    return <Redirect to={redirectPath} replace />;
  };

  return authorized
    ? <Route exact={exact} path={path} component={component} />
    : authRequired();
};

AuthRequiredRoute.defaultProps = {
  component: null,
  path: '/',
  exact: false,
  allowedRoles: []
};

AuthRequiredRoute.propTypes = {
  component: PropTypes.any,
  path: PropTypes.string,
  exact: PropTypes.bool,
  allowedRoles: PropTypes.array
};

export default AuthRequiredRoute;
