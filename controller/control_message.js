const User = require("../models/user-schema");
const userMessage = require("../models/user_message");

class Message {
  async add(msg) {
    try {
      console.log(msg);
      let msgUser = new userMessage(msg);
      await msgUser.save();
      let newMsg = await userMessage.findOne({ from: msg.from, to: msg.to });
      let user = await User.findOne({ _id: msg.from });
      console.log(user);
      user.message.push(newMsg._id);
     await user.save();

      return user._id
    } catch (err) {
      console.log("error on save message: ", err);
    }
  }

  async getAllMessages(fromTo) {
    console.log(fromTo);
    let message = await userMessage.find({$or: [ {from: fromTo.from,to: fromTo.to} ,{ from: fromTo.to,to: fromTo.from,} ] });
    //console.log("messahjebdejnnd",message)
    return message;
  }

  async del(msg) {
    try {
      console.log(msg);
      await User.update({ email: msg.author }, { $set: { messages: [] } });
    } catch (err) {
      console.log("error on deleting messages :" + err);
    }
  }
}

module.exports = new Message();