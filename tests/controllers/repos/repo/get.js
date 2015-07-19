var Lab = require('lab');
var lab = exports.lab = Lab.script();

var assert = require('chai').assert;
var expect = require('chai').expect;
var server = require('../../../../server');

lab.experiment('Get a single repository', function() {
    lab.test('should return HTTP 200 status code', function(done) {
        var options = {
            method: 'GET',
            url: '/repos/robdodson/mark-down'
        };

        server.inject(options, function(response) {
            assert.equal(response.statusCode, 200);
            done();
        });
    });

    lab.test('should return HTTP 200 status code', function(done) {
        var options = {
            method: 'GET',
            url: '/repos/robdodson/mark'
        };

        server.inject(options, function(response) {
            assert.equal(response.statusCode, 404);
            done();
        });
    });
});