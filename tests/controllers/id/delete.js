var Lab = require('lab');
var lab = exports.lab = Lab.script();
var assert = require('chai').assert;

var server = require('../../../server');
var controller = require('../../../controllers/id/delete');

lab.describe('DELETE /id/:id', function() {
    lab.describe('controller.validate(request)', function() {
        lab.it('returns params object if ID param is a number', function(done) {
            var request = {
                params: {
                    id: '3'
                }
            };

            controller.validate(request).then(function(result) {
                try {
                    assert.deepEqual(result, { id: 3 });
                    done();
                }
                catch(e) {
                   done(e);
                }
            });
        });

        lab.it('throws error 400 if ID param is not a number', function(done) {
            var request = {
                params: {
                    id: 'foo'
                }
            };

            controller.validate(request).catch(function(result) {
                try {
                    assert.equal(result.output.statusCode, 400);
                    done();
                }
                catch(e) {
                    done(e);
                }
            });
        });
    });
});