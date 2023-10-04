const mongoose = require("mongoose");

const QuestionSchema = mongoose.Schema({
    questioner: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "User",
        type: String
    },
    dateAsked: {
        type: Date,
        default: Date.now()
    },
    questionSource: {
        type: String,// Sourced from: Community or Personal
        emum: ["community", "public"]
    },
    title: {
        type: String,
        require: true
    },
    question: {
        type: String,
        require: true
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

// Auto find questionerer
QuestionSchema.pre(/^find/, function (next) {
    this.populate({
        path: "questioner",
        select: ""
    });
    next();
});

module.exports = mongoose.model("Question", QuestionSchema)