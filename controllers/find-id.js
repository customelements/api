var elasticsearch = require('elasticsearch');
var Joi = require('joi');

var client = new elasticsearch.Client({
    host: process.env.ES_URL
});

// Busca item pelo ID
module.exports = function(request, reply) {

    var id = request.params.id,
        result = {};

    Joi.validate(
        { id: id },
        { id: Joi.number() },
    function (err, value) {

            if ( err ) {
                reply(err);
                return;
            };

            var esObject = {
                index: 'customelements',
                type: 'repo',
                id: id
            };

            client.get(
                esObject
            ).then(function (body) {

                    result.type = 'success';
                    result.result = body._source;
                    reply( result );

            }, function (error) {

                    result.type = 'error';
                    result.message = error.message;
                    reply(result);

            });

        });
};
