const tweetService = require('../../service/tweets');

module.exports.bookmarkTweet = function (request, response) {
    if (!(request.params && request.params.userId && request.body.tweetId)) {
        return response.status(400).send("INVALID REQUEST");
    }
    tweetService.bookmarkTweet(request.params.userId, request.body.tweetId, function (err, data) {
        if (err) {
            return response.status(err.code ? err.code : 500).send(err);
        }
        return response.send({
            status: "ok",
            data: data
        });

    });
}