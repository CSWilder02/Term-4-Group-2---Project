const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({

    filename: {
        type: String
    },
    // data: {
    //     type: Buffer
    // },
    data: {
        type: String
    },
    source: {
        userId: {
            type: String
        },
        type: {
            type: String,
            enum: ["public", "private"],
            default: "public"
        }
    }
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;