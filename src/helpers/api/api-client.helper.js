import axios from 'axios';

import { getSession, isAccessTokenValid } from '../auth/session';
import { serviceUnauthorizedRequestResponse, serviceErrorRequestResponse } from './apiClient.responseResolver';
import responseStatusCodes from './responseStatusCodes.helper';
import { API_URL } from '../../config/app.config';

export const getAuth = async (path, config) => {
  const { data, ...header } = config;

  return await apiAuth.get(path, { ...header })
};

export const postAuth = async (path, config) => {
  const { data, ...header } = config;

  return await apiAuth.post(path, data, { ...header })
};

export const patchAuth = async (path, config) => {
  const { data, ...header } = config;

  return await apiAuth.patch(path, data, { ...header })
};

export const get = async (path, config) => {
  const { data, ...header } = config;

  return await api.get(path, { ...header })
}
export const post = async (path, config) => {
  const { data, ...header } = config;

  return await api.post(path, data, { ...header })
};

const apiAuth = axios.create({
  baseURL: API_URL
});

const api = axios.create({
  baseURL: API_URL
});

const axiosCall = () => {
  return new Promise(async (resolve, reject) => {
    const session = getSession();

    if (session && isAccessTokenValid()) {
      return resolve(session.accessToken);
    } else {
      return reject();
    }
  });
};

const onRequest = config => {
  return axiosCall().then(token => {
    config.headers = {
      Authorization: token ? `Bearer ${token}` : '',
    };

    return Promise.resolve(config);
  });
};

const onResponse = response => {
  return response;
};

const onError = error => {
  if (error) {
    if (error.response) {
      if (error.response.status === responseStatusCodes.UnAuthorized) {
        serviceUnauthorizedRequestResponse();
      }

      serviceErrorRequestResponse(error.response);
    }
  }

  return Promise.reject(error.response);
};

apiAuth.interceptors.request.use(onRequest, onError);

apiAuth.interceptors.response.use(onResponse, onError);
