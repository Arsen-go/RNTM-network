const express = require("express");
const http = require('http')
const app = express();
const server = http.createServer(app)
const socket = require('socket.io')
const io = socket(server)
const bodyParser = require("body-parser");
const {verifyToken}= require("./middelware/auth");
const User = require('./models/user-schema');
const path=require("path");
const cons = require('consolidate');
const controlMessage = require("./controller/control_message");
const adminRouter = require("./router/admin_router");
// controllers

const signUpRouter = require("./router/signup-router");
const cookieParser = require("cookie-parser");
const { homePage } = require("./controller/indexController");
const indexRouter = require('./router/indexRouter')
app.use(cookieParser());
// middlwares
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
// for public
app.use(express.static("./front/views"));
app.use(express.static("./front/views/fonts"));
app.use(express.static("./front/views/images"));
app.use(express.static("./front/js-files"));
app.use(express.static(path.join(__dirname, "node_modules")));
app.use(express.static(path.join(__dirname, "node_modules")));
/* stex es view engine@ drel em vor html ov ashxati aysiqn ejs nman karaq render anenq 
nuyn ejs na uxaki front i anun i verjum vor grum einq ejs stex el chenq grum 
*/
// view engine
app.engine('html', cons.swig)
app.set('views', path.join(__dirname+'/front', 'views'));
app.set('view engine', 'html');
// server
server.listen(3000, () => {
  console.log("server listening port-> 3000");
});

// Restful API`s
app.use('/',indexRouter)
app.post("/registerUser",signUpRouter.addUser);


app.post("/loginUser", (req, res) => {
  signUpRouter.loginUser(req, res)
  updateOnlineToTrue(req.body.userId);
 });
 //app.use(verifyToken);

app.post("/sendMail",signUpRouter.sendRegistCode);

app.get("/admin/showUsers",adminRouter.showAllUsers);
// sockets
io.on('connection', async socket => {
   console.log('Connected')
  socket.on('newUser', (userId)=>{
    
    updateOnlineToTrue(userId)
  })
  io.emit('onlineUsers', await onlineUsers());
  // socket.on('userConnected', (userId)=>{
  //   socket.join(userId)
  // });
  // socket.on('userDisconnected',(userId)=>{
  //   socket.leave(userId)
  // });

  socket.on('openChat', async (userId) => {
    let setUser = await findUser(userId)
    socket.emit('openChat', {setUser,userId})
   })

  socket.on('Offline', async (userId) => {
    await updateOnlineToFalse(userId);
    console.log("user clicked logout:", userId)

    io.emit('onlineUsers', await onlineUsers());
  })

   socket.on('message',async(data)=>{
    let {userId,msg} = data
    console.log(data)
    let user = await findUser(userId)
    socket.emit('message',{user,msg})
   })

   //arsen code
   socket.on('armessage', (msg) => {

    controlMessage.add(msg);
    io.emit('argmessage', msg);
  });
  socket.on('arclear', (msg) => {
    controlMessage.del(msg);

  })
  socket.on('aroldMessages',async (fromTo) => {
    let result = await controlMessage.getAllMessages(fromTo);
    io.emit('argetOldMessages',result);
    console.log(result)
  })
// arsen code end

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
})

// functions: bayc es lav klini hanenq stexic urish js
async function findUser(userId) {
  return await User.findOne({ _id: userId }).select({ name: 1, photo: 1, message: 1 });
}

async function onlineUsers() {
  return await User.find({ online: true }).lean().select({ message: 1, photo: 1, name: 1 });
}

async function updateOnlineToFalse(userId) {
  return await User.updateOne({ _id: userId }, { $set: { online: false } });
}

async function updateOnlineToTrue(userId) {
  await User.updateOne({ _id: userId }, { $set: { online: true } }, (err) => {
    if (err) console.log(console.log("error on update doc to online after login user:",err));
    console.log("user is online");
  })
}