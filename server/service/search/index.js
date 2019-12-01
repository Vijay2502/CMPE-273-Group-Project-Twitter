const async = require('async');
const _ = require('lodash');
const { User, List, sequelize } = require('../../repository/mysql');
const { Tweet } = require('../../repository/mongo');

module.exports.listSearch = function( text, limit, offset, cb ){
    var terms = Array.from(new Set([text].concat( text.trim().replace(/(\s)+/).split(' '))));
    if(!terms)
        return cb(null, []);
    
    if(!_.isArray(terms))
        terms = [terms];
    limit = limit ? Number(limit) : Number(process.env.DEFAULT_PAGE_LIMIT);
    offset = offset ? Number(offset) : 0;
    terms = terms.map(item => ({ $like: `%${item.toLowerCase()}%`}));
    List.findAll({
        where: {
            $and:[
                {
                    $or:[
                        sequelize.where(
                            sequelize.fn('lower', sequelize.col('name')),
                            {
                                $or:terms
                            }
                        ),
                        sequelize.where(
                            sequelize.fn('lower', sequelize.col('description')),
                            {
                                $or:terms
                            }
                        )                 
                    ]
                }
            ]
        },
        order: [['createdAt', 'DESC']],
        offset,
        limit
    }).then(function(lists){
        if(lists && _.isArray(lists)){
            return cb(null, {
                lists: lists.map(f => ({
                    id: f.id,
                    name: f.name,
                    description: f.description,
                    data: f.data
                })),
                nextOffset: (lists.length <= limit)? 0 : (limit) + (offset)
            });
        }
        return cb(null, null);
    }, function(err){
        return cb(err);
    });
}

module.exports.userSearch = function( text , limit, offset, cb ){
    var terms = Array.from(new Set([text].concat( text.trim().replace(/(\s)+/).split(' '))));
    if(!terms)
        return cb(null, []);
    
    if(!_.isArray(terms))
        terms = [terms];
    limit = limit ? Number(limit) : Number(process.env.DEFAULT_PAGE_LIMIT);
    offset = offset ? Number(offset) : 0;
    terms = terms.map(item => ({ $like: `%${item.toLowerCase()}%`}));
    User.findAll({
        where: {
            $and:[
                {
                    active: true
                },
                {
                    $or:[
                        sequelize.where(
                            sequelize.fn('lower', sequelize.col('firstName')),
                            {
                                $or:terms
                            }
                        ),
                        sequelize.where(
                            sequelize.fn('lower', sequelize.col('lastName')),
                            {
                                $or:terms
                            }
                        ),
                        sequelize.where(
                            sequelize.fn('lower', sequelize.col('username')),
                            {
                                $or:terms
                            }
                        ),
                        sequelize.where(
                            sequelize.fn('lower', sequelize.col('email')),
                            {
                                $or:terms
                            }
                        )                       
                    ]
                }
            ]
        },
        order: [['createdAt', 'DESC']],
        offset,
        limit
    }).then(function(users){
        if(users && _.isArray(users)){
            return cb(null, {
                users: users.map(f => ({
                    id: f.id,
                    firstName: f.firstName,
                    lastName: f.lastName,
                    username: f.username,
                    data: f.data
                })),
                nextOffset: (users.length <= limit)? 0 : (limit) + (offset)
            });
        }
        return cb(null, null);
    }, function(err){
        return cb(err);
    });
}

module.exports.topicSearch = function( text , limit, offset, cb ){
    var terms = Array.from(new Set([text].concat( text.trim().replace(/(\s)+/).split(' '))));
    if(!terms)
        return cb(null, []);
    
    if(!_.isArray(terms))
        terms = [terms];
    limit = limit ? Number(limit) : Number(process.env.DEFAULT_PAGE_LIMIT);
    offset = offset ? Number(offset) : 0;
    
    terms = terms.map(item => (`((.*)${item.replace("#","")}(.*))`));
    var searchterm = terms.join('|');

    Tweet.find({
        hashTags: {
            $elemMatch:{
                $regex: searchterm
            }
        },
        'tweets.active':true
    },
    null,
    {
        skip: offset,
        limit: limit
    }).then(function(tweets){
        if(tweets && _.isArray(tweets)){
            return cb(null, {
                tweets:tweets.map(tweet => ({
                    id: tweet.tweetId,
                    likes: tweet.likes.count,
                    views: tweet.views.count,
                    retweetCount: tweet.retweetCount,
                    data: tweet.data ? tweet.data : null,
                    retweet: tweet.retweet,
                    hashTags: tweet.hashTags
                })),
                nextOffset: (tweets.length <= limit)? 0 : (limit) + (offset)
            });
        }
        return cb(null, null);
    }, function(err){
        return cb(err);
    });
}


module.exports.search = function(text, cb){

    var terms = text;

    var asyncTasks = {
        users: function(icb){
            return module.exports.userSearch(terms, icb);
        },
        lists: function(icb){
            return module.exports.listSearch(terms, icb);
        },
        topics: function(icb){
            return module.exports.topicSearch(terms, icb);
        }
    }

    return async.parallel(asyncTasks, function(err, results){
        if(err){
            return cb(err);
        }

        return cb(null, {
            users: results.users? results.users: [],
            lists: results.lists? results.lists: [],
            topics: results.topics? results.topics: []
        });

    });
}