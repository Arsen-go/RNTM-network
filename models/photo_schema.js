const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'userschema',
        required: true,
    },
    name: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const userPhoto = mongoose.model("photo", PhotoSchema);
module.exports = userPhoto;