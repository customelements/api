var boom = require('boom');
var joi = require('joi');
var es = require('../../configs/es');

function controller(request, reply) {
    controller.validate(request)
        .then(function(result) {
            console.log('[#validate] Done with promise');
            return controller.deleteByID(result);
        })
        .then(function(result) {
            console.log('[#deleteByID] Done with promise');
            return reply(result);
        })
        .catch(reply);
}

controller.validate = function(request) {
    return new Promise(function(resolve, reject) {
        var params = {
            id: request.params.id
        };

        var schema = {
            id: joi.number()
        };

        joi.validate(params, schema, function (err, result) {
            if (err) {
                reject(boom.badRequest(err));
            }

            resolve(result);
        });
    });
};

controller.deleteByID = function(params) {
    return new Promise(function(resolve, reject) {
        var options = {
            index: 'customelements',
            type: 'repo',
            id: params.id
        };

        es.delete(options).then(function(body) {
            resolve({ found: body.found });
        }, function (error) {
            reject(boom.create(error.status, error.message));
        });
    });
};

module.exports = controller;