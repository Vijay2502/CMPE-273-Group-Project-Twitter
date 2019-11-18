var rpc = new (require('./kafkarpc'))();

//make request to kafka
function make_request(queue_name, msg_payload, callback){
    console.log('in make request');
    console.log(msg_payload);
	rpc.makeRequest(queue_name, msg_payload, function(err, response){

		if(err)
			console.error(err);
		else{
			console.log("response", response);
			callback(null, response);
		}
	});
}

function request_delegator(topic, task){
    return (function(request, response){
        return make_request(topic,{
            task,
            payload:{
                params:request.params,
                body:request.body,
                query:request.query
            }
        }, function(err, data){
            if(err) return response.status(err.code ? err.code : 500).send(err);

            return response.send({
                status: "ok",
                data: data
            });
        });
    })
}

exports = {
	make_request,
	request_delegator
}
