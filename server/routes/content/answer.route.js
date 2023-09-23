const express = require("express");
const router = express();

const AnswerSchema = require("../../models/content/answer.model");
const verifyToken = require("../../middleware/auth/verifyToken");

// Create Answer
router.post("/api/createAnswer", verifyToken, async (req, res) => {
    try {
        // Get the user ID from the decoded token
        const userId = req.user.userId;

        // Check if the user exists (you were missing this check)
        if (!userId) {
            return res.status(404).json({ error: 'Create account to respond to questions' });
        }

        const answer = new AnswerSchema({ answerer: userId, ...req.body });
        const savedAnswer = await answer.save();
        res.json(savedAnswer);
    } catch (error) { // Add error variable to catch block
        console.error("Error creating answer:", error); // Log the error for debugging
        res.status(500).json({ error: 'Error responding to Question' });
    }
})

// Read All Answers
router.get("/api/answers", verifyToken, async (req, res) => {
    const findAnswer = await AnswerSchema.find()
    res.json(findAnswer)
})

module.exports = router