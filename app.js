const express = require("express");
const http = require('http')
const app = express();
const server = http.createServer(app)
const socket = require('socket.io')
const io = socket(server)
const bodyParser = require("body-parser");

const User = require('./models/user-schema');

// controllers
const signUpRouter = require("./router/signup-router");
const {func} = require("joi");

// middlwares
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));

// for public
app.use(express.static("./front/views"));
app.use(express.static("./front/views/fonts"));
app.use(express.static("./front/views/images"));
app.use(express.static("./front/js-files"));

// server
server.listen(3000, () => {
  console.log("server listening port-> 3000");
});

// Restful API`s
app.get("/", () => { });

app.post("/registerUser", signUpRouter.addUser);

app.post("/loginUser", (req, res) => {
  signUpRouter.loginUser(req, res)
  updateOnlineToTrue(req.body.userId);
  
});

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

    //57 toxum : pordzel em logout-i jamanak noric bolor onlin-nerin uxarkem 
    io.emit('onlineUsers', await onlineUsers());
  })

   socket.on('message',async(data)=>{
    let {userId,msg} = data
    let user = await findUser(userId)
    socket.emit('message',{user,msg})
   })

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