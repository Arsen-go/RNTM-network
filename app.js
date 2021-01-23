const express = require("express");
const http = require('http')
const app = express();
const server = http.createServer(app)
const io = require('socket.io')(server)
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const User = require('./models/user-schema');
const path = require("path");
const cons = require('consolidate');
const socketRouter = require("./socket/main_socket");

// multer/image side
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname, 'front/views/images/resources'));
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
const upload = multer({ storage: storage, limits: 2 * 1024 * 1024 });

// controllers & routers
const controlMessage = require("./controller/control_message");
const { ConfirmRequest } = require('./controller/indexController')
const indexRouter = require('./router/indexRouter');
const mainRouter = require("./router/main_router");

// middlwares
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// for public
app.use(express.static("./front/views"));
app.use(express.static("./front/views/fonts"));
app.use(express.static("./front/views/images"));
app.use(express.static("./front/js-files"));
app.use(express.static(path.join(__dirname, "node_modules")));
app.use(express.static(path.join(__dirname, "node_modules")));

// view engine
app.engine('html', cons.swig)
app.set('views', path.join(__dirname + '/front', 'views'));
app.set('view engine', 'html');

// server
server.listen(3000, () => {
  console.log("server listening port-> 3000");
});

// Restful API`s
app.use('/', indexRouter)

app.post("/registerUser", mainRouter.addUser);

app.post("/loginUser", (req, res) => {
  mainRouter.loginUser(req, res)
  updateOnlineToTrue(req.body.userId);
});

app.post("/sendMail", mainRouter.sendRegistCode);

app.get("/getAllUsers", mainRouter.showAllUsers);

app.post("/getInfoUser", mainRouter.getInfoUser);

app.post("/admin/deleteUser", mainRouter.deleteUser);

app.get("/admin/showUsers", mainRouter.showAllUsers);

app.post("/admin/showUserFriend", mainRouter.showFriends);

app.post("/admin/showUserMessages", mainRouter.showUserMessages);

app.post("/editPassword/changeUserPassword", mainRouter.changePassword);

app.post("/admin/updateUser", mainRouter.updateUser)

app.post("/getSocialUser", mainRouter.showSocialUser);

app.post('/ConfirmFrienqRequest', ConfirmRequest);

app.post("/editProfileImg", upload.single('edit'), mainRouter.changeProfileImage);

app.post("/getProfilePhoto", mainRouter.getProfileImage);

app.post("/home/myPageInfo", mainRouter.getHomePageInfo);

app.post("/home/addFriendList", mainRouter.addFriendList);
// sockets

// let onlines = new Set()

let onlineSockets = {}
 
io.on('connection', async socket => {
  console.log('Connected:', socket.id)

  socket.on('newUser', async (userId) => {
    console.log("newuser", userId)
    onlineSockets[userId] = socket.id;
    updateOnlineToTrue(userId);

    io.emit('onlineUsers', await onlineUsers());
  })

  socket.on('openChat', async (userId) => {
    console.log("aaaaaaaaaaaaaaaaa")
    let setUser = await findUser(userId)
    io.emit('openChat', { setUser, userId })
  });

  socket.on('Offline', async (userId) => {
    await updateOnlineToFalse(userId);
    console.log("user clicked logout:", userId)
    io.emit('onlineUsers', await onlineUsers());
  })

  socket.on('message', async (data) => {
    let user = await findUser(data.from)
    io.to(socketObj[data.to]).emit('message', { user, data })
  })

  // shortcuts messages code start
  socket.on('msgUser', async (msgObj) => {
    console.log(msgObj)
    let result = await controlMessage.add(msgObj);
    console.log(socketObj[msgObj.to])
    io.to(socketObj[msgObj.to]).emit('msgUserBack', result);
  });

  socket.on('openChatWithUser', async (obj) => {
    io.to(socketObj[obj.to]).emit('openChatWithUserBack', await controlMessage.getAllMessages(obj));
  });

  socket.on('friendRequest', async (data) => {
    console.log('friendRequest')
    let { from, to } = data
    let user = await findUser(to)
    user.friendRequest.push(from)
    user.save((err) => {
      if (err) console.log('err', err)
    })
    io.emit('friendRequest')
  });

  socket.on('FriendRequestPage', () => {
    console.log('FriendRequestPageaaa')
  });

  // socket.on('deleteUserMsg',async (friendId) => {
  //   io.emit('deleteUserMsgBack', await controlMessage.deleteAllMsg(friendId));
  // })

  // shortcuts messages code end

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
})

// functions: bayc es lav klini hanenq stexic urish js
async function findUser(userId) {
  return await User.findOne({ _id: userId }).select({ name: 1, photo: 1, message: 1, friendRequest: 1 });
}

async function onlineUsers() {
  return await User.find({ online: true }).lean().select({ message: 1, photo: 1, name: 1 });
}

async function updateOnlineToFalse(userId) {
  return await User.updateOne({ _id: userId }, { $set: { online: false } });
}

async function updateOnlineToTrue(userId) {
  await User.updateOne({ _id: userId }, { $set: { online: true } }, (err) => {
    if (err) console.log(console.log("error on update doc to online after login user:", err));
    console.log("user is online");
  })
}