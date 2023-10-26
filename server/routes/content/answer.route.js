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
            return res.status(404).json({ error: 'Create account to respond to Answers' });
        }

        const answer = new AnswerSchema({ answerer: userId, ...req.body });
        const savedAnswer = await answer.save();
        res.json(savedAnswer);
    } catch (error) { // Add error variable to catch block
        console.error("Error creating answer:", error); // Log the error for debugging
        res.status(500).json({ error: 'Error responding to Answer' });
    }
})

// Read All Answers
router.get("/api/getAnswers", verifyToken, async (req, res) => {
    const findAnswers = await AnswerSchema.find()?.sort({ dateAnswered: -1 });
    res.json(findAnswers)
});

// Read Single Answer
router.get("/api/answer/:id", verifyToken, async (req, res) => {
    const findAnswer = await AnswerSchema.findById(req.params.id)
    res.json(findAnswer)
})

// Update Answer
router.patch("/api/updateAnswer/:id", verifyToken, async (req, res) => {
    const answerId = req.params.id; // Get the Answer id from the URL parameters

    try {
        // Create an object containing the fields to update (excluding _id)
        const updatedFields = { ...req.body };
        delete updatedFields._id; // Remove _id if it's present in the request body

        // Update the Answer document by ID
        const result = await AnswerSchema.updateOne({ _id: answerId }, { $set: updatedFields });

        if (result.nModified === 0) {
            return res.status(404).json({ error: "Answer not found or no changes made." });
        }

        res.json({ message: "Answer updated successfully." });
    } catch (error) {
        res.status(500).json({ error: "Error updating the Answer." });
    }
});

// Delete Answer
router.delete("/api/deleteAnswer/:id", verifyToken, async (req, res) => {
    await AnswerSchema.findByIdAndDelete(req.params.id)
        .then(response => res.json(response))
        .catch(error => res.status(500).json(error));
})

module.exports = router