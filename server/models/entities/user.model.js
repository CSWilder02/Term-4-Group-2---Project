const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    fullName: {
        type: String
    },
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    dateJoined: {
        type: Date,
        default: Date.now()
    },
    questions: [{
        type: String
    }],
    answers: [{
        type: String
    }],
    bio: {
        type: String
    },
    profileImage: {
        type: String
    },
    realibility: {
        type: Number,
        default: 0
    },
    accountStatus: {
        type: Boolean,
        default: true //true: active and, false: suspended/disabled
    }
});

module.exports = mongoose.model("User", UserSchema)