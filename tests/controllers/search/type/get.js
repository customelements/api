var Lab = require('lab');
var lab = exports.lab = Lab.script();

var assert = require('chai').assert;
var expect = require('chai').expect;
var server = require('../../../../server');

lab.experiment('Search owners', function() {
    lab.test('should return HTTP 200 status code', function(done) {
        var options = {
            method: 'GET',
            url: '/search/owners'
        };

        server.inject(options, function(response) {
            assert.equal(response.statusCode, 200);
            done();
        });
    });
});

lab.experiment('Search repositories', function() {
    lab.test('should return HTTP 200 status code', function(done) {
        var options = {
            method: 'GET',
            url: '/search/repos'
        };

        server.inject(options, function(response) {
            assert.equal(response.statusCode, 200);
            done();
        });
    });
});