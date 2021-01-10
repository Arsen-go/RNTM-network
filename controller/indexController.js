class IndexController {
 homePage(req,res) {
    res.render("newsfeed")
 }
 loginPage(req,res) {
     res.clearCookie('x-access-token')
     res.render('landing')
 }
 profilePage(req,res) {
     res.render('time-line')
 }
 userFriends(req,res) {
     res.render('timeline-friends')
 }
 userMessages(req,res) {
     res.render('messages')
 }
}
module.exports = new IndexController()