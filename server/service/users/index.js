const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const repository = require('../../repository/mysql');

module.exports.create = function (newUser, cb) {
    return bcrypt.genSalt(10, (err, salt) => {
        if (err) return cb(err);

        return bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) return cb(err);

            newUser.password = hash;
            return repository.User.create({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                username: newUser.username,
                email: newUser.email,
                password: newUser.password,
                data: newUser.data ? newUser.data : null
            }).then(function (user) {

                return cb(null, { message: "USER SUCCESSFULLY REGISTERED" });

            }, function (err) {
                return cb(err);
            });

        });
    })
}

module.exports.verifyAndAssignToken = function (credentials, user, cb) {
    bcrypt.compare(
        credentials,
        user.password)
        .then(match => {
            if (!match) {
                return cb({
                    code: 401,
                    message: 'INVALID CREDENTIALS'
                })
            }
            const tokenParams = {
                id: user.id,
                name: user.username
            };

            jwt.sign(tokenParams, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRYTIME
            }, (err, token) => {
                return cb(err, token);
            });
        })
}


module.exports.getById = function (userId, cb) {
    repository.User.findOne({
        where: {
            id: userId
        },
        include: [
            {
                model: repository.User,
                as: 'followers',
                attributes:['firstName','lastName','username','email'],
                through: {
                    attributes: []
                },
                required: false
            },
            {
                model: repository.User,
                as: 'followees',
                attributes:['firstName','lastName','username','email'],
                through: {
                    attributes: []
                },
                required: false
            },
            {
                model: repository.List,
                as: 'listsAsMember',
                required: false
            },
            {
                model: repository.List,
                as: 'listsAsSubscriber',
                required: false
            }
        ]
    }).then(function (user) {

        if (user) {
            return cb(null, {
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                email: user.username,
                followers: user.followers,
                followees: user.followees,
                listsAsMember: user.listsAsMember,
                listsAsSubscriber: user.listsAsSubscriber,
                data: user.data ? user.data : null
            })
        }
        return cb();

    }, function (err) {
        return cb(err);
    });
}

module.exports.getByEmailOrUsername = function (email, username, cb) {
    repository.User.findOne({
        where: {
            $or: [
                {
                    email
                },
                {
                    username
                }
            ]
        }
    }).then(function (user) {
        if (user) {
            return cb(null, {
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                email: user.username,
                password:user.password,
                data: user.data ? user.data : null
            });
        }
        return cb();
    }, function (err) {
        return cb(err);
    });
}

module.exports.followUser = function(userId, followeeId, cb){
    return repository.User.findOne({
        where:{
            id: userId
        }
    }).then(function(user){
        if(user){
            return user.addFollowee(followeeId)
            .then(function(data){
                return cb(null, data);
            }, function(err){
                return cb(err);
            });
        }
        return cb(null, "NO USER");
    }, function(err){
        return cb(err);
    })
}