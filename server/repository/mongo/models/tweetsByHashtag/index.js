const Schema = require('mongoose').Schema;
const tweetSchema = require('../tweets');

const TweetByHashtagSchema = new Schema({
    hashTags: [String],
    tweets: [tweetSchema]
}, {
    timestamps: true
});

module.exports = TweetByHashtagSchema;
