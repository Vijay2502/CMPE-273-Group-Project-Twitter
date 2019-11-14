const express = require('express');
const router = express.Router();
const Tweet = require('../routes/tweets');
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

// router.post('/user/login', User.login);

// router.get('/user/get', auth.userAuth, User.get);
module.exports = router;