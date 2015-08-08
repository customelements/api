var boom = require('boom');

function controller(request, reply) {
    return reply(boom.badRequest('Make sure you include the type of count in the url path, for example: /count/owners or /count/repos'));
}

module.exports = controller;