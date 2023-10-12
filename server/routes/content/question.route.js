const express = require("express");
const QuestionSchema = require("../../models/content/question.model");
const AnswerSchema = require("../../models/content/answer.model");
const UserSchema = require("../../models/entities/user.model");
const TopicSchema = require("../../models/content/topic.model")
const AdminSchema = require("../../models/entities/admin.model");

const router = express();
const verifyToken = require("../../middleware/auth/verifyToken");

//Create
router.post("/api/createQuestion", verifyToken, async (req, res) => {
    try {
        // Get the user ID from the decoded token
        const userId = req.user.userId;

        // Fetch the user data (excluding password) from the database
        const user = await UserSchema.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Extract topics from the request body
        const { topics, ...questionData } = req.body;

        // Create a new Question with the associated user data
        const question = new QuestionSchema({
            ...questionData,
            questioner: user._id
        });

        // Create an array to hold references to Topics
        const questionTopics = [];

        if (topics && topics.length > 0) {
            // Iterate through the provided topics
            for (const topicText of topics) {
                // Check if a Topic with the same text already exists
                const existingTopic = await TopicSchema.findOne({ title: topicText });

                if (existingTopic) {
                    // If it exists, push its ID to the question's Topics array
                    questionTopics.push(existingTopic._id);
                } else {
                    // If it doesn't exist, create a new Topic and push its ID
                    const newTopic = new TopicSchema({ title: topicText });
                    const savedTopic = await newTopic.save();
                    questionTopics.push(savedTopic._id);
                }
            }
        }

        // Set the Question's topics array
        question.topics = questionTopics;

        // Save the Question to the database
        const savedQuestion = await question.save();

        res.json(savedQuestion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating Question.' });
    }
});

// Get All Questions
router.get("/api/getQuestions",  async (req, res) => {
    console.log("WORKING")
    try {
        // const userId = req.user.userId;
        // const userCommunity = req.user.username; // username is available in the JWT payload

        const findQuestion = await QuestionSchema.find(
            // { questioner: userId }
            );
        res.json(findQuestion);
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching questions.", error });
    }
});

// Get Single Question
router.get("/api/question/:id", verifyToken, async (req, res) => {
    try {

        const findSingleQuestion = await QuestionSchema.findById(req.params.id);

        res.json(findSingleQuestion);
    } catch (error) {
        res.status(500).json({ error: "Error fetching Questionss." });
    }
});

//Update Question, Excludes id parameter as it automatically updates
router.patch("/api/updateQuestion/:id", verifyToken, async (req, res) => {
    const questionId = req.params.id; // Get the Question id from the URL parameters

    try {
        // Create an object containing the fields to update (excluding _id)
        const updatedFields = { ...req.body };
        delete updatedFields._id; // Remove _id if it's present in the request body

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
    await QuestionSchema.findByIdAndDelete(req.params.id)
        .then(response => res.json(response))
        .catch(error => res.status(500).json(error));
});

module.exports = router;