var token = require('../utils/token').token;
var elasticsearch = require('elasticsearch');
var Joi = require('joi');

var client = new elasticsearch.Client({
    host: process.env.ES_URL
});

// Add item ES
module.exports = function(request, reply) {

    var element = JSON.parse(request.payload),
        elementId = request.params.id,
        ValidToken = token(request.headers),
        result = {};

    if ( !ValidToken.type ) {
        reply( ValidToken );
        return;
    }

    Joi.validate(
        { id: elementId },
        { id: Joi.number() },
    function (err, value) {

            if ( err ) {
                reply(err);
                return;
            };

            var esObject = {
                index: 'customelements',
                type: 'repo',
                id: element.id,
                body: element
            };

            client.create(
                esObject
            ).then(function (body) {

                    result.type = 'success';
                    result.result = body;
                    reply( result );

            }, function (error) {

                    result.type = 'error';
                    result.message = error.message;
                    reply(result);

            });

        });
};
