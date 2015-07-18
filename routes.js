module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: require('./controllers/get.js')
    },
    {
        method: 'GET',
        path: '/search/{type}',
        handler: require('./controllers/search/type/get.js')
    },
    {
        method: 'PUT',
        path: '/sync/{type}',
        handler: require('./controllers/sync/type/put.js')
    },
    {
        method: 'GET',
        path: '/owners/{owner}',
        handler: require('./controllers/owners/owner/get.js')
    },
    {
        method: 'GET',
        path: '/repos/{owner}',
        handler: require('./controllers/repos/owner/get.js')
    },
    {
        method: 'GET',
        path: '/repos/{owner}/{repo}',
        handler: require('./controllers/repos/repo/get.js')
    }
];
