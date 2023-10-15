const express = require("express");
const router = express();
const mongoose = require("mongoose");
require("dotenv").config({ path: '.env' });
const Grid = require("gridfs-stream");

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

router.get("/api/images", async (req, res) => {
    try {
        const files = await gfs.files.find().toArray();
        const imageList = files.map((file) => file.filename);
        res.json(imageList);
    } catch (error) {
        console.error("Error fetching images: ", error);
        res.status(500).json({ error: "Error fetching images." });
    }
});

module.exports = router;