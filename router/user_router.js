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
    // let reult = await User
  } catch (err) {
    throw new Error("Error on showSocialUser");
  }
}

module.exports = {
  getInfoUser,
  changePassword,
  showSocialUser,
};
