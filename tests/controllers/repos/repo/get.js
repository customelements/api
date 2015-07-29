var Lab = require('lab');
var lab = exports.lab = Lab.script();

var expect = require('chai').expect;
var server = require('../../../../server');

lab.experiment('Get a single repository', function() {
    lab.test('should return HTTP 200 status code', function(done) {
        var options = {
            method: 'GET',
            url: '/repos/robdodson/mark-down'
        };

        server.inject(options, function(response) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    lab.test('should return HTTP 404 status code', function(done) {
        var options = {
            method: 'GET',
            url: '/repos/robdodson/mark'
        };

        server.inject(options, function(response) {
            expect(response.statusCode).to.equal(404);
            done();
        });
    });

    lab.test('should have all the required properties', function(done) {
        var options = {
            method: 'GET',
            url: '/repos/robdodson/mark-down'
        };

        server.inject(options, function(response) {
            expect(response.result).to.have.all.keys([
                'id', 'name', 'owner', 'description', 'created_at',
                'pushed_at', 'stargazers_count', 'forks_count'
            ]);

            expect(response.result.owner).to.have.all.keys([
                'id', 'login'
            ]);

            done();
        });
    });
});