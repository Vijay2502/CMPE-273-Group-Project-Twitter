const mongoose = require('mongoose');
const TweetSchema = require('./models/tweets');
const FeedSchema = require('./models/feeds');
const ReplySchema = require('./models/replies');
const ConversationSchema = require('./models/conversation');

mongoose.connect(process.env.MONGO_URL);

const tweetModel = mongoose.model('tweets', TweetSchema);
const feedModel = mongoose.model('feeds', FeedSchema);
const replyModel = mongoose.model('replies', ReplySchema);
const conversationModel = mongoose.model('conversation', ConversationSchema);

module.exports = {
    Tweet: tweetModel,
    Feed: feedModel,
    Reply: replyModel,
    Conversation: conversationModel,
    mongoose: mongoose
};