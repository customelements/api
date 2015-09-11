var boom = require('boom');
var es = require('../../../configs/es');
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
            type: request.params.type,
            q: request.query.q,
            page: request.query.page,
            perPage: request.query.perPage,
            sort: request.query.sort,
            order: request.query.order,
            keywords: request.query.keywords
        };

        var schema = {
            type: joi.string(),
            q: joi.string(),
            page: joi.number().min(1).default(1),
            perPage: joi.number().min(1).max(1500).default(30),
            sort: joi.string().default('id'),
            order: joi.string().default('asc'),
            keywords: joi.string()
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
            type: params.type.substr(0, params.type.length - 1),
            size: params.perPage,
            from: (params.page - 1) * params.perPage,
            sort: params.sort + ':' + params.order
        };

        if (options.type === 'repo') {
            options._sourceInclude = [
                'id', 'name', 'description', 'owner', 'forks_count', 'stargazers_count'
            ];
        }

        if (params.q) {
            options.q = params.q.replace(/-/g, ' ') + '*';
        }

        if (params.keywords) {
            options.body = controller.keywordsQuery(params.keywords);
        }

        es.search(options).then(function(body) {
            var results = [];

            for (var i = 0; i < body.hits.hits.length; i++) {
                results.push(body.hits.hits[i]._source);
            }

            resolve({
                total: body.hits.total,
                page: params.page,
                pages: Math.ceil(body.hits.total / params.perPage),
                results: results
            });
        }, function (error) {
            reject(boom.wrap(error));
        });
    });
};

controller.keywordsQuery = function(keywords) {
    var queryTerms = [];

    keywords = keywords.split(',');

    for (var i = 0; i < keywords.length; i++) {
        queryTerms.push(
            {
                term: {
                    'bower.keywords.raw': keywords[i]
                }
            },
            {
                term: {
                    'npm.keywords.raw': keywords[i]
                }
            }
        );
    }

    return {
        query: {
            filtered: {
                filter: {
                    bool: {
                        should: queryTerms
                    }
                }
            }
        }
    };
};

module.exports = controller;
