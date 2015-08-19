var Lab = require('lab');
var lab = exports.lab = Lab.script();

var expect = require('chai').expect;
var server = require('../../../../server');

lab.experiment('Search owners', function() {
    lab.test('should return HTTP 200 status code', function(done) {
        var options = {
            method: 'GET',
            url: '/search/owners'
        };

        server.inject(options, function(response) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    lab.test('should have all the required properties', function(done) {
        var options = {
            method: 'GET',
            url: '/search/owners'
        };

        server.inject(options, function(response) {
            expect(response.result).to.have.all.keys([
                'total', 'page', 'pages', 'results'
            ]);

            done();
        });
    });

    lab.test('should have all the required properties for owner', function(done) {
        var options = {
            method: 'GET',
            url: '/search/owners?q=rob'
        };

        server.inject(options, function(response) {
            expect(response.result.results[0]).to.have.all.keys([
                'id', 'login', 'avatar_url', 'type',
                'name', 'company', 'blog', 'location', 'email'
            ]);

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
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    lab.test('should have all properties in response', function(done) {
        var options = {
            method: 'GET',
            url: '/search/repos'
        };

        server.inject(options, function(response) {
            expect(response.result).to.have.all.keys([
                'total', 'page', 'pages', 'results'
            ]);

            done();
        });
    });

    lab.test('should have all the required properties for repo (bower)', function(done) {
        var options = {
            method: 'GET',
            url: '/search/repos?q=13277619'
        };

        server.inject(options, function(response) {
            expect(response.result.results[0]).to.have.all.keys([
                'id', 'name', 'description', 'owner', 'created_at', 'updated_at',
                'pushed_at', 'size', 'forks_count', 'open_issues_count',
                'stargazers_count', 'subscribers_count', 'default_branch',
                'homepage', 'has_issues',  'has_pages', 'bower'
            ]);

            expect(response.result.results[0].owner).to.have.all.keys([
                'id', 'login', 'avatar_url'
            ]);

            expect(response.result.results[0].bower).to.have.all.keys([
                'name', 'keywords', 'dependencies', 'homepage'
            ]);

            done();
        });
    });

    lab.test('should have all the required properties for repo (npm)', function(done) {
        var options = {
            method: 'GET',
            url: '/search/repos?q=17549238'
        };

        server.inject(options, function(response) {
            expect(response.result.results[0]).to.have.all.keys([
                'id', 'name', 'description', 'owner', 'created_at', 'updated_at',
                'pushed_at', 'size', 'forks_count', 'open_issues_count',
                'stargazers_count', 'subscribers_count', 'default_branch',
                'homepage', 'has_issues',  'has_pages', 'npm'
            ]);

            expect(response.result.results[0].owner).to.have.all.keys([
                'id', 'login', 'avatar_url'
            ]);

            expect(response.result.results[0].npm).to.have.all.keys([
                'name', 'keywords', 'dependencies', 'homepage'
            ]);

            done();
        });
    });
});