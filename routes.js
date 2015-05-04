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
        path: '/id/{id}',
        handler: require('./controllers/id/get.js')
    },
    {
        method: 'POST',
        path: '/id/{id}',
        handler: require('./controllers/id/post.js')
    },
    {
        method: 'PUT',
        path: '/id/{id}',
        handler: require('./controllers/id/put.js')
    },
    {
        method: 'DELETE',
        path: '/id/{id}',
        handler: require('./controllers/id/delete.js')
    },
    {
        method: 'GET',
        path: '/name/{owner}/{repo}',
        handler: require('./controllers/name/get.js')
    },
    {
        method: 'GET',
        path: '/owner/{owner}',
        handler: require('./controllers/owner/get.js')
    }
];
