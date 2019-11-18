const express = require('express');
const router = express.Router();
const Tweet = require('../routes/tweets');
const BookMarkedTweet = require('../routes/bookmarked-tweets');
const mongoConnection = require("../repository/mongo")
// const User = require('../user');

// var passport = require('passport');
// var auth = {
//     userAuth: passport.authenticate('jwt', {session: false})
// };
// router.use(passport.initialize());

// require('../auth/passport')(passport);
// router.post('/img-upload', auth.userAuth, utils.uploadImage);

router.post('/tweet/create', Tweet.createTweet);
router.get('/tweet/byOwner/:ownerId', Tweet.getTweetsByOwnerId);
router.get('/tweet/byId/:tweetId', Tweet.getTweetByTweetId);
router.put('/tweet/like', Tweet.likeTweet);
router.put('/tweet/:tweetId/view', Tweet.viewTweet);

router.put('/tweet/bookmark', BookMarkedTweet.bookmarkTweet);

router.post('/tweet/retweet', Tweet.retweet);
//router.post('/tweet/reply', Tweet.reply);
router.get('/tweet/bySubscriber', Tweet.getTweetsBySubscriber);
router.delete('/tweet/:tweetId/delete', Tweet.deleteTweet);

router.get('/tweet/byList/:listId', Tweet.getTweetsByList);
router.get('/tweet/getByHashtag/:hashtag', Tweet.getByHashtag);


module.exports = router;