export const setSession = (accessToken, refreshToken, accessTokenExpires) => {
  localStorage.setItem('userData', JSON.stringify({ accessToken, refreshToken, accessTokenExpires }));
};

export const getSession = () => {
  const userData = localStorage.getItem('userData');
  if (userData) {
    return JSON.parse(userData);
  }

  return null;
};

export const clearSession = () => {
  localStorage.removeItem('userData');
};

export const isAccessTokenValid = async () => {
  if (!isTokenValid()) {
    if (containsRefreshToken()) {
      try {
        // const response = await to(refreshToken());
      } catch (e) {
        Promise.resolve(false);
      }
    }
    else {
      Promise.resolve(false);
    }
  }

  return Promise.resolve(true);
};

export const containsRefreshToken = () => {
  const refreshToken = getRefreshToken();

  return !!refreshToken;
};

export const isTokenValid = () => {
  const token = getToken();
  const expToken = getTokenExpires();
  return token && expToken && Date.now() < expToken;
};

const getToken = () => {
  const session = getSession();

  return session ? session.accessToken : null;
};

const getTokenExpires = () => {
  const session = getSession();

  return session ? session.accessTokenExpires : null;
};

const getRefreshToken = () => {
  const session = getSession();

  return session ? session.refreshToken : null;
};
