import * as api from '../helpers/api/api-client.helper';
import endpointsConfig from '../config/endpoints.config';
import requestConfig from '../config/request.config';
import interceptError from '../helpers/interceptor/errorInterceptor';

export const onRegister = async (email, password, setIsFetching, onSuccess) => {
  setIsFetching(true);
  const config = {
    headers: { ...requestConfig.headers.applicationJson },
    data: { email, password },
  };

  try {
    await api.post(
      endpointsConfig.register,
      config
    );
    
    setIsFetching(false);
    onSuccess();
  }
  catch (err) {
    interceptError(err);
    setIsFetching(false);
  }
};
