const mongoose = require("mongoose");

const TopicSchema = mongoose.Schema({
    type: {
        type: String,
        enum: ["topic"],
        default: "topic"
    },
    title: {
        type: String
    },
    upVotes: [{
        type: String // Array of ids of users
    }],
    downVotes: [{
        type: String // Array of ids of users
    }]
});

module.exports = mongoose.model("Topic", TopicSchema)