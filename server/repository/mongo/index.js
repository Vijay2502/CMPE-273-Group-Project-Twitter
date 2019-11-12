const mongoose = require('mongoose');
const TweetSchema = require('./models/tweets');
const ReplySchema = require('./models/replies');
const ConversationSchema = require('./models/conversation');
const TweetByHashtagSchema = require('./models/tweets-by-hashtag');

mongoose.connect(process.env.MONGO_URL);

const tweetModel = mongoose.model('tweets', TweetSchema);
const replyModel = mongoose.model('replies', ReplySchema);
const conversationModel = mongoose.model('conversation', ConversationSchema);
const tweetByHashtagModel = mongoose.model('tweets-by-hashtag', TweetByHashtagSchema);
/*
TODO
- tweets by HashTag  --- done
- tweets by User
- tweets by List  
- tweets by Subscriptions
- Bookmarked Tweets
*/

module.exports = {
    Tweet: tweetModel,
    Feed: feedModel,
    Reply: replyModel,
    Conversation: conversationModel,
    TweetByHashtagModel: tweetByHashtagModel,
    mongoose: mongoose
};