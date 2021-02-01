require("dotenv").config();
const port = process.env.PORT || 3000;
const {
  app,
  express,
  cookieParser,
  bodyParser,
  path,
  cons,
  upload,
} = require("./constants");
const { server } = require("./socket/index");
const indexRouter = require("./router/indexRouter");
const router = require("./router");

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
app.engine("html", cons.swig);
app.set("views", path.join(__dirname + "/front", "views"));
app.set("view engine", "html");

// server
server.listen(port, () => {
  console.log("server listening port-> 3000");
});

app.use("/", indexRouter);

app.post("/registerUser", router.addUser);

app.post("/loginUser", router.loginUser);

app.post("/sendMail", router.sendRegistCode);

app.get("/getAllUsers", router.showAllUsers);

app.post("/getInfoUser", router.getInfoUser);

app.post("/admin/deleteUser", router.deleteUser);

app.get("/admin/showUsers", router.showAllUsers);

app.post("/admin/showUserFriend", router.showFriends);

app.post("/admin/showUserMessages", router.showUserMessages);

app.post("/editPassword/changeUserPassword", router.changePassword);

app.post("/admin/updateUser", router.updateUser);

app.post("/getSocialUser", router.showSocialUser);

// app.post('/ConfirmFrienqRequest', ConfirmRequest);

app.post("/editProfileImg", upload.single("edit"), router.changeProfileImage);

app.post("/getProfilePhoto", router.getProfileImage);

app.post("/home/myPageInfo", router.getHomePageInfo);

app.post("/home/addFriendList", router.addFriendList);

app.post("/post", upload.single("file"), router.addPost);

app.post("/getHomePagePost", router.allPost);

app.post("/home/likesDislikesViewsComments", router.getAllLikesViewsDislikesCommentsLength);

app.post("/friendRequests", router.getFriendRequests);