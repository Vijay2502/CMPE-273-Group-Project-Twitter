const async = require('async');
const _ = require('lodash');
const { User, List } = require('../../repository/mysql');
const { TweetsByHashtag } = require('../../repository/mongo');

module.exports.listSearch = function( text, limit, offset, cb ){
    var terms = [text].concat( text.trim().replace(/(\s)+/).split(' '));
    if(!terms)
        return cb(null, []);
    
    if(!_.isArray(terms))
        terms = [terms];
    
    terms = terms.map(item => ({ $iLike: `%${item}%`}));
    List.findAll({
        where: {
            active: true,
            $or:[
                { name:{ $or: terms } },
                { description:{ $or: terms } }
            ]
        },
        order: [['createdAt', 'DESC']],
        offset: offset ? Number(offset) : 0,
        limit: limit ? Number(limit) : Number(process.env.DEFAULT_PAGE_LIMIT)
    }).then(function(lists){
        if(lists && _.isArray(lists) && lists.length > 0){
            return cb(null, {
                lists: lists.map(f => ({
                    id: f.id,
                    name: f.name,
                    description: f.description,
                    data: f.data
                })),
                nextOffset: (limit ? Number(limit) : Number(process.env.DEFAULT_PAGE_LIMIT)) 
                + (offset ? Number(offset) : 0)
            });
        }
        return cb(null, []);
    }, function(err){
        return cb(err);
    });
}

module.exports.userSearch = function( text , limit, offset, cb ){
    var terms = [text].concat( text.trim().replace(/(\s)+/).split(' '));
    if(!terms)
        return cb(null, []);
    
    if(!_.isArray(terms))
        terms = [terms];
    
    terms = terms.map(item => ({ $iLike: `%${item}%`}));
    User.findAll({
        where: {
            active: true,
            $or:[
                { username:{ $or: terms } },
                { firstName:{ $or: terms } },
                { lastName:{ $or: terms } },
                { email:{ $or: terms } }
            ]
        },
        order: [['createdAt', 'DESC']],
        offset: offset ? Number(offset) : 0,
        limit: limit ? Number(limit) : Number(process.env.DEFAULT_PAGE_LIMIT)
    }).then(function(users){
        if(users && _.isArray(users) && users.length > 0){
            return cb(null, {
                users: users.map(f => ({
                    id: f.id,
                    firstName: f.firstName,
                    lastName: f.lastName,
                    username: f.username,
                    data: f.data
                })),
                nextOffset: (limit ? Number(limit) : Number(process.env.DEFAULT_PAGE_LIMIT)) 
                + (offset ? Number(offset) : 0)
            });
        }
        return cb(null, []);
    }, function(err){
        return cb(err);
    });
}

module.exports.topicSearch = function( text , limit, offset, cb ){
    var terms = [text].concat( text.trim().replace(/(\s)+/).split(' '));
    if(!terms)
        return cb(null, []);
    
    if(!_.isArray(terms))
        terms = [terms];
    
    terms = terms.map(item => ({ $regex: `(.*)${item.replace("#","")}%(.*)`, $options: "si"}));
    TweetsByHashtag.find({
        hashTags: {
            $elemMatch:{
                $or: terms
            }
        },
        'tweets.active':true
    },
    null,
    {
        skip: offset ? Number(offset) : 0,
        limit: limit ? Number(limit) : Number(process.env.DEFAULT_PAGE_LIMIT)
    }).then(function(tweets){
        if(tweets && _.isArray(tweets) && tweets.length > 0){
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
                nextOffset: (limit ? Number(limit) : Number(process.env.DEFAULT_PAGE_LIMIT)) 
                + (offset ? Number(offset) : 0)
            });
        }
        return cb(null, []);
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