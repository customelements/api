var boom = require('boom');

function controller(request, reply) {
    return reply(boom.badRequest('Make sure you include the type of search in the url path, for example: /search/owners or /search/repos'));
}

module.exports = controller;