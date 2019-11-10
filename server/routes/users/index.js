const userService = require('../../service/users');

module.exports.register = function(request, response){
    if(!(request.body.name && request.body.email && request.body.role && request.body.password)){
        return response.status(400).send("INVALID REQUEST");
    }


}

module.exports.login = function(request, response){

    if(!(request.body.email && request.body.password)){
        return response.status(400).send("MISSING FIELDS");
    }

 

}

module.exports.update = function(request, response){

    if(!(request.body.email && request.body.name && request.body.id)){
        return response.status(400).send("MISSING FIELDS");
    }

}

module.exports.get = function(req, response){

}