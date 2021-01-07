const express = require("express");
const http = require('http')
const app = express();
const server = http.createServer(app)
const socket = require('socket.io')
const io = socket(server)
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
const path = require("path");
const User = require('./models/user-schema');
let onlineUserArray = []
let user = User.find({online:true}).lean().select({message:1,photo:1,name:1}).exec(async function (err,result) {
  onlineUserArray = await [...result]
})

function offlineUser(userId) {
  User.updateOne({_id:userId},{ $set: {online: false }},function(err, res) {
    if (err) throw err;
    console.log("1 document updated...");
  })
}
function onlineUser() {
  User.find({online:true}).lean().select({message:1,photo:1,name:1}).exec(async function (err,result) {
    onlineUserArray = await [...result]
  })
}

io.on('connection',socket=>{ 
   console.log('Connected')
   socket.emit('join',onlineUserArray)
   
   socket.on('openChat',(userId)=>{
    let setUser = findUser(userId)
    console.log('set',setUser)
      socket.emit('openChat',setUser)

     console.log('userOpen')
   })

   socket.on('Offline',(userId)=>{
    console.log("userId",userId)
    offlineUser(userId)
    //onlineUser()
  //socket.emit('join',onlineUserArray)
  })
   socket.on('disconnect',()=>{
    onlineUser()
    socket.emit('join',onlineUserArray)
    
    })
   
})
 function findUser(userId) {
  let user = [] 
   let Usser = User.findOne({_id:userId}).select({name:1,photo:1,message:1})
   console.log(Usser.name)
  return user
}
// controllers
const signUpRouter = require("./router/signup-router");
const { schema} = require("joi");
const { message } = require("./validate/joi");

// middlwares
app.use(express.json())

// for public
app.use(express.static("./front/views"));
app.use(express.static("./front/views/fonts"));
app.use(express.static("./front/views/images"));
app.use(express.static("./front/js-files"));

server.listen(3000, () => {
    console.log("server listening port-> 3000");
});

app.get("/", () => { });

app.post("/registerUser",signUpRouter.addUser);

app.post("/loginUser", (req,res) => {
    signUpRouter.loginUser(req,res)
    let user = User.updateOne({login:req.body.login},{ $set: {online: true }},function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
      })
    // user.online = true;
    // user.save()
    //console.log('user',user)
   // socket.emit('onlineUsers',req.body)
});