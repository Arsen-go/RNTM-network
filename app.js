const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//app.use(bodyParser.urlencoded({ extended: false }));
const path = require("path");

// controllers
const signUpRouter = require("./router/signup-router")

// middlwares
app.use(bodyParser.json());

// for public
app.use(express.static("./front/views"));
app.use(express.static("./front/views/fonts"));
app.use(express.static("./front/views/images"));
app.use(express.static("./front/js-files"));

app.listen(3000, () => {
    console.log("server listening port-> 3000");
});

app.get("/", () => { });

app.post("/registerUser",signUpRouter.addUser);
