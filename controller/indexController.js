const cons = require("consolidate")
const User = require("../models/user-schema")

class IndexController {
    homePage(req, res) {
        res.render("newsfeed")
    }
    loginPage(req, res) {
        res.clearCookie('x-access-token')
        res.render('index')
    }
    profilePage(req, res) {
        res.render('time-line')
    }
    userFriends(req, res) {
        res.render('timeline-friends')
    }
    async friendRequest(req, res) {
        //console.log(req.userObj)
        try {
            let FriendRequestList = await User.findOne({ _id: req.userObj.userId }).populate('friendRequest').exec()
            res.json({ FriendRequestList })
        } catch (err) {
            console.log("error on friendRequest function", err);
        }
        //console.log(FriendRequestList)
    }
    userMessages(req, res) {
        res.render('messages')
    }
    async ConfirmRequest(req, res) {
        let { from, to } = req.body
        try {
            let user = await User.findOne({ _id: from }).select({ friendRequest: 1, friend: 1 });
            user.friend.push(to)
            user.save((err) => { if (err) console.log(err) })
            let UserFriend = await User.findOne({ _id: to }).select({ friend: 1 ,name: 1 });

            UserFriend.friend.push(from) 
            UserFriend.save();
            res.json({ message: `Now ${UserFriend.name} is your firend ` })

        } catch (err) {
            console.log("error on confirmRequest", err);
        }

    }
}
module.exports = new IndexController()