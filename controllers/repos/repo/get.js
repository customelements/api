var boom = require('boom');
var joi = require('joi');
var es = require('../../../configs/es');

function controller(request, reply) {
    controller.validate(request)
        .then(function(result) {
            request.log('[#validate] Done with promise');
            return controller.find(result);
        })
        .then(function(result) {
            request.log('[#find] Done with promise');
            return reply(result);
        })
        .catch(reply);
}

controller.validate = function(request) {
    return new Promise(function(resolve, reject) {
        var params = {
            owner: request.params.owner,
            repo: request.params.repo
        };

        var schema = {
            owner: joi.string(),
            repo: joi.string()
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
    return new Promise(function(resolve, reject) {
        var options = {
            index: 'customelements',
            type: 'repo',
            body: {
                query: {
                    filtered: {
                        filter: {
                            bool: {
                                must: [
                                    { term: { 'owner.login.raw': params.owner }},
                                    { term: { 'name.raw': params.repo }}
                                ]
                            }
                        }
                    }
                }
            }
        };

        es.search(options).then(function(body) {
            if (body.hits.total > 0) {
                resolve(body.hits.hits[0]._source);
            }
            else {
                reject(boom.notFound('No results found for: ' + params.owner));
            }
        }, function (error) {
            reject(boom.wrap(error));
        });
    });
};

module.exports = controller;
