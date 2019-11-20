const express = require('express');
const router = express.Router();
const Tweet = require('../routes/tweets');
const BookMarkedTweet = require('../routes/bookmarked-tweets');
const User = require('./users');
const User_producer = require('../kafka-producer').User;
const Tweet_producer = require('../kafka-producer').Tweet;
const List = require('./lists');
var passport = require('passport');
var auth = {
    userAuth: passport.authenticate('jwt', {session: false})
};

router.use(passport.initialize());

//USER APIS
router.post('/user/register', User.register);
router.post('/user/login', User.login);
router.get('/user/:id', User_producer.get);
router.put('/user/:id/follow', User.follow);
router.put('/user/:id/unfollow', User.unfollow);
router.get('/user/:id/followers', User.getFollowers);
router.get('/user/:id/followees', User.getFollowees);
router.get('/user/:id/subscriber/lists', User.getListsAsSubscriber);
router.get('/user/:id/memeber/lists', User.getListsAsMember);
router.get('/user/:id/owner/lists', User.getListsAsOwner);

//LIST APIS
router.post('/list/create', List.create);
router.get('/list/get/:id', List.get);
router.put('/list/:id/subscribe', List.subscribe);
router.put('/list/:id/unsubscribe', List.unsubscribe);
router.get('/list/:id/subscribers', List.getSubscribers);
router.put('/list/:id/add-member', List.addMember);
router.put('/list/:id/remove-member', List.removeMember);
router.get('/list/:id/members', List.getMembers);

// TWEET APIS
router.post('/tweet/create', Tweet.createTweet);
router.get('/tweet/byOwner/:ownerId', Tweet.getTweetsByOwnerId);
router.get('/tweet/byId/:tweetId', Tweet_producer.getTweetByTweetId);
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