var Lab = require('lab');
var lab = exports.lab = Lab.script();

var assert = require('chai').assert;
var expect = require('chai').expect;
var server = require('../../server');

lab.experiment('Get a single owner', function() {
    lab.test('should return HTTP 200 status code', function(done) {
        var options = {
            method: 'GET',
            url: '/owners/robdodson'
        };

        server.inject(options, function(response) {
            assert.equal(response.statusCode, 200);
            done();
        });
    });

    lab.test('have property "name" in response', function(done) {
        var options = {
            method: 'GET',
            url: '/owners/robdodson'
        };

        server.inject(options, function(response) {
            expect(response.result).to.have.property('name');
            done();
        });
    });
});

lab.experiment('List owner repositories', function() {
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
});