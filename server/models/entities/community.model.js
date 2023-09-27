const mongoose = require("mongoose");

const CommunitySchemma = mongoose.Schema({
    name: {
        type: String
    },
    type: {
        type: String,
        enum: ["publicCommunity", "privateCommunity", "course"],
        default: "publicCommunity"
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    admin: {
        type: String
    },
    moderator: [{
        type: String
    }],
    questions: [{
        type: String
    }],
    communityStatus: {
        type: Boolean,
        default: true
    },
    topics: [{
        type: String
    }],
    followers: [{
        type: String
    }],
    followerRequests: [{
        type: String
    }]
});

module.exports = mongoose.model("Community", CommunitySchemma)