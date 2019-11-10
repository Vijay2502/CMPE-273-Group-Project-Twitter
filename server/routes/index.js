const express = require('express');
const router = express.Router();
const utils = require('../service/utils');

const User = require('../user');

var passport = require('passport');
var auth = {
    userAuth: passport.authenticate('jwt', {session: false})
};

router.use(passport.initialize());


require('../auth/passport')(passport);

router.post('/img-upload', auth.userAuth, utils.uploadImage);

router.post('/user/register', User.register);

router.post('/user/login', User.login);

router.get('/user/get', auth.userAuth, User.get);


module.exports = router;