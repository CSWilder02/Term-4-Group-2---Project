const Questions = require("../../../models/content/question.model");
const Answers = require("../../../models/content/answer.model");
const Users = require("../../../models/entities/user.model");
const Topics = require("../../../models/content/topic.model");

async function searchEngine(query) {
    let lowercaseQuery = query?.toLowerCase();
    let keywords = lowercaseQuery?.split(/\s+/);

    // Initialize arrays for results
    let questionResults = [];
    let answerResults = [];
    let userResults = [];
    let topicResults = [];

    // Define the topicIdsMatchingQuery function
    async function topicIdsMatchingQuery(query) {
        const regex = new RegExp(query, 'i'); // Case-insensitive regex for the query
        const matchingTopics = await Topics.find({ title: regex }, '_id').exec(); // Execute the query and convert to an array
        return matchingTopics.map(topic => topic._id);
    }

    // Search in the Questions collection
    const questionQuery = {
        $or: [
            { title: { $regex: lowercaseQuery, $options: 'i' } },
            { descriptionOfIssue: { $regex: lowercaseQuery, $options: 'i' } },
            {
                tags: {
                    $elemMatch: {
                        id: { $in: await topicIdsMatchingQuery(lowercaseQuery) },
                    },
                },
            },
        ],
    };
    questionResults = await Questions.find(questionQuery);

    // Search in the Answers collection
    const answerQuery = {
        $or: [
            { text: { $regex: lowercaseQuery, $options: 'i' } },
            { tags: { $in: keywords } },
        ],
    };
    answerResults = await Answers.find(answerQuery);

    // Search in the Users collection
    const userQuery = {
        $or: [
            { fullName: { $regex: lowercaseQuery, $options: 'i' } },
            { username: { $regex: lowercaseQuery, $options: 'i' } },
            { bio: { $regex: lowercaseQuery, $options: 'i' } },
        ],
    };
    userResults = await Users.find(userQuery);

    // Search in the Topics collection
    const topicQuery = {
        title: { $regex: lowercaseQuery, $options: 'i' },
    };
    topicResults = await Topics.find(topicQuery);

    // Return the results in the desired format
    return {
        questions: questionResults,
        answers: answerResults,
        users: userResults,
        topics: topicResults,
    };
}

module.exports = searchEngine;
