var _ = require('lodash');
var boom = require('boom');
var es = require('../configs/es');
var fetch = require('../utils/fetch');

function controller(request, reply) {
    fetch('http://fetch.customelements.io/repos')
        .then(function(repos) {
            request.log(['#fetch'], 'Done with promise');
            return controller.syncAll(repos, request);
        })
        .then(function() {
            request.log(['#syncAll'], 'Done with promise');
            return reply().code(200);
        })
        .catch(reply);
}

controller.syncAll = function(repos, request) {
    var promises = [];

    _.forIn(repos, function(value, key) {
        promises.push(
            controller.exists(repos[key], request)
        );
    });

    return Promise.all(promises);
};

controller.exists = function(repo, request) {
    return new Promise(function(resolve, reject) {
        es.exists({
            index: 'customelements',
            type: 'repo',
            id: repo.github.id
        }).then(function(exists) {
            if (!exists) {
                resolve(controller.create(repo, request));
            } else {
                resolve(controller.update(repo, request));
            }
        }, function (error) {
            reject(boom.wrap(error));
        });
    });
};

controller.create = function(repo, request) {
    return new Promise(function(resolve, reject) {
        es.create({
            index: 'customelements',
            type: 'repo',
            id: repo.github.id,
            body: repo
        }).then(function(body) {
            request.log(['#create'], 'Creation succeed: ' + repo.github.full_name);
            resolve(repo);
        }, function (error) {
            request.log(['#create'], 'Creation failed: ' + repo.github.full_name);
            reject(boom.wrap(error));
        });
    });
};

controller.update = function(repo, request) {
    return new Promise(function(resolve, reject) {
        es.update({
            index: 'customelements',
            type: 'repo',
            id: repo.github.id,
            body: {
                doc: repo
            }
        }).then(function(body) {
            request.log(['#update'], 'Update succeed: ' + repo.github.full_name);
            resolve(repo);
        }, function (error) {
            request.log(['#update'], 'Update failed: ' + repo.github.full_name);
            reject(boom.wrap(error));
        });
    });
};

module.exports = controller;