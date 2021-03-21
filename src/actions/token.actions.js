import * as api from '../helpers/api/api-client.helper';
import requestConfig from "../config/request.config";
import endpointsConfig from '../config/endpoints.config';

export const getNewAccessToken = async (refreshToken) => {
  const config = {
    headers: { ...requestConfig.headers.applicationJson },
    data: { refreshToken },
  };

  try {
    return await api.post(
      endpointsConfig.token,
      config,
    );
  }
  catch (err) {
    return null;
  }
};
