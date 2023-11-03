const mongoose = require("mongoose");
require('dotenv').config({ path: '.env' });

const passwordHashKey = JSON.parse(process.env.PASSWORD_HASH_KEY);
const bcrypt = require('bcryptjs');
const Joi = require('joi');


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
    bio: {
        type: String
    },
    profileImage: {
        type: String,
        // default: 'https://ucarecdn.com/3cfda29f-3620-4ce6-b488-7f0757853c6d/-/preview/500x500/-/quality/smart_retina/-/format/auto/'
        default: '65439993cd6293a690be6859'
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
    },
    questions: [{
        type: String
    }],
    answers: [{
        type: String
    }],
    saved: {
        questions: [{
            type: String
        }],
        answers: [{
            type: String
        }]
    },
    session: {
        signedInAt: {
            type: Date,
            default: Date.now(),
        },
        expiresAt: {
            type: Date,
            default: function () {
                // Set the expiresAt 4 hours after signedInAt
                const expiresAtDate = new Date(this.signedInAt);
                expiresAtDate.setHours(expiresAtDate.getHours() + 4);
                return expiresAtDate;
            },
        },
        token: {
            type: String // Should be returned after logging in
        },
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