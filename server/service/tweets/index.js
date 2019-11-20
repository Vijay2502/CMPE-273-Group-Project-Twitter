const repository = require('../../repository/mongo');
const cache = require('../../cache');
const uuidv1 = require('uuid/v1');

module.exports.create = function (newTweet, cb) {
    //console.log('in service', newTweet);
    repository.Tweet.create({
        //hardcoding tweetId for testing/////
        tweetId: "1238",
        data: newTweet.data,
        ownerId: newTweet.ownerId,
        retweet: newTweet.retweet,
        likes: { count: 0, userId: [] },
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

    cache.get('tweet-getByTweetId-' + tweetId, function (err, tweet) {
        if (tweet) {
            return cb(null, JSON.parse(tweet));
        } else {
            repository.Tweet.findOne({ tweetId: tweetId })
                .then(function (tweet) {
                    if (tweet) {
                        var tweetDTO = {
                            id: tweet.tweetId,
                            likes: tweet.likes,
                            views: tweet.views,
                            replies: tweet.replies,
                            hashTags: tweet.hashTags,
                            data: tweet.data ? tweet.data : null
                        };

                        cache.set('tweet-getByTweetId-' + tweetId, JSON.stringify(tweetDTO), function (err) {
                            if (err) {
                                console.log("Write to Cache Failed >>>> err: " + JSON.stringify(err, null, 4));
                            } else {
                                cache.expire('tweet-getByTweetId-' + tweetId, process.env.CACHE_EXPIRY_TIME);
                            }

                        })

                        return cb(null, tweetDTO);
                    }
                    return cb({
                        code: 404,
                        message: "TWEET NOT FOUND"
                    });

                }, function (err) {
                    return cb(err);
                });
        }
    })
    // repository.Tweet.findOne({ tweetId: tweetId })
    //     .then(function (tweet) {
    //         if (tweet) {
    //             return cb(null, {
    //                 id: tweet.tweetId,
    //                 likes: tweet.likes,
    //                 views: tweet.views,
    //                 replies: tweet.replies,
    //                 hashTags: tweet.hashTags,
    //                 data: tweet.data ? tweet.data : null
    //             });
    //         }
    //         return cb({
    //             code: 404,
    //             message: "TWEET NOT FOUND"
    //         });

    //     }, function (err) {
    //         return cb(err);
    //     });

}


module.exports.likeTweet = function (data, cb) {
    let userId_arr = [];
    repository.Tweet.findOne({ tweetId: data.tweetId })
        .then(
            function (result) {
                userId_arr = result.likes.userId;
                if (userId_arr.indexOf(data.userId) == -1) {
                    repository.Tweet.findOneAndUpdate(
                        { tweetId: data.tweetId },
                        { $inc: { "likes.count": 1 }, $push: { "likes.userId": data.userId } }
                    ).then(function (tweet) {
                        return cb(null, "like incremented");
                    });
                }
                else {
                    return cb(null, "user already liked this tweet ");
                }
            }, function (err) {
                return cb(err);
            }
        );
}


module.exports.viewTweet = function (tweetId, cb) {
    let userId_arr = [];
    repository.Tweet.findOne({ tweetId: data.tweetId })
        .then(
            function (result) {
                userId_arr = result.views.userId;
                if (userId_arr.indexOf(data.userId) == -1) {
                    repository.Tweet.findOneAndUpdate(
                        { tweetId: data.tweetId },
                        { $inc: { "views.count": 1 }, $push: { "views.userId": data.userId } }
                    ).then(function (tweet) {
                        return cb(null, "views incremented");
                    });
                }
                else {
                    return cb(null, "user already viewed this tweet ");
                }
            }, function (err) {
                return cb(err);
            }
        );
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

module.exports.getByList = function (listId, pagination, cb) {
    repository.TweetsByList.find({ listId: listId }, null, pagination)
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

module.exports.getByHashtag = function (hashtag, pagination, cb) {
    repository.TweetsByHashtag.find({ "hashTags": { $regex: ".*" + searchKey + ".*", $options: 'i' } }, null, pagination)
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