var es = require('../configs/es');
var http = require('request');

function controller(request, reply) {

	http('http://fetch.customelements.io/repos', function (error, response, body) {

		if (!error && response.statusCode == 200) {
	    body = JSON.parse(body);

			for(var index in body) {
				controller.exists(body[index].github.id)
					.then(function(resolve){
						console.log( resolve );
					})
					.catch(function(err){
						console.log( err );
					});
			}

	  }

	});
};

controller.exists = function( itemId ) {
	return new Promise(function( resolve, reject ){
		es.exists({
			index: 'customelements',
			type: 'repo',
			id: itemId
		}).then(function(response){
			resolve(response);
		}, function( error ){
			reject(error);
		});
	});
};

module.exports = controller;
