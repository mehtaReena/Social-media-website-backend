const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    posts:
        {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Post",
            default: []
        },

    followers:
        {
            type:[ mongoose.Schema.Types.ObjectId],
            ref: "User",
            default: []
        },

    followings:
        {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "User",
            default: []
        },

}, { timestamps: true });

const UserModel = new mongoose.model('User', UserSchema)

module.exports = UserModel