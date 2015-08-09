var boom = require('boom');
var es = require('../../../configs/es');
var joi = require('joi');

function controller(request, reply) {
    controller.validate(request)
        .then(function(result) {
            request.log(['#validate'], 'Done with promise');
            return controller.count(result);
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
            type: request.params.type
        };

        var schema = {
            type: joi.string()
        };

        joi.validate(params, schema, function(err, result) {
            if (err) {
                reject(boom.badRequest(err));
            }

            resolve(result);
        });
    });
};

controller.count = function(params) {
    return new Promise(function(resolve, reject) {
        var options = {
            index: 'customelements',
            type: params.type.substr(0, params.type.length - 1),
        };

        es.count(options).then(function(body) {
            resolve({
                count: body.count
            });
        }, function (error) {
            reject(boom.wrap(error));
        });
    });
};

module.exports = controller;