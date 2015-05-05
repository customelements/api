var boom = require('boom');
var es = require('../configs/es');
var joi = require('joi');

function controller(request, reply) {
  controller.validate(request)
    .then(function(result) {
        return controller.find(result);
    })
    .then(function(result) {
        return reply(result);
    })
    .catch(reply);
}

controller.validate = function(request) {
  return new Promise(function(resolve, reject) {
    var params = {
        term: request.query.q,
        page: request.query.page,
        perPage: request.query.perPage
    };

    var schema = {
        term: joi.string(),
        page: joi.number(),
        perPage: joi.number()
    };

    joi.validate(params, schema, function (err, result) {
      if (err) {
        reject(boom.badRequest(err));
      }

      resolve(result);
    });
  });
};

controller.find = function(params) {
  return new Promise(function(resolve, reject){
    var page = params.page || 1,
        perPage = params.perPage || 50,
        term = params.term || null;

    var options = {
      index: 'customelements',
      type: 'repo',
      sort: 'github.stargazers_count:desc',
      size: perPage,
      from: (page - 1) * perPage,
    };

    if ( term ) {
      options.q = term;
    }

    es.search(options).then(function(body) {
      var source = [];

      for( var i = 0; i < body.hits.hits.length; i++) {
        source.push( body.hits.hits[i]._source );
      }

      resolve({
        'total': body.hits.total,
        'page': parseInt(page, 10),
        'pages': Math.ceil(body.hits.total / perPage),
        'surce': source
      });

    }, function (error) {
      reject(boom.create(error.status, error.message));
    });

  });
}

module.exports = controller;
