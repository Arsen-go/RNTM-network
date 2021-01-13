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
    async userFriends(req, res) {
        res.render('timeline-friends')
    }
    async friendRequest(req,res) {
      //console.log(req.userObj)
        let FriendRequestList = await User.findOne({_id:req.userObj.userId}).populate('friendRequest').exec()
       //console.log(FriendRequestList)
      res.json({FriendRequestList})
    }
    userMessages(req, res) {
        res.render('messages')
    }
   async ConfirmRequest(req,res) {
        let {from,to} = req.body
       let user = await User.findOne({_id:from}).select({friendRequest:1,friend:1}).exec()
       user.friend.push(to)//??
       user.save((err)=>{ if(err) console.log(err)} )
       // stexa problem tali kam karoxa user i mejel push aneluc problem ta
        let UserFriend =  await User.findOne({_id:to}).select({friend:1}).exec()
        console.log(UserFriend.friend)
        UserFriend.firend.push(from) //?
        UserFriend.save((err)=>{ if(err) console.log(err)})

      res.json({message:`Now ${UserFriend.name} is your firend `})
    }
}
module.exports = new IndexController()