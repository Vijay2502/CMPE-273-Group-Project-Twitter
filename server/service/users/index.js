const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const repository = require('../../repository/mysql');

module.exports.create = function(newUser, cb){
    return bcrypt.genSalt(10, (err, salt)=>{
        if(err) return cb(err);

        return bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) return cb(err);

            newUser.password = hash;
            return repository.User.create({
                
                
            }).then(function(user){

                return cb(null,{message:"USER SUCCESSFULLY REGISTERED"});
                
            },function(err){
                return cb(err);
            });

        });
    })
}

module.exports.verifyAndAssignToken =  function(credentials, user, cb){
    bcrypt.compare(
        credentials,
        user.password)
            .then(match => {
                if(!match){
                    return cb({
                        code: 401,
                        message: 'INVALID CREDENTIALS'
                    })
                }
                const tokenParams = {
                    id: user.id,
                    name: user.name,
                    role: user.role
                };

                jwt.sign(tokenParams, process.env.JWT_SECRET,{
                    expiresIn: process.env.JWT_EXPIRYTIME
                },(err, token) => {
                    return cb(err, token);
                });
            })
}
