const express = require("express");
const multer = require("multer");
const UserSchema = require("../../models/entities/user.model");
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
            password: req.body.password
        });

        // If hash returns true execute 
        if (bcrypt.compareSync(10, hash)) {
            if (findUser) {
                const isPasswordValid = await bcrypt.compare(password, findUser.password);

                // Exclude the 'password' property from the user object
                const { password, ...userWithoutPassword } = findUser._doc;

                // Generate a JWT token
                const token = jwt.sign({ userId: findUser?._id, role: findUser?.role }, secretKey, { expiresIn: "1h" });
                res.json({ user: userWithoutPassword, token });
            } else {
                res.status(401).json({ error: "Invalid username or password." });
            }
        }

    } catch (error) {
        console.error("User login error:", error);
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
    const { password, ...userWithoutPassword } = req.body;

    try {
        const passwordHashed = await bcrypt.hash(password, 10);
        const user = new UserSchema({ ...userWithoutPassword, password: password });
        await user.save();

        // Generates a JWT token
        const token = jwt.sign({ userId: user?._id }, secretKey, { expiresIn: "1h" });

        res.json({ user, token });
    } catch (error) {
        res.status(500).json({ error: `User registration failed.${error}` });
    }
});

//Update User
router.patch("/api/updateUser/:id", verifyToken, async (req, res) => {
    const userId = req.params.id;
    const updateUser = req.body;

    try {
        const findUser = await UserSchema.findById(userId);
        const { newPassword } = req.body;

        if (!findUser) {
            return res.status(404).json({ error: "User not found or you are not authorized to access this" });
        }

        if (updateUser.password) {
            // If a new password is provided for update, hash it
            const passwordHashed = await bcrypt.hash(updateUser.password, passwordHashKey);
            updateUser.password = passwordHashed;
        }

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
router.delete("/api/deleteUser/:id", async (req, res) => {
    await UserSchema.findByIdAndDelete(req.params.id)
        .then(response => res.json(response))
        .catch(error => res.status(500).json(error));
});

module.exports = router;
