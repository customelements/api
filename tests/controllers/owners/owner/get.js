var Lab = require('lab');
var lab = exports.lab = Lab.script();

var expect = require('chai').expect;
var server = require('../../../../server');

lab.experiment('Get a single owner', function() {
    lab.test('should return HTTP 200 status code', function(done) {
        var options = {
            method: 'GET',
            url: '/owners/robdodson'
        };

        server.inject(options, function(response) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    lab.test('should return HTTP 404 status code', function(done) {
        var options = {
            method: 'GET',
            url: '/owners/keppelen'
        };

        server.inject(options, function(response) {
            expect(response.statusCode).to.equal(404);
            done();
        });
    });

    lab.test('should have all the required properties', function(done) {
        var options = {
            method: 'GET',
            url: '/owners/robdodson'
        };

        server.inject(options, function(response) {
            expect(response.result).to.have.all.keys([
                'id', 'login', 'avatar_url', 'type',
                'name', 'company', 'blog', 'location', 'email'
            ]);

            done();
        });
    });
});