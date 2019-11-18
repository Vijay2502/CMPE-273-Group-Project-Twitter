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
                username: user.username
            };

            jwt.sign(tokenParams, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRYTIME
            }, (err, token) => {
                return cb(err, token);
            });
        },err => {
            return cb(err);
        });
}


module.exports.getById = function (userId, cb) {
    repository.User.findOne({
        where: {
            id: userId
        }
    }).then(function (user) {

        if (user) {
            return cb(null, {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                email: user.username,
                data: user.data ? user.data : null
            });
        }
        return cb({
            code: 404,
            message: "USER NOT FOUND"
        });

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
                id:user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                email: user.username,
                password:user.password,
                data: user.data ? user.data : null
            });
        }
        return cb({
            code: 404,
            message: "USER NOT FOUND"
        });
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
                return cb(null, {
                    message:"SUCCESS"
                });
            }, function(err){
                return cb(err);
            });
        }
        return cb({
            code: 404,
            message: "USER NOT FOUND"
        });
    }, function(err){
        return cb(err);
    })
}

module.exports.unfollowUser = function(userId, followeeId, cb){
    return repository.User.findOne({
        where:{
            id: userId
        }
    }).then(function(user){
        if(user){
            return user.removeFollowee(followeeId)
            .then(function(data){
                return cb(null, {
                    message:"SUCCESS"
                });
            }, function(err){
                return cb(err);
            });
        }
        return cb({
            code: 404,
            message: "USER NOT FOUND"
        });
    }, function(err){
        return cb(err);
    })
}

module.exports.getFollowers = function (userId, limit, offset, cb) {
    limit = limit ? limit : Number(process.env.DEFAULT_PAGE_LIMIT);
    offset = offset ? offset : 0;
    return repository.User.findOne({
        where: {
            id: userId
        }
    }).then(function (user) {
        if (user) {
            return user.countFollowers().then(count => {
                if (offset >= count) {
                    return cb({
                        code: 204,
                        message: 'NO CONTENT'
                    });
                }
                return user.getFollowers({
                    attributes: ['id', 'firstName', 'lastName', 'username', 'email'],
                    limit,
                    offset,
                    required: false
                }).then(followers => {
                    return cb(null, {
                        id: user.id,
                        count,
                        followers:followers.map(f => ({
                            id:f.id,
                            firstName:f.firstName,
                            lastName:f.lastName,
                            username:f.username,
                            email:f.email,
                            createdAt: f.UserFollowing.createdAt
                        })),
                        nextOffset: (offset + limit) < count ? (offset + limit) : 0
                    });
                }, function (err) {
                    return cb(err);
                });
            }, function (err) {
                return cb(err);
            });
        }
        return cb({
            code: 404,
            message: "USER NOT FOUND"
        });
    }, function (err) {
        return cb(err);
    })
}

module.exports.getFollowees = function (userId, limit, offset, cb) {
    limit = limit ? limit : Number(process.env.DEFAULT_PAGE_LIMIT);
    offset = offset ? offset : 0;
    return repository.User.findOne({
        where: {
            id: userId
        }
    }).then(function (user) {
        if (user) {
            return user.countFollowees().then(count => {
                if (offset >= count) {
                    return cb({
                        code: 204,
                        message: 'NO CONTENT'
                    });
                }
                return user.getFollowees({
                    attributes: ['id', 'firstName', 'lastName', 'username', 'email'],
                    limit,
                    offset,
                    required: false
                }).then(followees => {
                    return cb(null, {
                        id: user.id,
                        count,
                        followees:followees.map(f => ({
                            id:f.id,
                            firstName:f.firstName,
                            lastName:f.lastName,
                            username:f.username,
                            email:f.email,
                            createdAt: f.UserFollowing.createdAt
                        })),
                        nextOffset: (offset + limit) < count ? (offset + limit) : 0
                    });
                }, function (err) {
                    return cb(err);
                });
            }, function (err) {
                return cb(err);
            });
        }
        return cb({
            code: 404,
            message: "USER NOT FOUND"
        });
    }, function (err) {
        return cb(err);
    })
}

