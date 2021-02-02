const {
  showAllUsers,
  deleteUser,
  showFriends,
  showUserMessages,
  updateUser,
} = require("./admin_router");
const { addUser, loginUser, sendRegistCode } = require("./signup-router");
const { getInfoUser, changePassword, deletePost, showSocialUser, getHomePageInfo, getUserAllPost, addFriendList, addPost, allPost, getAllLikesViewsDislikesCommentsLength } = require("./user_router");
const { changeProfileImage, getProfileImage } = require("./image_router");
const { friendRequest, getFriendRequests, confirmFriendRequest } = require("./friend-router");

module.exports = {
  friendRequest,
  confirmFriendRequest,
  getFriendRequests,
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
  getUserAllPost,
  addFriendList,
  addPost,
  deletePost,
  allPost,
  getAllLikesViewsDislikesCommentsLength,
};
