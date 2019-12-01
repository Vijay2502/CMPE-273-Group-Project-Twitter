const express = require('express');
const router = express.Router();
const Tweet = require('../routes/tweets');
const BookMarkedTweet = require('../routes/bookmarked-tweets');
const User = require('./users');
const Analytics = require('./analytics');
const Search = require('./search');
//const User_producer = require('../kafka-producer').User;
//const Tweet_producer = require('../kafka-producer').Tweet;
const List = require('./lists');
var passport = require('passport');
var auth = {
    userAuth: passport.authenticate('jwt', { session: false })
};

router.use(passport.initialize());

//USER APIS
router.post('/user/register', User.register);          ///tested
router.post('/user/login', User.login);                ///tested
router.get('/user/:id', User.get);                     ///tested
router.put('/user/update', User.update);
router.put('/user/:id/follow', User.follow);           ///tested
router.put('/user/:id/unfollow', User.unfollow);       ///tested
router.get('/user/:id/followers', User.getFollowers);  ///tested
router.get('/user/:id/followees', User.getFollowees);  ///tested
router.get('/user/:id/subscriber/lists', User.getListsAsSubscriber);
router.get('/user/:id/memeber/lists', User.getListsAsMember);
router.get('/user/:id/owner/lists', User.getListsAsOwner);

//LIST APIS
router.post('/list/create', List.create); /// bug
router.get('/list/get/:id', List.get);
router.put('/list/:id/subscribe', List.subscribe);
router.put('/list/:id/unsubscribe', List.unsubscribe);
router.get('/list/:id/subscribers', List.getSubscribers);
router.put('/list/:id/add-member', List.addMember);
router.put('/list/:id/remove-member', List.removeMember);
router.get('/list/:id/members', List.getMembers);

// TWEET APIS
router.post('/tweet/create', Tweet.createTweet);                 ///tested
router.get('/tweet/byOwner/:ownerId', Tweet.getTweetsByOwnerId); ///tested
router.get('/tweet/byId/:tweetId', Tweet.getTweetByTweetId);      ///tested
router.put('/tweet/:userId/like', Tweet.likeTweet);               ///tested
router.put('/tweet/:userId/view', Tweet.viewTweet);                ///tested
router.put('/tweet/:userId/bookmark', BookMarkedTweet.bookmarkTweet);   ///doubt
router.post('/tweet/:tweetId/retweet', Tweet.retweet);             ///tested
//router.post('/tweet/reply', Tweet.reply);
router.get('/tweet/:userId/bySubscriber', Tweet.getTweetsBySubscriber);
router.delete('/tweet/:tweetId/delete', Tweet.deleteTweet);          ///tested
router.get('/tweet/byList/:listId', Tweet.getTweetsByList);         ///
router.get('/tweet/getByHashtag/:hashtag', Tweet.getByHashtag);     ///

// SEARCH APIS
router.get('/search/users', Search.userSearch);
router.get('/search/lists', Search.listSearch);
router.get('/search/topics', Search.topicSearch);



// ANALYTICS APIS
router.get('/analytics/user/:id/tweets/by-views', Analytics.topTweetsByViews);
router.get('/analytics/user/:id/tweets/by-likes', Analytics.topTweetsByLikes);
router.get('/analytics/user/:id/tweets/by-retweets', Analytics.topTweetsByRetweets);
router.get('/analytics/user/:id/tweets/count/hourly', Analytics.hourlyTweetCountPerDay);
router.get('/analytics/user/:id/tweets/count/daily', Analytics.dailyTweetCountPerWeek);
router.get('/analytics/user/:id/tweets/count/monthy', Analytics.monthlyTweetCountPerYear);


module.exports = router;