module.exports.getListsAsMember = function (userId, limit, offset, cb) {
    limit = limit ? limit : Number(process.env.DEFAULT_PAGE_LIMIT);
    offset = offset ? offset : 0;
    return repository.User.findOne({
        where: {
            id: userId
        }
    }).then(function (user) {
        if (user) {
            return user.countListsAsMember().then(count => {
                if (offset >= count) {
                    return cb({
                        code: 204,
                        message: 'NO CONTENT'
                    });
                }
                return user.getListsAsMember({
                    attributes: ['id', 'firstName', 'lastName', 'username', 'email'],
                    limit,
                    offset,
                    required: false
                }).then(listsAsMember => {
                    return cb(null, {
                        id: user.id,
                        count,
                        listsAsMember:listsAsMember.map(l => ({
                            id:l.id,
                            name:l.name,
                            description:l.description,
                            data:l.data,
                            createdAt: f.UserFollowing.createdAt
                        })),
                        nextOffset: (offset + limit) < count ? (offset + limit) : 0
                    });
                }, function (err) {
                    return cb(err);
                });
            }, function (err) {
                return cb(err);
            });
        }
        return cb({
            code: 404,
            message: "USER NOT FOUND"
        });
    }, function (err) {
        return cb(err);
    })
}

module.exports.getListsAsSubscriber = function (userId, limit, offset, cb) {
    limit = limit ? limit : Number(process.env.DEFAULT_PAGE_LIMIT);
    offset = offset ? offset : 0;
    return repository.User.findOne({
        where: {
            id: userId
        }
    }).then(function (user) {
        if (user) {
            return user.countListsAsSubscriber().then(count => {
                if (offset >= count) {
                    return cb({
                        code: 204,
                        message: 'NO CONTENT'
                    });
                }
                return user.getListsAsSubscriber({
                    attributes: ['id', 'firstName', 'lastName', 'username', 'email'],
                    limit,
                    offset,
                    required: false
                }).then(listsAsSubscriber => {
                    return cb(null, {
                        id: user.id,
                        count,
                        listsAsSubscriber:listsAsSubscriber.map(l => ({
                            id:l.id,
                            name:l.name,
                            description:l.description,
                            data:l.data,
                            createdAt: f.UserFollowing.createdAt
                        })),
                        nextOffset: (offset + limit) < count ? (offset + limit) : 0
                    });
                }, function (err) {
                    return cb(err);
                });
            }, function (err) {
                return cb(err);
            });
        }
        return cb({
            code: 404,
            message: "USER NOT FOUND"
        });
    }, function (err) {
        return cb(err);
    })
}

module.exports.getListsAsOwner = function (userId, limit, offset, cb) {
    limit = limit ? limit : Number(process.env.DEFAULT_PAGE_LIMIT);
    offset = offset ? offset : 0;
    return repository.User.findOne({
        where: {
            id: userId
        }
    }).then(function (user) {
        if (user) {
            return user.countLists().then(count => {
                if (offset >= count) {
                    return cb({
                        code: 204,
                        message: 'NO CONTENT'
                    });
                }
                return user.getLists({
                    attributes: ['id', 'firstName', 'lastName', 'username', 'email'],
                    limit,
                    offset,
                    required: false
                }).then(listsAsOwner => {
                    return cb(null, {
                        id: user.id,
                        count,
                        listsAsOwner:listsAsOwner.map(l => ({
                            id:l.id,
                            name:l.name,
                            description:l.description,
                            data:l.data,
                            createdAt: f.UserFollowing.createdAt
                        })),
                        nextOffset: (offset + limit) < count ? (offset + limit) : 0
                    });
                }, function (err) {
                    return cb(err);
                });
            }, function (err) {
                return cb(err);
            });
        }
        return cb({
            code: 404,
            message: "USER NOT FOUND"
        });
    }, function (err) {
        return cb(err);
    })
}