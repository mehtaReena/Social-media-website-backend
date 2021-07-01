const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]


},
    { timestamps: true });

const PostModel = new mongoose.model('Post', PostSchema)

module.exports = PostModel