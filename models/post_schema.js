const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'userschema',
        required: true,
    },
    text: {
        type: String,
    },
    like: {
        type: Number,
    },
    comment: [{
        type: String,
    }],
    image: {
        type: String,
    }
}, { timestamps: true });

const Post = mongoose.model("post", PostSchema);
module.exports = Post;