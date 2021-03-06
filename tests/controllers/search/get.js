var Lab = require('lab');
var lab = exports.lab = Lab.script();

var expect = require('chai').expect;
var server = require('../../../server');

lab.experiment('Search base path', function() {
    lab.test('should return HTTP 400 status code', function(done) {
        var options = {
            method: 'GET',
            url: '/search'
        };

        server.inject(options, function(response) {
            expect(response.statusCode).to.equal(400);
            done();
        });
    });
});