const express = require("express");
const routes = express();

// Entity - ROUTES Section
const userRouter = require("./entities/user.route");
const adminRouter = require("./entities/admin.route");
const communityRouter = require("./entities/community.route");

// Content - ROUTES Section
const questionRouter = require("./content/question.route");
const answerRouter = require("./content/answer.route");
const replyRouter = require("./content/reply.route")
const topicRouter = require("./content/topic.route");
const imageRouter = require("./content/image.route");

// Utility - ROUTES Section
const searchRouter = require("./util/search/search.route")

// Use Routes section

// --- Entity
routes.use(adminRouter);
routes.use(userRouter);
routes.use(communityRouter);

// --- Content
routes.use(questionRouter);
routes.use(answerRouter);
routes.use(replyRouter);
routes.use(topicRouter);
routes.use(imageRouter);

//  --- Utility
routes.use(searchRouter);

module.exports = routes