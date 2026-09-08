export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password ? password.trim().length >= 6 : false;
};

export const validateUsername = (username) => {
  return username ? username.trim().length > 0 : false;
};
