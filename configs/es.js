var elasticsearch = require('elasticsearch');

module.exports = function() {
    var client = new elasticsearch.Client({
        host: process.env.ES_URL
    });

    return client;
}();