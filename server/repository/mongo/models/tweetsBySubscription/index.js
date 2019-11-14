const Schema = require('mongoose').Schema;
const tweetSchema = require('../tweets');

const TweetBySubscriptionSchema = new Schema({
    tweets: {
        userId: Number,
        tweets: [tweetSchema]
    }
}, {
    timestamps: true
});

module.exports = TweetBySubscriptionSchema;
