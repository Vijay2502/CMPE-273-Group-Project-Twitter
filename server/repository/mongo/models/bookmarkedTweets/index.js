const Schema = require('mongoose').Schema;
const tweetSchema = require('../tweets');

const BookMarkedTweetSchema = new Schema({
    tweets: {
        userId: Number,
        tweets: [tweetSchema]
    }
}, {
    timestamps: true
});

module.exports = BookMarkedTweetSchema;
