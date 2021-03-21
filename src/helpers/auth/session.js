export const setSession = (accessToken, refreshToken, accessTokenExpires) => {
  // encryptLsData({ accessToken, refreshToken, accessTokenExpires: Date.now() + accessTokenExpires * 1000 - 10000 }, 'userData');
};

export const getSession = () => {
  // const userData = decryptLsData('userData');

  // if (userData && userData.data) {
  //   return {
  //     accessToken: userData.data.accessToken,
  //     accessTokenExpires: userData.data.accessTokenExpires,
  //     refreshToken: userData.data.refreshToken,
  //   };
  // }

  // return null;
};

export const clearSession = () => {
  localStorage.removeItem('userData');
};

export const isAccessTokenValid = async () => {
  if (!isTokenValid()) {
    if (isRefreshTokenValid()) {
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

export const isRefreshTokenValid = () => {
  const refreshToken = getRefreshToken();
  const expRefreshToken = getRefreshTokenExpires();

  return refreshToken && expRefreshToken && Date.now() < expRefreshToken;
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

const getRefreshTokenExpires = () => {
  const session = getSession();

  return session ? session.refreshTokenExpires : null;
};
