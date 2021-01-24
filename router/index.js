const {
  showAllUsers,
  deleteUser,
  showFriends,
  showUserMessages,
  updateUser,
} = require("./admin_router");
const { addUser, loginUser, sendRegistCode } = require("./signup-router");
const { getInfoUser, changePassword, showSocialUser, getHomePageInfo, addFriendList, addPost } = require("./user_router");
const { changeProfileImage, getProfileImage } = require("./image_router");

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
  showSocialUser,
  changeProfileImage,
  getProfileImage,
  getHomePageInfo,
  addFriendList,
  addPost,
};
