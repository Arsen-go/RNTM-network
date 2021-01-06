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

io.on('connection',socket=>{
   
    socket.on('join',async data=>{
      let users = await User.find().lean()
      socket.emit('onlineUsers',users)
    })
})
// controllers
const signUpRouter = require("./router/signup-router")

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
    console.log('user',user)
   // socket.emit('onlineUsers',req.body)
});