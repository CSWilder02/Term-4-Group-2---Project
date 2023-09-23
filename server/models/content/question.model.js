const mongoose = require("mongoose");

const QuestionSchema = mongoose.Schema({
    questionerer: {
        type: String
    },
    dateAsked: {
        type: Date,
        default: Date.now()
    },
    questionSource: {
        type: String // Sourced from: Community or Personal
    },
    title: {
        type: String
    },
    text: {
        type: String
    },
    images: [{
        type: String // Array of images
    }],
    answers: [{
        type: String // Array of ids of answer objects
    }],
    upVotes: [{
        type: String // Array of ids of users
    }],
    downVotes: [{
        type: String // Array of ids of users
    }],
    topics: [{
        type: String // Array of ids of topics objects
    }]
});

module.exports = mongoose.model("Question", QuestionSchema)