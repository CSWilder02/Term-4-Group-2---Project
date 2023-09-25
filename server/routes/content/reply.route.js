const express = require("express");
const router = express();

const ReplySchema = require("../../models/content/reply.model");
const verifyToken = require("../../middleware/auth/verifyToken");

// Create Reply
router.post("/api/createReply", verifyToken, async (req, res) => {
    try {
        // Get the user ID from the decoded token
        const userId = req.user.userId;

        // Check if the user exists (you were missing this check)
        if (!userId) {
            return res.status(404).json({ error: 'Create account to respond to Answers' });
        }

        const reply = new ReplySchema({ replier: userId, ...req.body });
        const savedReply = await reply.save();
        res.json(savedReply);
    } catch (error) { // Add error variable to catch block
        console.error("Error creating Reply:", error); // Log the error for debugging
        res.status(500).json({ error: 'Error responding to Reply' });
    }
})

// Read All Replies
router.get("/api/getReplies", verifyToken, async (req, res) => {
    const findReplies = await ReplySchema.find()
    res.json(findReplies)
});

// Read Single Reply
router.get("/api/reply/:id", verifyToken, async (req, res) => {
    const findReply = await ReplySchema.findById(req.params.id)
    res.json(findReply)
})

// Update Reply
router.patch("/api/updateReply/:id", verifyToken, async (req, res) => {
    const replyId = req.params.id; // Get the Reply id from the URL parameters

    try {
        // Create an object containing the fields to update (excluding _id)
        const updatedFields = { ...req.body };
        delete updatedFields._id; // Remove _id if it's present in the request body

        // Update the Reply document by ID
        const result = await ReplySchema.updateOne({ _id: replyId }, { $set: updatedFields });

        if (result.nModified === 0) {
            return res.status(404).json({ error: "Reply not found or no changes made." });
        }

        res.json({ message: "Reply updated successfully." });
    } catch (error) {
        res.status(500).json({ error: "Error updating the Reply." });
    }
});

// Delete Reply
router.delete("/api/deleteReply/:id", verifyToken, async (req, res) => {
    await ReplySchema.findByIdAndDelete(req.params.id)
        .then(response => res.json(response))
        .catch(error => res.status(500).json(error));
})

module.exports = router