var elasticsearch = require('elasticsearch');
var validate = require('validate-obj');
var env = require('../config/env');

var client = new elasticsearch.Client({
    host: env.ES_URL
});

module.exports = function(req, res) {

	console.log( req.body );

	// var data = req.body;

	// for (var i = data.length - 1; i >= 0; i--) {

	// 	exports.validate( data[i] );

	// 	if ( exports.validate( data[i] ).type === 'error' ) {
	// 		res.send(exports.validate( data[i] ));
	// 		return;
	// 	}
	// 	else {
	// 		exports.insert(data[i])
	// 			.then(function(result) {
	// 		          res.send(result);
	// 		      })
	// 		      .catch(function(error) {
	// 		          res.send(error);
	// 		      });
	// 	}
	// };
};

exports.insert = function( obj ) {
	return new Promise(function(resolve, reject) {
		client.create({
	          index: 'customelements',
	          type: 'repo',
	          id: obj.id,
	          body: obj
	      }).then(function (body) {
	          var obj = {};

	          if (body.created) {
	              obj.type = 'success';
	              obj.result = obj.id + 'successfully inserted';
	          }
	          resolve(obj)

	      }, function (error) {
	          var obj = {};
	          obj.type = 'error';
	          obj.message = error.message;

	          reject(obj)
	      });
    });
}

exports.validate = function( obj ) {
	var validateObj = {
		"id": [validate.required, validate.isNumber('id: long')],
		"name": [validate.required, validate.isString('name: string')],
		"owner": [validate.required, validate.isString('owner: string')],
		"url": [validate.required, validate.isString('url: string')],
		"owner_url": [validate.required, validate.isUrl('owner_url: url')],
		"description": [validate.required, validate.isString('description: string')],
		"forks": [validate.required, validate.isNumber('forks: long')],
		"stars": [validate.required, validate.isNumber('stars: long')],
		"created": [validate.required, validate.isString('date ex, 2014-04-16T00:48:46Z: string')]
	}

	var errs = validate.hasErrors(obj, validateObj);

	if ( errs != null ) {
		return { 'type': 'error', 'item': parseInt(obj.id, 10), 'message': errs };
	}

	return { 'type': 'success' };
}
