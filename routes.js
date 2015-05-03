module.exports = [
    {
        method: 'GET',
        path: '/{id}',
        handler: require('./controllers/find-id.js')
    },
    {
        method: 'POST',
        path: '/{id?}',
        handler: require('./controllers/create.js')
    },
    {
        method: 'PUT',
        path: '/{id?}',
        handler: require('./controllers/update.js')
    },
    {
        method: 'DELETE',
        path: '/{id?}',
        handler: require('./controllers/delete.js')
    },
    {
        method: 'GET',
        path: '/repos/{owner}',
        handler: require('./controllers/find-owner.js')
    },
    {
        method: 'GET',
        path: '/repos/{owner}/{repo}',
        handler: require('./controllers/owner-repo.js')
    }
];
