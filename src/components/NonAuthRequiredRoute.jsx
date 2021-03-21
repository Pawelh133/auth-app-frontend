import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { isRefreshTokenValid } from '../helpers/auth/session';
import { routes } from '../routes';

const NonAuthRequiredRoute = props => {
  const { component, path, exact } = props;

  const authorized = isRefreshTokenValid();

  const nonAuthRequired = () => {
    return <Redirect to={routes.login.path} replace />;
  };

  return authorized
    ? <Route exact={exact} path={path} component={component} />
    : nonAuthRequired();
};

NonAuthRequiredRoute.propTypes = {
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  component: PropTypes.any.isRequired
};

NonAuthRequiredRoute.defaultProps = {
  component: null,
  exact: false,
};

export default NonAuthRequiredRoute;
