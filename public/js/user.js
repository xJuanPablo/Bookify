let userId = null;

const setUser = (id) => {
  userId = id;
};

const getUserId = () => {
  return userId;
};

module.exports = {
  setUser,
  getUserId,
};