const express = require("express");
const router = express();

const CommunitySchema = require("../../models/entities/community.model");

const verifyToken = require("../../middleware/auth/verifyToken");

//Create User
router.post("/api/createCommunity", verifyToken, async (req, res) => {
    const communityDetails = req.body;

    try {
        console.log('Received communityDetails:', communityDetails);

        const community = new CommunitySchema({
            ...communityDetails,
            moderator: req.user.userId,
            admin: req.user.userId,
        });
        await community.save();

        console.log('Community created:', community);
        res.json({ community });
    } catch (error) {
        console.error('Error creating community:', error);
        res.status(500).json({ error: `Sorry, Could not create community: ${error}` });
    }
});

//Get All Communities
router.get("/api/getCommunities", verifyToken, async (req, res) => {
    const findCommunity = await CommunitySchema.find();
    res.json(findCommunity);
});

//Get Single Community
router.get("/api/getCommunity/:id", verifyToken, async (req, res) => {
    const findCommunity = await CommunitySchema.findById(req.params.id);
    res.json(findCommunity);
});

// Update Community Details
router.patch("/api/updateCommunityDetails/:id", verifyToken, async (req, res) => {
    const communityId = req.params.id; // Get the Community id from the URL parameters

    try {
        // Create an object containing the fields to update (excluding _id)
        const updatedFields = { ...req.body };
        delete updatedFields._id; // Remove _id if it's present in the request body

        // Update the Community document by ID
        const result = await CommunitySchema.updateOne({ _id: communityId }, { $set: updatedFields });

        if (result.nModified === 0) {
            return res.status(404).json({ error: "Community not found or no changes made." });
        }

        res.json({ message: "Community updated successfully." });
    } catch (error) {
        res.status(500).json({ error: "Error updating the Community." });
    }
});

// Patch routes that singularly deal with Join requests, deletes & Posting

//Delete Community
router.delete("/api/deleteCommunity/:id", verifyToken, async (req, res) => {
    await CommunitySchema.findByIdAndDelete(req.params.id)
        .then(response => res.json(response))
        .catch(error => res.status(500).json(error));
});


module.exports = router