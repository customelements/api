var es = require('../configs/es');
var http = require('request');

function controller(request, reply) {

	http('http://fetch.customelements.io/repos', function (error, response, body) {

		if (!error && response.statusCode == 200) {
	    body = JSON.parse(body);

			return controller.insert(body);
	  }

	});
};

controller.insert = function( obj ) {
	for(var index in obj) {
	  var attr = obj[index];

			es.create({
        index: 'customelements',
        type: 'repo',
        id: attr.github.id,
        body: attr
      }).then(function (body) {

        if (body.created) {
          console.log( attr.github.id + ' Inserted' );
        }

      }, function (error) {
				console.log( error );
      });
	}

	console.log( 'Insert Done' );

	return 'Insert Done';
}

module.exports = controller;
