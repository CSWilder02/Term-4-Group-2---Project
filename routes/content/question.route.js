const express = require("express");
const multer = require('multer');
const mongoose = require("mongoose");
const QuestionSchema = require("../../models/content/question.model");
const AnswerSchema = require("../../models/content/answer.model");
const UserSchema = require("../../models/entities/user.model");
const ImageSchema = require("../../models/content/image.model")
const TopicSchema = require("../../models/content/topic.model")
const AdminSchema = require("../../models/entities/admin.model");

const router = express();
const verifyToken = require("../../middleware/auth/verifyToken");

const Grid = require("gridfs-stream");
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10 MB (adjust the size as needed)
    },
});

// Create Question
router.post("/api/createQuestion", verifyToken, upload.array("images", 10), async (req, res) => {
    try {
        console.log("Start of createQuestion route"); // Debugging
        console.log(req.body);

        // Get the user ID from the decoded token
        const userId = req.user.userId;

        // Fetch the user data (excluding password) from the database
        const user = await UserSchema.findById(userId).select("-password");

        if (!user) {
            console.log("User not found."); // Debugging
            return res.status(404).json({ error: "User not found." });
        }

        // Extract topics from the request body
        const { topics, images, ...questionData } = req.body;

        // Create a new Question with the associated user data
        const question = new QuestionSchema({
            ...questionData,
            questioner: user._id,
            images: images, // Use the provided base64-encoded images directly
        });

        // Create an array to hold references to Topics
        const questionTopics = [];

        if (topics && topics.length > 0) {
            for (const topicText of topics) {
                // Check if a Topic with the same title already exists
                const existingTopic = await TopicSchema.findOne({ title: topicText });

                if (existingTopic) {
                    // If it exists, push its ID and title to the question's Topics array
                    questionTopics.push({ id: existingTopic._id, title: existingTopic.title });
                } else {
                    // If it doesn't exist, create a new Topic and push its ID
                    const newTopic = new TopicSchema({ title: topicText });
                    const savedTopic = await newTopic.save();
                    questionTopics.push({ id: savedTopic._id, title: savedTopic.title });
                }
            }
        }


        // Set the Question's topics array
        question.topics = questionTopics;

        const imageIds = [];

        if (images && images.length > 0) {
            for (const imageData of images) {
                let image = new ImageSchema({ data: imageData, source: { userId: userId } });
                console.log(image);
                const savedImage = await image.save();
                imageIds.push(savedImage._id);
            }
        }
        question.images = imageIds;

        question.save()
            .then((savedQuestion) => {
                console.log("Question saved successfully."); // Debugging

                // Add the question ID to the user's questions array
                user.questions.push(savedQuestion._id);
                user.save(); // Save the user document

                res.json(savedQuestion);
            })
            .catch((error) => {
                console.error("Error saving question:", error);
                res.status(500).json({ error: "Error saving question." });
            });

        console.log("End of createQuestion route"); // Debugging
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error creating Question." });
    }
});



// Get All Questions
router.get("/api/getQuestions", verifyToken, async (req, res) => {
    try {
        const userId = req?.user?.userId;
        // const findQuestion = await QuestionSchema?.find()?.sort({ dateAsked: -1 }); //Filter from latest to newest
        const findQuestion = await QuestionSchema?.find();
        res.json(findQuestion);
        // console.log("No user")
        // }

    }
    catch (error) {
        res.status(500).json({ error: "Error fetching questions.", error });
        console.log(error)
    }
});

// Get Single Question
router.get("/api/question/:id", async (req, res) => {
    try {

        const findSingleQuestion = await QuestionSchema.findById(req?.params?.id);

        res.json(findSingleQuestion);
    } catch (error) {
        res.status(500).json({ error: "Error fetching Questionss." });
    }
});

//Update Question, Excludes id parameter as it automatically updates
router.patch("/api/updateQuestion/:id", verifyToken, upload.array("images", 5), async (req, res) => {
    const questionId = req.params.id; // Get the Question id from the URL parameters

    try {
        // Create an object containing the fields to update (excluding _id)
        const updatedFields = { ...req.body };
        delete updatedFields._id; // Remove _id if it's present in the request body

        // Handle image uploads (if any)
        const newImages = req.files;
        const imageIds = [];

        if (newImages && newImages.length > 0) {
            for (const file of newImages) {
                let image = new ImageSchema({ data: file.buffer, source: { userId: req.user.userId } });
                const savedImage = await image.save();
                imageIds.push(savedImage._id);
            }
        }

        // Update the `images` field with new image IDs
        updatedFields.images = imageIds;

        // Retrieve the existing question to delete old images if needed
        const existingQuestion = await QuestionSchema.findById(questionId);

        if (existingQuestion && existingQuestion.images) {
            // Delete old images (if any) by their IDs
            await ImageSchema.deleteMany({ _id: { $in: existingQuestion.images } });
        }

        // Update the Question document by ID
        const result = await QuestionSchema.updateOne({ _id: questionId }, { $set: updatedFields });

        if (result.nModified === 0) {
            return res.status(404).json({ error: "Question not found or no changes made." });
        }

        res.json({ message: "Question updated successfully." });
    } catch (error) {
        res.status(500).json({ error: "Error updating the Question." });
    }
});

//Delete Question
router.delete("/api/deleteQuestion/:id", verifyToken, async (req, res) => {
    try {
        const questionId = req.params.id;

        // Find the question to be deleted
        const question = await QuestionSchema.findById(questionId);

        if (!question) {
            return res.status(404).json({ error: "Question not found." });
        }

        // Collect the image IDs associated with the question
        const imageIds = question.imageReferences || [];

        // Delete the images associated with the question
        for (const imageId of imageIds) {
            await Image.findByIdAndDelete(imageId);
        }

        // Delete the question
        const response = await QuestionSchema.findByIdAndDelete(questionId);

        res.json(response);
    } catch (error) {
        res.status(500).json({ error: "Error deleting the question." });
    }
});

module.exports = router;