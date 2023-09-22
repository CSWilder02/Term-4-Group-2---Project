const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
    fullName: {
        type: String
    },
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    dateJoined: {
        type: Date,
        default: Date.now()
    },
    profileImage: {
        type: String
    }
});

module.exports = mongoose.model("Admin", AdminSchema)