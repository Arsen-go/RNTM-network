const { updateOnlineToTrue, onlineUsers } = require("./socket_helper");

class SocketRouter {
    async newUser(userId) {
        console.log("userId", userId);
        socketObj[userId] = socket.id;
        updateOnlineToTrue(userId)
        console.log(socketObj)
    }

    async getOnlineUsers() {
        return await User.find({ online: true }).lean().select({ message: 1, photo: 1, name: 1 });
    }
}

module.exports = new SocketRouter();