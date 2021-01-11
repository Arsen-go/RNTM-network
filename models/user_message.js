const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  text: {
    type: String,
    required: true,
  }
},{timestamps:true});

const userMessage = mongoose.model("usermessage", MessageSchema);
module.exports = userMessage;