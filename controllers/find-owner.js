var es = require('../configs/es');
var joi = require('joi');

function controller(request, reply) {
    var result = {};

     joi.validate(
        { owner: request.params.owner },
        { owner: joi.string() },
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
                                    { term: { owner: value.owner.toLowerCase() }}
                                ]
                            }
                        }
                    }
                }
            }
        };

        es.search(esObject).then(function (body) {
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
}

module.exports = controller;