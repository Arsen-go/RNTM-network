const express = require("express");
const http = require('http')
const app = express();
const server = http.createServer(app)
//const socket = require('socket.io')
//const io = socket(server)
const io = require('socket.io')(server)
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
//const {verifyToken}= require("./middelware/auth");
const User = require('./models/user-schema');
const path = require("path");
const cons = require('consolidate');

// controllers & routers
const controlMessage = require("./controller/control_message");
const {ConfirmRequest} = require('./controller/indexController')
const adminRouter = require("./router/admin_router");
//const { homePage } = require("./controller/indexController");

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

app.post("/admin/showUserFriend",mainRouter.showFriends);

app.post("/admin/showUserMessages",mainRouter.showUserMessages);

app.get("/getAllUsers", adminRouter.showAllUsers);

app.post('/ConfirmFrienqRequest',ConfirmRequest)

// sockets

let socketObj = {}

io.on('connection', async socket => {
  console.log('Connected')
  console.log(socket.id)
  
  socket.on('newUser', (userId) => {
    console.log("userId",userId);
    socketObj[userId] = socket.id;
    socket.join(socket.id);
    updateOnlineToTrue(userId)
    socketObj[userId] = socket.id
    console.log(socketObj)
  })

  io.emit('onlineUsers', await onlineUsers());

  socket.on('openChat', async (userId) => {
    let setUser = await findUser(userId)
    socket.emit('openChat', { setUser, userId })
  });

  socket.on('Offline', async (userId) => {
    await updateOnlineToFalse(userId);
    console.log("user clicked logout:", userId)
    io.emit('onlineUsers', await onlineUsers());
  })

  socket.on('message', async (data) => {
    let user = await findUser(data.from)
    io.emit('message', { user, data })
  })

  // shortcuts messages code start
  socket.on('msgUser', async (msgObj) => {
    io.emit('msgUserBack', await controlMessage.add(msgObj));
  });

  socket.on('openChatWithUser', async (obj) => {
    io.emit('openChatWithUserBack', await controlMessage.getAllMessages(obj));
  });
   
  socket.on('friendRequest',async (data)=>{
    console.log('friendRequest')
    let {from,to} = data
    let user = await findUser(to)
      user.friendRequest.push(from)
      user.save((err)=> {
       if(err) console.log('err',err)
      })
      io.emit('friendRequest')
  });

  socket.on('FriendRequestPage',()=>{
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
  return await User.findOne({ _id: userId }).select({ name: 1, photo: 1, message: 1, friendRequest:1});
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