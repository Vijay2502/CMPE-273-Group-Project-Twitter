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
    tweetService.getByOwnerId(request.params.ownerId, function (err, data) {
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
    if (!(request.params && request.params.tweetId)) {
        return response.status(400).send("INVALID REQUEST");
    }
    tweetService.likeTweet(request.params.tweetId, function (err, data) {
        if (err) {
            return response.status(err.code ? err.code : 500).send(err);
        }
        return response.send({
            status: "ok",
            data: data
        });

    });
}
