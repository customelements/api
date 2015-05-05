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
        q: request.query.q,
        page: request.query.page,
        perPage: request.query.perPage
    };

    var schema = {
        q: joi.string().label('search query').required(),
        page: joi.number().min(1).default(1),
        perPage: joi.number().min(1).max(50).default(50)
    };

    joi.validate(params, schema, function(err, result) {
      if (err) {
        reject(boom.badRequest(err));
      }

      resolve(result);
    });
  });
};

controller.find = function(params) {
  return new Promise(function(resolve, reject) {
    var options = {
      index: 'customelements',
      type: 'repo',
      sort: 'github.stargazers_count:desc',
      size: params.perPage,
      from: (params.page - 1) * params.perPage,
      q: params.q
    };

    es.search(options).then(function(body) {
      var results = [];

      for(var i = 0; i < body.hits.hits.length; i++) {
        results.push(body.hits.hits[i]._source);
      }

      resolve({
        'total': body.hits.total,
        'page': parseInt(params.page, 10),
        'pages': Math.ceil(body.hits.total / params.perPage),
        'results': results
      });
    }, function (error) {
      reject(boom.create(error.status, error.message));
    });

  });
};

module.exports = controller;
