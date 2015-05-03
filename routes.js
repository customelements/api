module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: function(request, reply) {
            return reply().code(200);
        }
    },
    {
        method: 'GET',
        path: '/repo/{id}',
        handler: require('./controllers/repo/id/get.js')
    },
    {
        method: 'POST',
        path: '/repo/{id}',
        handler: require('./controllers/repo/id/post.js')
    },
    {
        method: 'PUT',
        path: '/repo/{id}',
        handler: require('./controllers/repo/id/put.js')
    },
    {
        method: 'DELETE',
        path: '/repo/{id}',
        handler: require('./controllers/repo/id/delete.js')
    },
    {
        method: 'GET',
        path: '/repo/{owner}/{repo}',
        handler: require('./controllers/repo/name/get.js')
    },
    {
        method: 'GET',
        path: '/repos/{owner}',
        handler: require('./controllers/repos/owner/get.js')
    }
];
