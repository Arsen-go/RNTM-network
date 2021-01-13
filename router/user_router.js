const User = require("../models/user-schema");

async function getInfoUser(req, res) {
    console.log(req.body)
    try {
        res.json(await User.findById(req.body.userId));
    } catch (err) {
        throw new Error("Error on getInfoUser:", err);
    }
}
module.exports = {
    getInfoUser
}