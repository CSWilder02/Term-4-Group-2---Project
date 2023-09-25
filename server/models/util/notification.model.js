const mongoose = require("mongoose");

const NotificationSchema = mongoose.Schema({
    eventType: {
        type: String,
        enum: ["followUser", "joinCommunity", "voteQuestion", "voteAnswer", "voteReply", "warning", "update"]
    },
    date: {
        type: Date,
        default: Date.now()
    },
    userTriggered: {
        type: String
    },
    userInteracted: {
        type: String
    },
    communityTriggered: {
        type: String
    },
    communityInteracted: {
        type: String
    },
    question: {
        type: String //Question id
    },
    answer: {
        type: String
    },
    reply: {
        type: String
    },
    voteType: {
        type: String, //upVote or downVote
        enum: ["upVote", "downVote"]
    },
});

module.exports = mongoose.model("Notification", NotificationSchema)