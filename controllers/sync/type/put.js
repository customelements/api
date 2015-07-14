var _ = require('lodash');
var boom = require('boom');
var es = require('../../../configs/es');
var fetch = require('../../../utils/fetch');

function controller(request, reply) {
    fetch('http://fetch.customelements.io/' + request.params.type)
        .then(function(results) {
            request.log(['#fetch'], 'Done with promise');
            return controller.syncAll(results, request);
        })
        .then(function() {
            request.log(['#syncAll'], 'Done with promise');
            return reply().code(200);
        })
        .catch(reply);
}

controller.syncAll = function(results, request) {
    var promises = [];

    _.forIn(results, function(value, key) {
        promises.push(
            controller.exists(results[key], request)
        );
    });

    return Promise.all(promises);
};

controller.exists = function(result, request) {
    return new Promise(function(resolve, reject) {
        es.exists({
            index: 'customelements',
            type: request.params.type.substr(0, request.params.type.length - 1),
            id: result.id
        }).then(function(exists) {
            if (!exists) {
                resolve(controller.create(result, request));
            } else {
                resolve(controller.update(result, request));
            }
        }, function (error) {
            reject(boom.wrap(error));
        });
    });
};

controller.create = function(result, request) {
    return new Promise(function(resolve, reject) {
        es.create({
            index: 'customelements',
            type: request.params.type.substr(0, request.params.type.length - 1),
            id: result.id,
            body: result
        }).then(function(body) {
            request.log(['#create'], 'Creation succeed: ' + result.id);
            resolve(result);
        }, function (error) {
            request.log(['#create'], 'Creation failed: ' + result.id);
            reject(boom.wrap(error));
        });
    });
};

controller.update = function(result, request) {
    return new Promise(function(resolve, reject) {
        es.update({
            index: 'customelements',
            type: request.params.type.substr(0, request.params.type.length - 1),
            id: result.id,
            body: {
                doc: result
            }
        }).then(function(body) {
            request.log(['#update'], 'Update succeed: ' + result.id);
            resolve(result);
        }, function (error) {
            request.log(['#update'], 'Update failed: ' + result.id);
            reject(boom.wrap(error));
        });
    });
};

module.exports = controller;