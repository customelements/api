var boom = require('boom');

function controller(request, reply) {
    return reply(boom.badRequest('Make sure you include repo\'s owner and/or name in the url path, for example: /repos/robdodson or /repos/robdodson/mark-down'));
}

module.exports = controller;