const express = require("express");
const router = express();
const mongoose = require("mongoose");
const ImageSchema = require("../../models/content/image.model")
require("dotenv").config({ path: '.env' });
const Grid = require("gridfs-stream");
const verifyToken = require("../../middleware/auth/verifyToken");

const conn = mongoose.createConnection(
    process.env.DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "dv200_term4_group2_owi_forum" //Collection Name
    }
);
let gfs;

conn.once("open", () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("uploads");
});

// Create a new image
// router.post("/images",verifyToken, async (req, res) => {
//     try {

//         const userId = req.user.userId;
//         // Extract image data from the request body
//         const { filename, data } = req.body;

//         // Create a new image document
//         const image = new Image({ filename, data });

//         // Save the image to the database
//         const savedImage = await image.save();

//         res.json(savedImage);
//     } catch (error) {
//         res.status(500).json({ error: "Error creating image." });
//     }
// });

// Get All Images
router.get("/api/images", verifyToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        if (userId || userId !== "") {
            const findImage = await ImageSchema.find();
            res.json(findImage);
        } else {
            res.json({ error: "Access denied. Please login or provide token." })
        };
    } catch (error) {
        console.error("Error fetching images: ", error);
        res.status(500).json({ error: "Error fetching images." });
    }
});

// Delete Image
router.delete("/api/deleteImage/:id", verifyToken, async (req, res) => {
    const userId = req.user.userId;
    if (userId || userId !== "") {
        await ImageSchema.findByIdAndDelete(req.params.id)
            .then(response => res.json(response))
            .catch(error => res.status(500).json(error));
    } else {
        res.json({ error: "Access denied. Please login or provide token." })
    }
});

module.exports = router;