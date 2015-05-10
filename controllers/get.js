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
        q: joi.string(),
        page: joi.number().min(1).default(1),
        perPage: joi.number().min(1).max(50).default(25)
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
    var showPages = true;

    var options = {
      index: 'customelements',
      type: 'repo',
      sort: 'stargazers_count:desc',
      size: params.perPage,
    };

    if ( params.q ) {
      options.q = params.q
      options.from = (params.page - 1) * params.perPage
    }
    else {
      showPages = false;
    }

    es.search(options).then(function(body) {
      var results = [],
          repos = {}

      for(var i = 0; i < body.hits.hits.length; i++) {
        results.push(body.hits.hits[i]._source);
      }

      // Defaults values
      repos.total = body.hits.total;
      repos.results = results;

      // is not /
      if (  showPages ) {
        repos.page = parseInt(params.page, 10);
        repos.pages = Math.ceil(body.hits.total / params.perPage);
      }

      resolve(repos);

    }, function (error) {
      reject(boom.create(error.status, error.message));
    });

  });
};

module.exports = controller;
