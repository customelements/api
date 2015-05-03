var es = require('../configs/es');
var joi = require('joi');

function controller(request, reply) {
    var id = request.params.id,
        result = {};

    joi.validate(
        { id: id },
        { id: joi.number() },
    function (err, value) {
        if (err) {
            reply(err);
            return;
        }

        var esObject = {
            index: 'customelements',
            type: 'repo',
            id: id
        };

        es.get(esObject).then(function (body) {
            result.type = 'success';
            result.result = body._source;
            reply( result );
        }, function (error) {
            result.type = 'error';
            result.message = error.message;
            reply(result);
        });
    });
}

module.exports = controller;