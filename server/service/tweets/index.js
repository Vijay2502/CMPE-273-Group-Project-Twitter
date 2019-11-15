const repository = require('../../repository/mongo');
const uuidv1 = require('uuid/v1');

module.exports.create = function (newTweet, cb) {
    //console.log('in service', newTweet);
    repository.Tweet.create({
        tweetId: "1236",
        data: newTweet.data,
        ownerId: newTweet.ownerId,
        retweet: newTweet.retweet,
        likes: 0,
        views: 0,
        replies: [],
        hashTags: newTweet.hashTags
    }).then(function (tweet) {
        //console.log('in then');
        return cb(null, {
            id: tweet.tweetId
        });

    }, function (err) {
        return cb(err);
    });
}

module.exports.getByOwnerId = function (ownerId, cb) {
    repository.Tweet.find({ ownerId: ownerId })
        .then(function (tweets) {
            return cb(null, tweets.map(tweet => ({
                id: tweet.tweetId,
                likes: tweet.likes,
                views: tweet.views,
                replies: tweet.replies,
                data: tweet.data,
                hashTags: tweet.hashTags
            })));

        }, function (err) {
            return cb(err);
        });
}

module.exports.getByTweetId = function (tweetId, cb) {
    repository.Tweet.findOne({ tweetId: tweetId })
        .then(function (tweet) {
            return cb(null, tweet);
        }, function (err) {
            return cb(err);
        });
}

module.exports.likeTweet = function (tweetId, cb) {
    repository.Tweet.findOneAndUpdate(
        { tweetId: tweetId },
        { $inc: { likes: 1 } }
    ).then(function (tweet) {
        return cb(null, "like incremented");
    }, function (err) {
        return cb(err);
    });
}
