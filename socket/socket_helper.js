const User = require("../models/user-schema");

async function findUser(userId) {
    return await User.findOne({ _id: userId }).select({ name: 1, photo: 1, message: 1, friendRequest: 1 });
}

async function onlineUsers() {
    return await User.find({ online: true }).lean().select({ message: 1, photo: 1, name: 1 });
}

async function updateOnlineToFalse(userId) {
    return await User.updateOne({ _id: userId }, { $set: { online: false } });
}

async function updateOnlineToTrue(userId) {
    await User.updateOne({ _id: userId }, { $set: { online: true } }, (err) => {
        if (err) console.log(console.log("error on update doc to online after login user:", err));
        console.log("user is online");
    })
}

module.exports = {
    findUser,
    onlineUsers,
    updateOnlineToFalse,
    updateOnlineToTrue,
}