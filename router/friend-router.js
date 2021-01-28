const { User } = require("../models");

class Friend {
    async ConfirmRequest(req, res) {
        let { from, to } = req.body
        try {
            let user = await User.findOne({ _id: from }).select({ friendRequest: 1, friend: 1 });
            user.friend.push(to)
            user.save((err) => { if (err) console.log(err) })
            let UserFriend = await User.findOne({ _id: to }).select({ friend: 1, name: 1, profilePhotos: 1 });

            UserFriend.friend.push(from)
            UserFriend.save();
            res.json({ message: `Now ${UserFriend.name} is your firend `, imageName: UsUserFriender.profilePhotos })

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
            const reqUser = await User.findById(data.userId).select({name: 1, profilePhotos: 1, friendRequest: 1})
            reqUser.friendRequest.push(data.friendsId);
            await reqUser.save();

            return reqUser;
        } catch (err) {
            console.log("error on friendRequest function", err);
            return false;
        }
    }
}

module.exports = new Friend();