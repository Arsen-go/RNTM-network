const { User, Message } = require("../models");

class UserMessage {
  async add(msg) {
    try {
      const msgUser = new Message(msg);
      const savedMessage = await msgUser.save();

      // const newMsg = await Message.findOne({ from: msg.from, to: msg.to, text: msg.text });
      const user = await User.findOne({ _id: msg.from });
      user.message.push(savedMessage._id);
      await user.save();
      return savedMessage;
    } catch (err) {
      console.log("error on save message: ", err);
    }
  }

  async getAllMessages(obj) {
    let message = await Message.find({ $or: [{ from: obj.from, to: obj.chatWith }, { from: obj.chatWith, to: obj.from, }] });
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

module.exports = new UserMessage();