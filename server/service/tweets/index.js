const repository = require('../../repository/mongo');
const uuidv1 = require('uuid/v1');

module.exports.create = function (newTweet, cb) {
    //console.log('in service', newTweet);
    repository.Tweet.create({
        //hardcoding tweetId for testing/////
        tweetId: "1238",
        data: newTweet.data,
        ownerId: newTweet.ownerId,
        retweet: newTweet.retweet,
        likes: 0,
        views: 0,
        replies: [],
        hashTags: newTweet.hashTags
    }).then(function (tweet) {
        return cb(null, {
            id: tweet.tweetId
        });

    }, function (err) {
        return cb(err);
    });
}


module.exports.getByOwnerId = function (ownerId, pagination, cb) {
    repository.Tweet.find({ ownerId: ownerId }, null, pagination)
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


module.exports.viewTweet = function (tweetId, cb) {
    repository.Tweet.findOneAndUpdate(
        { tweetId: tweetId },
        { $inc: { views: 1 } }
    ).then(function (tweet) {
        return cb(null, "views incremented");
    }, function (err) {
        return cb(err);
    });
}


module.exports.bookmarkTweet = function (query, cb) {
    repository.Tweet.findOne({ tweetId: query.tweetId })
        .then(function (tweet) {
            repository.BookmarkedTweets.update(
                { "ownerId": query.userId },
                {
                    "$push": { "bookMarkedTweets": tweet }
                }
            ).then(function (result) {
                return cb(null, "success");
            }
            )
        }, function (err) {
            return cb(err);
        });
}


//insert into tweet collection with isRetweet true
module.exports.retweet = function (query, cb) {
    repository.Tweet.findOne({ tweetId: query.tweetId })
        .then(function (tweet) {
            let obj = {
                //hardcoding tweetId for testing/////
                tweetId: "1231",
                data: tweet.data,
                ownerId: query.userId,
                retweet: { isRetweet: true, tweetId: query.tweetId },
                likes: 0,
                views: 0,
                replies: [],
                hashTags: tweet.hashTags
            }
            repository.Tweet.create(obj)
                .then(function (result) {
                    return cb(null, result);
                }
                )
        }, function (err) {
            return cb(err);
        });
}

// module.exports.reply = function (query, cb) {
//     repository.Tweet.findOne({ tweetId: query.tweetId })
//         .then(function (tweet) {
//             let obj = {
//                 //hardcoding tweetId for testing/////
//                 tweetId: "1231",
//                 data: tweet.data,
//                 ownerId: query.userId,
//                 retweet: { isRetweet: true, tweetId: query.tweetId },
//                 likes: 0,
//                 views: 0,
//                 replies: [],
//                 hashTags: tweet.hashTags
//             }
//             repository.Tweet.create(obj)
//                 .then(function (result) {
//                     return cb(null, result);
//                 }
//                 )
//         }, function (err) {
//             return cb(err);
//         });
// }

module.exports.getTweetsBySubscriber = function (request, pagination, cb) {
    ///array of userId's of Subscriber
    let arr = [1, 2]
    repository.Tweet.find(
        { "ownerId": { "$in": arr } }, null, pagination
    )
        .then(function (tweets) {
            return cb(null, tweets);
        }, function (err) {
            return cb(err);
        });
}

module.exports.deleteTweet = function (tweetId, cb) {
    repository.Tweet.findOneAndRemove(
        { tweetId: tweetId }
    )
        .then(function (tweet) {
            return cb(null, tweet);
        }, function (err) {
            return cb(err);
        });
}