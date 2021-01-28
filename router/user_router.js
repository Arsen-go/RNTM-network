const { User, Post, PostComment } = require("../models")
const { checkPassword } = require("./helper/create_hash")

async function getInfoUser(req, res) {
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
    let result = await User.findById(req.body.userId).populate("friendRequest","name profilePhotos").select({ name: 1, message: 1, friend: 1, profilePhotos: 1, friendRequest: 1 });
    res.json({ friendsLength: result.friend.length, messagesLength: result.message.length, name: result.name, photo: result.profilePhotos, friends: result.friendRequest });
  } catch (err) {
    console.log("Error on getHomePageInfo", err);
    throw new Error("Error on getHomePage info");
  }
}

async function addFriendList(req, res) {
  try {
    let allUsers = await User.find({ _id: { $ne: req.body.userId } }).select({ name: 1, profilePhotos: 1 }).limit(5);
    const userFriends = await User.findById(req.body.userId).select({ friend: 1, friendRequest: 1 });

    let userFriendsArray = [];
    for (let z = 0; z < userFriends.friend.length; ++z) {
      userFriendsArray.push(userFriends.friend[z]);
    }

    for (let z = 0; z < userFriends.friendRequest.length; ++z) {
      userFriendsArray.push(userFriends.friendRequest[z]);
    }

    let result = [];
    for (let z = 0; z < allUsers.length; ++z) {
      if (!userFriendsArray.some(u => u.toString() === allUsers[z]._id.toString())) {
        result.push(allUsers[z])
      }
    }

    res.json({ result });
  } catch (err) {
    console.log("Error on addFriendList", err);
    throw new Error("Error with add frien List");
  }
}

async function addPost(req, res) {
  let obj = {
    author: req.body.userId,
    like: 0,
    dislike: 0,
    view: 0,
  }

  if (req.body.text) {
    obj.text = req.body.text;
  }

  if (req.file) {
    obj.image = req.file.filename;
  }

  try {
    let post = new Post(obj);
    let savedPost = await post.save();
    let result = await Post.findById(savedPost._id).populate("author");
    let user = await User.findById(obj.author);
    user.post.push(post._id);
    await user.save();
    res.json({ result });
  } catch (error) {
    throw new Error("Error with add user post", error);
  }
}

async function allPost(req, res) {
  try {
    let result = await Post.find({}).populate({
      path: "author",
      model: User,
      select: "name profilePhotos",
    }).populate({
      path: "comment",
      model: PostComment,
      select: "commentText createdAt",
      populate: {
        path: "author",
        model: User,
        select: "name profilePhotos",
      },
    }).sort({ createdAt: 1 });
    res.json({ result: result })
  } catch (error) {
    throw new Error("Error on find all post", error);
  }
}

async function getAllLikesViewsDislikesCommentsLength(req, res) {
  try {
    const result = await Post.find({ author: req.body.userId }).select({ like: 1, view: 1, dislike: 1, comment: 1 });
    res.json({ result: result });
  } catch (error) {
    throw new Error("Error with get all likes function");
  }
}

module.exports = {
  getInfoUser,
  changePassword,
  showSocialUser,
  getHomePageInfo,
  addFriendList,
  addPost,
  allPost,
  getAllLikesViewsDislikesCommentsLength,
};
