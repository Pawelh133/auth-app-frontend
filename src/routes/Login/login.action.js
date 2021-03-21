import * as session from '../../helpers/auth/session';
import * as api from '../../helpers/api/api-client.helper';
import endpointsConfig from '../../config/endpoints.config';
import requestConfig from '../../config/request.config';

export const onLogin = async (login, password, setIsFetching, setError, onSuccess) => {
  setIsFetching(true);
  const config = {
    headers: { ...requestConfig.headers.applicationJson },
    data: { email: login, password },
  };

  try {
    const result = await api.post(
      endpointsConfig.login,
      config
    );

    if(result.data) {
      session.setSession(result.data.accessToken, result.data.refreshToken, result.data.accessTokenExpiresIn);
    }
    setIsFetching(false);
    onSuccess();
  }
  catch (err) {
    if (Array.isArray(err.response?.data?.message)) {
      setError(err.response?.data?.message[0]);
    } else if (err.response?.data?.message) {
      setError(err.response?.data?.message);
    }

    setIsFetching(false);
  }
}
