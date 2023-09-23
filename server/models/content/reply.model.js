const mongoose = require("mongoose");

const ReplySchema = mongoose.Schema({
    replier: {
        type: String
    },
    dateReplied: {
        type: Date,
        default: Date.now()
    },
    text: {
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