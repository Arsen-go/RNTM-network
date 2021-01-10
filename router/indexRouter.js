const express = require('express')
const { homePage,loginPage,profilePage,userFriends, userMessages } = require('../controller/indexController')
const {verifyToken} = require('../middelware/auth')

const router = express.Router()
// router.route("/").get(homePage,verifyToken).post();
// router.route("/home").get(homePage,verifyToken).post();
// router.route("/login").get(loginPage);
router.get('/',verifyToken,homePage)
router.get('/home',verifyToken,homePage)
router.get('/login',loginPage)
router.get('/profile',verifyToken,profilePage)
router.get('/friends',verifyToken,userFriends)
router.get('/messages',verifyToken,userMessages)
module.exports = router