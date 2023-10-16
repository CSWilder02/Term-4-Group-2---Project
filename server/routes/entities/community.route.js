const express = require("express");
const router = express();

const CommunitySchema = require("../../models/entities/community.model");

const verifyToken = require("../../middleware/auth/verifyToken");

//Create Community
router.post("/api/createCommunity", verifyToken, async (req, res) => {
    const communityDetails = req.body;
    const images = req.body.images; // Extract images from the request body

    try {
        console.log('Received communityDetails:', communityDetails);

        const imageIds = [];

        // Handle community images
        if (images && images.length > 0) {
            for (const imageData of images) {
                const image = new ImageSchema({ data: imageData, source: { userId: req.user.userId } });
                const savedImage = await image.save();
                imageIds.push(savedImage._id);
            }
        }

        const community = new CommunitySchema({
            ...communityDetails,
            communityIcon: imageIds[0], // Associate the uploaded image IDs with the community
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
        // Create an object containing the fields to update (excluding _id and images)
        const { images, ...updatedFields } = req.body;
        delete updatedFields._id; // Remove _id if it's present in the request body

        // Handle community images
        const imageIds = [];

        if (images && images.length > 0) {
            for (const imageData of images) {
                const image = new ImageSchema({ data: imageData, source: { userId: req.user.userId } });
                const savedImage = await image.save();
                imageIds.push(savedImage._id);
            }
        }

        // Include image updates in the updated fields
        updatedFields.communityIcon = imageIds;

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
    const communityId = req.params.id;

    try {
        const community = await CommunitySchema.findById(communityId);

        if (!community) {
            return res.status(404).json({ error: "Community not found" });
        }

        // Get image IDs associated with the community and remove the images
        const imageId = community.communityBanner;

        if (imageId && imageId.length !== "") {
            // Assuming you have an ImageSchema with a remove method to delete images
            await ImageSchema.remove({ _id: { $in: imageId } });
        }

        await CommunitySchema.findByIdAndDelete(communityId);
        res.json({ message: "Community deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting the community" });
    }
});


module.exports = router