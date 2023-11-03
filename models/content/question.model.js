const mongoose = require("mongoose");

const QuestionSchema = mongoose.Schema({
    type: {
        type: String,
        enum: ["question"],
        default: "question"
    },
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
        default: "user",
        emum: ["community", "user"]
    },
    questionType: {
        type: String,
        default: "public",
        emum: ["private", "public"]
    },
    community: {
        id: {
            type: String
        },
        name: {
            type: String
        },

        category: {
            type: String
        }
    },
    title: {
        type: String,
        require: true,
        index: 'text'
    },
    descriptionOfIssue: {
        type: String,
        require: true,
        index: 'text'
    },
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image",
    },],
    code: {
        type: String
    },
    answers: [{
        type: String // Array of ids of answer objects
    }],
    upVotes: [{
        type: String // Array of ids of users
    }],
    downVotes: [{
        type: String // Array of ids of users
    }],
    topics: [
        {
            id: { type: String },
            title: { type: String }
        }
    ],
    views: [{
        userViewed: { type: Number },
        timesViewed: { type: Number }
    }],
    reports: [
        {
            userReported: { type: String },
            dateReported: { type: Date },
            issue: {
                type: String,
                enum: ["repitition", "irrelevance", "spam", "offensive-or-inappropriate", "inaccurate-information"]
            },
            addressed: { Boolean }
        }
    ]
});

// Add text indexes to the title and descriptionOfIssue fields
QuestionSchema.index({ title: 'text', descriptionOfIssue: 'text' });

// Auto find questionerer
QuestionSchema.pre(/^find/, function (next) {
    this.populate({
        path: "questioner",
        select: ""
    });
    next();
});

module.exports = mongoose.model("Question", QuestionSchema)