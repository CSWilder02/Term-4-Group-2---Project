const mongoose = require("mongoose");

const ReplySchema = mongoose.Schema({
    type: {
        type: String,
        enum: ["reply"],
        default: "reply"
    },
    replier: {
        type: String
    },
    dateReplied: {
        type: Date,
        default: Date.now()
    },
    answer: {
        type: String
    },
    code: {
        type: String
    },
    upVotes: [{
        type: String // Array of ids of users
    }],
    downVotes: [{
        type: String // Array of ids of users
    }]
});

module.exports = mongoose.model("Reply", ReplySchema)