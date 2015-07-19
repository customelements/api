var Lab = require('lab');
var lab = exports.lab = Lab.script();

var assert = require('chai').assert;
var expect = require('chai').expect;
var server = require('../../../../server');

lab.experiment('Get a list owner repositories', function() {
    lab.test('should return HTTP 200 status code', function(done) {
        var options = {
            method: 'GET',
            url: '/repos/robdodson'
        };

        server.inject(options, function(response) {
            assert.equal(response.statusCode, 200);
            done();
        });
    });

    lab.test('should return HTTP 404 status code (No results for user X)', function(done) {
        var options = {
            method: 'GET',
            url: '/repos/keppelen'
        };

        server.inject(options, function(response) {
            assert.equal(response.statusCode, 404);
            done();
        });
    });
});