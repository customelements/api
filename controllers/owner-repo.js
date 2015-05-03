var elasticsearch = require('elasticsearch');
var Joi = require('joi');

var client = new elasticsearch.Client({
    host: process.env.ES_URL
});

// Busca item pelo ID
module.exports = function(request, reply) {

    var result = {};

     Joi.validate(
        { 
            owner: request.params.owner,
            repo : request.params.repo
        },
        {
            owner: Joi.string(),
            repo : Joi.string()
        },
    function (err, value) {

        if (err) {
            reply({ type: 'error', message: 'invalid url' });
            return;
        }

        var esObject = {
            index: 'customelements',
            type: 'repo',
            body: {
                query: {
                    filtered: {
                        filter: {
                            bool: {
                                must: [
                                    { term: { owner: value.owner.toLowerCase() }},
                                    { term: { 'name.original': value.repo.toLowerCase() }}
                                ]
                            }
                        }
                    }
                }
            }
        };

        client.search(
            esObject
        ).then(function (body) {

            var source = body.hits.hits;
            var resultSource = [];

            source.forEach(function( val ){
                resultSource.push(val._source);
            });

            result.type = 'success';
            result.total = body.hits.total;
            result.result = resultSource;
            reply( result );

        }, function (error) {
            result.type = 'error';
            result.message = error.message;
            reply(result);
        });
    });

};
