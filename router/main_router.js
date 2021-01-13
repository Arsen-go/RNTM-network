const {showAllUsers,deleteUser} = require("./admin_router");
const {addUser,loginUser,sendRegistCode} = require("./signup-router");
const {getInfoUser} = require("./user_router");

module.exports = {
    showAllUsers,
    deleteUser,
    addUser,
    loginUser,
    sendRegistCode,
    getInfoUser,
}