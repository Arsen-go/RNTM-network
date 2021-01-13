const User = require("../models/user-schema");

async function showAllUsers(req, res) {
    try {
        let result = await User.find({});
        res.json({arrayOfUsers:result});
    } catch (err) {
        console.log("Error on adminRouter showAllUsers:",err);
    }

}

async function deleteUser(req,res) {
    try{
        console.log(req.body);
        await User.deleteOne({_id:req.body.userId});
        res.json({info:"deleted"});
    } catch (err) {
        throw new Error("Error on deleteing user:",err);
    }
}

module.exports = {
    showAllUsers,
    deleteUser,
}