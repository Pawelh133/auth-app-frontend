import * as api from '../helpers/api/api-client.helper';
import endpointsConfig from '../config/endpoints.config';
import requestConfig from '../config/request.config';
import interceptError from '../helpers/interceptor/errorInterceptor';

export const getUserData = async (setIsFetching, onSuccess) => {
  setIsFetching(true);
  const config = {
    headers: { ...requestConfig.headers.applicationJson },
  };

  try {
    const result = await api.getAuth(
      endpointsConfig.profile,
      config
  );

    if (result.data) {
      onSuccess(result.data);
    }

    setIsFetching(false);
  }
  catch (err) {
    interceptError(err);
    setIsFetching(false);
  }
}


export const updateUserData = async (data, setIsFetching, onSuccess) => {
  setIsFetching(true);
  const config = {
    headers: { ...requestConfig.headers.applicationJson },
    data,
  };

  try {
    const result = await api.patchAuth(
      endpointsConfig.profile,
      config
    );

    if (result.data) {
      onSuccess(result.data);
    }

    setIsFetching(false);
  }
  catch (err) {
    interceptError(err);
    setIsFetching(false);
  }
}