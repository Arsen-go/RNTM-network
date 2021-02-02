const { User } = require("../models");

class Friend {
    async confirmFriendRequest(req, res) {
        try {
            let user = await User.findById(req.body.userId).select({ friendRequest: 1, friend: 1 });
            user.friendRequest.pull(req.body.requestId);
            user.friend.push(req.body.requestId);
            await user.save();

            let reqUser = await User.findById(req.body.requestId).select({ friendRequest: 1, friend: 1 });
            reqUser.friendRequest.pull(req.body.userId);
            reqUser.friend.push(req.body.userId);
            await reqUser.save()

            res.json({ result: true, requsetId: req.body.requsetId });
        } catch (err) {
            console.log("error on confirmRequest", err);
        }
    }

    async friendRequest(data) {
        try {
            const user = await User.findOne({ _id: data.friendsId });
            if (!user) {
                throw new Error("User is not found!");
            }

            if (user.friendRequest.some(u => u.toString() === data.userId.toString())) {
                return false;
            }

            user.friendRequest.push(data.userId);
            await user.save();
            const reqUser = await User.findById(data.userId).select({ name: 1, profilePhotos: 1, friendRequest: 1 })
            reqUser.friendRequest.push(data.friendsId);
            await reqUser.save();

            return reqUser;
        } catch (err) {
            console.log("error on friendRequest function", err);
            return false;
        }
    }

    async getFriendRequests(req, res) {
        try {
            res.json({ result: await User.findById(req.body.userId).populate("friendRequest", "name email gender profilePhotos").select({ name: 1 }) });
        } catch (error) {
            throw new Error("Error on getFriendRequests", error);
        }
    }
}

module.exports = new Friend();