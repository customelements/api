module.exports = [
    {
        method: 'GET',
        path: '/{id}',
        handler: function(request, reply) {
            var Controller = require('./controllers/find-id.js');
            new Controller(request, reply);
        }
    },
    {
        method: 'POST',
        path: '/{id?}',
        handler: function(request, reply) {
            var Controller = require('./controllers/create.js');
            new Controller(request, reply);
        }
    },
    {
        method: 'PUT',
        path: '/{id?}',
        handler: function(request, reply) {
            var Controller = require('./controllers/update.js');
            new Controller(request, reply);
        }
    },
    {
        method: 'DELETE',
        path: '/{id?}',
        handler: function(request, reply) {
            var Controller = require('./controllers/delete.js');
            new Controller(request, reply);
        }
    },
    {
        method: 'GET',
        path: '/repos/{owner}',
        handler: function(request, reply) {
            var Controller = require('./controllers/find-owner.js');
            new Controller(request, reply);
        }
    },
    {
        method: 'GET',
        path: '/repos/{owner}/{repo}',
        handler: function(request, reply) {
            var Controller = require('./controllers/owner-repo.js');
            new Controller(request, reply);
        }
    }
];
