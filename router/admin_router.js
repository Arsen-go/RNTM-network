const User = require("../models/user-schema");

async function showAllUsers(req, res) {
    try {
        let result = await User.find({});
        res.json({arrayOfUsers:result});
    } catch (err) {
        console.log("Error on adminRouter showAllUsers:",err);
    }

}

module.exports = {
    showAllUsers,
}