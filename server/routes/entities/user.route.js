const express = require("express");
const multer = require("multer");
const UserSchema = require("../../models/entities/user.model");
const ImageSchema = require("../../models/content/image.model")
const router = express();
const jwt = require("jsonwebtoken");
const upload = multer({ dest: "uploads/" });
const bcrypt = require('bcryptjs');
const verifyToken = require("../../middleware/auth/verifyToken");

require('dotenv').config({ path: '.env' });

const secretKey = process.env.JWT_SECRET_KEY;
const passwordHashKey = JSON.parse(process.env.PASSWORD_HASH_KEY);

// Login user and return a JWT token
router.post("/api/loginUser", async (req, res) => {
    try {
        const findUser = await UserSchema.findOne({
            username: req.body.username,
        });

        if (findUser) {
            const isPasswordValid = await bcrypt.compare(req.body.password, findUser.password);

            if (isPasswordValid) {
                // Password is valid, exclude the 'password' property from the user object
                const { password, ...userWithoutPassword } = findUser._doc;

                // Generate a JWT token
                const token = jwt.sign({ userId: findUser._id, role: findUser.role }, secretKey, { expiresIn: "1h" });

                // Create session-related items
                const signedInAt = new Date();
                const expiresAt = new Date(signedInAt);
                expiresAt.setHours(expiresAt.getHours() + 4); // Expires 4 hours after login

                // Update the session field in the user document
                await UserSchema.updateOne(
                    { _id: findUser._id },
                    {
                        $set: {
                            'session.signedInAt': signedInAt,
                            'session.expiresAt': expiresAt,
                            'session.token': token,
                        },
                    }
                );

                res.json({
                    user: userWithoutPassword,
                    token,
                    session: {
                        signedInAt,
                        expiresAt,
                        token, // This could be a session token if needed
                    },
                });
            } else {
                console.log("Invalid password:", req.body.password);
                res.status(401).json({ error: "Invalid username or password." });
            }
        } else {
            console.log("User not found:", req.body.username);
            res.status(401).json({ error: "Invalid username or password." });
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "User login failed." });
    }
});

//Get All User
router.get("/api/getUsers", verifyToken, async (req, res) => {
    const findUser = await UserSchema.find();
    res.json(findUser);
});

//Get Single User
router.get("/api/getUser/:id", verifyToken, async (req, res) => {
    const findUser = await UserSchema.findById(req.params.id);
    res.json(findUser);
});

//Create User
router.post("/api/registerUser", async (req, res) => {
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
            images: imageIds, // Associate the uploaded image IDs with the community
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

//Update User
router.patch("/api/updateUser/:id", verifyToken, async (req, res) => {
    const userId = req.params.id;
    const updateUser = req.body;

    try {
        const findUser = await UserSchema.findById(userId);
        const { newPassword, images, removeImageIds } = req.body;

        if (!findUser) {
            return res.status(404).json({ error: "User not found or you are not authorized to access this" });
        }

        if (newPassword) {
            // If a new password is provided for update, hash it
            const passwordHashed = await bcrypt.hash(newPassword, passwordHashKey);
            updateUser.password = passwordHashed;
        }

        const userImages = findUser.images || [];
        const updatedImages = userImages.slice(); // Create a copy of the user's existing images

        // Handle adding new images
        if (images && images.length > 0) {
            for (const imageData of images) {
                const image = new ImageSchema({ data: imageData, source: { userId: userId } });
                const savedImage = await image.save();
                updatedImages.push(savedImage._id);
            }
        }

        // Handle removing images
        if (removeImageIds && removeImageIds.length > 0) {
            removeImageIds.forEach((removeImageId) => {
                const removeIndex = updatedImages.indexOf(removeImageId);
                if (removeIndex !== -1) {
                    updatedImages.splice(removeIndex, 1);
                }
            });
        }

        updateUser.profileImage = updatedImages[0];

        // Update user data
        const updatedUser = await UserSchema.findByIdAndUpdate(userId, updateUser, { new: true });

        // Excludes the 'password' property from the updated user object
        const { password, ...userWithoutPassword } = updatedUser._doc;

        res.json({ user: userWithoutPassword });
    } catch (error) {
        res.status(500).json({ error: `User update failed: ${error}` });
    }
});

//Delete User
router.delete("/api/deleteUser/:id", verifyToken, async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await UserSchema.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Get image IDs associated with the user and remove the images
        const imageId = user.profileImage;

        if (imageId && imageIds.length !== "") {
            // Assuming you have an ImageSchema with a remove method to delete images
            await ImageSchema.remove({ _id: { $in: imageId } });
        }

        await UserSchema.findByIdAndDelete(userId);
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting the user" });
    }
});

module.exports = router;
