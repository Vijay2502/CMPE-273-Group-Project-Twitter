const tweetService = require('../../service/tweets');

module.exports.bookmarkTweet = function (request, response) {
    if (!(request.query && request.query.tweetId && request.query.userId)) {
        return response.status(400).send("INVALID REQUEST");
    }
    tweetService.bookmarkTweet(request.query, function (err, data) {
        if (err) {
            return response.status(err.code ? err.code : 500).send(err);
        }
        return response.send({
            status: "ok",
            data: data
        });

    });
}