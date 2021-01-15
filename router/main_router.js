const {
  showAllUsers,
  deleteUser,
  showFriends,
  showUserMessages,
  updateUser,
} = require("./admin_router");
const { addUser, loginUser, sendRegistCode } = require("./signup-router");
const { getInfoUser, changePassword } = require("./user_router");

module.exports = {
  showAllUsers,
  deleteUser,
  addUser,
  loginUser,
  sendRegistCode,
  getInfoUser,
  showFriends,
  showUserMessages,
  updateUser,
  changePassword,
};
