const { express } = require("../constants");
const { homePage, loginPage, profilePage, userFriends, userMessages } = require('../controller/indexController')
const { verifyToken } = require('../middelware/auth')

const router = express.Router()
router.get('/', verifyToken, homePage)
router.get('/home', verifyToken, homePage)
router.get('/login', loginPage)
router.get('/profile', verifyToken, profilePage)
router.get('/friends', verifyToken, userFriends)
router.post('/friendRequest', verifyToken)
router.get('/messages', verifyToken, userMessages)
module.exports = router