const tweetService = require('../../service/tweets');


module.exports.createTweet = function (request, response) {
    if (!(request.body && request.body.data && request.body.ownerId && request.body.retweet
        && request.body.hashTags)) {
        return response.status(400).send("INVALID REQUEST");
    }
    return tweetService.create(request.body, function (err, data) {
        if (err) return response.status(err.code ? err.code : 500).send(err);
        return response.send({
            status: "ok",
            data: data
        });
    });
}

module.exports.getTweetsByOwnerId = function (request, response) {

    if (!(request.params && request.params.ownerId)) {
        return response.status(400).send("INVALID REQUEST");
    }
    var pagination = {
        skip: 0,
        limit: 2
    };
    if (request.query.skip) pagination.skip = Number(request.query.skip);
    if (request.query.limit) pagination.limit = Number(request.query.limit);

    tweetService.getByOwnerId(request.params.ownerId, pagination, function (err, data) {
        if (err) {
            return response.status(err.code ? err.code : 500).send(err);
        }
        return response.send({
            status: "ok",
            data: data
        });

    });
}

module.exports.getTweetByTweetId = function (request, response) {
    if (!(request.params && request.params.tweetId)) {
        return response.status(400).send("INVALID REQUEST");
    }
    tweetService.getByTweetId(request.params.tweetId, function (err, data) {
        if (err) {
            return response.status(err.code ? err.code : 500).send(err);
        }
        return response.send({
            status: "ok",
            data: data
        });

    });
}

module.exports.likeTweet = function (request, response) {
    if (!(request.query && request.query.tweetId && request.query.userId)) {
        return response.status(400).send("INVALID REQUEST");
    }
    tweetService.likeTweet(request.query, function (err, data) {
        if (err) {
            return response.status(err.code ? err.code : 500).send(err);
        }
        return response.send({
            status: "ok",
            data: data
        });

    });
}

module.exports.viewTweet = function (request, response) {
    if (!(request.params && request.params.tweetId)) {
        return response.status(400).send("INVALID REQUEST");
    }
    tweetService.viewTweet(request.params.tweetId, function (err, data) {
        if (err) {
            return response.status(err.code ? err.code : 500).send(err);
        }
        return response.send({
            status: "ok",
            data: data
        });

    });
}

module.exports.retweet = function (request, response) {
    console.log('helo');
    if (!(request.query && request.query.tweetId && request.query.userId)) {
        return response.status(400).send("INVALID REQUEST");
    }
    tweetService.retweet(request.query, function (err, data) {
        if (err) {
            return response.status(err.code ? err.code : 500).send(err);
        }
        return response.send({
            status: "ok",
            data: data
        });

    });
}

// module.exports.reply = function (request, response) {
//     console.log('helo');
//     if (!(request.query && request.query.tweetId && request.query.userId)) {
//         return response.status(400).send("INVALID REQUEST");
//     }
//     tweetService.retweet(request.query, function (err, data) {
//         if (err) {
//             return response.status(err.code ? err.code : 500).send(err);
//         }
//         return response.send({
//             status: "ok",
//             data: data
//         });

//     });
// }

module.exports.getTweetsBySubscriber = function (request, response) {
    // if (!(request.params && request.params.userId)) {
    //     return response.status(400).send("INVALID REQUEST");
    // }
    var pagination = {
        skip: 0,
        limit: 2
    };
    if (request.query.skip) pagination.skip = Number(request.query.skip);
    if (request.query.limit) pagination.limit = Number(request.query.limit);

    tweetService.getTweetsBySubscriber(request, pagination, function (err, data) {
        if (err) {
            return response.status(err.code ? err.code : 500).send(err);
        }
        return response.send({
            status: "ok",
            data: data
        });

    });
}

module.exports.deleteTweet = function (request, response) {
    if (!(request.params && request.params.tweetId)) {
        return response.status(400).send("INVALID REQUEST");
    }
    tweetService.deleteTweet(request.params.tweetId, function (err, data) {
        if (err) {
            return response.status(err.code ? err.code : 500).send(err);
        }
        return response.send({
            status: "ok",
            data: data
        });

    });
}

module.exports.getTweetsByList = function (request, response) {
    if (!(request.params && request.params.listId)) {
        return response.status(400).send("INVALID REQUEST");
    }
    tweetService.getTweetsByList(request.params.listId, function (err, data) {
        if (err) {
            return response.status(err.code ? err.code : 500).send(err);
        }
        return response.send({
            status: "ok",
            data: data
        });

    });
}

module.exports.getByHashtag = function (request, response) {
    if (!(request.params && request.params.hashtag)) {
        return response.status(400).send("INVALID REQUEST");
    }
    tweetService.getByHashtag(request.params.hashtag, function (err, data) {
        if (err) {
            return response.status(err.code ? err.code : 500).send(err);
        }
        return response.send({
            status: "ok",
            data: data
        });

    });
}