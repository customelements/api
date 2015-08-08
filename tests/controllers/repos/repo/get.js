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

    lab.test('should have all the required properties (bower)', function(done) {
        var options = {
            method: 'GET',
            url: '/repos/robdodson/mark-down'
        };

        server.inject(options, function(response) {
            expect(response.result).to.have.all.keys([
                'id', 'name', 'description', 'owner', 'created_at',
                'pushed_at', 'forks_count', 'stargazers_count', 'bower'
            ]);

            expect(response.result.owner).to.have.all.keys([
                'id', 'login'
            ]);

            expect(response.result.bower).to.have.all.keys([
                'name', 'keywords'
            ]);

            done();
        });
    });

    lab.test('should have all the required properties (npm)', function(done) {
        var options = {
            method: 'GET',
            url: '/repos/ruyadorno/polymer-simple-slider'
        };

        server.inject(options, function(response) {
            expect(response.result).to.have.all.keys([
                'id', 'name', 'description', 'owner', 'created_at',
                'pushed_at', 'forks_count', 'stargazers_count', 'npm'
            ]);

            expect(response.result.owner).to.have.all.keys([
                'id', 'login'
            ]);

            expect(response.result.npm).to.have.all.keys([
                'name', 'keywords'
            ]);

            done();
        });
    });
});