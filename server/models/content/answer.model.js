const mongoose = require("mongoose");

const AnswerSchema = mongoose.Schema({
    answerer: {
        type: String
    },
    dateAnswered: {
        type: Date,
        default: Date.now()
    },
    question: {
        type: String
    },
    text: {
        type: String
    },
    code: {
        type: String // Array of images
    },
    upVotes: [{
        type: String // Array of ids of users
    }],
    downVotes: [{
        type: String // Array of ids of users
    }]
});

module.exports = mongoose.model("Answer", AnswerSchema)