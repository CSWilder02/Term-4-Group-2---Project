const express = require("express");
const multer = require("multer");
const AdminSchema = require("../../models/entities/admin.model");
const router = express();
const jwt = require("jsonwebtoken");
const verifyToken = require("../../middleware/auth/verifyToken");
const upload = multer({ dest: "uploads/" });

require('dotenv').config({ path: '.env' });

const secretKey = process.env.JWT_SECRET_KEY

// Login admin and return a JWT token
router.post("/api/loginAdmin", async (req, res) => {

    try {
        const findAdmin = await AdminSchema.findOne({
            adminname: req.body.adminname,
            password: req.body.password
        });

        if (findAdmin) {

            // Exclude the 'password' property from the admin object
            const { password, ...adminWithoutPassword } = findAdmin._doc;

            // Generate a JWT token
            const token = jwt.sign({ adminId: findAdmin?._id, role: findAdmin?.role }, secretKey, { expiresIn: "1h" });
            res.json({ admin: adminWithoutPassword, token });
        } else {
            res.status(401).json({ error: "Invalid adminname or password." });
        }
    } catch (error) {
        res.status(500).json({ error: "Admin login failed." });
    }
});

//Get All Admin
router.get("/api/getAdmins", verifyToken, async (req, res) => {
    const findAdmin = await AdminSchema.find();
    res.json(findAdmin);
});

//Get Single Admin
router.get("/api/getAdmin/:id", verifyToken, async (req, res) => {
    const findAdmin = await AdminSchema.findById(req.params.id);
    res.json(findAdmin);
});

//Create Admin
router.post("/api/registerAdmin", async (req, res) => {
    const { images, ...adminDetails } = req.body;

    try {
        const imageIds = [];

        if (images && images.length > 0) {
            for (const imageData of images) {
                const image = new ImageSchema({ data: imageData, source: { userId: admin?._id } });
                const savedImage = await image.save();
                imageIds.push(savedImage._id);
            }
        }

        // Create a new Admin with the associated image IDs
        const admin = new AdminSchema({ ...adminDetails, profileImage: imageIds[0] });

        await admin.save();

        // Generate a JWT token
        const token = jwt.sign({ adminId: admin?._id }, JWT_SECRET_KEY, { expiresIn: "1h" });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: "Admin registration failed." });
    }
});

//Update Admin
router.patch("/api/updateAdmin/:id", verifyToken, async (req, res) => {
    const adminId = req.params.id; // Get the admin ID from the URL params

    try {
        const { images, ...adminUpdate } = req.body;

        const imageIds = [];

        if (images && images.length > 0) {
            for (const imageData of images) {
                const image = new ImageSchema({ data: imageData, source: { userId: adminId } });
                const savedImage = await image.save();
                imageIds.push(savedImage._id);
            }
        }

        adminUpdate.images = imageIds;

        const updatedAdmin = await AdminSchema.findByIdAndUpdate(
            adminId,
            { $set: adminUpdate }, // Use $set to update only the specified fields
            { new: true } // Return the updated document
        );

        if (!updatedAdmin) {
            return res.status(404).json({ error: "Admin not found" });
        }

        res.json(updatedAdmin);
    } catch (error) {
        res.status(500).json({ error: "Error updating the admin" });
    }
})

//Delete Admin
router.delete("/api/deleteAdmin/:id", verifyToken, async (req, res) => {
    const adminId = req.params.id;

    try {
        const admin = await AdminSchema.findById(adminId);

        if (!admin) {
            return res.status(404).json({ error: "Admin not found" });
        }

        // Get image IDs associated with the admin and remove the images
        const imageId = admin.profileImage;

        if (imageId && imageId !== "") {
            // Assuming you have an ImageSchema with a remove method to delete images
            await ImageSchema.remove({ _id: imageId });
        }

        await AdminSchema.findByIdAndDelete(adminId);
        res.json({ message: "Admin deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting the admin" });
    }
});

module.exports = router;
