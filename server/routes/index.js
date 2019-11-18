const express = require('express');
const router = express.Router();
const Tweet = require('../routes/tweets');
const BookMarkedTweet = require('../routes/bookmarked-tweets');
const User = require('./users');
var passport = require('passport');
var auth = {
    userAuth: passport.authenticate('jwt', {session: false})
};

router.use(passport.initialize());

//USER APIS
router.post('/user/register', User.register);
router.post('/user/login', User.login);
router.get('/user/get/:id', User.get);
router.put('/user/:id/follow', User.follow);
router.put('/user/:id/unfollow', User.unfollow);
router.get('/user/:id/followers', User.getFollowers);
router.get('/user/:id/followees', User.getFollowees);
router.get('/user/:id/lists/subscriber', User.getListsAsSubscriber);
router.get('/user/:id/lists/memeber', User.getListsAsMember);
router.get('/user/:id/lists/owner', User.getListsAsOwner);


// TWEET APIS
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