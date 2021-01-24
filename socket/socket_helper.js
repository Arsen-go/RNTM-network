const { User } = require('../models');

class SocketHelper {
    async onlineUsers() {
        try {
            return await User.find({ online: true }).lean().select({ message: 1, photo: 1, name: 1 });
        } catch (error) {
            throw new Error("Error on return online users", error);
        }
    }

    async findUser(userId) {
        try {
            return await User.findOne({ _id: userId }).select({ name: 1, photo: 1, message: 1, friendRequest: 1 });
        } catch (error) {
            throw new Error("Error on return findUser", error);
        }
    }

    async updateOnlineToFalse(userId) {
        try {
            return await User.updateOne({ _id: userId }, { $set: { online: false } });
        } catch (error) {
            throw new Error("Error on update user online to true", error);
        }
    }

    async updateOnlineToTrue(userId) {
        try {
            return await User.updateOne({ _id: userId }, { $set: { online: true } });
        } catch (error) {
            throw new Error("Error on update user online to false", error);

        }
    }
}

module.exports = new SocketHelper();