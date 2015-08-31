var boom = require('boom');
var es = require('../../configs/es');
var joi = require('joi');

function controller(request, reply) {
    controller.validate(request)
        .then(function(result) {
            request.log(['#validate'], 'Done with promise');
            return controller.find(result);
        })
        .then(function(result) {
            request.log(['#find'], 'Done with promise');
            return reply(result);
        })
        .catch(reply);
}

controller.validate = function(request) {
    return new Promise(function(resolve, reject) {
        var params = {
            q: request.query.q
        };

        var schema = {
            q: joi.string()
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
            body: {
            repoSuggest: {
              text: params.q,
              completion: {
                field: 'suggest'
              }
            }
          }
        };

        es.suggest(options).then(function(body) {
            resolve({
                total: parseInt(body.repoSuggest[0].options.length, 10),
                // page: params.page,
                // pages: Math.ceil(body.hits.total / params.perPage),
                results: body.repoSuggest[0].options
            });
        }, function (error) {
            reject(boom.wrap(error));
        });
    });
};

module.exports = controller;
