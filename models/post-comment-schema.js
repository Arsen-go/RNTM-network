const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostCommentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'userschema',
    required: true,
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'post',
    required: true,
  },
  commentText: {
    type: String,
    required: true,
  }
},{timestamps:true});

const PostComment = mongoose.model("postcomment", PostCommentSchema);
module.exports = PostComment;