const mongoose = require("mongoose");

const AnswerSchema = mongoose.Schema({
    answerer: {
        type: String
    },
    dateAnswered: {
        type: Date,
        default: Date.now()
    },
    text: {
        type: String
    },
    images: [{
        type: String // Array of images
    }],
    replies: [{
        type: String // Array of ids of replies objects
    }],
    upVotes: [{
        type: String // Array of ids of users
    }],
    downVotes: [{
        type: String // Array of ids of users
    }]
});

module.exports = mongoose.model("Answer", AnswerSchema)