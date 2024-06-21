export const getUser = () => {
  let userData =
    localStorage.getItem("isTokenData") !== ""
      ? JSON.parse(localStorage.getItem("isTokenData"))
      : null;

  if (userData !== null) {
    return userData;
  } else {
    window.location.href = "/logins";
  }
};

export const getToken = () => {
  let token =
    localStorage.getItem("isToken") !== ""
      ? localStorage.getItem("isToken")
      : null;

  if (token !== null) {
    return token;
  } else {
    window.location.href = "/logins";
  }
};
