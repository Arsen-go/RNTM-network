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

    async friendRequest(req, res) {
        try {
            let FriendRequestList = await User.findOne({ _id: req.userObj.userId }).populate('friendRequest').exec()
            res.json({ FriendRequestList })
        } catch (err) {
            console.log("error on friendRequest function", err);
        }
    }
}

module.exports = new Friend();