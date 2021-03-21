import * as session from '../helpers/auth/session';
import * as api from '../helpers/api/api-client.helper';
import endpointsConfig from '../config/endpoints.config';
import requestConfig from '../config/request.config';
import interceptError from '../helpers/interceptor/errorInterceptor';

export const onLogin = async (login, password, setIsFetching, onSuccess) => {
  setIsFetching(true);
  const config = {
    headers: { ...requestConfig.headers.applicationJson },
    data: { email: login, password },
  };

  try {
    const result = await api.post(
      endpointsConfig.login,
      config,
    );

    if (result.data) {
      session.setSession(result.data.accessToken, result.data.refreshToken, result.data.accessTokenExpiresIn);
    }

    setIsFetching(false);
    onSuccess();
  }
  catch (err) {
    interceptError(err);

    setIsFetching(false);
  }
};

export const onLogout = async () => {
  const config = {
    headers: { ...requestConfig.headers.applicationJson },
    data: { refreshToken: session.getRefreshToken()},
  };

  await api.post(
    endpointsConfig.logout,
    config,
  );
};
