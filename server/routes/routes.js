const express = require("express");
const app = express();

// Entity - ROUTES Section
const userRouter = require("./entities/user.route");
const adminRouter = require("./entities/admin.route");

// Content - ROUTES Section
const questionRouter = require("./content/question.route");
const answerRouter = require("./content/answer.route");
const replyRouter = require("./content/reply.route")
const topicRouter = require("./content/topic.route");

// Use Routes section
app.use(userRouter);
app.use(adminRouter);
app.use(questionRouter);
app.use(answerRouter);
app.use(replyRouter);
app.use(topicRouter);

module.exports = app