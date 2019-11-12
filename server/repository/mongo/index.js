const mongoose = require('mongoose');
const TweetSchema = require('./models/tweets');
const ReplySchema = require('./models/replies');
const ConversationSchema = require('./models/conversation');
const TweetsByHashtagSchema = require('./models/tweets-by-hashtag');
const TweetsByListSchema = require('./models/tweets-by-list');
const TweetsBySubscriptionSchema = require('./models/tweets-by-subscription');
const BookmarkedTweetsSchema = require('./models/bookmarked-tweets');

mongoose.connect(process.env.MONGO_URL);

const tweetModel = mongoose.model('tweets', TweetSchema);
const replyModel = mongoose.model('replies', ReplySchema);
const conversationModel = mongoose.model('conversation', ConversationSchema);
const tweetsByHashtagModel = mongoose.model('tweets-by-hashtag', TweetsByHashtagSchema);
const tweetsByListModel = mongoose.model('tweets-by-hashtag', TweetsByListSchema);
const tweetsBySubscriptionModel = mongoose.model('tweets-by-hashtag', TweetsBySubscriptionSchema);
const bookmarkedTweetsModel = mongoose.model('tweets-by-hashtag', BookmarkedTweetsSchema);
/*
TODO
- tweets by HashTag  --- done
- tweets by User
- tweets by List  --- done
- tweets by Subscriptions --- done
- Bookmarked Tweets
*/

module.exports = {
    Tweet: tweetModel,
    Feed: feedModel,
    Reply: replyModel,
    Conversation: conversationModel,
    TweetsByHashtagModel: tweetsByHashtagModel,
    TweetsByListModel: tweetsByListModel,
    TweetsBySubscriptionModel: tweetsBySubscriptionModel,
    BookmarkedTweetsModel: bookmarkedTweetsModel,
    mongoose: mongoose
};