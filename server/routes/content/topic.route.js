const express = require("express");
const TopicSchema = require("../../models/content/topic.model");

const router = express();
const verifyToken = require("../../middleware/auth/verifyToken");

// Get All Topics
router.get("/api/getTopics", verifyToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        if (userId || userId !== "") {
            const findTopics = await TopicSchema.find();
            res.json(findTopics);
        } else {
            res.json({ error: "Access denied. Please login or provide token." })
        }

    }
    catch (error) {
        res.status(500).json({ error: "Error fetching topics." });
    }
});

// Get Single Topic
router.get("/api/topic/:id", async (req, res) => {
    await TopicSchema.findById(req.params.id)
        .then(response => res.json(response))
        .catch(error => res.status(500).json(error));
});

// Delete Topic
router.delete("/api/deleteTopic/:id", async (req, res) => {
    await TopicSchema.findByIdAndDelete(req.params.id)
        .then(response => res.json(response))
        .catch(error => res.status(500).json(error));
});

module.exports = router;