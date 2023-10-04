const mongoose = require("mongoose");
require('dotenv').config({ path: '.env' });

const passwordHashKey = JSON.parse(process.env.PASSWORD_HASH_KEY);
const bcrypt = require('bcryptjs');


const UserSchema = mongoose.Schema({
    fullName: {
        type: String
    },
    username: {
        type: String,
        unique: true
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
    questions: [{
        type: String
    }],
    answers: [{
        type: String
    }],
    bio: {
        type: String
    },
    profileImage: {
        type: String
    },
    realibility: {
        type: Number,
        default: 0
    },
    accountStatus: {
        type: Boolean,
        default: true //true: active and, false: suspended/disabled
    },
    role: {
        type: String,
        default: "user"
    }
});

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, passwordHashKey);
    }
    next();
});

// Method to update the password and rehash it
UserSchema.methods.updatePassword = async function (newPassword) {
    this.password = newPassword;
    await this.save();
};

module.exports = mongoose.model("User", UserSchema)