import { getSession } from '../auth/session';

export const getHeaderToken = () => {
  const { accessToken } = getSession();

  const tokenValue = accessToken;

  return `Bearer ${tokenValue}` ;
};
