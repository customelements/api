var boom = require('boom');

function controller(request, reply) {
    return reply(boom.badRequest('Make sure you include owner\'s name in the url path, for example: /owners/robdodson'));
}

module.exports = controller;