const { app } = require("../constants");
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);

const {
  findUser,
  onlineUsers,
  updateOnlineToFalse,
  updateOnlineToTrue,
} = require("./socket_helper");
const controlMessage = require("../controller/control_message");
const { Post, PostComment } = require("../models");

let onlineSockets = {};

io.on("connection", async (socket) => {
  console.log("Connected:", socket.id);

  socket.on("newUser", async (userId) => {
    onlineSockets[userId] = socket.id;

    updateOnlineToTrue(userId);
    io.emit("onlineUsers", await onlineUsers());
  });

  socket.on("openChat", async (userId) => {
    console.log("aaaaaaaaaaaaaaaaa");
    let setUser = await findUser(userId);
    io.emit("openChat", { setUser, userId });
  });

  socket.on("Offline", async (userId) => {
    await updateOnlineToFalse(userId);
    console.log("user clicked logout:", userId);
    io.emit("onlineUsers", await onlineUsers());
  });

  socket.on("message", async (data) => {
    let user = await findUser(data.from);
    io.to(onlineSockets[data.to]).emit("message", { user, data });
  });

  // shortcuts messages code start
  socket.on("msgUser", async (msgObj) => {
    console.log(msgObj);
    let result = await controlMessage.add(msgObj);
    console.log(onlineSockets[msgObj.to]);
    io.to(onlineSockets[msgObj.to]).emit("msgUserBack", result);
  });

  socket.on("openChatWithUser", async (obj) => {
    io.to(onlineSockets[obj.to]).emit(
      "openChatWithUserBack",
      await controlMessage.getAllMessages(obj)
    );
  });

  socket.on("friendRequest", async (data) => {
    console.log("friendRequest");
    let { from, to } = data;
    let user = await findUser(to);
    user.friendRequest.push(from);
    user.save((err) => {
      if (err) console.log("err", err);
    });
    io.emit("friendRequest");
  });

  socket.on("FriendRequestPage", () => {
    console.log("FriendRequestPageaaa");
  });

  // socket.on('deleteUserMsg',async (friendId) => {
  //   io.emit('deleteUserMsgBack', await controlMessage.deleteAllMsg(friendId));
  // })

  // shortcuts messages code end

  // post like,comment,dislike
  socket.on("addPostLike", async (post) => {
    console.log("postId", post);
    try {
      let result = await Post.findByIdAndUpdate(post.id, {
        $inc: { like: 1 },
      }).select({ like: 1 });
      io.emit("likeLength", { post: result });
    } catch (error) {
      throw new Error("error adding like", error);
    }
  });

  socket.on("newComment", async (post) => {
    console.log(post);
    try {
      let newComment = new PostComment({
        author: post.commentWriter,
        post: post.postId,
        commentText: post.commentText,
      });
      await newComment.save();
      await Post.findByIdAndUpdate(post.postId, { $push: { comment: newComment._id } });
      io.emit("newComment", newComment);
    } catch (error) {
      throw new Error("Error on adding post comment", error);
    }
  });
  // end post like,comment,dislike

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

module.exports = { http, server, updateOnlineToTrue };
