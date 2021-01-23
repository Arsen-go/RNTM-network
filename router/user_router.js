const User = require("../models/user-schema");
const { checkPassword } = require("./helper/create_hash")

async function getInfoUser(req, res) {
  console.log(req.body);
  try {
    res.json(await User.findById(req.body.userId));
  } catch (err) {
    throw new Error("Error on getInfoUser:", err);
  }
}

async function changePassword(req, res) {
  try {
    let result = await User.findById(req.body.userId);
    console.log(result)
    let isEqual = await checkPassword(result.password, req.body.oldPassword);
    console.log(isEqual);
  } catch (err) {
    console.log("Error on updating password", err)
    throw new Error("Error on updating password");
  }
}

async function showSocialUser(req, res) {
  try {
    let userId = req.body.userId;
    let result = await User.findById(userId).select({ friend: 1, friendRequest: 1 });
    res.json({ arrayOfUsers: result });

  } catch (err) {
    throw new Error("Error on showSocialUser");
  }
}

async function getHomePageInfo(req, res) {
  try {
    let result = await User.findById(req.body.userId).select({ name: 1, message: 1, friend: 1, profilePhotos: 1 });
    res.json({ friendsLength: result.friend.length, messagesLength: result.message.length, name: result.name, photo: result.profilePhotos });
  } catch (err) {
    console.log("Error on getHomePageInfo", err);
    throw new Error("Error on getHomePage info");
  }
}

async function addFriendList(req, res) {
  try {
    let result = await User.find({ _id: { $ne: req.body.userId } }).select({ name: 1, profilePhotos: 1 }).limit(5);
    res.json({result});
  } catch (err) {
    console.log("Error on addFriendList", err);
    throw new Error("Error with add frien List");
  }
}

module.exports = {
  getInfoUser,
  changePassword,
  showSocialUser,
  getHomePageInfo,
  addFriendList,
};
