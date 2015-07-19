var Lab = require('lab');
var lab = exports.lab = Lab.script();

var expect = require('chai').expect;
var server = require('../../server');

lab.experiment('List endpoints', function() {
    lab.test('should return HTTP 200 status code', function(done) {
        var options = {
            method: 'GET',
            url: '/'
        };

        server.inject(options, function(response) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    lab.test('should return an object with all endpoints', function(done) {
        var options = {
            method: 'GET',
            url: '/'
        };

        server.inject(options, function(response) {
            expect(response.result).to.have.property('owner_url');
            expect(response.result).to.have.property('owner_repos_url');
            expect(response.result).to.have.property('owner_search_url');
            expect(response.result).to.have.property('repo_url');
            expect(response.result).to.have.property('repo_search_url');
            done();
        });
    });
});