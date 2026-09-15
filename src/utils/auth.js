// Adding a login authorize API mock
export const authorize = (email, password) => {
  return new Promise((resolve, reject) => {
    // simulating a successful 200 ok response from a server
    resolve({ token: "1234567890TOKEN" });
  });
};

export const register = (email, password, name) => {
  return new Promise((resolve, reject) => {
    resolve({
      name: "fakeuser",
      email: "fake@user.com",
      _id: "fakeidQWERTY",
      token: "1234567890TOKEN",
    });
  });
};

// Simulating get tokens; here the token is verified and a user data is returned (resolved)
export const checkToken = (token) => {
  // Pretend we did a fetch request that gave us back a user
  return new Promise((resolve, reject) => {
    resolve({
      data: {
        name: "Hector",
        email: "aitekerayu@email.com",
        _id: "123456789qwertyID",
      },
    });
  });
};
