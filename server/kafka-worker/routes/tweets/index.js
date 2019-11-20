const tweetService = require('../../../service/tweets');

module.exports.createTweet = function (request, response) {
    if (!(request.body && request.body.data && request.body.ownerId && request.body.retweet
        && request.body.hashTags)) {
        return response({
            code: 400,
            message: "INVALID REQUEST"
        });
    }
    return tweetService.create(request.body, response);
}


module.exports.getTweetsByOwnerId = function (request, response) {

    if (!(request.params && request.params.ownerId)) {
        return response({
            code: 400,
            message: "INVALID REQUEST"
        });
    }
    var pagination = {
        skip: 0,
        limit: 2
    };
    if (request.query.skip) pagination.skip = Number(request.query.skip);
    if (request.query.limit) pagination.limit = Number(request.query.limit);

    return tweetService.getByOwnerId(request.params.ownerId, pagination, response);

}


module.exports.getTweetByTweetId = function (request, response) {
    if (!(request.params && request.params.tweetId)) {
        return response({
            code: 400,
            message: "INVALID REQUEST"
        });
    }
    return tweetService.getByTweetId(request.params.tweetId, response);
}


module.exports.likeTweet = function (request, response) {
    if (!(request.query && request.query.tweetId && request.query.userId)) {
        return response({
            code: 400,
            message: "INVALID REQUEST"
        });
    }
    return tweetService.likeTweet(request.query, response);
}


module.exports.viewTweet = function (request, response) {
    if (!(request.params && request.params.tweetId)) {
        return response({
            code: 400,
            message: "INVALID REQUEST"
        });
    }
    return tweetService.viewTweet(request.params.tweetId, response);
}


module.exports.retweet = function (request, response) {
    if (!(request.query && request.query.tweetId && request.query.userId)) {
        return response({
            code: 400,
            message: "INVALID REQUEST"
        });
    }
    return tweetService.retweet(request.query, response);
}


// module.exports.reply = function (request, response) {
//     console.log('helo');
//     if (!(request.query && request.query.tweetId && request.query.userId)) {
//         return response({
//             code: 400,
//             message: "INVALID REQUEST"
//         });
//     }
//     tweetService.retweet(request.query, response);
// }


module.exports.getTweetsBySubscriber = function (request, response) {
    if (!(request.params && request.params.userId)) {
        return response({
            code: 400,
            message: "INVALID REQUEST"
        });
    }
    var pagination = {
        skip: 0,
        limit: 2
    };
    if (request.query.skip) pagination.skip = Number(request.query.skip);
    if (request.query.limit) pagination.limit = Number(request.query.limit);

    return tweetService.getTweetsBySubscriber(request, pagination, response);
}


module.exports.deleteTweet = function (request, response) {
    if (!(request.params && request.params.tweetId)) {
        return response({
            code: 400,
            message: "INVALID REQUEST"
        });
    }
    return tweetService.deleteTweet(request.params.tweetId, response);
}


module.exports.getTweetsByList = function (request, response) {
    if (!(request.params && request.params.listId)) {
        return response({
            code: 400,
            message: "INVALID REQUEST"
        });
    }
    return tweetService.getTweetsByList(request.params.listId, response);
}


module.exports.getByHashtag = function (request, response) {
    if (!(request.params && request.params.hashtag)) {
        return response({
            code: 400,
            message: "INVALID REQUEST"
        });
    }
    return tweetService.getByHashtag(request.params.hashtag, response);
}