var Lab = require('lab');
var lab = exports.lab = Lab.script();

var expect = require('chai').expect;
var server = require('../../../../server');

lab.experiment('Count owners', function() {
    lab.test('should return HTTP 200 status code', function(done) {
        var options = {
            method: 'GET',
            url: '/count/owners'
        };

        server.inject(options, function(response) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    lab.test('should have all the required properties', function(done) {
        var options = {
            method: 'GET',
            url: '/count/owners'
        };

        server.inject(options, function(response) {
            expect(response.result).to.have.all.keys(['count']);

            done();
        });
    });
});

lab.experiment('Count repos', function() {
    lab.test('should return HTTP 200 status code', function(done) {
        var options = {
            method: 'GET',
            url: '/count/repos'
        };

        server.inject(options, function(response) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    lab.test('should have all the required properties', function(done) {
        var options = {
            method: 'GET',
            url: '/count/repos'
        };

        server.inject(options, function(response) {
            expect(response.result).to.have.all.keys(['count']);

            done();
        });
    });
});