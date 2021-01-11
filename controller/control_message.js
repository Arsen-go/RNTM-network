const User = require("../models/user-schema");
const userMessage = require("../models/user_message");

class Message {
  async add(msg) {
    try {
      let msgUser = new userMessage(msg);
      await msgUser.save();
      let newMsg = await userMessage.findOne({ from: msg.from, to: msg.to, text: msg.text });
      let user = await User.findOne({ _id: msg.from });
      user.message.push(newMsg._id);
      await user.save();
      return newMsg
    } catch (err) {
      console.log("error on save message: ", err);
    }
  }

  async getAllMessages(obj) {
    let message = await userMessage.find({ $or: [{ from: obj.from, to: obj.chatWith }, { from: obj.chatWith, to: obj.from, }] });
    return message;
  }

  // async deleteAllMsg(friendId) {
  //   try {
  //     console.log(friendId);
  //     await User.update({ email:  }, { $set: { messages: [] } });
  //   } catch (err) {
  //     console.log("error on deleting messages :" + err);
  //   }
  // }
}

module.exports = new Message();